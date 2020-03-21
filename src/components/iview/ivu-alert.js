import Ivu from './ivu';
class IvuAlert extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuAlert';

        this.label = Vue.$t('ivuAlert');

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            type: "info",
            closable: false,
            "show-icon": true,
            "show-desc": true,

            title: "An info prompt",
            desc: "Content of prompt. Content of prompt. Content of prompt. Content of prompt.",

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
                        label: Vue.$t('info'),
                        value: "info"
                    }, {
                        label: Vue.$t('success'),
                        value: "success"
                    }, {
                        label: Vue.$t('warning'),
                        value: "warning"
                    }, {
                        label: Vue.$t('error'),
                        value: "error"
                    }]
                },
                title: {
                    type: "Textarea",
                    clearable: true,
                    textarea: true,
                    maxlength:100,
                    rows:2
                },
                desc: {
                    type: "Textarea",
                    clearable: true,
                    maxlength:1000,
                    rows:8
                },
                closable: {
                    type: "Boolean"
                },
                "show-icon": {
                    type: "Boolean"
                }
            }
        }];
    }
}

export default IvuAlert;