import * as vscode from "vscode";

const fs = require("fs");
const path = require("path");
// // const chalk = require('chalk');
const conf = require("./rootConfig");
// @ts-ignore
import { capitalize, smallLetters } from "./utils";
// @ts-ignore
import { writeFileByType } from "./template";



const DIRS = ["models", "services", "components"];
// 检查某个目录是否存在
function isExisDir(dir: string) {
  try {
    const stat = fs.statSync(dir);

    if (stat) {
      console.log(1);

      return true;
    }
  } catch (error) {
    console.log(error, 88);
    return false;
  }
  console.log(2);

  return false;
}

// 获取所有子目录
function findDirs(dirs: string) {

  const dirArr = []

  const dirArray = fs.readdirSync(dirs);

  for (const d of dirArray) {

    const filePath = path.resolve(dirs, d);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      dirArr.push(d);
    }
  }
  return dirArr;
}

// 递归创建目录 同步方法
function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true;
  } else if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}
function Main( type: string, name: string | undefined) {

  if (!name) {
    return vscode.window.showWarningMessage("请输入要创建的模块名称!");
  }
  const activeEditor = vscode.window?.activeTextEditor as vscode.TextEditor;
  const workspaceFilePath = vscode.workspace.getWorkspaceFolder(
    activeEditor.document.uri
  )?.uri?.fsPath as string

  const files = name.split(',')

  if (files?.length > 0) {

    files.map(file => {
      start(file, type, workspaceFilePath);
      return null;
    })
  } else {
    // const msg = chalk.yellow(`请输入要创建的模块名称！！！`);
    vscode.window.showWarningMessage("请输入要创建的模块名称!");
  }
}

function start(file: string, type: string, workspaceFilePath: string) {


  try {
    if (file?.length) {

      // 公共组件和页面模板组件，路径不相同
      let root = "./";
      // if (type === 'Components' && isExisDir(conf.rootCompPath)) {
      if (type === 'Components') {
        root = conf.rootCompPath
      } else if (isExisDir(conf.root)) {
        root = conf.root
      }
      // 获取 root 下面的所有文件夹
      const pagesPath = path.resolve(workspaceFilePath, root);//process.cwd() 获取node.js当前进程的工作目录

      const allDirs = findDirs(pagesPath);

      if (allDirs.indexOf(file) > -1) {
        const msg = `${file} 文件夹已经存在，请重命名输入！！！`
        vscode.window.showWarningMessage(msg);
        console.info(msg); // eslint-disable-line
        return;
      }

      // 函数组件独立处理
      if (type === 'Components') {
        const fileName = capitalize(file);
        const pageName = `${capitalize(file)}Page`;
        const filePath = path.resolve(workspaceFilePath, root, fileName);

        // 创建目录
        mkdirsSync(filePath);

        writeFileByType(filePath, pageName, fileName, type);
        return;
      }

      const filePath = path.resolve(workspaceFilePath, root, file);
      const pageName = `${capitalize(file)}Page`;
      const fileName = smallLetters(file);

      // 创建目录
      DIRS.forEach(dirName => {
        mkdirsSync(`${filePath}/${dirName}`);
      });

      writeFileByType(filePath, pageName, fileName, type);

    }
  } catch (error) {
    console.error(error);

    vscode.window.showErrorMessage('创建出错,请检查执行目录是否存在')
  }
}



export default Main
