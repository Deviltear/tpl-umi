/*

 * Desc: 各种文件模板
 */
import { getNowFormatDate } from '../utils';


// index 内容
function indexContent(pageName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: ${pageName} 入口
*/
import dynamic from 'umi/dynamic';

export default dynamic({
  loader: () => import('./${pageName}'),
});
`;
  return content;
}

// MapProps 内容
function mapPropsContent(desc:string, modelName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: ${desc} MapProps
*/
export const mapStateToProps = ({ ${modelName}, loading }) => ({
  loading: loading.models.${modelName},
  myData: ${modelName}.myData,
});

export const mapDispatchToProps = dispatch => ({
  onUpdate(payload) {
    dispatch({
      type: '${modelName}/update',
      payload,
    });
  },
  clearData(payload) {
    dispatch({
      type: '${modelName}/clearData',
      payload,
    });
  },
});
`;
  return content;
}

// 入口组件内容
function pContent(pageName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: 描述
*/
import React from 'react';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './${pageName}.less';

const ${pageName} = () => {
  return (
    <div className={styles.root}>
      内容
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(${pageName});
`;
  return content;
}

// less 内容
function lessContent() {
  const content = `.root{
  :global{

  }
}
`;
  return content;
}

// services 内容
function servicesContent(string:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: ${string} services
*/
import { get } from 'utils/fetch';

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShow = param => get('/epidemic/cityDataShow', param);
`;
  return content;
}

// models 内容
function modelsContent(fileName:string) {

  const content = `/*

* Date: ${getNowFormatDate()}
* Desc: ${fileName} models
*/
import * as ${fileName}Api from '../services/${fileName}.js';

const initData = {
  myData: [], // 数据
};

export default {
  namespace: '${fileName}',
  state: {
    ...initData,
  },

  effects: {
    *cityDataShow({ payload }, { call, put }) {
      const result = yield call(${fileName}Api.cityDataShow, payload);
      const { errCode, data } = result;
      if (errCode === 0) {
        yield put({
          type: 'update',
          payload: {
            myData: data || [],
          },
        });
      }
      return result;
    },
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};

`;
  return content;
}

module.exports = {
  indexContent,
  mapPropsContent,
  pContent,
  lessContent,
  servicesContent,
  modelsContent,
}
