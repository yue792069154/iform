const prefixCls = 'iform';

import _ from "lodash";
import IvuRender from "../components/iview/ivu-render";
import  '../styles/common/iconfont/iconfont.css';

const renderTools = function (h, com, comSelect) {
    return [IvuRender[com.type](h, com.props), (function () {
        if (com.active) {
            return h("div", {
                class: prefixCls + '-item-bottom-tools'
            }, [
                h("Icon", {
                    props: {
                        type: "ios-copy-outline"
                    },
                    nativeOn: {
                        click: (e) => {

                            e.stopPropagation();

                            var index = _.findIndex(comSelect.comList, function (item) {
                                return item.key == com.key;
                            });

                            comSelect.comList.splice(index, 1);

                        }
                    }
                }),
                h("Icon", {
                    props: {
                        type: "ios-trash-outline"
                    },
                    nativeOn: {
                        click: (e) => {

                            e.stopPropagation();

                            var index = _.findIndex(comSelect.comList, function (item) {
                                return item.key == com.key;
                            });

                            comSelect.comList.splice(index, 1);

                        }
                    }
                })
            ]);
        }
    })()];
};

const renderFormItem = function (h, com, comSelect, preview) {
    if (preview) {
        return renderPreviewFormItem(h, com);
    } else {
        return h("FormItem", {
            props: {
                label: com.props.label
            },
            class: com.active ? prefixCls + '-item' + ' ' + prefixCls + '-item-active' : prefixCls + '-item',
            key: com.key
        }, renderTools(h, com, comSelect));
    }
};

const renderPreviewFormItem = function (h, com) {
    return h("FormItem", {
        props: {
            label: com.props.label
        },
        key: com.key
    }, [com.render(h, true)]);
};

const renderLayoutItem = function (h, com, comSelect, preview) {

    if (preview) {
        return renderPreviewLayoutItem(h, com);
    } else {
        return h("div", {
            class: com.active ? prefixCls + '-item' + ' ' + prefixCls + '-item-active' : prefixCls + '-item',
            key: com.key
        }, renderTools(h, com, comSelect));
    }

};

const renderPreviewLayoutItem = function (h, com) {
    return h("div", {
        key: com.key
    }, [com.render(h, true)]);
};

export default {
    renderTools,
    renderFormItem,
    renderLayoutItem,
    renderPreviewFormItem,
    renderPreviewLayoutItem
};