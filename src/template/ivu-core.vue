<template>
    <div>
        4444
     <router-link :to="{ path:'/index'}">自己跳自己o(*￣▽￣*)ブ</router-link>
    
    
        </div>
</template>
<script>
export default {
    name: 'IvuCore',
    props: {
        comSelect: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data: function() {
        return {
            ui: "iview",
            prefixCls: 'psp-form'
        };
    },
    methods: {

    }
};
</script>
<style scoped>

</style>