  
#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir%
Menu, Tray, Icon, shell32.dll, 147
#singleinstance force

#Include src/lib.ahk

; MultiClientHotkeylessAHK by BF_Moritz
; Inspired by HotkeylessAHK by sebinside
; ALL INFORMATION: https://github.com/BF_Moritz/bf_hotkey
; Make sure that you have downloaded everything, especially the "/src" folder.
; Make sure that you have nodeJS installed and available in the PATH variable.

SetupServer()
RunClient()

; Your custom functions go here!
; You can then call them by using the URL "localhost:12345/cmd/yourFunctionName"
; The funciton name "kill" is reserved to end the script execution.

HelloWorld() {
    MsgBox, Hello World
}

OpenExplorer() {
    Run, explorer.exe
}