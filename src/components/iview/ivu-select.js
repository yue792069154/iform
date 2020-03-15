var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lodash = require('comjs:lodash');
const object = require('../../../utils/object.js');
const iconfont = require("comjs:iconfont-json");
require("comjs:font-awesome");
require("comjs:iconfont");

const lang = require('../../../lang/index.js');
const regexList = require('../../../utils/regex.js');
const Ivu = require('./ivu.js');

class IvuSelect extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuSelect';

        this.label = lang.ivuSelect;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            width: "100",
            type: "text",
            size: "large",
            placeholder: lang.pleaseSelect,
            clearable: false,
            disabled: false,
            readonly: false,
            filterable: true,

            value: null,

            label: self.label,
            code: self.getComponentCode(),

            required: false,

            dataType: "dataStatic",
            optionList: [{
                label: "选项1",
                value: "1"
            }, {
                label: "选项2",
                value: "2"
            }, {
                label: "选项3",
                value: "3"
            }]

        };

        this.render = (h) => {
            return h("Select", {
                props: props
            }, (function () {

                var optionList = [];

                lodash.mapKeys(props.optionList, (item) => {
                    optionList.push(h("Option", {
                        props: {
                            label: item.label,
                            value: item.value,
                            key: item.value
                        },
                        key: item.value
                    }));
                });

                return optionList;

            })());
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
                placeholder: {
                    type: String,
                    props: props,
                    clearable: true,
                    onChange: function (value) {
                        props.placeholder = value;
                    }
                },
                dataType: {
                    type: Array,
                    props: props,
                    render: "RadioGroup",
                    optionList: [{
                        label: lang.dataStatic,
                        value: "dataStatic"
                    }, {
                        label: lang.dataRemote,
                        value: "dataRemote"
                    }],
                    onChange: function (option) {

                        props.dataType = option.code;


                        switch (option.code) {

                            case "dataStatic":
                                self.groupList[0].children.dataStatic.display = "inherit";
                                self.groupList[0].children.dataRemote.display = "none";
                                break;

                            case "dataRemote":
                                self.groupList[0].children.dataStatic.display = "none";
                                self.groupList[0].children.dataRemote.display = "inherit";
                                break;

                            default:

                                break;
                        }

                    }
                },
                dataStatic: {
                    type: Array,
                    props: props,
                    render: "custom",
                    optionList: props.optionList,
                    label: false,
                    renderAction: lang.addItem,
                    onAdd: function () {
                        props.optionList.push({
                            label: lang.newItem,
                            value: object.getRandomCode(),
                            comList: []
                        });
                    }
                },
                dataRemote: {
                    type: Array,
                    props: props,
                    render: "custom",
                    label: false,
                    display: "none",
                },
                filterable: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.filterable = value;
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
            groupName: lang.validateAttr,
            groupCode: 'validateAttr',
            children: {
                required: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.required = value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuSelect;