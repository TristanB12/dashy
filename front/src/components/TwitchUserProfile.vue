<template>
    <div class="twitch-user-profile">
        <div class="infos">
            <div>
                <img :src="imagePath" alt="">
                <h4 v-if="profile.display_name">{{ profile.display_name }}</h4>
            </div>
            <div class="views" v-if="profile.view_count">
                <span class="nb-viewers"> {{ nbViewers }} </span>
                <img src="../assets/twitch_viewers_icon.png" alt="">
            </div>
        </div>
        <p v-if="profile.description">{{ profile.description }}</p>
        <div v-if="profile.created_at" class="creation-date">
            <h4>Created at</h4>
            <span>{{ dateString }}</span>
        </div>
    </div>
</template>

<script>
import numeral from 'numeral';
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
                profile: this.content.content[0]
            }
        },
        computed: {
            imagePath() {
                let url = this.profile.profile_image_url;
                return url;
            },
            nbViewers() {
                return numeral(this.profile.view_count).format('0.00a');
            },
            dateString() {
                return dayjs(this.profile.created_at).format('YYYY-MM-DD');
            }
        }
    }
</script>

<style lang="scss" scoped>
.twitch-user-profile {
    width: 100%;
    margin: 20px 0;
}
.infos {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;

    div {
        width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
}
h4 {
    font-size: 16px;
}
.views {
    width: 20%;
    
    span {
        font-size: 14px;
        font-weight: 600;
        color: #FC5C65;
    }
    img {   
        width: 15px;
        height: 15px;
    }
}
p {
    margin: 20px 0;
    text-align: center;
    font-weight: 200;
}
.creation-date {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>