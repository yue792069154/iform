import Van from './van';
class vantButton extends Van {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'VanButton';

        this.layout = true;

        this.label = Vue.$t('vanButton');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            type: "default",
            text: "按钮文字",
            color: "",
            block: false,
            plain: false,
            square: false,
            round: false,
            disabled: false,


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
                        label: "info",
                        value: "info"
                    }, {
                        label: "warning",
                        value: "warning"
                    }, {
                        label: "danger",
                        value: "danger"
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
                        label: Vue.$t('mini'),
                        value: "mini"
                    }]
                },
                text: {
                    type: "String"
                },
                block: {
                    type: "Boolean"
                },
                plain: {
                    type: "Boolean"
                },
                square: {
                    type: "Boolean"
                },
                round: {
                    type: "Boolean"
                },
                disabled: {
                    type: "Boolean"
                },
                hairline: {
                    type: "Boolean"
                }
            }
        }];
    }
}

export default vantButton;