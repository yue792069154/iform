import Ivu from './ivu';

class IvuBlock extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuBlock';

        this.label = Vue.$t('ivuBlock');

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            componentList: [],
            padding: "0",
            borderWidth: "1",
            borderStyle: "",
            borderColor: "",
            backgroundColor: "",
            borderRadius: "0",
            content: "",
            code: self.getComponentCode(),

        };

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: "String"
                },
                padding: {
                    type: "Number"
                },
                borderWidth: {
                    type: "Number"
                },
                borderStyle: {
                    type: "Array",
                    optionList: [{
                        label: Vue.$t('dotted'),
                        value: "dotted"
                    }, {
                        label: Vue.$t('dashed'),
                        value: "dashed"
                    }, {
                        label: Vue.$t('solid'),
                        value: "solid"
                    }]
                },
                borderColor: {
                    type: "ColorPicker"
                },
                backgroundColor: {
                    type: "ColorPicker"
                },
                borderRadius: {
                    type: "Number"
                },
                content: {
                    type: "Textarea",
                    clearable: true,
                    textarea: true,
                    maxlength: 5000,
                    rows: 8
                }
            }
        }];
    }
}
export default IvuBlock;