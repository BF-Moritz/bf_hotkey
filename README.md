## bf_hotkey | MultiClient Hotkeyless AutoHotkey

## Functionality

The **bf_hotkey** server script launches a lightweight web server. It listens to the endpoint `localhost:12345/cmd/:host/:command` for http requests and redirects them to the coresponding **bf_hotkey** client script. This will redirect the request again to the **AHK** script. To be more precise, if you call `localhost:42800/cmd/pc1/HelloWorld`, the `HelloWorld()`-function on the client called `pc1` inside the AHK-file is executed:

```ahk
HelloWorld() {
    MsgBox, Hello World
}
```

Also, you can include your AHK-scripts and define custom functionality in a nice and clean way - without loosing too much performance. You can use your web browser, shortcuts or utility hardware like the [Stream Deck](https://www.elgato.com/gaming/stream-deck).

## Installation

_Note: Requires Windows 10_

1. Install [AutoHotkey](https://www.autohotkey.com/) on every client.
2. Install node on every client and the server. You can download it from https://nodejs.org/. Make sure that node is in the PATH-variable and available from the console. You can test this by executing `node -v`
3. Clone or download this repository. Put the server folder on your server and the client folder on your client pcs. You can also just head over to [releases](hhttps://github.com/BF-Moritz/bf_hotkey/releases)
4. On your Server: Open a console window and enter the `server` folder. Then, execute `npm install` to install all web server dependencies.
5. Start the server with the command `npm start`
6. On your Clients: Open a console window and enter the `client` folder. Then, execute `npm install` to install all web server dependencies.
7. Start your client by executing the `start.ahk`-file.
8. Open your web browser and navigate to `http://<PortOfTheServer>:12345/cmd/name/HelloWorld`. This should open a message dialog, triggered by the `HotkeylessAHK.ahk`-file.
9. Now, you're ready to go.

_Troubleshooting_: If anything does not work, disable console window hiding by deleting lines 3 and 4 in the `SetupServer()`-method in the `lib.ahk`-file and restart the process. This might give you more information.

```
DllCall("AllocConsole")
WinHide % "ahk_id " DllCall("GetConsoleWindow", "ptr")
```

## Usage

Once installed, the usage of **Hotkeyless AutoHotkey** is easy: Write your methods inside the `start.ahk`-file (or include other scripts) and call them with your web browser, the `curl`-console command, a stream deck, ...

The endpoint is always the same: `http://<PortOfTheServer>:12345/cmd/NameOfTheClient/FunctionName`.

To terminate the running tool, call `http://<PortOfTheServer>:12345/kill`.

## More

This project was heavily inspired by [HotkeylessAHK](https://github.com/sebinside/HotkeylessAHK) by [sebinside](https://github.com/sebinside)

If there are more questions, you can contact me on [Twitter](https://twitter.com/BF_Moritz) or via [mail](mailto:contact@bfmoritz.de).
