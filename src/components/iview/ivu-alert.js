const lang = require('../../../lang/index.js');

const Ivu = require('./ivu.js');

class IvuAlert extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuAlert';

        this.label = lang.ivuAlert;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            type: "info",
            closable: false,
            "show-icon": true,
            "show-desc": true,

            title: "An info prompt",
            desc: "Content of prompt. Content of prompt. Content of prompt. Content of prompt.",

            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("Alert", {
                props: props
            }, [props.title, h("span", {
                slot: "desc"
            }, [props.desc])]);
        };

        this.props = props;

        this.groupList = [{
            groupName: lang.basicAttr,
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.code = value;
                    }
                },
                type: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.info,
                        value: "info"
                    }, {
                        label: lang.success,
                        value: "success"
                    }, {
                        label: lang.warning,
                        value: "warning"
                    }, {
                        label: lang.error,
                        value: "error"
                    }],
                    onChange: function (option) {
                        props.type = option.value;
                    }
                },
                title: {
                    type: String,
                    props: props,
                    clearable: true,
                    textarea: true,
                    onChange: function (value) {
                        props.title = value;
                    }
                },
                desc: {
                    type: String,
                    props: props,
                    clearable: true,
                    textarea: true,
                    onChange: function (value) {
                        props.desc = value;
                    }
                },
                closable: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.closable = value;
                    }
                },
                "show-icon": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["show-icon"] = value;
                    }
                }
            }
        }];
    }
}

export default IvuAlert;