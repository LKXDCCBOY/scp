@echo off
REM =====================================================================
REM  SCP (Scientific Calculator Plus) - One-click APK build (Windows)
REM
REM  Usage:
REM    scripts\android-build.bat debug      (default, direct install to device)
REM    scripts\android-build.bat release    (signed with debug keystore)
REM
REM  Features:
REM    * Auto JDK detection - priority order:
REM        1) Android Studio bundled JBR (JDK 21)
REM        2) JAVA_HOME
REM        3) Adoptium / Microsoft JDK
REM        4) java on PATH
REM      (This prevents the classic "class file major version 66" crash
REM       that happens when system JDK 22 is picked up.)
REM    * Auto ANDROID_HOME detection:
REM        ANDROID_HOME -> ANDROID_SDK_ROOT -> %%LOCALAPPDATA%%\Android\Sdk
REM    * Injects JAVA_HOME / ANDROID_HOME then calls .\gradlew.bat
REM      immediately in the SAME cmd shell (env vars always take effect).
REM    * Copies final APK to release-android\SCP-1.2.1-<type>.apk
REM    * Zero interactive prompts - on failure it prints the cause and
REM      actionable fixes, then exits with a distinct error code.
REM
REM  Pure ASCII script - works under ANY console code page.
REM =====================================================================
setlocal EnableExtensions EnableDelayedExpansion

set ROOT=%~dp0..
for %%i in ("%ROOT%") do set "ROOT=%%~fi"
cd /d "%ROOT%"

REM ---------- Argument ----------
set BUILD_TYPE=%1
if "%BUILD_TYPE%"=="" set BUILD_TYPE=debug
if /I "%BUILD_TYPE%"=="debug"   goto :type_ok
if /I "%BUILD_TYPE%"=="release" goto :type_ok
echo [ERR] First argument must be 'debug' or 'release'. Got: %BUILD_TYPE%
exit /b 1
:type_ok

echo.
echo =======================================================
echo   SCP ^| Build APK (Windows)
echo   Mode : %BUILD_TYPE%
echo   Root : %ROOT%
echo =======================================================
echo.

REM =====================================================================
REM  Step 0 : Detect + inject JDK and Android SDK
REM =====================================================================
echo [0/6] Detect JDK and Android SDK ...

REM ---- JDK detection ----
set DETECTED_JAVA=
set CAND1=%ProgramFiles%\Android\Android Studio\jbr
set CAND2=%ProgramFiles(x86)%\Android\Android Studio\jbr
set CAND3=%JAVA_HOME%

if exist "!CAND1!\bin\java.exe" set "DETECTED_JAVA=!CAND1!" & goto :jdk_found
if exist "!CAND2!\bin\java.exe" set "DETECTED_JAVA=!CAND2!" & goto :jdk_found
if "!CAND3!"=="" goto :jdk_check_folders
if exist "!CAND3!\bin\java.exe" set "DETECTED_JAVA=!CAND3!" & goto :jdk_found
:jdk_check_folders
for /d %%d in ("%ProgramFiles%\Eclipse Adoptium\*") do (
    if exist "%%~d\bin\java.exe" set "DETECTED_JAVA=%%~d" & goto :jdk_found
)
for /d %%d in ("%ProgramFiles%\Microsoft\jdk-*") do (
    if exist "%%~d\bin\java.exe" set "DETECTED_JAVA=%%~d" & goto :jdk_found
)
where java >nul 2>nul
if errorlevel 1 goto :jdk_found
for /f "delims=" %%i in ('where java 2^>nul') do (
    for %%p in ("%%~dpi..") do set "DETECTED_JAVA=%%~fp"
    goto :jdk_found
)
:jdk_found

if not "%DETECTED_JAVA%"=="" goto :jdk_check_version
echo.
echo [FATAL] JDK not found. Install Android Studio (it bundles JBR JDK 21)
echo         or get Temurin 17 LTS from https://adoptium.net/ .
exit /b 10

:jdk_check_version
REM Version parse via temp file (avoids for/f quoting bugs with spaces).
set JDK_VER=unknown
set "JVTF=%TEMP%\scp_bjv_%RANDOM%.txt"
del /q "!JVTF!" 2>nul
"!DETECTED_JAVA!\bin\java.exe" -version >"!JVTF!" 2>&1
for /f "usebackq tokens=3" %%a in (`findstr /i "version" "!JVTF!"`) do (
    set "JDK_VER=%%~a"
    set "JDK_VER=!JDK_VER:"=!"
)
del /q "!JVTF!" 2>nul

