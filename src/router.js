import Iview from './views/iview/index.vue';
import Vant from './views/vant/index.vue';
import IFormCode from './views/iview/iform-code.vue';

const routers = [{
    path: '/',
    meta: {
        title: 'iForm'
    },
    component: Iview
}, {
    path: '/code',
    meta: {
        title: 'iForm'
    },
    component: IFormCode
}, {
    path: '/vant',
    meta: {
        title: 'iForm'
    },
    component: Vant
}, {
    path: '/iview',
    meta: {
        title: 'iForm'
    },
    component: Iview
}];

export default routers;