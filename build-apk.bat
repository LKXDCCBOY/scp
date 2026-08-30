@echo off
REM =====================================================================
REM  SCP (Scientific Calculator Plus) - Quick APK Build Entry Point
REM
REM  Double-click this file  -> builds Debug APK (installs directly)
REM
REM  From command line:
REM      build-apk.bat            -> Debug APK
REM      build-apk.bat debug      -> Debug APK
REM      build-apk.bat release    -> Release APK (signed with debug keystore)
REM
REM  Recommended before first build:
REM      Run  scripts\android-envcheck.bat  to verify your toolchain.
REM      Or just run this file; it detects JDK/SDK automatically and prints
REM      actionable messages if something is missing.
REM =====================================================================
setlocal

set "ROOT=%~dp0"
cd /d "%ROOT%"

set TYPE=%1
if "%TYPE%"=="" set TYPE=debug

echo.
echo -------------------------------------------------------
echo   SCP Build APK shortcut -> %TYPE%
echo -------------------------------------------------------
echo.

call "%ROOT%scripts\android-build.bat" %TYPE%
set RC=%ERRORLEVEL%

echo.
if %RC% EQU 0 (
    echo [DONE] Build succeeded. If "adb install" is printed above you can
    echo        copy that line to install the APK on a connected device.
) else (
    echo [FAIL] Build failed with exit code %RC%
    echo.
    echo Quick diagnosis:
    if %RC% EQU 10 echo   %RC% -> No JDK found. Install Android Studio; it bundles JDK 21.
    if %RC% EQU 11 echo   %RC% -> JDK 22 detected (incompatible with Gradle 8.7). Switch to JDK 17/21.
    if %RC% EQU 12 echo   %RC% -> Android SDK not found. Install Android Studio or set ANDROID_HOME.
    if %RC% EQU 24 echo   %RC% -> Gradle build failed. Check Gradle log above; usually missing API 34 SDK.
)
echo.
REM pause only when executed interactively (double-click). Does not hurt CLI.
pause
endlocal
exit /b %RC%