echo !JDK_VER! | findstr /b /c:"22." >nul
if errorlevel 1 goto :jdk_version_ok
echo.
echo [FATAL] Detected JDK !JDK_VER! which is INCOMPATIBLE with Gradle 8.7
echo         (error: Unsupported class file major version 66).
echo.
echo         Switch to JDK 17 or 21. The simplest fix: install Android Studio.
echo         It bundles JBR JDK 21 at:
echo           C:\Program Files\Android\Android Studio\jbr
echo         This script picks that path first automatically.
exit /b 11
:jdk_version_ok

REM Inject JAVA_HOME + prepend to PATH so THIS shell uses it immediately.
set "JAVA_HOME=!DETECTED_JAVA!"
set "PATH=!JAVA_HOME!\bin;!PATH!"
echo       JAVA_HOME = !JAVA_HOME!  (java !JDK_VER!)

REM ---- Android SDK detection ----
set DETECTED_SDK=
if "%ANDROID_HOME%"=="" goto :sdk_no_home
if not exist "%ANDROID_HOME%\platforms" goto :sdk_no_home
set "DETECTED_SDK=%ANDROID_HOME%"
goto :sdk_found
:sdk_no_home
if "%ANDROID_SDK_ROOT%"=="" goto :sdk_no_root
if not exist "%ANDROID_SDK_ROOT%\platforms" goto :sdk_no_root
set "DETECTED_SDK=%ANDROID_SDK_ROOT%"
goto :sdk_found
:sdk_no_root
if "%LOCALAPPDATA%"=="" goto :sdk_found
if not exist "%LOCALAPPDATA%\Android\Sdk\platforms" goto :sdk_found
set "DETECTED_SDK=%LOCALAPPDATA%\Android\Sdk"
:sdk_found

if not "%DETECTED_SDK%"=="" goto :sdk_ok
echo.
echo [FATAL] Android SDK not found.
echo         Install Android Studio - it installs the SDK to:
echo           %%LOCALAPPDATA%%\Android\Sdk
echo         Or set the ANDROID_HOME environment variable manually.
exit /b 12
:sdk_ok

REM Inject ANDROID_HOME + add platform-tools / cmdline-tools to PATH.
set "ANDROID_HOME=!DETECTED_SDK!"
set "ANDROID_SDK_ROOT=!DETECTED_SDK!"
set "PATH=!ANDROID_HOME!\platform-tools;!ANDROID_HOME!\cmdline-tools\latest\bin;!PATH!"
echo       ANDROID_HOME = !ANDROID_HOME!

