const lang = require('../../../lang/index.js');
const lodash = require('comjs:lodash');
var render = require("../../../utils/render.js");
const Ivu = require('./ivu.js');


class IvuBlock extends Ivu {

    constructor(coms) {

        super();

        var self = this;

        this.type = 'IvuBlock';

        this.label = lang.ivuBlock;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            comList: [],
            padding: "10",
            borderWidth: "1",
            borderStyle: "solid",
            borderColor: "gray",
            backgroundColor: "",
            borderRadius: "0",
            code: self.getComponentCode(),

        };

        this.render = (h, preview) => {
            return h("div", {
                props: props,
                style: {
                    padding: props.padding + "px",
                    borderWidth: props.borderWidth + "px",
                    borderStyle: props.borderStyle,
                    borderColor: props.borderColor,
                    backgroundColor: props.backgroundColor,
                    borderRadius: props.borderRadius + "px"
                }
            }, [h("draggable", {
                props: {
                    options: {
                        group: {
                            name: 'psp-form'
                        },
                        animation: 150
                    }
                },
                on: {
                    add: function (e) {

                        var groupType = e.item.attributes.groupType.value;
                        var type = e.item.attributes.type.value;

                        lodash.forEach(props.comList, function (item) {
                            item.active = false;
                        });

                        var com = new coms[self.ui][groupType][type](coms);

                        com.onGetComAttributeGroupList = function (groupList) {
                            self.onGetComAttributeGroupList(groupList);
                        };

                        com.onGetComAttributeGroupList(com.groupList);

                        props.comList.splice(e.newIndex, 0, com);

                    },
                    update: function (e) {

                        var com = props.comList[e.oldIndex];
                        props.comList.splice(e.oldIndex, 1);
                        props.comList.splice(e.newIndex, 0, com);

                    }
                },
                class: preview ? "" : "psp-form-layout-form"
            }, [props.comList.map(function (com) {
                if (com.layout) {
                    return render.renderLayoutItem(h, com, props, preview);
                } else {
                    return render.renderFormItem(h, com, props, preview);
                }
            })])]);
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
                padding: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.padding = value;
                    }
                },
                borderWidth: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.borderWidth = value;
                    }
                },
                borderStyle: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.dotted,
                        value: "dotted"
                    }, {
                        label: lang.dashed,
                        value: "dashed"
                    }, {
                        label: lang.solid,
                        value: "solid"
                    }],
                    onChange: function (option) {
                        props.borderStyle = option.value;
                    }
                },
                borderColor: {
                    type: Function,
                    props: props,
                    render: "ColorPicker",
                    onChange: function (value) {
                        props.borderColor = value;
                    }
                },
                backgroundColor: {
                    type: Function,
                    props: props,
                    render: "ColorPicker",
                    onChange: function (value) {
                        props.backgroundColor = value;
                    }
                },
                borderRadius: {
                    type: Number,
                    props: props,
                    onChange: function (value) {
                        props.borderRadius = value;
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
            }
        }];
    }
}

module.exports = IvuBlock;