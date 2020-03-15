var VuePage = require("../../../../common/basePage/vuePage.js");

Vue = require("comjs:vue");

var draggable = require("../../utils/vuedraggable.min.js");
var coms = require("../../coms/index.js");

var render = require("../../utils/render.js");


var fw = VuePage.fw;
var lodash = fw.core.Utils.lodash;

Vue.component('ivu-core', {
    props: {
        comSelect: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data: function () {
        return {

            ui: "iview",

            prefixCls: 'psp-form'
        };
    },
    mounted() {

    },
    methods: {

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
            },
            class: `${vm.prefixCls}-design-form`
        }, [
            h("draggable", {
                props: {
                    options: {
                        group: {
                            name: `${vm.prefixCls}`
                        },
                        ghostClass: `${vm.prefixCls}-item-move`,
                        animation: 150
                    }
                },
                class: `${vm.prefixCls}-design-form`,
                on: {
                    add: function (e) {

                        var groupType = e.item.attributes.groupType.value;
                        var type = e.item.attributes.type.value;

                        lodash.forEach(vm.comSelect.comList, function (item) {
                            item.active = false;
                        });

                        var com = new coms[vm.ui][groupType][type](coms);

                        com.onGetComAttributeGroupList = function (groupList) {
                            vm.$emit('getComAttribute', groupList);
                        };

                        com.onGetComAttributeGroupList(com.groupList);

                        vm.comSelect.comList.splice(e.newIndex, 0, com);


                    },
                    update: function (e) {
 
                        var com = vm.comSelect.comList[e.oldIndex];
                        vm.comSelect.comList.splice(e.oldIndex, 1);
                        vm.comSelect.comList.splice(e.newIndex, 0, com);

                        console.log(vm.comSelect.comList);
                    }
                }
            }, [vm.comSelect.comList.map(function (com) {
                if (com.layout) {
                    return render.renderLayoutItem(h, com, vm.comSelect);
                } else {
                    return render.renderFormItem(h, com, vm.comSelect);
                }
            })])
        ]);

    },
    components: {
        draggable
    }
});