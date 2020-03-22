import Ivu from './ivu';
class IvuSwitch extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuSwitch';

        this.label = Vue.$t('ivuSwitch');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            size: 'large',
            "true-value":true,
            "false-value":false,
            "true-color": "",
            "false-color": "",
            disabled: false,
            label: self.label,
            value:false,
            code: self.getComponentCode(),

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
                "true-value": {
                    type: 'String',
                    clearable: true
                },
                "false-value": {
                    type: 'String',
                    clearable: true
                },
                "true-color": {
                    type: 'ColorPicker'
                },
                "false-color": {
                    type: 'ColorPicker'
                },
                disabled: {
                    type: 'Boolean'
                }
            }
        }];
    }
}

export default IvuSwitch;