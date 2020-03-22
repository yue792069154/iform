<template>
  <div>
    <div>
      <RadioGroup type="button" v-model="props.dataType" @on-change="onRadioGroupChange">
        <Radio label="dataStatic">{{$t('dataStatic')}}</Radio>
        <Radio label="dataRemote">{{$t('dataRemote')}}</Radio>
      </RadioGroup>
    </div>
    <div>
      <template v-if="props.dataType=='dataRemote'">
        <Select v-model="props.serviceRootUrl" @on-change="onSelectChange" style="margin-top:10px;">
          <Option v-for="option in dataRemoteList" :value="option.value" :label="option.label" :key="option.value">
          </Option>
        </Select>
      </template>
      <template v-else>
        <draggable @update="onDraggableUpdate">

          <Row style="margin-top:10px;" v-for="(item,index) in dataStaticList" :key="index">
            <Col span="2">
            <Radio></Radio>
            </Col>
            <Col span="18">
            <Input type="text" :value="item.label" v-model="item.label"></Input>
            </Col>
            <Col span="2">
            <Icon type="ios-trash" size="22" color="#F57A78" style="cursor:pointer"
              @click="onDeleteDataStaticItem(index)" />
            </Col>
            <Col span="2">
            <Icon type="ios-list" size="24" style="cursor:move" />
            </Col>
          </Row>

        </draggable>

        <Row>
          <Col span="24">
          <a style="font-size: 16px; cursor: pointer;" @click="onAddStaticItem">添加选项</a>
          </Col>
        </Row>
      </template>
    </div>
  </div>
</template>


<script>
  import _ from "lodash";
  import draggable from "vuedraggable";
  import Util from '../libs/util';

  export default {
    name: 'IFormItemConfigData',
    props: {
      field: {
        type: String,
        default () {
          return "";
        }
      },
      props: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data() {
      return {
        dataStaticList: [],
        dataRemoteList: [{
          label: "获取国民经济行业服务",
          value: "getInternatialService"
        }],
        draggableOptions: {
          group: {
            name: 'iform-array'
          },
          animation: 150,
          handle: ".renderMove"
        }
      }
    },
    created() {
      this.dataStaticList = this.props[this.field];
    },
    methods: {
      onDraggableUpdate(e) {

        var item = this.dataStaticList[e.oldIndex];
        this.dataStaticList.splice(e.oldIndex, 1);
        this.dataStaticList.splice(e.newIndex, 0, item);

      },
      onAddStaticItem() {
        this.dataStaticList.push({
          label: this.$t('newItem'),
          value: Util.getRandomCode(),
          componentList: []
        });
      },
      onDeleteDataStaticItem(index) {
        this.dataStaticList.splice(index, 1);
      }
    },
    components: {
      draggable
    }
  }
</script>

<style scoped>

</style>