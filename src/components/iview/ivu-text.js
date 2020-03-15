import Ivu from "./ivu";
import _ from "lodash";
import regexList from "../../libs/regex";


class IvuText extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuText';

        this.label = Vue.$t('ivuText');

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            width: "100",
            type: "text",
            size: "large",
            placeholder: Vue.$t('pleaseInput'),
            clearable: false,
            disabled: false,
            readonly: false,
            maxlength: 36,
            value: null,

            label: self.label,
            code: self.getComponentCode(),

            regex: "",
            regexType: "regexBuilit",
            regexBuilit: null,
            regexCustom: null,
            regexMessage: "",

            required: false

        };

        this.render = (h) => {
            return h("Input", {
                props: props,
                style: {
                    width: props.width + "%"
                }
            });
        };

        this.props = props;

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.code = value;
                    }
                },
                label: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        self.label = value;
                        props.label = value;
                    }
                },
                width: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.width = value;
                    }
                },
                size: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: Vue.$t('large'),
                        value: "large"
                    }, {
                        label: Vue.$t('small'),
                        value: "small"
                    }, {
                        label: Vue.$t('default'),
                        value: "default"
                    }],
                    onChange: function (option) {
                        props.size = option.value;
                    }
                },
                placeholder: {
                    type: String,
                    props: props,
                    clearable: true,
                    onChange: function (value) {
                        props.placeholder = value;
                    }
                },
                defaultValue: {
                    type: String,
                    props: props,
                    clearable: true,
                    onChange: function (value) {
                        props.value = value;
                    }
                },
                clearable: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.clearable = value;
                    }
                },
                disabled: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.disabled = value;
                    }
                },
                readonly: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.readonly = value;
                    }
                }
            }
        }, {
            groupName: Vue.$t('validateAttr'),
            groupCode: 'validateAttr',
            children: {
                required: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.required = value;
                    }
                },
                maxlength: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.maxlength = value;
                    }
                },
                regexType: {
                    type: Array,
                    props: props,
                    render: "RadioGroup",
                    optionList: [{
                        label: Vue.$t('regexBuilit'),
                        value: "regexBuilit"
                    }, {
                        label: Vue.$t('regexCustom'),
                        value: "regexCustom"
                    }],
                    onChange: function (option) {

                        props.regexType = option.value;
                        props.regex = null;
                        props.regexMessage = null;
                        props.regexBuilit = null;
                        props.regexCustom = null;

                        switch (option.value) {

                            case "regexBuilit":
                                self.groupList[1].children.regexBuilit.display = "inherit";
                                self.groupList[1].children.regexCustom.display = "none";
                                break;

                            case "regexCustom":
                                self.groupList[1].children.regexBuilit.display = "none";
                                self.groupList[1].children.regexCustom.display = "inherit";
                                break;

                            default:

                                break;
                        }
                    }
                },
                regexBuilit: {
                    type: Array,
                    props: props,
                    label: false,
                    clearable: true,
                    optionList: regexList,
                    onChange: function (option) {
                        if (ObjectUtils.hasValue(option)) {
                            props.regexBuilit = option.value;
                            props.regex = option.value;
                            props.regexMessage = option.regexMessage;
                        }
                    }
                },
                regexCustom: {
                    type: String,
                    props: props,
                    label: false,
                    display: "none",
                    clearable: true,
                    onChange: function (value) {
                        props.regexCustom = value;
                        props.regex = value;
                    }
                },
                regexMessage: {
                    type: String,
                    textarea: true,
                    props: props,
                    clearable: true,
                    onChange: function (value) {
                        props.regexMessage = value;
                    }
                }
            }
        }];
    }
}

export default IvuText;