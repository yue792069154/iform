<script>
  const prefixCls = 'iform';

  import draggable from "vuedraggable";
  import _ from "lodash";
  import components from "../../components/index";
  import Render from "../../components/render";
  import Util from '../../libs/util';

  export default {
    name: 'IFormItemCreate',
    props: {
      componentList: {
        type: Array,
        default () {
          return [];
        }
      },
      className: {
        type: String,
          default () {
            return "";
          }
      }
    },
    data() {
      return {

        prefixCls: prefixCls,

      }
    },
    created() {

    },
    methods: {
      renderFormItem(h, component) {


        const formItemDefaultClass = prefixCls + '-item';
        const formItemActiveClass = prefixCls + '-item' + ' ' + prefixCls + '-item-active';


        const formItemDefaultLayoutClass = prefixCls + '-item-layout';
        const formItemActiveLayoutClass = prefixCls + '-item-layout' + ' ' + prefixCls + '-item-layout-active';


        if (component.layout) {

          return h("div", {
            class: component.active ? formItemActiveLayoutClass : formItemDefaultLayoutClass,
            key: component.key
          }, [Render[component.type](h, component.props, this)]);

        } else {
          return h("van-field", {

            props: {
              label: component.props.label
            },
            class: component.active ? formItemActiveClass : formItemDefaultClass,
            key: component.key
          }, [Render[component.type](h, component.props, this)]);

        }
      }
    },
    render(h) {

      var vm = this;

      return h("draggable", {
        props: {
          options: {
            group: {
              name: 'iform'
            },
            ghostClass: `${prefixCls}-item-move`,
            animation: 150
          }
        },
        class: vm.className,
        on: {
          add: function (e) {

            var groupType = e.item.attributes.groupType.value;
            var type = e.item.attributes.type.value;

            _.forEach(vm.componentList, function (item) {
              item.active = false;
            });

            var component = new components[vm.$store.state.ui][groupType][type](vm);

            vm.componentList.splice(e.newIndex, 0, component);

            vm.$emit('onAdd', component);

          },
          update: function (e) {

            var component = vm.componentList[e.oldIndex];
            vm.componentList.splice(e.oldIndex, 1);
            vm.componentList.splice(e.newIndex, 0, component);

            vm.$emit('onUpdate', component);

          },
          choose: function (e) {

            _.forEach(vm.componentList, function (component) {
              component.active = false;
            });

            var component = vm.componentList[e.oldIndex];
            component.active = true;

            vm.$emit('onChoose', component);

          }
        }
      }, [vm.componentList.map(function (component) {
        return vm.renderFormItem(h, component);
      })]);

    },
    components: {
      draggable
    }
  }
</script>

<style scoped>
</style>