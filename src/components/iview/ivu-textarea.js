 import Ivu from "./ivu";
 import regexList from "../../libs/regex";

 class IvuTextarea extends Ivu {

     constructor(Vue) {

         super();

         var self = this;

         this.type = 'IvuTextarea';

         this.label = Vue.$t('ivuTextarea');

         this.icon = 'fa fa-pencil-square-o';

         let props = {

             width: "100",
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

             regex: "",
             regexType: "regexBuilit",
             regexBuilit: null,
             regexCustom: null,
             regexMessage: "",

             required: false

         };

         this.render = (h) => {
             return h("Input", {
                 props: props,
                 style: {
                     width: props.width + "%"
                 }
             });
         };

         this.props = props;

         this.groupList = [{
             groupName: Vue.$t('basicAttr'),
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
                 width: {
                     type: Number,
                     props: props,
                     onChange: function (value) {
                         props.width = value;
                     }
                 },
                 size: {
                     type: Array,
                     props: props,
                     optionList: [{
                         label: Vue.$t('large'),
                         value: "large"
                     }, {
                         label: Vue.$t('small'),
                         value: "small"
                     }, {
                         label: Vue.$t('default'),
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
                 rows: {
                     type: Number,
                     props: props,
                     max: 20,
                     onChange: function (value) {
                         props.rows = value;
                     }
                 },
                 defaultValue: {
                     type: String,
                     props: props,
                     clearable: true,
                     onChange: function (value) {
                         props.value = value;
                     }
                 },
                 clearable: {
                     type: Boolean,
                     props: props,
                     onChange: function (value) {
                         props.clearable = value;
                     }
                 },
                 disabled: {
                     type: Boolean,
                     props: props,
                     onChange: function (value) {
                         props.disabled = value;
                     }
                 },
                 readonly: {
                     type: Boolean,
                     props: props,
                     onChange: function (value) {
                         props.readonly = value;
                     }
                 }
             }
         }, {
             groupName: Vue.$t('validateAttr'),
             groupCode: 'validateAttr',
             children: {
                 required: {
                     type: Boolean,
                     props: props,
                     onChange: function (value) {
                         props.required = value;
                     }
                 },
                 maxlength: {
                     type: Number,
                     props: props,
                     onChange: function (value) {
                         props.maxlength = value;
                     }
                 },
                 regexType: {
                     type: Array,
                     props: props,
                     render: "RadioGroup",
                     optionList: [{
                         label: Vue.$t('regexBuilit'),
                         value: "regexBuilit"
                     }, {
                         label: Vue.$t('regexCustom'),
                         value: "regexCustom"
                     }],
                     onChange: function (option) {

                         props.regexType = option.value;
                         props.regex = null;
                         props.regexMessage = null;
                         props.regexBuilit = null;
                         props.regexCustom = null;

                         switch (option.value) {

                             case "regexBuilit":
                                 self.groupList[1].children.regexBuilit.display = "inherit";
                                 self.groupList[1].children.regexCustom.display = "none";
                                 break;

                             case "regexCustom":
                                 self.groupList[1].children.regexBuilit.display = "none";
                                 self.groupList[1].children.regexCustom.display = "inherit";
                                 break;

                             default:

                                 break;
                         }
                     }
                 },
                 regexBuilit: {
                     type: Array,
                     props: props,
                     label: false,
                     clearable: true,
                     optionList: regexList,
                     onChange: function (value) {
                         if (ObjectUtils.hasValue(value)) {
                             props.regexBuilit = option.value;
                             props.regex = option.value;
                             props.regexMessage = option.regexMessage;
                         }
                     }
                 },
                 regexCustom: {
                     type: String,
                     props: props,
                     label: false,
                     display: "none",
                     clearable: true,
                     onChange: function (value) {
                         props.regexCustom = value;
                         props.regex = value;
                     }
                 },
                 regexMessage: {
                     type: String,
                     props: props,
                     clearable: true,
                     onChange: function (value) {
                         props.regexMessage = value;
                     }
                 }
             }
         }];
     }
 }

 export default IvuTextarea;