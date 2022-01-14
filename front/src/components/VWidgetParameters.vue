<template>
    <div class="widget-parameters">
        <div class="header">
            <VCloseButton
                @click.native="$emit('go-back')"
            />
            <div class="infos">
                <img  class="service-logo" :src="getImgPath(service)" alt="service icon">
                <h3>{{ name }}</h3>
            </div>
        </div>
        <div class="slot-container">
            <slot>
            </slot>
        </div>
        <div class="save-container">
            <VButton
                title="Save"
                titleSize="16px"
                width="100px"
                height="35px"
                :isLoading="isLoading"
                @click.native="emitSave"
            />
        </div>
    </div>
</template>

<script>
import VCloseButton from '@/components/VCloseButton.vue';
import VButton from '@/components/VButton.vue';
    export default {
        components: {
            VButton,
            VCloseButton
        },
        props: {
            service: {
                type: String,
                default: undefined
            },
            name: {
                type: String,
                default: undefined
            },
            config: {
                type: Object,
                default: undefined
            }
        },
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            getImgPath(service) {
                return require('../assets/'+ service.toLowerCase() + '_logo.png');
            },
            emitSave() {
                this.isLoading = true;
                this.$emit('save-config');
            }
        },
    }
</script>

<style lang="scss" scoped>
.widget-parameters {
    background-color: white;
    width: 370px;
    border-radius: 15px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.25);

    img {
        width: 25px;
    }
}
.header {
    position: relative;
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #DDDDDD;

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .infos img {
        margin-right: 10px;
    }
    .actions {
        width: 20%;
    }
    button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%) rotateZ(45deg);
}
}
.slot-container {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    padding: 5px 0;
}
.save-container {
    width: 90%;
    margin: auto;
    padding-bottom: 25px;
    display: flex;
    justify-content: right;
}
</style>