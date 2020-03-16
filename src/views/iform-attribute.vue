<template>
</template>

<script>

import draggable from "vuedraggable";
import renderUtils from "../libs/render";
import _ from "lodash";

export default {
    name: 'IFormAttribute',
    props: {
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


        var comAttributeList = [];

        lodash.mapKeys(this.comAttribute, (property, propertyName) => {
            comAttributeList.push(h("FormItem", {
                props: {
                    label: property.label == false ? "" : lang[propertyName]
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
