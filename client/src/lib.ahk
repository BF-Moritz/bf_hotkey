SetupServer() {
    ; This snippet disables flashing console windows
    DllCall("AllocConsole")
    WinHide % "ahk_id " DllCall("GetConsoleWindow", "ptr")

    ; Starts the server using node js
    Run node ""src/index.js""
}

RunClient() {
    shell := ComObjCreate("WScript.Shell")
    server := "curl http://localhost:12344/sub -m 25"

    ; Go in subscriber mode and wait for commands.
    ; You can trigger these commands by calling "ipAddress:port/send/commandNameGoesHere"
    Loop {
        exec := shell.Exec(ComSpec " /C " server)
        command := exec.StdOut.ReadAll()
        ; Calls a custom defined function in any included script.
        ; Does ignore wrong calls (not defined functions).
        if(command == "kill") {
            Exit
        } else {
            fn := Func(command)
            if(fn != 0) {
                %fn%()
            }
        }
        
    }
}