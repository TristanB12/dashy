<template>
    <button class="light-button" :style="styleObject">
        <img v-if="iconName && !isLoading" :src="imagePath" :alt="iconName">
        <span v-if="title && !isLoading">{{ title }}</span>
        <ClipLoader
            v-else
            size="20px"
            color="grey"
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
            }
        },
        computed: {
            styleObject() {
                if (this.width)
                    return {width: this.width};
                return {};
            },
            imagePath() {
                return require(`../assets/${this.iconName}`);
            }
        },
    }
</script>

<style lang="scss" scoped>
button {
    padding: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
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
    font-size: 14px;
    font-weight: 500;
}
</style>