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
        comAttribute: {
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

        var comAttributeList = [];

        _.mapKeys(this.comAttribute, (property, propertyKey) => {
            property.props = vm.component.props;
            comAttributeList.push(h("FormItem", {
                props: {
                    label: property.label == false ? "" : vm.$t([propertyKey])
                },
                style: {
                    display: property.display
                }
            }, [
                (function() {
                    return controlUtils[property.type.name](h, property, propertyKey);
                })()
            ]));
        });

        return h("Form", {
            props: {
                labelPosition: "top"
            }

        }, comAttributeList);

    },
    components: {
        draggable
    }
}
</script>

<style scoped>

</style>
