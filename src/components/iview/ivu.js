class Ivu {

    constructor() {

        this.ui = 'iview';
        this.abridge = 'ivu';

        this.prefixCls = 'iForm';

        this.active = true;

        this.key = this.getComponentCode();

    }

    getComponentCode() {
        return this.abridge + Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36);
    }

}

export default Ivu;
