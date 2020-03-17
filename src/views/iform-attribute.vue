<script>

import draggable from "vuedraggable";
import _ from "lodash";

import renderUtils from "../libs/render";

export default {
    name: 'IFormAttribute',
    props: {
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

        var vm=this;

        var comAttributeList = [];

        _.mapKeys(this.componentAttribute, (property, propertyName) => {
            comAttributeList.push(h("FormItem", {
                props: {
                    label: property.label == false ? "" : vm.$t([propertyName])
                },
                style: {
                    display: property.display
                }
            }, [
                (function () {
                    return controls[property.type.name](h, property, propertyName);
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
