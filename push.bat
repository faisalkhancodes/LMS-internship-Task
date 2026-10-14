@echo off
echo ========================================================
echo  CyberSNova LMS - GitHub Push Helper
echo  Target: https://github.com/faisalkhancodes/LMS-internship-Task.git
echo ========================================================
echo.
set "PATH=%PATH%;C:\Program Files\Microsoft Visual Studio\18\Professional\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd"
git push -u origin main
echo.
pause
