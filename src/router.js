import IFormDesign from './views/iform-design.vue';
import IFormCode from './views/iform-code.vue';

const routers = [{
        path: '/',
        meta: {
            title: 'iForm'
        },
        component: IFormDesign
    },{
        path: '/code',
        meta: {
            title: 'iForm'
        },
        component: IFormCode
    }
];

export default routers;