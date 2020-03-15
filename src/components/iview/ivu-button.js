var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lang = require('../../../lang/index.js');

const lodash = require('comjs:lodash');

const Ivu = require('./ivu.js');

class IvuButton extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuButton';

        this.label = lang.ivuButton;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            type: "default",
            ghost: false,
            size: "large",
            shape: "",
            long: false,
            disabled: false,
            icon: "",
            "custom-icon": "",

            buttonText: "按钮",
            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("Button", {
                props: props
            }, [props.buttonText]);
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
                        label: "default",
                        value: "default"
                    }, {
                        label: "primary",
                        value: "primary"
                    }, {
                        label: "dashed",
                        value: "dashed"
                    }, {
                        label: "text",
                        value: "text"
                    }, {
                        label: "info",
                        value: "info"
                    }, {
                        label: "success",
                        value: "success"
                    }, {
                        label: "warning",
                        value: "warning"
                    }, {
                        label: "error",
                        value: "error"
                    }],
                    onChange: function (option) {
                        props.type = option.value;
                    }
                },

                size: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.large,
                        value: "large"
                    }, {
                        label: lang.small,
                        value: "small"
                    }, {
                        label: lang.default,
                        value: "default"
                    }],
                    onChange: function (option) {
                        props.size = option.value;
                    }
                },
                ghost: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.ghost = value;
                    }
                },
                long: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.long = value;
                    }
                },
                buttonText: {
                    type: String,
                    props: props,
                    clearable: true,
                    textarea: true,
                    onChange: function (value) {
                        props.buttonText = value;
                    }
                },
                disabled: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.disabled = value;
                    }
                },
                icon: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.icon = value;
                    }
                },
                "custom-icon": {
                    type: Function,
                    props: props,
                    render: "IconSelect",
                    onChange: function (icon) {
                        if (ObjectUtils.hasValue(icon)) {
                            props["custom-icon"] = icon.value;
                        } else {
                            props["custom-icon"] = null;
                        }
                    }
                }
            }
        }];
    }
}

module.exports = IvuButton;