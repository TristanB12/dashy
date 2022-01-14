<template>
    <div class="track">
        <img v-if="track.album" :src="imagePath" alt="">
        <div class="infos">
            <h4 v-if="track.name"> {{ track.name }} </h4>
            <span v-if="track.artists"> {{ track.artists[0].name }} </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            track: {
                type: Object,
                default: undefined
            },
        },
        computed: {
            name() {
                return this.data 
            },
            imagePath() {
                return this.track.album.images[2].url;
            },
        },
    }
</script>

<style lang="scss" scoped>
.track {
    width: 100%;
    margin: 20px 0;
    display: flex;
    align-items: center;

    span {
        font-size: 12px;
    }
}
.infos {
    margin-left: 10px;
}
img {
    max-width: 46px;
    max-height: 46px;
}
h4 {
    font-size: 14px;
}
</style>