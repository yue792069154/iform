const getValue = function (key, object) {
    return object[key];
};

const getRandomCode = function () {
    return Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
};

module.exports = {
    getValue,
    getRandomCode
};