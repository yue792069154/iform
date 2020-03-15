const lang = require('../../../lang/index.js');
const object = require('../../../utils/object.js');
const Ivu = require('./ivu.js');

class IvuTable extends Ivu {

    constructor() {

        super();

        var self = this;

        this.type = 'IvuTable';

        this.label = lang.ivuTable;

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        let props = {

            width: "",
            height: "",
            columns: [],
            stripe: false,
            border: false,
            "show-header": true,

            label: self.label,
            code: self.getComponentCode(),

        };

        this.render = (h) => {
            return h("Table", {
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
                        props.title = value;
                    }
                },
                columns: {
                    type: Array,
                    props: props,
                    render: "custom",
                    optionList: props.columns,
                    renderAction: lang.addItem,
                    renderRadio: false,
                    onAdd: function () {
                        props.columns.push({
                            title: lang.newItem,
                            key: object.getRandomCode(),
                            comList: []
                        });
                    }
                },
                width: {
                    type: Number,
                    props: props,
                    max: 500,
                    onChange: function (value) {
                        props.width = value;
                    }
                },
                height: {
                    type: Number,
                    props: props,
                    max: 500,
                    onChange: function (value) {
                        props.height = value;
                    }
                },

                stripe: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.stripe = value;
                    }
                },
                border: {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props.border = value;
                    }
                },
                "show-header": {
                    type: Boolean,
                    props: props,
                    onChange: function (value) {
                        props["show-header"] = value;
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

module.exports = IvuTable;