<template>
  <div>
    <draggable @update="onDraggableUpdate">

      <Row style="margin-bottom:10px;" v-for="(item,index) in data" :key="index">
        <Col span="20">
        <template v-if="textType=='String'"><Input type="text" :value="item.label"
            v-model="item.label"></Input></template>
        <template v-if="textType=='Number'">
          <InputNumber style="width:100%" v-model="item.label"></InputNumber>
        </template>
        </Col>
        <Col span="2" style="cursor:pointer">
        <Icon type="ios-trash" size="22" color="#F57A78" @click="onDeleteItem(index)" />
        </Col>
        <Col span="2">
        <Icon type="ios-list" size="24" style="cursor:move" />
        </Col>
      </Row>
    </draggable>
    <Row style="margin-top:-10px;">
      <Col span="24">
      <a style="font-size: 16px; cursor: pointer;" @click="onAddItem">添加选项</a>
      </Col>
    </Row>
  </div>
</template>


<script>
  import _ from "lodash";
  import draggable from "vuedraggable";
  import Util from '../libs/util';

  export default {
    name: 'IFormItemConfigStaticData',
    props: {
      data: {
        type: Array,
        default () {
          return {};
        }
      },
      textType: {
        type: String,
        default () {
          return "String";
        }
      }
    },
    data() {
      return {
        draggableOptions: {
          group: {
            name: 'iform-array'
          },
          animation: 150,
          handle: ".renderMove"
        }
      }
    },
    created() {},
    methods: {
      onDraggableUpdate(e) {

        var item = this.data[e.oldIndex];
        this.data.splice(e.oldIndex, 1);
        this.data.splice(e.newIndex, 0, item);
      },
      onAddItem() {
        switch (this.textType) {
          case "Number":
            this.data.push({
              label: 2,
              componentList: []
            });
            break;

          default:
            this.data.push({
              label: this.$t('newItem'),
              value: Util.getRandomCode(),
              componentList: []
            });
            break;
        }
      },
      onDeleteItem(index) {
        this.data.splice(index, 1);
      }
    },
    components: {
      draggable
    }
  }
</script>

<style scoped>

</style>