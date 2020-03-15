const lang = require('../../../lang/index.js');
const Ivu = require('./ivu.js');

class IvuDivider extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuDivider';

        this.label = lang.ivuDivider;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            title: lang.ivuDivider,
            type: "horizontal",
            orientation: "center",
            dashed: false,
            size: "default",

            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("Divider", {
                props: props
            }, [props.title]);
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
                        props.title = value;
                    }
                },
                type: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.horizontal,
                        value: "horizontal"
                    }, {
                        label: lang.vertical,
                        value: "vertical"
                    }],
                    onChange: function (option) {
                        props.type = option.value;
                    }
                },
                orientation: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.left,
                        value: "left"
                    }, {
                        label: lang.right,
                        value: "right"
                    }, {
                        label: lang.center,
                        value: "center"
                    }],
                    onChange: function (option) {
                        props.orientation = option.value;
                    }
                },
                dashed: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.dashed = value;
                    }
                },
                size: {
                    type: Array,
                    props: props,
                    optionList: [{
                        label: lang.small,
                        value: "small"
                    }, {
                        label: lang.default,
                        value: "default"
                    }],
                    onChange: function (option) {
                        props.size = option.value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuDivider;