@echo off
REM =====================================================================
REM  SCP (Scientific Calculator Plus) - Android Build Env Check (Windows)
REM  Capacitor 6 / AGP 8.5 / Gradle 8.7 / JDK 17 or 21 / compileSdk 34
REM
REM  * Prefers Android Studio bundled JBR (JDK 21) to avoid the classic
REM    "Unsupported class file major version 66" crash caused by JDK 22.
REM  * Pure ASCII script - works correctly under ANY console code page.
REM =====================================================================
setlocal EnableExtensions EnableDelayedExpansion

echo.
echo =======================================================
echo   SCP Android Build Environment Check (Windows)
echo =======================================================
echo.

set PASS=0
set FAIL=0

REM --- 1) Node.js ------------------------------------------------------
echo [1/8] Node.js
call :check_node
if %ERRORLEVEL% EQU 0 (set /a PASS+=1) else (set /a FAIL+=1)

REM --- 2) npm ----------------------------------------------------------
echo.
echo [2/8] npm
call :check_npm
if %ERRORLEVEL% EQU 0 (set /a PASS+=1) else (set /a FAIL+=1)

REM --- 3) JDK (priority: AS JBR -> JAVA_HOME -> Adoptium/MS -> PATH) --
echo.
echo [3/8] JDK (recommend 17 or 21; JDK 22 breaks Gradle 8.7)
call :check_jdk
if %ERRORLEVEL% EQU 0 (set /a PASS+=1) else (set /a FAIL+=1)

REM --- 4) Android SDK --------------------------------------------------
echo.
echo [4/8] Android SDK (ANDROID_HOME / ANDROID_SDK_ROOT)
call :check_sdk
if %ERRORLEVEL% EQU 0 (set /a PASS+=1) else (set /a FAIL+=1)

REM --- 5) SDK Platform 34 + Build-Tools 34.x --------------------------
echo.
echo [5/8] SDK Platform 34 + Build-Tools 34.x
call :check_sdk34
if %ERRORLEVEL% EQU 0 (set /a PASS+=1) else (set /a FAIL+=1)

REM --- 6) Gradle wrapper ----------------------------------------------
echo.
echo [6/8] Gradle Wrapper
if exist "android\gradlew.bat" goto :gradle_ok
echo       [WARN] android\gradlew.bat missing. Run: npm run android:sync
set /a FAIL+=1
goto :gradle_done
:gradle_ok
echo       [ OK ] android\gradlew.bat present (auto-downloads Gradle 8.7-bin)
set /a PASS+=1
:gradle_done

REM --- 7) Node dependencies -------------------------------------------
echo.
echo [7/8] Dependencies (node_modules\@capacitor)
if exist "node_modules\@capacitor\android\package.json" goto :dep_ok
echo       [WARN] node_modules missing. Run: npm install
set /a FAIL+=1
goto :dep_done
:dep_ok
echo       [ OK ] Capacitor packages installed
set /a PASS+=1
:dep_done

REM --- 8) Frontend dist -----------------------------------------------
echo.
echo [8/8] Frontend dist (vite build output)
if exist "dist\index.html" goto :dist_ok
echo       [WARN] dist not built yet. Will run: npm run build
set /a FAIL+=1
goto :dist_done
:dist_ok
echo       [ OK ] dist\index.html present
set /a PASS+=1
:dist_done

echo.
echo =======================================================
echo   Result: Pass !PASS! / 8,   Warn/Fail !FAIL! / 8
echo =======================================================
if %FAIL% NEQ 0 (
    echo.
    echo Next steps:
    echo   1. Resolve the FAIL / WARN items above.
    echo   2. Double-click build-apk.bat in the project root, OR run:
    echo         scripts\android-build.bat debug
    echo.
    echo Notes:
    echo   * First time you open android\ in Android Studio, it installs
    echo     API 34 SDK + build-tools 34 automatically.
    echo   * First Gradle run downloads ~120MB gradle-8.7-bin.zip via the
    echo     Tencent mirror. If stuck, copy it manually to:
    echo         %%USERPROFILE%%\.gradle\wrapper\dists\gradle-8.7-bin\...
)

endlocal
exit /b %FAIL%

REM =====================================================================
REM  Subroutines (each: exit /b 0 on OK, exit /b 1 on FAIL)
REM  Written using plain goto - NO parenthesized blocks - to avoid any
REM  CMD parser weirdness with delayed expansion / special characters.
REM =====================================================================

:check_node
where node >nul 2>nul
if not errorlevel 1 goto :node_ok
echo       [FAIL] node not found. Install Node.js 18+ (20 LTS recommended)
echo              https://nodejs.org/
exit /b 1
:node_ok
for /f "delims=" %%i in ('node -v') do set "NV=%%i"
echo       [ OK ] node !NV!
exit /b 0

:check_npm
where npm >nul 2>nul
if not errorlevel 1 goto :npm_ok
echo       [FAIL] npm not found
exit /b 1
:npm_ok
for /f "delims=" %%i in ('npm -v') do set "PV=%%i"
echo       [ OK ]  npm !PV!
exit /b 0

:check_jdk
set JAVA_OK=0
set JAVAEXE=
set RESOLVED_JAVA_HOME=

set CAND1=%ProgramFiles%\Android\Android Studio\jbr
set CAND2=%ProgramFiles(x86)%\Android\Android Studio\jbr
set CAND3=%JAVA_HOME%

