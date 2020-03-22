import Ivu from './ivu';

class IvuSelect extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuSelect';

        this.label = Vue.$t('ivuSelect');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            width: 100,
            type: "text",
            size: "large",
            placeholder: Vue.$t('pleaseSelect'),
            clearable: false,
            disabled: false,
            readonly: false,
            filterable: true,

            value: null,

            label: self.label,
            code: self.getComponentCode(),

            required: false,

            dataType: "dataStatic",
            optionList: [{
                label: "选项1",
                value: "1",
                componentList: []
            }, {
                label: "选项2",
                value: "2",
                componentList: []
            }, {
                label: "选项3",
                value: "3",
                componentList: []
            }]
        };

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: 'String'
                },
                label: {
                    type: 'String'
                },
                width: {
                    type: 'Number'
                },
                size: {
                    type: 'Array',
                    render: 'Select',
                    optionList: [{
                        label: Vue.$t('large'),
                        value: 'large'
                    }, {
                        label: Vue.$t('small'),
                        value: 'small'
                    }, {
                        label: Vue.$t('default'),
                        value: 'default'
                    }]
                },
                placeholder: {
                    type: 'String',
                    clearable: true
                },
                dataType: {
                    type: "Data",
                    field:"optionList"
                },
                filterable: {
                    type: "Boolean"
                },
                clearable: {
                    type: "Boolean"
                },
                disabled: {
                    type: "Boolean"
                },
                readonly: {
                    type: "Boolean"
                }
            }
        }, {
            groupName: Vue.$t('validateAttr'),
            groupCode: 'validateAttr',
            children: {
                required: {
                    type: 'Boolean'
                }
            }
        }];
    }
}

export default IvuSelect;