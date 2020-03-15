 var fwCore = require("comjs:fw-core");
 var ObjectUtils = fwCore.util.ObjectUtils;
 const lodash = require('comjs:lodash');
 const lang = require('../../../lang/index.js');
 var render = require("../../../utils/render.js");
 const object = require('../../../utils/object.js');
 const Ivu = require('./ivu.js');

 class IvuGrid extends Ivu {

     constructor(coms) {

         super();

         var self = this;

         this.type = 'IvuGrid';

         this.label = lang.ivuGrid;

         this.layout = true;

         this.icon = 'fa fa-pencil-square-o';

         let props = {

             gutter: 0,
             align: null,
             justify: null,

             colList: [{
                 value: 12,
                 comList: []
             }, {
                 value: 12,
                 comList: []
             }],

             code: self.getComponentCode(),

         };

         this.render = (h, preview) => {

             let colList = [];

             lodash.mapKeys(props.colList, (col) => {
                 colList.push(h("iCol", {
                     props: {
                         span: col.value
                     },
                     key: object.getRandomCode()
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

                             lodash.forEach(col.comList, function (item) {
                                 item.active = false;
                             });

                             var com = new coms[self.ui][groupType][type](coms);

                             com.onGetComAttributeGroupList = function (groupList) {
                                 self.onGetComAttributeGroupList(groupList);
                             };

                             com.onGetComAttributeGroupList(com.groupList);

                             col.comList.splice(e.newIndex, 0, com);

                         },
                         update: function (e) {

                             var com = col.comList[e.oldIndex];
                             col.comList.splice(e.oldIndex, 1);
                             col.comList.splice(e.newIndex, 0, com);

                         }
                     },
                     class: preview ? "" : "psp-form-layout-form"
                 }, [col.comList.map(function (com) {
                     if (com.layout) {
                         return render.renderLayoutItem(h, com, col, preview);
                     } else {
                         return render.renderFormItem(h, com, col, preview);
                     }
                 })])]));
             });

             return h("Row", {
                 props: props
             }, colList);

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
                 gutter: {
                     type: Number,
                     props: props,
                     onChange: function (value) {
                         props.gutter = value;
                     }
                 },
                 cols: {
                     type: Array,
                     props: props,
                     render: "custom",
                     renderType: "InputNumber",
                     renderRadio: false,
                     renderAction: lang.addCol,
                     optionList: props.colList,
                     onAdd: function () {
                         props.colList.push({
                             value: 1,
                             comList: []
                         });
                     }
                 }
             }
         }];
     }
 }

 module.exports = IvuGrid;