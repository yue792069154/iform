import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'view-design/src/locale/lang/zh-CN';
import enLocale from 'view-design/src/locale/lang/en-US';

import Vant from 'vant';
import 'vant/lib/index.css';

import JSONView from 'vue-json-viewer';
Vue.use(JSONView);

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(ViewUI);
Vue.use(Vant);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});


const store = new Vuex.Store({
    state: {
        ui: "iview",
        componentSelect: {
            formProps: {

            },
            componentList: [

            ]
        },
        componentActive: {}
    },
    getters: {

    },
    mutations: {
        setUi(state, data) {
            state.ui = data.ui;
        },
        setComponentActive(state, data) {
            state.componentActive = data.componentActive;
        },
        setComponentSelect(state, data) {
            state.componentSelect = data.componentSelect;
        }
    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});