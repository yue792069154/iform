 import Ivu from "./ivu";
 class IvuTextarea extends Ivu {

     constructor(Vue) {

         super();

         var self = this;

         this.type = 'IvuTextarea';

         this.label = Vue.$t('ivuTextarea');

         this.icon = 'fa fa-pencil-square-o';

         this.props = {

             width: 100,
             type: "textarea",
             size: "large",
             placeholder: Vue.$t('pleaseInput'),
             clearable: false,
             disabled: false,
             readonly: false,
             maxlength: 200,
             rows: 5,
             value: null,

             label: self.label,
             code: self.getComponentCode(),

             rule: '',
             ruleType: 'regexBuilit',
             ruleMessage: '',

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
                 rows: {
                     type: "Number",
                     min: 2,
                     max: 20
                 },
                 value: {
                     type: "String",
                     clearable: true
                 },
                 clearable: {
                     type: "Boolean"
                 },
                 disabled: {
                     type: "Boolean"
                 },
                 readonly: {
                     type: "Boolean"
                 }
             }
         }, {
             groupName: Vue.$t('validateAttr'),
             groupCode: 'validateAttr',
             children: {
                 required: {
                     type: "Boolean"
                 },
                 maxlength: {
                     type: "Number"
                 },
                 rule: {
                    type: 'Rule',
                }
             }
         }];
     }
 }

 export default IvuTextarea;