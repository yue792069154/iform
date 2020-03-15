const lang = require('../../../lang/index.js');
const lodash = require('comjs:lodash');
var render = require("../../../utils/render.js");
const object = require('../../../utils/object.js');
const Ivu = require('./ivu.js');

class IvuCollapse extends Ivu {

    constructor(coms) {

        super();

        var self = this;

        this.type = 'IvuCollapse';

        this.label = lang.ivuCollapse;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            accordion: false,
            simple: false,


            panelList: [{
                name: "折叠面板1",
                code: 1,
                comList: []
            }, {
                name: "折叠面板2",
                code: 2,
                comList: []
            }],

            code: self.getComponentCode(),

        };

        this.render = (h,preview) => {

            let panelList = [];


            lodash.forEach(props.panelList, function (panel) {

                panelList.push(h("Panel", {
                    props: {
                        name: panel.code
                    }
                }, [panel.name, [h("draggable", {
                    props: {
                        options: {
                            group: {
                                name: 'psp-form'
                            },
                            animation: 150
                        }
                    },
                    slot: 'content',
                    on: {
                        add: function (e) {

                            var groupType = e.item.attributes.groupType.value;
                            var type = e.item.attributes.type.value;

                            lodash.forEach(panel.comList, function (item) {
                                item.active = false;
                            });

                            var com = new coms[self.ui][groupType][type](coms);

                            com.onGetComAttributeGroupList = function (groupList) {
                                self.onGetComAttributeGroupList(groupList);
                            };

                            com.onGetComAttributeGroupList(com.groupList);

                            panel.comList.splice(e.newIndex, 0, com);

                        },
                        update: function (e) {

                            var com = panel.comList[e.oldIndex];
                            panel.comList.splice(e.oldIndex, 1);
                            panel.comList.splice(e.newIndex, 0, com);

                        }
                    },
                    class: preview ? "" : "psp-form-layout-form"
                }, [panel.comList.map(function (com) {
                    if (com.layout) {
                        return render.renderLayoutItem(h, com, panel,preview);
                    } else {
                        return render.renderFormItem(h, com, panel,preview);
                    }
                })])]]));

            });

            return h("Collapse", {
                props: props,
                on: {
                    "on-change": function (e) {
                        
                    }
                }
            }, panelList);
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
                accordion: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.accordion = value;
                    }
                },
                simple: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.simple = value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuCollapse;