const mutations = {
    setUser: (state, data) => { //第一个参数为state的设置的变量，第二个参数是调取时传递的
        state.user = data;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_COLLAPSE: (state, isCollapse) =>{
        state.isCollapse = isCollapse;
    },
}
export default mutations;