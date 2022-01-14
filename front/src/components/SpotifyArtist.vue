<template>
    <div class="artist">
        <img v-if="artist.images" :src="imagePath" alt="">
        <div class="infos">
            <h4 v-if="artist.name"> {{ artistName }} </h4>
            <span v-if="artist.genres"> {{ artistGenres }} </span>
        </div>
        <div class="followers">
            <span v-if="artist.followers"> {{ followersString }} </span>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral'
    export default {
        props: {
            artist: {
                type: Object,
                default: undefined
            },
        },
        computed: {
            followersString() {
                return numeral(this.artist.followers.total).format('0.00a') + ' followers';
            },
            imagePath() {
                return this.artist.images[2].url;
            },
            artistName() {
                return this.artist.name;
            },
            artistGenres() {
                let genres = '';
                let i = 0;

                for (i; (i < 1 && i < this.artist.genres.length - 1); i++) {
                    genres +=  this.artist.genres[i] + ', ';
                }
                genres += this.artist.genres[i];
                return genres;
            }
        },
    }
</script>

<style lang="scss" scoped>
.artist {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
} 
img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
}
h4 {
    font-size: 16px;
}
span {
    font-size: 10px;
}
.infos {
    width: 40%;
}
.followers {
    width: 30%;

    span {
        font-size: 12px;
    }
}
</style>