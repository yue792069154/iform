<template>
  <div>
    <div>
      <RadioGroup type="button" v-model="data.dataType" @on-change="onRadioGroupChange">
        <Radio label="dataStatic">{{$t('dataStatic')}}</Radio>
        <Radio label="dataRemote">{{$t('dataRemote')}}</Radio>
      </RadioGroup>
    </div>
    <div>
      <template v-if="data.dataType=='dataRemote'">
        <Select v-model="data.dataValue" @on-change="onSelectChange" style="margin-top:10px;">
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
            <Input type="text" :value="item.label"></Input>
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
  import Util from '../../libs/util';

  export default {
    name: 'IFormItemConfigData',
    props: {

    },
    data() {
      return {
        data: {
          dataValue: "",
          dataType: "dataStatic",
          dataStaticList: []
        },
        dataStaticList: [{
          label: "选项1",
          value: "1"
        }, {
          label: "选项2",
          value: "2"
        }, {
          label: "选项3",
          value: "3"
        }],
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
      this.data.dataStaticList = this.dataStaticList;
      this.$emit('onGetConfigData', this.data);
    },
    methods: {
      onRadioGroupChange(e) {
        this.$emit('onGetConfigData', this.data);
      },
      onSelectChange(value) {

        var data = _.find(this.dataRemoteList, function (item) {
          return item.value == value;
        });

        this.data.dataValue = data.value;

        this.$emit('onGetConfigData', this.data);

      },
      onDraggableUpdate(e) {

        var item = this.dataStaticList[e.oldIndex];
        this.dataStaticList.splice(e.oldIndex, 1);
        this.dataStaticList.splice(e.newIndex, 0, item);

        this.$emit('onGetConfigData', this.data);

      },
      onAddStaticItem() {
        this.dataStaticList.push({
          label: this.$t('newItem'),
          value: Util.getRandomCode()
        });
        this.$emit('onGetConfigData', this.data);
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