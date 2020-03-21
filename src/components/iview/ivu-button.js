import Ivu from './ivu';
class IvuButton extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuButton';

        this.label = Vue.$t('ivuButton');

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            type: "default",
            ghost: false,
            size: "large",
            shape: "",
            long: false,
            disabled: false,
            icon: "",
            "custom-icon": "",

            buttonText: "按钮",
            label: self.label,
            code: self.getComponentCode(),

        };

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: "String"
                },
                type: {
                    type: "Array",
                    optionList: [{
                        label: "default",
                        value: "default"
                    }, {
                        label: "primary",
                        value: "primary"
                    }, {
                        label: "dashed",
                        value: "dashed"
                    }, {
                        label: "text",
                        value: "text"
                    }, {
                        label: "info",
                        value: "info"
                    }, {
                        label: "success",
                        value: "success"
                    }, {
                        label: "warning",
                        value: "warning"
                    }, {
                        label: "error",
                        value: "error"
                    }]
                },

                size: {
                    type: "Array",
                    optionList: [{
                        label: Vue.$t('large'),
                        value: "large"
                    }, {
                        label: Vue.$t('small'),
                        value: "small"
                    }, {
                        label: Vue.$t('default'),
                        value: "default"
                    }]
                },
                ghost: {
                    type: "Boolean"
                },
                long: {
                    type: "Boolean"
                },
                buttonText: {
                    type: "String"
                },
                disabled: {
                    type: "Boolean"
                },
                icon: {
                    type: "String"
                },
                "custom-icon": {
                    type: "Icon"
                }
            }
        }];
    }
}

export default IvuButton;