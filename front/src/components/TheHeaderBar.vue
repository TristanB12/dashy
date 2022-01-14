<template>
    <div id="header-bar">
        <div class="container">
            <div class="logo">
                <img src="@/assets/logo.png" alt="dashy logo">
                <h2>Dashy</h2>
            </div>
            <h2>Your Dashboard</h2>
            <div class="user">
                <span>{{ userEmail }}</span>
                <TheProfilePicture />
            </div>
        </div>
    </div>
</template>

<script>
import TheProfilePicture from '@/components/TheProfilePicture.vue';
    export default {
        components: {
            TheProfilePicture,
        },
        computed: {
            userEmail() {
                return this.$store.state.user.auth.email
            }
        },
    }
</script>

<style lang="scss" scoped>
#header-bar {
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container {
    width: 90%;
    height: 75px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    display: flex;
    align-items: center;

    img {
        max-width: 40px;
        margin-right: 20px;
    }
}
h2 {
    font-size: 25px;
    color: #474747;
}
.user {
    display: flex;
    align-items: center;

    span {
        margin-right: 20px;
    }
}
</style>