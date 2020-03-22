import IvuText from './iview/ivu-text';
import IvuTextarea from './iview/ivu-textarea';
import IvuTextIcon from './iview/ivu-text-icon';
import IvuTextSearch from './iview/ivu-text-search';
import IvuSelect from './iview/ivu-select';
import IvuDatePicker from './iview/ivu-datePicker';
import IvuRate from './iview/ivu-rate';
import IvuSwitch from './iview/ivu-switch';

import IvuGrid from './iview/ivu-grid';
import IvuTabs from './iview/ivu-tabs';
import IvuCard from './iview/ivu-card';
import IvuDivider from './iview/ivu-divider';
import IvuCollapse from './iview/ivu-collapse';
import IvuBlock from './iview/ivu-block';

import IvuAlert from './iview/ivu-alert';
import IvuButton from './iview/ivu-button';

import VanPassword from './vant/van-password';
import VanButton from './vant/van-button';
import VanPicker from './vant/van-picker';

export default {
    iview: {

        basicComponents: {
            IvuText,
            IvuTextarea,
            IvuTextIcon,
            IvuTextSearch,
            IvuDatePicker,
            IvuSelect,
            IvuRate,
            IvuSwitch
        },
        layoutComponents: {
            IvuGrid,
            IvuTabs,
            IvuCard,
            IvuDivider,
            IvuCollapse,
            IvuBlock
        },
        sysComponents: {

        },
        highComponents: {
            IvuAlert,
            IvuButton
        }


    },
    vant: {
        basicComponents: {
            VanPicker,
            VanPassword
        },
        
        highComponents: {
            VanButton
        }
    }
};