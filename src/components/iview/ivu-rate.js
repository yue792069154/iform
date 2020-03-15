var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lang = require('../../../lang/index.js');

const lodash = require('comjs:lodash');

const iconfont = require("comjs:iconfont-json");
require("comjs:font-awesome");
require("comjs:iconfont");

const Ivu = require('./ivu.js');

class IvuRate extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuRate';

        this.label = lang.ivuRate;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            count: 5,
            "allow-half": false,
            disabled: false,
            "show-text": false,
            clearable: false,
            character: "",
            icon: "",
            "custom-icon": "",

            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("Rate", {
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
                count: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.count = value;
                    }
                },
                "allow-half": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["allow-half"] = value;
                    }
                },
                disabled: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.disabled = value;
                    }
                },
                "show-text": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["show-text"] = value;
                    }
                },
                clearable: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.clearable = value;
                    }
                },
                character: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.character = value;
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
                    type: Array,
                    props: props,
                    filterable: true,
                    clearable: true,
                    optionList: function () {
                        var iconList = [];
                        lodash.forEach(iconfont.glyphs, function (icon) {
                            iconList.push({
                                label: icon.name,
                                value: "icon iconfont icon" + icon.font_class
                            });
                        });
                        return iconList;
                    }(),
                    slot: true,
                    slotRender: function (h, item) {
                        return h("div", [
                            h("span", {
                                class: item.code,
                                style: {
                                    marginRight: "6px"
                                }
                            }),
                            h("span", item.name)
                        ]);
                    },
                    onChange: function (option) {
                        if (ObjectUtils.hasValue(option)) {
                            props["custom-icon"] = option.value;
                        } else {
                            props["custom-icon"] = null;
                        }
                    }
                }
            }
        }];
    }
}

module.exports = IvuRate;