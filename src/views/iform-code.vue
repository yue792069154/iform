<template>
    <json-viewer :value="componentList" :expand-depth=5 :copyable="jsonViewerCopyable">
    </json-viewer>
</template>

<script>
export default {
    name: 'IFormCode',
    props: {
        data: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {
            componentList: {

            },
            jsonViewerCopyable: {
                copyText: '复制',
                copiedText: '复制成功'
            }
        };
    },
    mounted() {
        this.componentList = this.$store.state.componentSelect;
    },
    methods: {

    }
}
</script>

<style scoped>

</style>