REM Check for API 34 platform + build-tools (just warn, don't stop build).
set SDK34_OK=1
if exist "!ANDROID_HOME!\platforms\android-34\android.jar" goto :sdk34_plat_ok
set SDK34_OK=0
:sdk34_plat_ok
set BT34=
for /d %%d in ("!ANDROID_HOME!\build-tools\34.*") do set "BT34=%%~d"
if not "%BT34%"=="" goto :sdk34_done
set SDK34_OK=0
:sdk34_done
if %SDK34_OK% EQU 1 goto :sdk34_all_ok
echo.
echo [WARN] Missing platforms;android-34 and/or build-tools;34.0.0
echo        Choose ONE:
echo          (A) Open folder %ROOT%\android in Android Studio -
echo              it shows a "Missing SDK" banner and installs them for you.
echo          (B) Run: sdkmanager --install "platforms;android-34" ^
echo                                        "build-tools;34.0.0"
echo.
echo        Continuing the build anyway; Gradle may install them itself.
:sdk34_all_ok

REM =====================================================================
REM  Step 1 : npm install (fast no-op when already installed)
REM =====================================================================
echo.
echo [1/6] npm install ...
call npm install --no-audit --no-fund
if errorlevel 1 echo [ERR] npm install failed (exit=%ERRORLEVEL%) & exit /b 20

REM =====================================================================
REM  Step 2 : Build frontend (vite build -> dist/)
REM =====================================================================
echo.
echo [2/6] npm run build ...
call npm run build
if errorlevel 1 echo [ERR] Frontend build failed. Inspect Vite's error log above. & exit /b 21

REM =====================================================================
REM  Step 3 : Capacitor sync (copy dist -> android assets)
REM =====================================================================
echo.
echo [3/6] npx cap sync android ...
if exist "android\app\src\main" goto :cap_do_sync
echo       (First run - creating android sub-project.)
call npx cap add android
goto :cap_done
:cap_do_sync
call npx cap sync android
:cap_done
if errorlevel 1 echo [ERR] cap sync/add failed (exit=%ERRORLEVEL%) & exit /b 22
if exist "android\gradlew.bat" goto :cap_good
echo [ERR] android\gradlew.bat still missing after cap sync.
exit /b 23
:cap_good

REM =====================================================================
REM  Step 4 : Gradle Wrapper assemble
REM           MUST use explicit relative path: .\gradlew.bat
REM =====================================================================
echo.
echo [4/6] Gradle assemble%BUILD_TYPE% (first run downloads Gradle 8.7-bin, 2-15 min) ...

pushd android
call .\gradlew.bat --no-daemon assemble%BUILD_TYPE%
set GRADLE_RC=%ERRORLEVEL%
popd

if %GRADLE_RC% EQU 0 goto :gradle_ok
echo.
echo [ERR] Gradle build failed. Exit code: %GRADLE_RC%
echo.
echo Common causes + fixes:
echo   [1] JDK version -^> "Unsupported class file major version 66"
echo       Install Android Studio; this script picks its JBR JDK 21 first.
echo.
echo   [2] Missing SDK Platform 34 / Build-Tools 34
echo       Open %ROOT%\android in Android Studio; it installs them.
echo.
echo   [3] Gradle zip download is slow / stuck
echo       gradle-wrapper.properties already uses the Tencent cloud mirror.
echo       You can manually drop gradle-8.7-bin.zip into:
echo       %%USERPROFILE%%\.gradle\wrapper\dists\gradle-8.7-bin\<hash>\<hash>\
echo.
echo   [4] Maven dependency download is slow
echo       android/build.gradle already has Aliyun mirrors configured.
echo       Check for proxy or hosts-file redirections blocking maven.aliyun.com
exit /b 24
:gradle_ok

REM =====================================================================
REM  Step 5 : Copy APK to release-android\
REM =====================================================================
echo.
echo [5/6] Copy APK to release-android\ ...

set OUT_DIR=%ROOT%\release-android
if not exist "%OUT_DIR%" mkdir "%OUT_DIR%"

if /I not "%BUILD_TYPE%"=="debug" goto :apk_release
set SRC_APK=%ROOT%\android\app\build\outputs\apk\debug\app-debug.apk
set DST_APK=%OUT_DIR%\SCP-1.2.1-debug.apk
goto :apk_copy
:apk_release
set SRC_APK=%ROOT%\android\app\build\outputs\apk\release\app-release.apk
set DST_APK=%OUT_DIR%\SCP-1.2.1-release.apk
:apk_copy

if exist "%SRC_APK%" goto :apk_src_ok
echo [ERR] Gradle reported success but no APK found at:
echo       %SRC_APK%
echo       Check Gradle's "BUILD SUCCESSFUL" output for the real path.
exit /b 25
:apk_src_ok

copy /Y "%SRC_APK%" "%DST_APK%" >nul
set COPY_RC=%ERRORLEVEL%
if %COPY_RC% EQU 0 goto :copy_ok
echo [ERR] Failed to copy APK to release-android\ (exit=%COPY_RC%)
exit /b 26
:copy_ok

REM =====================================================================
REM  Step 6 : Final summary + adb install hint
REM =====================================================================
echo.
echo [6/6] Done!
echo.
echo =======================================================
echo   BUILD SUCCESS
echo =======================================================
echo   APK : %DST_APK%

where adb >nul 2>nul
if errorlevel 1 goto :no_adb
echo.
echo   Install to connected device (adb found):
if /I "%BUILD_TYPE%"=="debug" echo       adb install -r "%DST_APK%"
if /I not "%BUILD_TYPE%"=="debug" echo       adb install -r -d "%DST_APK%"
:no_adb

echo.
echo   Notes:
echo     * Small-screen layout: portrait phones use "screen on top,
echo       keyboard below" responsive layout automatically.
echo     * API levels: minSdk=22 (Android 5.1+) / targetSdk=34 (Android 14)
echo     * Release APK is currently signed with the debug keystore so you
echo       can install it directly. For Play Store upload, configure your
echo       own signing config in capacitor.config.json.
echo =======================================================

endlocal
exit /b 0
