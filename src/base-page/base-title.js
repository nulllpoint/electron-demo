// html --------------------------------------------------------
document.writeln("<div class=\'title-bar\'>");
document.writeln("    <div class=\'tittle-before\'></div>");
document.writeln("    <div class=\'title-middle\'>");
document.writeln("        <span class=\'title no-dblclick\'>electron-app</span>");
document.writeln("    </div>");
document.writeln("    <div class=\'title-after\'>");
document.writeln("        <div class=\'win-button\'>");
document.writeln("            <ul>");
document.writeln("                <li>");
document.writeln("                    <i class=\'dark-mode-btn layui-icon layui-icon-light\'></i>");
document.writeln("                </li>");
document.writeln("            </ul>");
document.writeln("        </div>");
document.writeln("    </div>");
document.writeln("</div>");
// html --------------------------------------------------------

const {
    ipcRenderer
} = require('electron')

// const switchMaxMainWindowOnIPCAPI = () => {
//     // window.IPC_API.switchMaxMainWindow()
//     ipcRenderer.send('switchMaxMainWindow')
// }

// 主题切换
document.querySelector('.dark-mode-btn').addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    ipcRenderer.send('toggleDarMode')
    // this.switchMaxMainWindowOnIPCAPI()
})

// 双击 切换最大窗口
const titleBar = document.querySelector(".title-bar");
titleBar.addEventListener('dblclick', (e) => {
    console.log('dbclick success')
    e.preventDefault()
    e.stopPropagation()
    ipcRenderer.send('switchMaxMainWindow')
})