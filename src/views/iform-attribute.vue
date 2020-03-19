<script>
import draggable from "vuedraggable";
import _ from "lodash";

import controlUtils from "../libs/control";

export default {
    name: 'IFormAttribute',
    props: {
        component: {
            type: Object,
            default () {
                return {};
            }
        },
        componentAttribute: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {}
    },
    render(h) {

        var vm = this;

        var componentAttributeList = [];


        _.mapKeys(this.componentAttribute, (propertyProps, propertyKey) => {
            componentAttributeList.push(h("FormItem", {
                props: {
                    label: propertyProps.label == false ? "" : vm.$t([propertyKey])
                },
                style: {
                    display: propertyProps.display
                }
            }, [
                (function() {
                    return controlUtils[propertyProps.type.name](h, propertyProps, propertyKey, vm.component.props);
                })()
            ]));
        });

        return h("Form", {
            props: {
                labelPosition: "top"
            }

        }, componentAttributeList);

    },
    components: {
        draggable
    }
}
</script>

<style scoped>

</style>
