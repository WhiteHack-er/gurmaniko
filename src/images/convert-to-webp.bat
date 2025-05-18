@echo off
setlocal enabledelayedexpansion

:: Указываем путь к cwebp.exe (если лежит в той же папке — не трогаем)
set "WEBP=%~dp0cwebp.exe"

echo 🔁 Начинаем конвертацию изображений в .webp...

:: Рекурсивно обходим все .jpg, .jpeg, .png
for /R %%F in (*.jpg *.jpeg *.png) do (
    set "input=%%~fF"
    set "output=%%~dpnF.webp"
    
    :: Проверяем, существует ли .webp
    if not exist "!output!" (
        echo 🔨 Конвертация: %%~nxF
        "%WEBP%" "!input!" -q 75 -o "!output!"
    ) else (
        echo ⏭ Уже есть .webp: %%~nxF — пропускаем
    )
)

echo ✅ Готово! Все изображения обработаны.
pause
