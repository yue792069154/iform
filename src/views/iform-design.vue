<script>
const prefixCls = 'iform';

import draggable from "vuedraggable";
import _ from "lodash";
import components from "../components/index";
import renderUtils from "../libs/render";

export default {
    name: 'IFormDesign',
    props: {
        componentList1: {
            type: Array,
            default () {
                return [];
            }
        }
    },
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
    render(h) {

        var vm = this;

        return h("Form", {
            props: {
                ref: "iviewForm",
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
                            type: "setComponentAttributeGroupList",
                            componentAttributeGroupList: component.groupList
                        });

                    },
                    update: function(e) {

                        var component = vm.componentSelect.componentList[e.oldIndex];
                        vm.componentSelect.componentList.splice(e.oldIndex, 1);
                        vm.componentSelect.componentList.splice(e.newIndex, 0, component);

                        console.log(vm.componentSelect.componentList);

                    }
                }
            }, [vm.componentSelect.componentList.map(function(component) {
                if (component.layout) {
                    return renderUtils.renderLayoutItem(h, component, vm.componentSelect);
                } else {
                    return renderUtils.renderFormItem(h, component, vm.componentSelect);
                }
            })])
        ]);

    },
    components: {
        draggable
    }
}
</script>