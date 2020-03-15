var VuePage = require("../../../common/basePage/vuePage.js");
var iview = require("comjs:iview");
require("comjs:iconfont");
const lang = require('../lang/index.js');
const object = require('./object.js');
require('../components/index.js');

var fw = VuePage.fw;
var OpenTypeEnum = fw.core.protocol.OpenTypeEnum;

var lodash = fw.core.Utils.lodash;

const size = "large";


const handelEvent = function (property, value) {
    if (lodash.isFunction(property.onChange)) {
        property.onChange(value);
    }
};

const handelAddEvent = function (property) {
    if (lodash.isFunction(property.onAdd)) {
        property.onAdd();
    }
};

const handelClickEvent = function (property) {
    if (lodash.isFunction(property.onClick)) {
        property.onClick();
    }
};


export default  {
    String: (h, property, propertyName) => {
        return h("Input", {
            props: {
                size: size,
                value: property.props[propertyName],
                clearable: property.clearable || false,
                type: property.textarea ? "textarea" : "text",
                rows: 3
            },
            on: {
                "on-change": (e) => {
                    handelEvent(property, e.target.value);
                }
            }
        }, [
            (function () {
                if (property.slot) {
                    return property.slotRender(h);
                }
            })()
        ]);
    },
    Boolean: (h, property, propertyName) => {
        return h("Checkbox", {
            props: {
                size: size,
                value: property.props[propertyName]
            },
            on: {
                "on-change": (value) => {
                    handelEvent(property, value);
                }
            }
        });
    },
    Number: (h, property, propertyName) => {
        return h("InputNumber", {
            props: {
                size: size,
                value: property.props[propertyName],
                min: property.min || 1,
                max: property.max || 100
            },
            style: {
                width: '100%'
            },
            on: {
                "on-change": (value) => {
                    handelEvent(property, value);
                }
            }
        });
    },
    Array: (h, property, propertyName) => {

        var optionList = [];

        switch (property.render) {
            case "RadioGroup":

                lodash.mapKeys(property.optionList, (item) => {
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
                        value: property.props[propertyName]
                    },
                    on: {
                        "on-change": (value) => {
                            var option = lodash.find(property.optionList, function (option) {
                                return option.value == value;
                            });
                            handelEvent(property, option);
                        },
                        "on-clear": () => {
                            handelEvent(property, null);
                        }
                    }
                }, optionList);


            case "custom":

                var renderRadio = function () {

                    if (property.renderRadio === false) {
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
                            span: property.renderRadio === false ? 20 : 18
                        }
                    }, [(function () {

                        switch (property.renderType) {
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
                                            handelEvent(property, property.optionList);
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
                                            handelEvent(property, property.optionList);
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
                                property.optionList.splice(index, 1);
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

                lodash.mapKeys(property.optionList, (option, index) => {
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

                            var com = property.optionList[e.oldIndex];
                            property.optionList.splice(e.oldIndex, 1);
                            property.optionList.splice(e.newIndex, 0, com);

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

                            handelAddEvent(property);

                        }
                    },
                    style: {
                        fontSize: "16px",
                        cursor: "pointer"
                    }
                }, [property.renderAction])])])]);

            default:

                lodash.mapKeys(property.optionList, (option) => {
                    optionList.push(h("Option", {
                        props: {
                            value: option.value,
                            key: option.value,
                            label: option.label
                        }
                    }, [
                        (function () {
                            if (property.slot) {
                                return property.slotRender(h, option);
                            }
                        })()
                    ]));
                });

                return h("Select", {
                    props: {
                        size: size,
                        value: property.props[propertyName],
                        filterable: property.filterable || true,
                        clearable: property.clearable || false
                    },
                    on: {
                        "on-change": (value) => {
                            var option = lodash.find(property.optionList, function (option) {
                                return option.value == value;
                            });
                            handelEvent(property, option);
                        },
                        "on-clear": () => {
                            handelEvent(property, null);
                        }
                    }
                }, optionList);
        }

    },
    Function: (h, property, propertyName) => {


        switch (property.render) {

            case "ColorPicker":

                return h("ColorPicker", {
                    props: {
                        size: size,
                        value: property.props[propertyName]
                    },
                    on: {
                        "on-change": (e) => {
                            handelEvent(property, e);
                        }
                    }
                });

            case "IconSelect":

                return h("Input", {
                    props: {
                        size: size,
                        icon: "ios-more",
                        value: property.props[propertyName]
                    },
                    on: {
                        "on-click": (e) => {
                            iview.Modal.confirm({
                                render: (h) => {
                                    return h('com-font', {
                                        on: {
                                            "onSelect": (icon) => {
                                                handelEvent(property, icon);
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
                            handelEvent(property, {
                                value: e.target.value
                            });
                        }
                    }
                });
        }



    },
    Object: (h, property, propertyName) => {
        return h("Input", {
            props: {
                size: size,
                value: property.props[propertyName],
                clearable: property.clearable || false
            },
            on: {
                "on-change": (e) => {
                    handelEvent(property, e.target.value);
                }
            }
        }, [
            (function () {
                if (property.slot) {
                    return property.slotRender(h);
                }
            })()
        ]);
    },
    Symbol: (h, property, propertyName) => {
        return h("Input", {
            props: {
                size: size,
                value: property.props[propertyName],
                clearable: property.clearable || false
            },
            on: {
                "on-change": (e) => {
                    handelEvent(property, e.target.value);
                }
            }
        }, [
            (function () {
                if (property.slot) {
                    return property.slotRender(h);
                }
            })()
        ]);
    },
    Date: (h, property, propertyName) => {
        return h("DatePicker", {
            props: {
                size: size
            },
            on: {
                "on-change": (e) => {
                    handelEvent(property, value);
                }
            }
        });
    }
};