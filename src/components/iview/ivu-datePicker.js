var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lodash = require('comjs:lodash');

const iconfont = require("comjs:iconfont-json");
require("comjs:font-awesome");
require("comjs:iconfont");

const lang = require('../../../lang/index.js');
const regexList = require('../../../utils/regex.js');
const Ivu = require('./ivu.js');

class IvuDatePicker extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuDatePicker';

        this.label = lang.ivuDatePicker;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            width: "100",
            type: "date",
            size: "large",
            placeholder: lang.pleaseSelect,
            clearable: false,
            disabled: false,
            readonly: false,
            multiple: false,
            format: "yyyy-MM-dd",
            showWeekNumbers: true,
            placement: 'bottom-start',
            editable: false,
            value: null,

            label: self.label,
            code: self.getComponentCode(),

            required: false

        };

        this.render = (h) => {
            return h("DatePicker", {
                props: props,
                style: {
                    width: props.width + "%"
                }
            });
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
                type: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.date,
                        value: "date",
                        format: "yyyy-MM-dd"
                    }, {
                        label: lang.daterange,
                        value: "daterange",
                        format: "yyyy-MM-dd"
                    }, {
                        label: lang.datetime,
                        value: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss"
                    }, {
                        label: lang.datetimerange,
                        value: "datetimerange",
                        format: "yyyy-MM-dd HH:mm:ss"
                    }, {
                        label: lang.year,
                        value: "year",
                        format: "yyyy"
                    }, {
                        label: lang.month,
                        value: "month",
                        format: "yyyy-MM"
                    }],
                    onChange: function (option) {
                        props.type = option.value;
                        props.format = option.format;
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

module.exports = IvuDatePicker;