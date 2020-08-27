let urlArr = ['/auth/oauth/token'];
let CONTEXT_PATH = `${process.env.VUE_APP_CONTEXT_PATH}`;
urlArr = urlArr.map(item => {
    return CONTEXT_PATH + item;
});
export default urlArr;
