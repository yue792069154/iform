import Ivu from './ivu';
class IvuText extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuText';

        this.label = Vue.$t('ivuText');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            width: 100,
            type: 'text',
            size: 'large',
            placeholder: Vue.$t('pleaseInput'),
            clearable: false,
            disabled: false,
            readonly: false,
            maxlength: 36,
            value: null,

            label: self.label,
            code: self.getComponentCode(),

            rule: '',
            ruleType: 'regexBuilit',
            ruleMessage: '',

            required: false

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
                value: {
                    type: 'String',
                    clearable: true
                },
                clearable: {
                    type: 'Boolean'
                },
                disabled: {
                    type: 'Boolean'
                },
                readonly: {
                    type: 'Boolean'
                }
            }
        }, {
            groupName: Vue.$t('validateAttr'),
            groupCode: 'validateAttr',
            children: {
                required: {
                    type: 'Boolean'
                },
                maxlength: {
                    type: 'Number'
                },
                rule: {
                    type: 'Rule',
                }
            }
        }];
    }
}

export default IvuText;