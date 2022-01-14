<template>
    <div class="profile-picture">
        <span>{{ firstUserEmailLetter }}</span>
    </div>
</template>

<script>
    export default {
        computed: {
            firstUserEmailLetter() {
                return this.$store.state.user.auth.email.toUpperCase()[0];
            },
        },
    }
</script>

<style lang="scss" scoped>
.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e67e22;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
span {
    font-size: 20px;
    font-weight: 600;
}
</style>