<template>
  <div>

    <Form label-position="top">

      <FormItem :label="$t(formItemKey)" v-for="(formItemValue, formItemKey) in formItemConfig" :key="formItemKey">

        <Input v-if="formItemValue.type=='String'" v-model="formItem.props[formItemKey]"
          :clearable="formItemValue.clearable">

        </Input>

        <Checkbox v-if="formItemValue.type=='Boolean'" v-model="formItem.props[formItemKey]">

        </Checkbox>

        <InputNumber v-if="formItemValue.type=='Number'" style="width:100%" :max="formItemValue.max"
          :min="formItemValue.min" v-model="formItem.props[formItemKey]">

        </InputNumber>

        <Select v-if="formItemValue.type=='Array'" v-model="formItem.props[formItemKey]">

          <Option v-for="option in formItemValue.optionList" :label="option.label" :value="option.value"
            :key="option.value">

          </Option>

        </Select>

        <ColorPicker v-if="formItemValue.type=='ColorPicker'" v-model="formItem.props[formItemKey]" />

        <Input type="textarea" v-if="formItemValue.type=='Textarea'" show-word-limit
          v-model="formItem.props[formItemKey]" :clearable="formItemValue.clearable"
          :maxlength="formItemValue.maxlength" :rows="formItemValue.rows">

        </Input>

        <!-- 以下为特殊组合控件 -->

        <i-form-item-config-rule v-if="formItemValue.type=='Rule'" @onGetConfigRule="onGetConfigRule">

        </i-form-item-config-rule>

        <i-form-item-config-icon v-if="formItemValue.type=='Icon'" v-model="formItem.props[formItemKey]">

        </i-form-item-config-icon>

        <i-form-item-config-data v-if="formItemValue.type=='Data'" :props="formItem.props" :field="formItemValue.field">

        </i-form-item-config-data>

        <i-form-item-config-data-static v-if="formItemValue.type=='StaticData'"
          :data="formItem.props[formItemValue.field]" :textType="formItemValue.textType">

        </i-form-item-config-data-static>

      </FormItem>

    </Form>

  </div>
</template>


<script>
  import draggable from "vuedraggable";
  import _ from "lodash";
  import IFormItemConfigRule from "./iform-item-config-rule.vue";
  import IFormItemConfigIcon from "./iform-item-config-icon.vue";
  import IFormItemConfigData from "./iform-item-config-data.vue";
  import IFormItemConfigDataStatic from "./iform-item-config-data-static.vue";

  export default {
    name: "IFormItemConfig",
    props: {
      formItem: {
        type: Object,
        default () {
          return {};
        }
      },
      formItemConfig: {
        type: Object,
        default () {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    created() {
      console.log(this.formItem);
    },
    methods: {
      onGetConfigRule(rule) {
        this.formItem.props.rule = rule.ruleValue;
        this.formItem.props.ruleType = rule.ruleType;
        this.formItem.props.ruleMessage = rule.ruleMessage;
      }
    },
    components: {
      draggable,
      IFormItemConfigRule,
      IFormItemConfigIcon,
      IFormItemConfigData,
      IFormItemConfigDataStatic
    }
  };
</script>

<style scoped>
</style>