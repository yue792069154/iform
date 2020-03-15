<template>
    <textarea ref="codeMirrorEditor"></textarea>
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
            codeMirrorEditor: {},
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function(n) {

                if (lodash.isFunction(this.codeMirrorEditor.setOption)) {
                    this.codeMirrorEditor.setOption("value", JSON.stringify(n));
                }

            }
        }
    },
    mounted() {
        this.editor = CodeMirror.fromTextArea(this.$refs.codeMirrorEditor, {
            mode: "text/javascript", //实现groovy代码高亮
            lineNumbers: true, //显示行号
            theme: "dracula", //设置主题
            lineWrapping: true, //代码折叠
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            matchBrackets: true, //括号匹配
            readOnly: true, //只读
            autoRefresh: true,
            indentUnit: 4
        });

        this.codeMirrorEditor.setSize('100%', '800px'); //设置代码框的长宽
        this.codeMirrorEditor.setOption("value", JSON.stringify(this.data));
    },
    methods: {}
}
</script>

<style scoped>

</style>
