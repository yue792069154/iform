import Ivu from './ivu';
class IvuRate extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuRate';

        this.label = Vue.$t('ivuRate');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            count: 5,
            "allow-half": false,
            disabled: false,
            "show-text": false,
            clearable: false,
            character: "",
            icon: "",
            "custom-icon": "",

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
                label: {
                    type: "String"
                },
                count: {
                    type: "Number"
                },
                "allow-half": {
                    type: "Boolean"
                },
                disabled: {
                    type: "Boolean"
                },
                "show-text": {
                    type: "Boolean"
                },
                clearable: {
                    type: "Boolean"
                },
                character: {
                    type: "String"
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
export default IvuRate;