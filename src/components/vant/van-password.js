import Van from './van';
class VanPassword extends Van {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'VanPassword';

        this.layout = true;

        this.label = Vue.$t('vanPassword');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            info: "",
            "error-info": "",
            length: 6,
            gutter: 0,
            mask: false,
            focused : false,

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
                info: {
                    type: "String"
                },
                "error-info": {
                    type: "String"
                },
                length: {
                    type: "Number"
                },
                gutter: {
                    type: "Number"
                },
                mask: {
                    type: "Boolean"
                },
                focused : {
                    type: "Boolean"
                }
            }
        }];
    }
}

export default VanPassword;