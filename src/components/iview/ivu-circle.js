var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lang = require('../../../lang/index.js');

const lodash = require('comjs:lodash');

const iconfont = require("comjs:iconfont-json");
require("comjs:font-awesome");
require("comjs:iconfont");

const Ivu = require('./ivu.js');

class IvuCircle extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuCircle';

        this.label = lang.ivuCircle;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            percent: 20,
            size: 120,
            "stroke-linecap": "round",
            "stroke-width": 6,
            "stroke-color": "#2db7f5",
            "trail-width": 5,
            "trail-color": "#eaeef2",
            dashboard: false,

            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("iCircle", {
                props: props
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
                percent: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.percent = value;
                    }
                },
                size: {
                    type: Number,
                    props: props,
                    max: 500,
                    onChange: function (value) {
                        props.size = value;
                    }
                },
                "stroke-linecap": {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.square,
                        value: "square"
                    }, {
                        label: lang.round,
                        value: "round"
                    }],
                    onChange: function (option) {
                        props["stroke-linecap"] = option.value;
                    }
                },
                "stroke-width": {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props["stroke-width"] = value;
                    }
                },
                "stroke-color": {
                    type: Function,
                    props: props,
                    render: "ColorPicker",
                    onChange: function (value) {
                        props["stroke-color"] = value;
                    }
                },
                "trail-width": {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props["trail-width"] = value;
                    }
                },
                "trail-color": {
                    type: Function,
                    props: props,
                    render: "ColorPicker",
                    onChange: function (value) {
                        props["trail-color"] = value;
                    }
                },
                dashboard: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.dashboard = value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuCircle;