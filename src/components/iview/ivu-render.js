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
    }
};