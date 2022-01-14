<template>
    <div class="twitch-online-channels">
        <TwitchChannel
            v-for="channel in content.content"
            :key="channel.id"
            :channel="channel"
        />
    </div>
</template>

<script>
import TwitchChannel from '@/components/TwitchChannel.vue';
    export default {
        components: {
            TwitchChannel,
        },
        props: {
            content: {
                type: Object,
                default: undefined
            },
        }
    }
</script>

<style lang="scss" scoped>
.twitch-online-channels {
    width: 100%;
}
</style>