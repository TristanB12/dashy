<template>
    <div class="widget">
        <div class="header" v-if="state == 'actions'">
            <img class="drag-handler" src="@/assets/drag_icon.png" alt="drag icon">
            <div class="infos">
                <img  class="service-logo" :src="getImgPath(service)" alt="service icon">
                <h3>{{ name }}</h3>
            </div>
            <div class="actions">
                <img
                    src="../assets/delete_icon.png"
                    alt="delete icon"
                    @click="state = 'delete'"
                >
                <img
                    src="../assets/parameters_icon.png"
                    alt="parameters icon"
                    @click="$emit('parameters')"
                >
            </div>
        </div>
        <div class="header" v-else>
            <h4>Delete widget ?</h4>
            <div class="delete-actions">
                <VButton
                    title="Cancel"
                    titleSize="16px"
                    width="75px"
                    height="30px"
                    :isLoading="false"
                    @click.native="state='actions'"
                />
                <VWarningButton
                    title="Delete"
                    titleSize="16px"
                    width="75px"
                    height="30px"
                    :isLoading="isDeleteLoading"
                    @click.native="startDeleteWidget"
                />
            </div>
        </div>
        <div class="slot-container" v-if="content">
            <slot>
            </slot>
        </div>
        <div class="error" v-else-if="error">
            <span>{{ error }}</span>
        </div>
        <div class="loader-container" v-else>
            <GridLoader
                size="20px"
                color="#00A3FF"
            />
        </div>
    </div>
</template>

<script>
import VWarningButton from '@/components/VWarningButton.vue';
import VButton from '@/components/VButton.vue';
import GridLoader from 'vue-spinner/src/GridLoader.vue'
    export default {
        components: {
            GridLoader,
            VButton,
            VWarningButton
        },
        props: {
            service: {
                type: String,
                default:  undefined,
            },
            name: {
                type: String,
                default: undefined,
            },
            content: {
                type: Object,
                default: undefined
            },
            error: {
                type: String,
                default: undefined
            }
        },
        data() {
            return {
                state: "actions",
                isDeleteLoading: false
            }
        },
        methods: {
            getImgPath(service) {
                return require('../assets/'+ service.toLowerCase() + '_logo.png');
            },
            startDeleteWidget() {
                this.isDeleteLoading = true;
                this.$emit('delete-widget');
            }
        },
    }
</script>

<style lang="scss" scoped>
.widget {
    background-color: white;
    width: 370px;
    border-radius: 15px;
    box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.25);
    img {
        width: 25px;
    }
}
.service-logo {
    width: 40px;
}
.header {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
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

        img {
            cursor: pointer;
        }
    }
}
.drag-handler {
    cursor: grabbing;
}
.slot-container {
    width: 90%;
    margin: auto;
    padding: 5px 0;
}
.loader-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.delete-box {
    position: absolute;
    left: 30%;
    top: 20%;

    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.50);
}
.error {
    color: #FC5C65;
    font-weight: 600;
    display: flex;
    justify-content: center;
    padding: 20%;
}
.delete-actions * {
    margin: 0 5px;
}
</style>