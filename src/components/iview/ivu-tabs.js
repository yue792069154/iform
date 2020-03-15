var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lodash = require('comjs:lodash');
const lang = require('../../../lang/index.js');
var render = require("../../../utils/render.js");
const object = require('../../../utils/object.js');
const Ivu = require('./ivu.js');

class IvuTabs extends Ivu {

    constructor(coms) {

        super();

        var self = this;

        this.type = 'IvuTabs';

        this.label = lang.ivuTabs;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            type: "card",
            size: "large",
            closable: false,
            animated: true,
            "capture-focus": false,

            tabList: [{
                label: "标签1",
                value: "1",
                comList: []
            }, {
                label: "标签2",
                value: "2",
                comList: []
            }],

            code: self.getComponentCode(),

        };

        this.render = (h, preview) => {

            let tabList = [];

            lodash.mapKeys(props.tabList, (tab) => {
                tabList.push(h("TabPane", {
                    props: {
                        label: tab.label,
                        name: tab.value,
                    }
                }, [h("draggable", {
                    props: {
                        options: {
                            group: {
                                name: 'psp-form'
                            },
                            ghostClass: "psp-form-item-move",
                            animation: 150
                        }
                    },
                    on: {
                        add: function (e) {


                            var groupType = e.item.attributes.groupType.value;
                            var type = e.item.attributes.type.value;

                            lodash.forEach(tab.comList, function (item) {
                                item.active = false;
                            });

                            var com = new coms[self.ui][groupType][type](coms);

                            com.onGetComAttributeGroupList = function (groupList) {
                                self.onGetComAttributeGroupList(groupList);
                            };

                            com.onGetComAttributeGroupList(com.groupList);

                            tab.comList.splice(e.newIndex, 0, com);

                        }
                    },
                    class: preview ? "" : "psp-form-layout-form"
                }, [tab.comList.map(function (com) {

                    if (com.layout) {
                        return render.renderLayoutItem(h, com, tab, preview);
                    } else {
                        return render.renderFormItem(h, com, tab, preview);
                    }
                })])]));
            });

            return h("Tabs", {
                props: props
            }, tabList);
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

                type: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.line,
                        value: "line"
                    }, {
                        label: lang.card,
                        value: "card"
                    }],
                    onChange: function (option) {

                        props.type = option.value;

                        if (props.type == "card") {
                            self.groupList[0].children.closable.display = "inherit";
                        } else {
                            self.groupList[0].children.closable.display = "none";
                            props.closable = false;
                        }

                    }
                },
                tabs: {
                    type: Array,
                    props: props,
                    render: "custom",
                    optionList: props.tabList,
                    renderAction: lang.addTab,
                    onAdd: function () {
                        props.tabList.push({
                            label: lang.newTab,
                            value: object.getRandomCode(),
                            comList: []
                        });
                    }
                },
                closable: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.closable = value;
                    }
                },
                animated: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.animated = value;
                    }
                },
                "capture-focus": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["capture-focus"] = value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuTabs;