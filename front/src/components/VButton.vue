<template>
    <button class="button" :style="styleObject">
        <img v-if="iconName && !isLoading" :src="imagePath" :alt="iconName">
        <span :style="styleObjectTitle" v-if="title && !isLoading">{{ title }}</span>
        <ClipLoader
            v-else
            size="24px"
            color="white"
        />
    </button>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        components: {
            ClipLoader,
        },
        props: {
            title: {
                type: String,
                default: null
            },
            titleSize: {
                type: String,
                default: undefined
            },
            iconName: {
                type: String,
                default: null
            },
            isLoading: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: undefined
            },
            height:{
                type: String,
                default: undefined
            }
        },
        computed: {
            styleObject() {
                return {
                    width: this.width,
                    height: this.height,
                };
            },
            styleObjectTitle() {
                return {
                    fontSize: this.titleSize
                }
            },
            imagePath() {
                return require(`../assets/${this.iconName}`);
            }
        },
    }
</script>

<style lang="scss" scoped>
button {
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00A3FF;
    color: white;
    border: none;
    border-radius: 7px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition-duration: 200ms;

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.40);
    }
}
img, span {
    margin: 0 12px;
}
img {
    max-width: 20px;
}
span {
    font-size: 24px;
    font-weight: 500;
}
</style>