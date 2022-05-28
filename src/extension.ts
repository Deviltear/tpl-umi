import * as vscode from "vscode";
import Main from "./main";
//TODO:待新增美化命令行输出
const getUserInput = (type:string) => {
  vscode.window.showInputBox(
    { // 这个对象中所有参数都是可选参数
      password: false, // 输入内容是否是密码
      ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
      placeHolder: '输入创建模板的名称,如果多个请用逗号分隔', // 在输入框内的提示信息
      prompt: '输入创建模板的名称', // 在输入框下方的提示信息
      validateInput:function(text){return text.trim()}
    } // 对输入内容进行验证并返回
  ).then(function (inputMsg) {
    Main(type,inputMsg)
  });

}
const openQuicPick = () => {
  vscode.window.showQuickPick(
    [
      "Page",
      "Components",
    ],
    {
      ignoreFocusOut: true,
      matchOnDescription: true,
      matchOnDetail: true,
      placeHolder: '请选择创建的类型'
    })
    .then(function (msg) {
      getUserInput(msg || "")
    })

}

export function activate(context: vscode.ExtensionContext) {



const creatSelectCommands = vscode.commands.registerCommand(
  'tpl-umifile.creatSelect',
  () => {
    getUserInput("Page")

});
  // register creatComponent command
  const creatComponentCommand = vscode.commands.registerCommand(
    "tpl-umifile.creatComponent",
    () => {
      getUserInput("Components")

    }
  );
  // register creatPage command
  const creatPageCommand = vscode.commands.registerCommand(
    "tpl-umifile.creatPage",
    () => {
      openQuicPick()
      // getUserInput("Page")

    }
  );

  // 将命令注册到执行上下文中
  context.subscriptions.push(creatSelectCommands, creatPageCommand,creatComponentCommand);
}

export function deactivate() {}