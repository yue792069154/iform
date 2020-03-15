var fwCore = require("comjs:fw-core");
var ObjectUtils = fwCore.util.ObjectUtils;

const lang = require('../../../lang/index.js');
const Ivu = require('./ivu.js');

class IvuForm extends Ivu {

    constructor() {

        super();

        let props = {
            labelPosition: "right",
            labelWidth: "100",
            labelSymbol: ""
        };

        this.props = props;

        this.groupList = [{
            groupName: lang.basicAttr,
            groupCode: 'basicAttr',
            children: {
                labelPosition: {
                    type: Array,
                    props: props,
                    render: "RadioGroup",
                    optionList: [{
                        label: lang.alignLeft,
                        value: "left"
                    }, {
                        label: lang.alignTop,
                        value: "top"
                    }, {
                        label: lang.alignRight,
                        value: "right"
                    }],
                    onChange: function (option) {
                        if (ObjectUtils.hasValue(option)) {
                            props.labelPosition = option.value;
                            if (props.labelPosition == "top") {
                                props.labelWidth = null;
                            } else {
                                props.labelWidth = 100;
                            }
                        }
                    }
                },
                labelWidth: {
                    type: Number,
                    props: props,
                    max: 600,
                    onChange: function (value) {
                        props.labelWidth = value;
                    }
                },
                labelSymbol: {
                    type: String,
                    props: props,
                    onChange: function (value) {
                        props.labelSymbol = value;
                    }
                }
            },
            
        },{
            groupName: lang.highAttr,
            groupCode: 'highAttr', 
            children:{
                service: {
                    type: Array,
                    props: props,
                    render: "RadioGroup",
                    optionList: [{
                        label: lang.builtService,
                        value: "builtService"
                    }, {
                        label: lang.remoteService,
                        value: "remoteService"
                    }],
                    onChange: function (option) {
                        props.size = option.value;
                    }
                }
            }
        }];
    }
}

module.exports = IvuForm;