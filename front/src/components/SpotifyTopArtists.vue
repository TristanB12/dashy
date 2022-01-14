<template>
    <div class="spotify-top-artists">
        <SpotifyArtist
            v-for="artist in content.content"
            :key="artist.id"
            :artist="artist"
        />
    </div>
</template>

<script>
import SpotifyArtist from '@/components/SpotifyArtist.vue';
    export default {
        components: {
            SpotifyArtist,
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
.spotify-top-artists {
    width: 100%;
}
</style>