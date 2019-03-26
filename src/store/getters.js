const getters = {
        // user: state => state.user //省略写法
        user: (state, getters) => { //复杂写法
            console.log(state)
            return state.user;
        },
        token: state => state.token,
        isCollapse: state => state.isCollapse,
    }
    //通过this.$store.getters 获取store属性
export default getters;