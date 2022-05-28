/*
 * Desc: 各种文件模板
 */
const fs = require("fs");
// const chalk = require('chalk');
import * as vscode from "vscode";

const {
  indexContent: umiindexContent,
  mapPropsContent: umimapPropsContent,
  pContent: umipContent,
  lessContent: umilessContent,
  servicesContent: umiservicesContent,
  modelsContent: umimodelsContent,
} = require('./umiTpl');

const {
  indexContent: tsindexContent,
  mapPropsContent: tsmapPropsContent,
  pContent: tspContent,
  lessContent: tslessContent,
  servicesContent: tsservicesContent,
  modelsContent: tsmodelsContent,
} = require('./umiTsTpl');



const {
  indexContent: fcTsindexContent,
  pContent: fcTspContent,
  lessContent: fcTslessContent,
} = require('./fcTsTpl');


// 默认 umi 模板
let indexContent = umiindexContent;
let mapPropsContent = umimapPropsContent;
let pContent = umipContent;
let lessContent = umilessContent;
let servicesContent = umiservicesContent;
let modelsContent = umimodelsContent;

function writeFileByType(filePath: string, pageName: string, file: string, type: string) {

  // "Page",
  // "Components",


  if (type === 'Page') {
    indexContent = tsindexContent;
    mapPropsContent = tsmapPropsContent;
    pContent = tspContent;
    lessContent = tslessContent;
    servicesContent = tsservicesContent;
    modelsContent = tsmodelsContent;
    // umi 、 taro
    writeTsFile(filePath, pageName, file, type);
    return;
  }

  if (type === 'Components') {
    indexContent = fcTsindexContent;
    pContent = fcTspContent;
    lessContent = fcTslessContent;
    // umi ts 函数组件
    writeFcTsFile(filePath, pageName, file, type);
    return;
  }

}

function writeFcTsFile(filePath: string, pageName: string, fileName: string, type: string) {
  // 创建文件，写入内容
  // index.ts
  writeFile(`${filePath}/index.ts`, indexContent(fileName, type));
  // xxx.tsx
  writeFile(`${filePath}/${fileName}.tsx`, pContent(fileName, type));
  // xxx.less
  writeFile(`${filePath}/${fileName}.less`, lessContent(fileName));
}

function writeTsFile(filePath: string, pageName: string, file: string, type: string) {
  // 创建文件，写入内容
  // index.ts
  writeFile(`${filePath}/index.ts`, indexContent(pageName, type));
  // MapProps.js
  writeFile(`${filePath}/MapProps.js`, mapPropsContent(pageName, file, type));
  // xxxPage.tsx
  writeFile(`${filePath}/${pageName}.tsx`, pContent(file, pageName, type));
  // xxxPage.less
  writeFile(`${filePath}/${pageName}.less`, lessContent(type));
  // services.ts
  writeFile(`${filePath}/services/${file}.ts`, servicesContent(file, type));
  // models.tsx
  writeFile(`${filePath}/models/${file}.tsx`, modelsContent(file, type), true);
}



// 创建文件
function writeFile(filename: string, fileContent = '', flag = false) {
  fs.writeFile(filename, fileContent, 'utf8', (error: string) => {
    if (error) {
      // const err = chalk.red(error);

      const err = error;

      vscode.window.showErrorMessage(err)
      // const err = chalk.red(error);
      console.info(err);
    }
    if (flag) {
      // const msg = chalk.green("模块创建成功！！！");
      const msg = "模块创建成功！！！"
      vscode.window.showInformationMessage(msg)
      console.info(msg);
      return true;
    }
  })
}

export {
  writeFileByType,
}
