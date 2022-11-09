const fs = window.require('fs')
const pathModule = window.require('path')
const { app } = window.require("@electron/remote")
const { ipcRenderer } = window.require("electron");
require('minecraft-folder-path');



function App() {
  function callIPC(){
      ipcRenderer.send("app/launch");
  }
  function callIPC2(){
    ipcRenderer.send("app/test");
}
  return (
    <div className='App'>
      <title>KNGLauncher</title>
      <p>PLEASE USE THE ALT MANAGER TO LOG IN!!!!!!!</p>
      <h1 class="head">KNGClient Launcher</h1>
      <button onClick={callIPC} class="btn">
        Launch MC
      </button>

    </div>
  )
}

export default App