if exist "!CAND1!\bin\java.exe" set "RESOLVED_JAVA_HOME=!CAND1!" & set "JAVAEXE=!CAND1!\bin\java.exe" & set JAVA_OK=1 & goto :jdk_detected
if exist "!CAND2!\bin\java.exe" set "RESOLVED_JAVA_HOME=!CAND2!" & set "JAVAEXE=!CAND2!\bin\java.exe" & set JAVA_OK=1 & goto :jdk_detected
if "!CAND3!"=="" goto :jdk_no_java_home
if exist "!CAND3!\bin\java.exe" set "RESOLVED_JAVA_HOME=!CAND3!" & set "JAVAEXE=!CAND3!\bin\java.exe" & set JAVA_OK=1 & goto :jdk_detected
:jdk_no_java_home

REM Scan Adoptium folders
for /d %%d in ("%ProgramFiles%\Eclipse Adoptium\*") do (
    if exist "%%~d\bin\java.exe" set "RESOLVED_JAVA_HOME=%%~d" & set "JAVAEXE=%%~d\bin\java.exe" & set JAVA_OK=1 & goto :jdk_detected
)
REM Scan Microsoft JDK folders
for /d %%d in ("%ProgramFiles%\Microsoft\jdk-*") do (
    if exist "%%~d\bin\java.exe" set "RESOLVED_JAVA_HOME=%%~d" & set "JAVAEXE=%%~d\bin\java.exe" & set JAVA_OK=1 & goto :jdk_detected
)
REM Fallback: PATH
where java >nul 2>nul
if errorlevel 1 goto :jdk_detected
for /f "delims=" %%i in ('where java 2^>nul') do (
    set "JAVAEXE=%%~i"
    for %%p in ("%%~dpi..") do set "RESOLVED_JAVA_HOME=%%~fp"
    set JAVA_OK=1
    goto :jdk_detected
)

:jdk_detected
if %JAVA_OK% NEQ 0 goto :jdk_parse_ver
echo       [FAIL] JDK not found.
echo              Easiest: install Android Studio - it bundles JBR JDK 21.
echo              Or install Temurin 17 LTS: https://adoptium.net/
exit /b 1

:jdk_parse_ver
REM Version parse via temp file to avoid for/f quoting bugs with spaces.
set JV=unknown
set "JVTF=%TEMP%\scp_ejv_%RANDOM%.txt"
del /q "!JVTF!" 2>nul
"!JAVAEXE!" -version >"!JVTF!" 2>&1
for /f "usebackq tokens=3" %%a in (`findstr /i "version" "!JVTF!"`) do (
    set "JV=%%~a"
    set "JV=!JV:"=!"
)
del /q "!JVTF!" 2>nul

echo       [ OK ] java !JV!
echo              path: !RESOLVED_JAVA_HOME!
REM Warn if JDK 22
echo !JV! | findstr /b /c:"22." >nul
if errorlevel 1 goto :jdk_no_warn
echo       [WARN] JDK !JV! is NOT compatible with Gradle 8.7
echo              You'll hit: Unsupported class file major version 66
echo              Switch to JDK 17 or 21 (Android Studio bundles JBR 21).
:jdk_no_warn
exit /b 0

:check_sdk
set SDK_OK=0
set RESOLVED_SDK=

if "%ANDROID_HOME%"=="" goto :sdk_no_home
if not exist "%ANDROID_HOME%\platforms" goto :sdk_no_home
set "RESOLVED_SDK=%ANDROID_HOME%"
set SDK_OK=1
goto :sdk_done
:sdk_no_home

if "%ANDROID_SDK_ROOT%"=="" goto :sdk_no_root
if not exist "%ANDROID_SDK_ROOT%\platforms" goto :sdk_no_root
set "RESOLVED_SDK=%ANDROID_SDK_ROOT%"
set SDK_OK=1
goto :sdk_done
:sdk_no_root

if "%LOCALAPPDATA%"=="" goto :sdk_done
if not exist "%LOCALAPPDATA%\Android\Sdk\platforms" goto :sdk_done
set "RESOLVED_SDK=%LOCALAPPDATA%\Android\Sdk"
set SDK_OK=1
:sdk_done

if %SDK_OK% NEQ 0 goto :sdk_ok
echo       [FAIL] Android SDK not found.
echo              (a) Install Android Studio (auto installs SDK):
echo                  C:\Users\YOU\AppData\Local\Android\Sdk
echo              (b) Or command-line tools only:
echo                  https://developer.android.com/studio#command-line-tools-only
echo              Then set ANDROID_HOME env var.
exit /b 1
:sdk_ok
echo       [ OK ] ANDROID_HOME=!RESOLVED_SDK!
exit /b 0

:check_sdk34
set OK34=1
if "%RESOLVED_SDK%"=="" goto :sdk34_checked
if exist "!RESOLVED_SDK!\platforms\android-34\android.jar" goto :sdk34_plat_ok
echo       [WARN] Missing platforms;android-34
echo              Android Studio auto-installs when you open android\ folder.
echo              Or run: sdkmanager --install "platforms;android-34"
set OK34=0
:sdk34_plat_ok
set BT34=
for /d %%d in ("!RESOLVED_SDK!\build-tools\34.*") do set "BT34=%%~d"
if not "%BT34%"=="" goto :sdk34_checked
echo       [WARN] Missing build-tools;34.x
echo              Android Studio auto-installs when you open android\ folder.
echo              Or run: sdkmanager --install "build-tools;34.0.0"
set OK34=0
:sdk34_checked
if %OK34% EQU 1 echo       [ OK ] platform 34 + build-tools 34 ready & exit /b 0
exit /b 1
