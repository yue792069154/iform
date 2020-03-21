import IFormItem from './views/iform-form-item.vue';
import IFormCode from './views/iform-code.vue';

const routers = [{
        path: '/',
        meta: {
            title: 'iForm'
        },
        component: IFormItem
    },{
        path: '/code',
        meta: {
            title: 'iForm'
        },
        component: IFormCode
    }
];

export default routers;