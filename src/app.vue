<style lang="less">
@import "./styles/index.less";
</style>

<template>
    <div :class="[prefixCls]">
        <div :class="[prefixCls + '-pannel']">
            <div :class="[prefixCls + '-pannel-bolder']">
                <div :class="[prefixCls + '-pannel-header']">
                    <i class="fa fa-file-text"></i> iForm
                </div>
                <div :class="[prefixCls + '-pannel-main']">
                    <div :class="[prefixCls + '-pannel-main-left']">
                        <div :class="[prefixCls + '-card']" v-for="componentGroup in componentGroupList">
                            <div :class="[prefixCls + '-card-header']">
                                <div :class="[prefixCls + '-card-header-title']" v-text="componentGroup.label">
    
                                </div>
                            </div>
                            <div :class="[prefixCls + '-card-content']">
                                <ul :class="[prefixCls + '-card-content-draggable-coms']">
                                    <draggable v-model="componentModel" :options="draggableOptions">
                                        <li :class="[prefixCls + '-card-content-draggable-com']" v-for="component in componentGroup.componentList" :type="component.type" :groupType="componentGroup.groupType">
                                            <i :class="component.icon"></i>
                                            <a v-text="component.label"></a>
                                        </li>
                                    </draggable>
                                </ul>
                            </div>
                        </div>
    
                    </div>
                    <div :class="[prefixCls + '-pannel-main-center']">
                        <div :class="[prefixCls + '-pannel-main-center-toolbar']">
                            <div :class="[prefixCls + '-pannel-main-center-toolbar-c']">
                                <ul>
    
                                    <li>
    
                                        <span>手机</span>
    
                                    </li>
                                    <li>
    
                                        <span>平板</span>
    
                                    </li>
                                    <li>
    
                                        <span>电脑</span>
    
                                    </li>
                                </ul>
                            </div>
                            <div :class="[prefixCls + '-pannel-main-center-toolbar-r']">
                                <ul>
                                    <li>
                                        运行
                                    </li>
                                    <li>
                                        <router-link to="/">
                                            设计
                                        </router-link>
                                    </li>
                                    <li @click="onPreview()">
                                        预览
                                    </li>
                                    <li @click="onPreview()">
                                        HTML
                                    </li>
                                    <li @click="onPreview()">
                                        javaScript
                                    </li>
                                     <li>
                                        <router-link to="code">
                                            数据
                                        </router-link>
                                    </li>
                                    
                                    <li @click="onClear()">
                                        清空
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div :class="[prefixCls + '-pannel-main-center-content']">
                            <div :class="[prefixCls + '-design']">
                                 <router-view></router-view>
                            </div>
                        </div>
                    </div>
                    <div :class="[prefixCls + '-pannel-main-right']">
                        <Tabs :value="comTabsValue" @on-click="onComTabsClick">
                            <TabPane label="组件属性" icon="md-hammer" name="comAttribute">
    
                                <div :class="[prefixCls + '-card margin-top-plus-16px']" v-for="group in componentActive.groupList">
                                    <div :class="[prefixCls + '-card-header']">
                                        <div :class="[prefixCls + '-card-header-title']" v-text="group.groupName">
                                        </div>
                                    </div>
                                    <div :class="[prefixCls + '-card-content padding-left-10px padding-right-10px padding-bottom-10px']">
                                        <i-form-attribute :component="componentActive" :comAttribute="group.children"></i-form-attribute>
                                    </div>
                                </div>
    
                            </TabPane>
                            <TabPane label="表单属性" icon="ios-paper" name="formAttribute">
                                <div :class="[prefixCls + '-card margin-top-plus-16px']" v-for="group in formAttributeGroupList  ">
                                    <div :class="[prefixCls + '-card-header']">
                                        <div :class="[prefixCls + '-card-header-title']" v-text="group.groupName">
                                        </div>
                                    </div>
                                    <div :class="[prefixCls + '-card-content padding-left-10px padding-right-10px padding-bottom-10px']">
                                        <com-attribute :comAttribute="group.children">
                                        </com-attribute>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import draggable from "vuedraggable";
import _ from "lodash";

import components from "./components/index";
import IFormAttribute from './views/iform-attribute.vue';

const prefixCls = 'iform';

export default {
    data: function() {
        return {

            ui: "iview",
            prefixCls: prefixCls,

            draggableOptions: {
                group: {
                    name: 'iform',
                    pull: 'clone',
                    put: false
                },
                ghostClass: prefixCls + "-item-move",
                animation: 150,
                sort: false
            },
            componentModel: [],

            componentGroupList: [],
            comAttributeGroupList: [],


            componentSelect: {
                formProps: {

                },
                componentList: []
            },

            formAttributeGroupList: [],

            comPreview: false,
            comTabsValue: 'comAttribute',

            comToolbar: {

            }
        };
    },
    computed: {
        componentActive() {
            return this.$store.state.componentActive
        }
    },
    created() {

        this.getComponents();
        //this.getFormAttributeGroupList();

    },
    mounted() {

    },
    methods: {

        getComponents() {

            let vm = this;

            _.mapKeys(components[this.ui], (value, key) => {

                var componentGroup = {
                    label: vm.$t(key),
                    groupType: key,
                    componentList: []
                };


                _.forEach(value, function(Component) {
                    componentGroup.componentList.push(new Component(vm));
                });

                vm.componentGroupList.push(componentGroup);

            });

        },
        getFormAttributeGroupList() {

            var ivuForm = new IvuForm();
            this.componentSelect.formProps = ivuForm.props;

            this.formAttributeGroupList = ivuForm.groupList;

        },
        getComAttributeGroupList(comAttributeGroupList) {


            this.comTabsValue = 'comAttribute';
            this.comAttributeGroupList = comAttributeGroupList;

        },
        onComTabsClick(name) {
            this.comTabsValue = name;
        },
        onClear() {

            this.componentSelect = {
                formProps: {

                },
                componentList: []
            };

            this.comPreview = false;
            this.comAttributeGroupList = [];
        },
        onPreview() {
            this.comPreview = !this.comPreview;
        },
        onExport() {

            this.comPreview = !this.comPreview;

        }

    },
    components: {
        draggable,
        IFormAttribute
    }
};
</script>