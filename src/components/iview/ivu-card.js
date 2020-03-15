var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;
const lodash = require('comjs:lodash');
const lang = require('../../../lang/index.js');
var render = require("../../../utils/render.js");
const Ivu = require('./ivu.js');

class IvuCard extends Ivu {

    constructor(coms) {

        super();

        var self = this;

        this.type = 'IvuCard';

        this.label = lang.ivuCard;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            title: lang.ivuCard,
            bordered: true,
            "dis-hover": false,
            shadow: false,
            padding: 16,

            label: self.label,
            code: self.getComponentCode(),
            comList: []
        };

        this.render = (h,preview) => {

            return h("Card", {
                props: props
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
                return h("div", [(function () {
                    if (com.layout) {
                        return render.renderLayoutItem(h, com, props,preview);
                    } else {
                        return render.renderFormItem(h, com, props,preview);
                    }

                })()]);
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
                title: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.title = value;
                    }
                },
                bordered: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.bordered = value;
                    }
                },
                "dis-hover": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["dis-hover"] = value;
                    }
                },
                shadow: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.shadow = value;
                    }
                },
                padding: {
                    type: Number,
                    props: props,
                    min: 0,
                    onChange: function (value) {
                        props.padding = value;
                    }
                }

            }
        }];
    }
}

module.exports = IvuCard;