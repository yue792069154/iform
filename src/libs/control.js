 import _ from "lodash";

 const size = "large";


 const handelEvent = function (propertyProps, value) {
     if (_.isFunction(propertyProps.onChange)) {
        propertyProps.onChange(value);
     }
 };

 const handelAddEvent = function (propertyProps) {
     if (_.isFunction(propertyProps.onAdd)) {
        propertyProps.onAdd();
     }
 };

 const handelClickEvent = function (propertyProps) {
     if (_.isFunction(propertyProps.onClick)) {
        propertyProps.onClick();
     }
 };


 export default {
     String: (h, propertyProps, propertyKey, componentProps) => {
         return h("Input", {
             props: {
                 size: size,
                 value: componentProps[propertyKey],
                 clearable: propertyProps.clearable || false,
                 type: propertyProps.textarea ? "textarea" : "text",
                 rows: 3
             },
             on: {
                 "on-change": (e) => {
                     handelEvent(propertyProps, e.target.value);
                 }
             }
         }, [
             (function () {
                 if (propertyProps.slot) {
                     return propertyProps.slotRender(h);
                 }
             })()
         ]);
     },
     Boolean: (h, propertyProps, propertyKey, componentProps) => {
         return h("Checkbox", {
             props: {
                 size: size,
                 value: componentProps[propertyKey],
             },
             on: {
                 "on-change": (value) => {
                     handelEvent(propertyProps, value);
                 }
             }
         });
     },
     Number: (h, propertyProps, propertyKey, componentProps) => {
         return h("InputNumber", {
             props: {
                 size: size,
                 value: componentProps[propertyKey],
                 min: propertyProps.min || 1,
                 max: propertyProps.max || 100
             },
             style: {
                 width: '100%'
             },
             on: {
                 "on-change": (value) => {
                     handelEvent(propertyProps, value);
                 }
             }
         });
     },
     Array: (h, propertyProps, propertyKey, componentProps) => {

         var optionList = [];

         switch (propertyProps.render) {
             case "RadioGroup":

                 _.mapKeys(propertyProps.optionList, (item) => {
                     optionList.push(h("Radio", {
                         props: {
                             label: item.value
                         }
                     }, [item.label]));
                 });

                 return h("RadioGroup", {
                     props: {
                         size: size,
                         type: "button",
                         value: componentProps[propertyKey],
                     },
                     on: {
                         "on-change": (value) => {
                             var option = _.find(propertyProps.optionList, function (option) {
                                 return option.value == value;
                             });
                             handelEvent(propertyProps, option);
                         },
                         "on-clear": () => {
                             handelEvent(propertyProps, null);
                         }
                     }
                 }, optionList);


             case "custom":

                 var renderRadio = function () {

                     if (propertyProps.renderRadio === false) {
                         return false;
                     }

                     return h("iCol", {
                         props: {
                             span: 2
                         }
                     }, [h("Radio", {
                         size: size,
                     })]);

                 };

                 var renderInput = function (option) {
                     return h("iCol", {
                         props: {
                             span: propertyProps.renderRadio === false ? 20 : 18
                         }
                     }, [(function () {

                         switch (propertyProps.renderType) {
                             case "InputNumber":
                                 return h("InputNumber", {
                                     props: {
                                         size: size,
                                         value: option.value,
                                         min: 1,
                                         max: 24
                                     },
                                     style: {
                                         width: '100%'
                                     },
                                     on: {
                                         "on-change": (value) => {
                                             option.value = value;
                                             handelEvent(propertyProps, propertyProps.optionList);
                                         }
                                     }
                                 });

                             default:
                                 return h("Input", {
                                     props: {
                                         size: size,
                                         value: option.label || option.title || option.value
                                     },
                                     on: {
                                         "on-change": (e) => {
                                             option.label = option.title = e.target.value;
                                             handelEvent(propertyProps, propertyProps.optionList);
                                         }
                                     }

                                 });
                         }

                     })()]);
                 };

                 var renderDelete = function (option, index) {
                     var self = this;
                     return h("iCol", {
                         props: {
                             span: 2
                         },
                         style: {
                             cursor: "pointer"
                         }
                     }, [h("Icon", {
                         props: {
                             type: "ios-trash",
                             size: "22",
                             color: "#F57A78"
                         },
                         on: {
                             click: function (e) {
                                 propertyProps.optionList.splice(index, 1);
                             }
                         }
                     })]);
                 };

                 var renderMove = function (option) {
                     return h("iCol", {
                         props: {
                             span: 2
                         },
                         style: {
                             cursor: "move"
                         },
                         class: "renderMove"
                     }, [h("Icon", {
                         props: {
                             type: "ios-list",
                             size: "24"
                         }
                     })]);
                 };

                 _.mapKeys(propertyProps.optionList, (option, index) => {
                     optionList.push(h("Row", {
                         props: {

                         },
                         style: {
                             cursor: "pointer",
                             marginBottom: "4px"
                         }
                     }, [renderRadio(option), renderInput(option), renderDelete(option, index), renderMove(option)]));
                 });

                 return h("div", {

                 }, [h("draggable", {
                     props: {
                         options: {
                             group: {
                                 name: 'psp-form-array'
                             },
                             animation: 150,
                             handle: ".renderMove"
                         }
                     },
                     on: {
                         update: function (e) {

                             var com = propertyProps.optionList[e.oldIndex];
                             propertyProps.optionList.splice(e.oldIndex, 1);
                             propertyProps.optionList.splice(e.newIndex, 0, com);

                         }
                     }
                 }, optionList), h("Row", {
                     props: {

                     }
                 }, [h("iCol", {
                     props: {
                         span: 24
                     }
                 }, [h("a", {
                     on: {
                         click: (e) => {

                             e.stopPropagation();

                             handelAddEvent(propertyProps);

                         }
                     },
                     style: {
                         fontSize: "16px",
                         cursor: "pointer"
                     }
                 }, [propertyProps.renderAction])])])]);

             default:

                 _.mapKeys(propertyProps.optionList, (option) => {
                     optionList.push(h("Option", {
                         props: {
                             value: option.value,
                             key: option.value,
                             label: option.label
                         }
                     }, [
                         (function () {
                             if (propertyProps.slot) {
                                 return propertyProps.slotRender(h, option);
                             }
                         })()
                     ]));
                 });

                 return h("Select", {
                     props: {
                         size: size,
                         value: componentProps[propertyKey],
                         filterable: propertyProps.filterable || true,
                         clearable: propertyProps.clearable || false
                     },
                     on: {
                         "on-change": (value) => {
                             var option = _.find(propertyProps.optionList, function (option) {
                                 return option.value == value;
                             });
                             handelEvent(propertyProps, option);
                         },
                         "on-clear": () => {
                             handelEvent(propertyProps, null);
                         }
                     }
                 }, optionList);
         }

     },
     Function: (h, propertyProps, propertyKey, componentProps) => {


         switch (propertyProps.render) {

             case "ColorPicker":

                 return h("ColorPicker", {
                     props: {
                         size: size,
                         value: componentProps[propertyKey],
                     },
                     on: {
                         "on-change": (e) => {
                             handelEvent(propertyProps, e);
                         }
                     }
                 });

             case "IconSelect":

                 return h("Input", {
                     props: {
                         size: size,
                         icon: "ios-more",
                         value: componentProps[propertyKey],
                     },
                     on: {
                         "on-click": (e) => {
                             iview.Modal.confirm({
                                 render: (h) => {
                                     return h('com-font', {
                                         on: {
                                             "onSelect": (icon) => {
                                                 handelEvent(propertyProps, icon);
                                                 iview.Modal.remove();
                                             }
                                         }
                                     });
                                 },
                                 closable: true,
                                 width: "700"
                             });
                         },
                         "on-change": (e) => {
                             handelEvent(propertyProps, {
                                 value: e.target.value
                             });
                         }
                     }
                 });
         }



     },
     Object: (h, propertyProps, propertyKey, componentProps) => {
         return h("Input", {
             props: {
                 size: size,
                 value: componentProps[propertyKey],
                 clearable: propertyProps.clearable || false
             },
             on: {
                 "on-change": (e) => {
                     handelEvent(propertyProps, e.target.value);
                 }
             }
         }, [
             (function () {
                 if (propertyProps.slot) {
                     return propertyProps.slotRender(h);
                 }
             })()
         ]);
     },
     Symbol: (h, propertyProps, propertyKey, componentProps) => {
         return h("Input", {
             props: {
                 size: size,
                 value: componentProps[propertyKey],
                 clearable: propertyProps.clearable || false
             },
             on: {
                 "on-change": (e) => {
                     handelEvent(propertyProps, e.target.value);
                 }
             }
         }, [
             (function () {
                 if (propertyProps.slot) {
                     return propertyProps.slotRender(h);
                 }
             })()
         ]);
     },
     Date: (h, propertyProps, propertyKey, componentProps) => {
         return h("DatePicker", {
             props: {
                 size: size
             },
             on: {
                 "on-change": (e) => {
                     handelEvent(propertyProps, value);
                 }
             }
         });
     }
 };