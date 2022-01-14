<template>
    <div class="github-user-profile">
        <div class="infos">
            <div class="profile">
                <img :src="imagePath" alt="">
                <h4 v-if="profile.login">{{ profile.login }}</h4>
            </div>
            <div class="follows" v-if="profile.followers">
                <p>
                    <strong> {{ profile.followers }} </strong> followers
                </p>
                <p>
                    <strong> {{ profile.following }} </strong> following
                </p>
            </div>
        </div>
        <div class="flex" v-if="profile.bio">
            <p>{{ profile.bio }}</p>
        </div>
        <div class="flex" v-if="profile.created_at">
            <h4>Member since</h4>
            <span>{{ dateString }}</span>
        </div>
        <div class="flex" v-if="profile.location">
            <h4>Location</h4>
            <span>{{ profile.location }}</span>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
    export default {
        props: {
            content: {
                type: Object,
                default: undefined
            },
        },
        data() {
            return {
                profile: this.content.content
            }
        },
        computed: {
            imagePath() {
                let url = this.profile.avatar_url;
                return url;
            },
            dateString() {
                return dayjs(this.profile.created_at).format('YYYY-MM-DD');
            }
        },
    }
</script>

<style lang="scss" scoped>
.github-user-profile {
    width: 100%;
    margin: 20px 0;

    p {
        text-align: center;
    }
}
.infos  {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
        margin-right: 20px;
    }
    .profile {
        display: flex;
        align-items: center;
    }
}
.flex {
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
}
</style>