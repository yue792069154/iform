<template>
    <RadioGroup  type="button"  v-model="rule.ruleType" @on-change="onRadioGroupChange">
        <Radio  label="regexBuilit">{{$t('regexBuilit')}}</Radio>
        <Radio  label="regexCustom">{{$t('regexCustom')}}</Radio>
        <template v-if="rule.ruleType=='regexBuilit'">
            <Select v-model="rule.ruleValue"   @on-change="onSelectChange" style="margin-top:10px;">
                <Option v-for="option in ruleList" :value="option.value" :label="option.label" :key="option.value"></Option>
            </Select>
        </template>
        <template v-else>
            <Input v-model="rule.ruleValue"  style="margin-top:10px;"  @on-change="onInputRuleChange"></Input>
        </template>
        <Input type="textarea" :rows="3" v-model="rule.ruleMessage"   @on-change="onInputMessageChange" style="margin-top:10px;"></Input>
    </RadioGroup>
</template>


<script>
    
    import _ from "lodash";

    export default {
        name: 'IFormItemConfigRule',
        props: {
           
        },
        data() {
            return {
                rule:{
                    ruleValue:"",
                    ruleMessage:"",
                    ruleType:"regexBuilit",
                },
                
                ruleList:[{
                        label: "手机号码",
                        value: "/^1\d{10}$/",
                        message: "请输入正确的手机号码"
                    }, {
                        label: "电话号码",
                        value: "/^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/",
                        message: "请输入正确的电话号码"
                    },
                    {
                        label: "邮箱",
                        value: "/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/",
                        message: "请输入正确的邮箱"
                    }, {
                        label: "传真号码",
                        value: "/^(\d{3,4}-)?\d{7,8}$/",
                        message: "请输入正确的传真号码，例：XXX-12345678或XXXX-1234567或XXXX-12345678"
                    }, {
                        label: "组织机构代码",
                        value: "/[a-zA-Z0-9]{8}-[a-zA-Z0-9]/",
                        message: "请输入正确的组织机构代码，例：XXXXXXXX-X"
                    }, {
                        label: "中文汉字",
                        value: "/^[\u4e00-\u9fa5]{0,}$/",
                        message: "请输入正确的中文汉字"
                    }, {
                        label: "英文和数字",
                        value: "/^[A-Za-z0-9]+$/",
                        message: "请输入英文和数字"
                    }, {
                        label: "身份证号",
                        value: "/^\d{15}|\d{18}$/",
                        message: "请输入正确的身份证号"
                    }, {
                        label: "密码",
                        value: "/^[a-zA-Z]\w{5,17}$/",
                        message: "以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                    }, {
                        label: "中国邮政编码",
                        value: "/[1-9]\d{5}(?!\d) /",
                        message: "请输入正确的中国邮政编码"
                    }
                ]
            }
        },
        created() {

        },
        methods:{
            onRadioGroupChange(e){
                this.$emit('onGetConfigRule',this.rule);
            },
            onSelectChange(value){

                var rule = _.find(this.ruleList, function (item) {
                    return item.value == value;
                });

                this.rule.ruleValue=rule.value;
                this.rule.ruleMessage=rule.message;

                this.$emit('onGetConfigRule',this.rule);

            },
            onInputRuleChange(value){
                this.$emit('onGetConfigRule',this.rule);
            },
            onInputMessageChange(value){
                this.$emit('onGetConfigRule',this.rule);
            }
        }
    }
</script>

<style scoped>

</style>