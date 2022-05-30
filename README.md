## tpl
 创建统一功能模块模板，支持模板有 page ts 、 函数组件 ts。

 page模块 结构如下：
 <pre>
xxx                     // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- xxx.ts          // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- xxx.ts          // 业务 service 文件
  |-- XxxPage.ts        // 业务组件开发入口，自动 connect model
  |-- XxxPage.less      // 业务样式
  |-- index.js          // 业务入口，使用 dynamic 引用
  |-- MapProps.tsx       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

 组件模块 结构如下：
 <pre>
Xxx                     // 业务组件根目录,首字母自动大写
  |-- Xxx.less          // 样式文件,自动引入classNames库
  |-- Xxx.tsx          // 组件代码
  |-- index.ts          // 组件入口
</pre>
## 安装

插件市场搜索 Tpl-umifile 安装

## 使用

1.打开vscode 命令面板 输入 tpl-help-select 回车 可选择创建componet还是page
(或是输入tpl-create-page 直接选择创建页面,输入tpl-create-Component 直接选择创建组件
2.输入组件或页面的名称回车即可完成创建



如果相同时创建多个那么只需在输入名称时以,分隔
例如：需要创建 home1,home2 2个页面,则输入
```
home1,home2

```
或是按下快捷命令Comm+f10 快速唤出选择模板
运行结果：
<pre>
home1                    // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- home1.ts         // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- home1.ts         // 业务 service 文件
  |-- Home1Page.tsx       // 业务组件开发入口，自动 connect model
  |-- Home1Page.less     // 业务样式
  |-- index.ts          // 业务入口，使用 dynamic 引用
  |-- MapProps.tsx       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

<pre>
home2                    // 业务组件根目录
  |-- components        // 业务组件目录
  |-- models            // 业务 models 目录
    |-- home2.ts         // 业务 model 文件，自动加载 services
  |-- services          // 业务 services 目录
    |-- home2.ts         // 业务 service 文件
  |-- Home2Page.tsx       // 业务组件开发入口，自动 connect model
  |-- Home2Page.less     // 业务样式
  |-- index.ts          // 业务入口，使用 dynamic 引用
  |-- MapProps.tsx       // mapStateToProps、mapDispatchToProps，自动引用 model
</pre>

为了规范，在创建模块的时候，请确认当前工程存在'src/pages','src/components'及文件夹


## umi ts 函数组件模板
该插件支持 umi ts 函数组件模板，如果有 src/components 目录，则在该目录下创建，否则在执行的目录下创建组件；

组件名称默认会做首字母大写自动转化；


## 说明

- 1.该模板是针对使用 umi 框架的项目，创建统一功能模块模板,均以Ts 创建；

- 2.由于实际项目开发，模块一般都是在 `src/pages` 下创建，
    所以默认创建的模块放在 `src/pages`或`src/components` 目录下；

- 3.如果执行命令的目录下没有 `src/pages`或`src/components`  ，则默认在或`src` 创建；

- 4.目前支持的模板有：函数组件模块,Page页面模块
