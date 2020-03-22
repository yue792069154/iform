<script>
const prefixCls = 'iform';

import draggable from "vuedraggable";
import _ from "lodash";
import components from "../../components/index";
import  '../../styles/common/iconfont/iconfont.css';

export default {
    name: 'IFormItem',
    data() {
        return {

            ui: "iview",

            prefixCls: prefixCls,

            componentSelect: {
                formProps: {

                },
                componentList: []
            },

        }
    },
    created() {
        this.componentSelect = this.$store.state.componentSelect; //this.$store.state.componentSelect;
    },

    render(h) {


        var vm = this;

        return h("Form", {
            props: {
                //ref: "iviewForm",
                // model: "iviewFormModel",
                // rules: "iviewFormRules",
                // labelWidth: this.comSelect.formProps.labelWidth,
                // labelPosition: this.comSelect.formProps.labelPosition
            },
            class: `${prefixCls}-design-form`
        }, [
            h("draggable", {
                props: {
                    options: {
                        group: {
                            name: 'iform'
                        },
                        ghostClass: `${prefixCls}-item-move`,
                        animation: 150
                    }
                },
                class: `${prefixCls}-design-form`,
                on: {
                    add: function(e) {

                        var groupType = e.item.attributes.groupType.value;
                        var type = e.item.attributes.type.value;

                        _.forEach(vm.componentSelect.componentList, function(item) {
                            item.active = false;
                        });

                        var component = new components[vm.ui][groupType][type](vm);

                        vm.componentSelect.componentList.splice(e.newIndex, 0, component);


                        vm.$store.commit({
                            type: "setComponentActive",
                            componentActive: component
                        });

                        vm.$store.commit({
                            type: "setComponentSelect",
                            componentSelect: vm.componentSelect
                        });

                    },
                    update: function(e) {

                        var component = vm.componentSelect.componentList[e.oldIndex];
                        vm.componentSelect.componentList.splice(e.oldIndex, 1);
                        vm.componentSelect.componentList.splice(e.newIndex, 0, component);

                        vm.$store.commit({
                            type: "setComponentSelect",
                            componentSelect: vm.componentSelect
                        });

                    },
                    choose: function(e) {

                        _.forEach(vm.componentSelect.componentList, function(component) {
                            component.active = false;
                        });

                        var component = vm.componentSelect.componentList[e.oldIndex];
                        component.active = true;
                        
                        vm.$store.commit({
                            type: "setComponentActive",
                            componentActive: component
                        });
                    }
                }
            }, [vm.componentSelect.componentList.map(function(component) {
                return renderUtils.renderFormItem(h, component);
            })])
        ]);

    },
    components: {
        draggable
    }
}
</script>