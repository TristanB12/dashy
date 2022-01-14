<template>
    <div class="spotify-top-tracks">
        <SpotifyTrack
            v-for="track in content.content"
            :key="track.id"
            :track="track"
        />
    </div>
</template>

<script>
import SpotifyTrack from '@/components/SpotifyTrack.vue';
    export default {
        components: {
            SpotifyTrack,
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

</style>