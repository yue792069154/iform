import Ivu from './ivu';
class IvuDatePicker extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuDatePicker';

        this.label = Vue.$t('ivuDatePicker');

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            width: 100,
            type: "date",
            size: "large",
            placeholder: Vue.$t('pleaseSelect'),
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

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: "String"
                },
                label: {
                    type: "String"
                },
                type: {
                    type: "Array",
                    optionList: [{
                        label: Vue.$t("date"),
                        value: "date",
                        format: "yyyy-MM-dd"
                    }, {
                        label: Vue.$t("daterange"),
                        value: "daterange",
                        format: "yyyy-MM-dd"
                    }, {
                        label: Vue.$t("datetime"),
                        value: "datetime",
                        format: "yyyy-MM-dd HH:mm:ss"
                    }, {
                        label: Vue.$t("datetimerange"),
                        value: "datetimerange",
                        format: "yyyy-MM-dd HH:mm:ss"
                    }, {
                        label: Vue.$t("year"),
                        value: "year",
                        format: "yyyy"
                    }, {
                        label: Vue.$t("month"),
                        value: "month",
                        format: "yyyy-MM"
                    }]
                },
                width: {
                    type: "Number"
                },
                size: {
                    type: 'Array',
                    render: 'Select',
                    optionList: [{
                        label: Vue.$t('large'),
                        value: 'large'
                    }, {
                        label: Vue.$t('small'),
                        value: 'small'
                    }, {
                        label: Vue.$t('default'),
                        value: 'default'
                    }]
                },
                placeholder: {
                    type: 'String',
                    clearable: true
                },
                value: {
                    type: 'String',
                    clearable: true
                },
                clearable: {
                    type: 'Boolean'
                },
                disabled: {
                    type: 'Boolean'
                },
                readonly: {
                    type: 'Boolean'
                }
            }
        }, {
            groupName: Vue.$t('validateAttr'),
            groupCode: 'validateAttr',
            children: {
                required: {
                    type: 'Boolean'
                }
            }
        }];
    }
}

export default IvuDatePicker;