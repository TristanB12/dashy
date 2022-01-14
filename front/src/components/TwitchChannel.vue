<template>
    <div class="channel">
        <div class="infos">
            <h4 v-if="channel.user_login"> {{ channel.user_login }} </h4>
            <div v-if="channel.viewer_count">
                <span class="nb-viewers"> {{ nbViewers }} </span>
                <img src="../assets/twitch_viewers_icon.png" alt="">
            </div>
        </div>
        <span v-if="channel.game_name">{{ channel.game_name }}</span>
        <img v-if="channel.thumbnail_url" class="game" :src="imagePath" alt="">
    </div>
</template>

<script>
import numeral from 'numeral'
    export default {
        props: {
            channel: {
                type: Object,
                default: undefined
            },
        },
        computed: {
            imagePath() {
                let url = this.channel.thumbnail_url.replace('{width}', '96');
                url = url.replace('{height}', '54');
                return url
            },
            nbViewers() {
                    return numeral(this.channel.viewer_count).format('0.00a');
            }
        },
    }
</script>

<style lang="scss" scoped>
.channel {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
} 
h4 {
    font-size: 16px;
}
.game {
    border-radius: 5px;
}
.infos {
    img {
        width: 10px;
        height: 10px;
    }
}
.nb-viewers {
    font-size: 12px;
    font-weight: 600;
    color: #FC5C65;
}
</style>