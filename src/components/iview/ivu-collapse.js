import Ivu from './ivu';
import Util from '../../libs/util';

class IvuCollapse extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuCollapse';

        this.label = Vue.$t('ivuCollapse');

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            accordion: false,
            simple: false,


            panelList: [{
                label: "折叠面板1",
                value: Util.getRandomCode(),
                componentList: []
            }, {
                label: "折叠面板2",
                value: Util.getRandomCode(),
                componentList: []
            }],

            code: self.getComponentCode(),

        };

        this.groupList = [{
            groupName: Vue.$t('basicAttr'),
            groupCode: 'basicAttr',
            children: {
                code: {
                    type: "String"
                },
                accordion: {
                    type: "Boolean"
                },
                simple: {
                    type: "Boolean"
                },
                dataType: {
                    type: "StaticData",
                    field: "panelList"
                },
            }
        }];
    }
}
export default IvuCollapse;