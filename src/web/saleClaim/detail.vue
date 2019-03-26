<template>
    <div>
       详情
    </div>
</template>
<script>
import ajax from '@utils/config';
export default {
    components: {
    },
    data() {
        return {
          
        }
    },
    computed: {
    },
    created() {
        // this.getType();
    },
    mounted() {
    },
    methods: {
       
        getType() {
            ajax({
                url: 'news/types',
                optionParams: {}
            }).post()
                .then(response => {
                    if (response.code === 200) {
                        let data = response.data ? response.data : {};
                        this.tabList = data.types ? data.types : [];
                        if (this.tabList.length > 0) {
                            this.getList(this.tabList[0].type)
                        }
                    } else {
                        console.log(response)
                    }
					
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
</style>


