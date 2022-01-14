<template>
    <div class="auth-card">
        <div class="header">
            <img src="@/assets/logo.png" alt="logo">
            <h1>{{ title }}</h1>
        </div>
        <div class="slot-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
        },
    }
</script>

<style lang="scss" scoped>
.auth-card {
    width: 26%;
    margin: auto;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    background-color: white;
}
.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
    }
}
.slot-container {
    width: 80%;
    margin: 50px auto;
}
</style>