import axios from 'axios';
import env from '../config/env';

let util = {
    getRandomCode() {
        return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
    }
};
util.title = function (title) {
    title = title ? title + ' - Home' : 'iForm';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;