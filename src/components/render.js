import _ from "lodash";

export default {
    IvuText: (h, props) => {
        return h('Input', {
            props: props,
            style: {
                width: props.width + '%'
            }
        });
    },
    IvuTextarea: (h, props) => {
        return h("Input", {
            props: props,
            style: {
                width: props.width + "%"
            }
        });
    },
    IvuAlert: (h, props) => {
        return h("Alert", {
            props: props
        }, [props.title, h("span", {
            slot: "desc"
        }, [props.desc])]);
    },
    IvuTextIcon: (h, props) => {
        return h('Input', {
            props: props,
            style: {
                width: props.width + '%'
            }
        });
    },
    IvuTextSearch: (h, props) => {
        return h('Input', {
            props: props,
            style: {
                width: props.width + '%'
            }
        });
    },
    IvuDatePicker: (h, props) => {
        return h("DatePicker", {
            props: props,
            style: {
                width: props.width + "%"
            }
        });
    },
    IvuSelect: (h, props) => {
        return h("Select", {
            props: props
        }, (function () {

            var optionList = [];

            _.mapKeys(props.optionList, (item) => {
                optionList.push(h("Option", {
                    props: {
                        label: item.label,
                        value: item.value,
                        key: item.value
                    },
                    key: item.value
                }));
            });

            return optionList;

        })());
    },
    IvuRate: (h, props) => {
        return h("Rate", {
            props: props
        });
    },
    IvuButton: (h, props) => {
        return h("Button", {
            props: props
        }, [props.buttonText]);
    },
    IvuDivider: (h, props) => {
        return h("Divider", {
            props: props
        }, [props.title]);
    },
    IvuCard: (h, props, vm) => {

        return h("Card", {
            props: props
        }, [
            h("IFormItemCreate", {
                props: {
                    componentList: props.componentList,
                    className: `iform-layout-form`
                },
                on: {
                    onAdd(component) {
                        vm.$emit('onAdd', component);
                    },
                    onUpdate() {
                        vm.$emit('onUpdate', component);
                    },
                    onChoose(component) {
                        vm.$emit('onChoose', component);
                    }
                }
            })
        ]);
    },
    IvuTabs: (h, props, vm) => {

        let tabList = [];

        _.mapKeys(props.tabs, (tab) => {
            tabList.push(h("TabPane", {
                props: {
                    label: tab.label,
                    name: tab.value,
                }
            }, [h("IFormItemCreate", {
                props: {
                    componentList: tab.componentList,
                    className: `iform-layout-form`
                },
                on: {
                    onAdd(component) {
                        vm.$emit('onAdd', component);
                    },
                    onUpdate() {
                        vm.$emit('onUpdate', component);
                    },
                    onChoose(component) {
                        vm.$emit('onChoose', component);
                    }
                }
            })]));
        });

        return h("Tabs", {
            props: props
        }, tabList);
    },
    IvuCollapse: (h, props, vm) => {

        let panelList = [];

        _.mapKeys(props.panelList, (panel) => {
            panelList.push(h("Panel", {
                props: {
                    name: panel.value,
                }
            }, [panel.label, [h("IFormItemCreate", {
                props: {
                    componentList: panel.componentList,
                    className: `iform-layout-form`
                },
                slot: "content",
                on: {
                    onAdd(component) {
                        vm.$emit('onAdd', component);
                    },
                    onUpdate() {
                        vm.$emit('onUpdate', component);
                    },
                    onChoose(component) {
                        vm.$emit('onChoose', component);
                    }
                }
            })]]));
        });

        return h("Collapse", {
            props: props
        }, panelList);
    },
    IvuGrid: (h, props, vm) => {

        let colList = [];

        _.mapKeys(props.colList, (col) => {
            colList.push(h("iCol", {
                props: {
                    span: col.label
                }
            }, [h("IFormItemCreate", {
                props: {
                    componentList: col.componentList,
                    className: `iform-layout-form`
                },
                on: {
                    onAdd(component) {
                        vm.$emit('onAdd', component);
                    },
                    onUpdate() {
                        vm.$emit('onUpdate', component);
                    },
                    onChoose(component) {
                        vm.$emit('onChoose', component);
                    }
                }
            })]));
        });

        return h("Row", {
            props: props
        }, colList);
    },
    IvuBlock: (h, props, vm) => {
        return h("div", {
            style: {
                padding: props.padding + "px",
                borderWidth: props.borderWidth + "px",
                borderStyle: props.borderStyle,
                borderColor: props.borderColor,
                backgroundColor: props.backgroundColor,
                borderRadius: props.borderRadius + "px"
            }
        }, [props.content, [h("IFormItemCreate", {
            props: {
                componentList: props.componentList,
                className: `iform-layout-form`
            },
            on: {
                onAdd(component) {
                    vm.$emit('onAdd', component);
                },
                onUpdate() {
                    vm.$emit('onUpdate', component);
                },
                onChoose(component) {
                    vm.$emit('onChoose', component);
                }
            }
        })]]);
    },
    IvuSwitch: (h, props) => {
        return h('iSwitch', {
            props: props
        });
    },
    VanButton: (h, props) => {
        return h('van-button', {
            props: props
        });
    },
    VanPassword: (h, props) => {
        return h('van-password-input', {
            props: props
        });
    },
    VanPicker: (h, props) => {
        return h("van-picker", {
            props: props
        });
    }
};