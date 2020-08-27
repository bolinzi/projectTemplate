/**
 * @file: 需要直接resolve的url
 * @author: liubiao
 * @version: 1.0.0
 * @date: Do not edit
 * @github: https://github.com/huarxia
 */
import exportUrl from './exportUrl';
let initialUrl = [
    '/auth/oauth/token'
];
let urlArr = initialUrl.concat(exportUrl);
let CONTEXT_PATH = `${process.env.VUE_APP_CONTEXT_PATH}`;
urlArr = urlArr.map(item => {
    return CONTEXT_PATH + item;
});
export default urlArr;
