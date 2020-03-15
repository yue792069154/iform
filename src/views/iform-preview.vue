<template>

</template>

<script>

import draggable from "vuedraggable";
import components from "../components/index";
import renderUtils from "../libs/render";

export default {
    name: 'IFormPreview',
    props: {
        comSelect: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {


        };
    },

    render(h) {
        var vm = this;

        return h("Form", {
            props: {
                ref: "iviewForm",
                model: "iviewFormModel",
                rules: "iviewFormRules",
                labelWidth: this.comSelect.formProps.labelWidth,
                labelPosition: this.comSelect.formProps.labelPosition
            }
        }, [vm.comSelect.comList.map(function(com) {
            if (com.layout) {
                return renderUtils.renderPreviewLayoutItem(h, com);
            } else {
                return renderUtils.renderPreviewFormItem(h, com);
            }
        })]);

    },
    components: {
        draggable
    }
}
</script>

<style scoped>

</style>
