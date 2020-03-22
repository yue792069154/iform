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
                copyText: '',
                copiedText: ''
            }
        };
    },
    mounted() {

        //this.jsonViewerCopyable.copyText = this.$key('copyText');
        //this.jsonViewerCopyable.copiedText = this.$key('copiedText');

        this.componentList = this.$store.state.componentSelect;

    },
    methods: {

    }
}
</script>

<style scoped>

</style>


