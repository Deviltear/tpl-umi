/*

 * Desc: 函数组件 ts 各种文件模板
 */
import { getNowFormatDate } from '../utils';

// index 内容
function indexContent(fileName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: ${fileName} 组件入口
*/
import ${fileName} from './${fileName}';

export default ${fileName};
`;
  return content;
}

// 组件内容
function pContent(fileName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: 描述
*/
import React from 'react';
import cn from 'classnames';
import classPrefix from 'prefix-classnames';
import './${fileName}.less';

const PREFIX = 'c-${fileName}';
const px = classPrefix(PREFIX);

interface ${fileName}Props {
  className?: string;
  style?: React.CSSProperties;
}

const ${fileName}: React.FC<${fileName}Props> = (props) => {
  const { style, className } = props;

  const classNames = cn(px('root'), className);

  return (
    <div className={classNames} style={style}>
      <h1>组件内容</h1>
    </div>
  );
};

export default ${fileName};
`;
  return content;
}

// less 内容
function lessContent(fileName:string) {
  const content = `@prefix: c-${fileName};

.@{prefix} {
  &- {
    &root {
      padding: 16px 16px 0 16px;
    }
  }
}
`;
  return content;
}

module.exports = {
  indexContent,
  pContent,
  lessContent,
}
