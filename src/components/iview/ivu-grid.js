import Ivu from './ivu';

class IvuGrid extends Ivu {

    constructor(Vue) {

        super();

        var self = this;

        this.type = 'IvuGrid';

        this.label = Vue.$t('ivuGrid');

        this.layout = true;

        this.icon = 'fa fa-pencil-square-o';

        this.props = {

            gutter: 0,
            align: null,
            justify: null,

            colList: [{
                label: 12,
                componentList: []
            }, {
                label: 12,
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
                gutter: {
                    type: "Number"
                },
                cols: {
                    type: "StaticData",
                    field: "colList",
                    textType:"Number"
                }
            }
        }];
    }
}
export default IvuGrid;