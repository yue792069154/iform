import Van from './van';
class vanPicker extends Van {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'VanPicker';

        this.layout = true;

        this.label = Vue.$t('vanPicker');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            title: "default",
            "confirm-button-text": "确认",
            "cancel-button-text": "取消",
            "toolbar-position": false,
            "show-toolbar": true,
            "allow-html": false,
            "value-key":"label",
           
            columns: [{
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
            }],

            dataType: "dataStatic",
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
                title: {
                    type: "String"
                },
                dataType: {
                    type: "Data",
                    field:"columns"
                },
                "confirm-button-text": {
                    type: "String"
                },
                "cancel-button-text": {
                    type: "String"
                },
                "show-toolbar": {
                    type: "Boolean"
                },
                "allow-html": {
                    type: "Boolean"
                }
            }
        }];
    }
}

export default vanPicker;