<template>
    <div>
    
        <Input icon="ios-more" readonly v-model="icon" @on-click="onInputClick"></Input>
    
        <Modal v-model="modal" width="730" @on-cancel="onModalCancel">
    
            <i-form-item-config-icon-select @onSelect="onSelect"></i-form-item-config-icon-select>
    
        </Modal>
    
    </div>
</template>


<script>
import IFormItemConfigIconSelect from "./iform-item-config-icon-select.vue";

export default {
    name: 'IFormItemConfigIcon',
    props: {

    },
    data() {
        return {
            modal: false,
            icon: ""
        }
    },
    created() {

    },
    methods: {
        onInputClick(e) {
            this.modal = true;
        },
        onModalCancel(){
            this.modal = false;
        },
        onSelect(value) {
            this.icon = value;
            this.$emit('input', value)
            this.modal = false;
        }
    },
    components: {
        IFormItemConfigIconSelect
    }
}
</script>

<style scoped>

</style>