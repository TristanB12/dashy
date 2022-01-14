<template>
    <button @click="$router.push({name: 'AddPage'})">+</button>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
button {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 70px;
    height: 70px;
    font-size: 50px;
    font-weight: 400;
    background-color: #00A3FF;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition-duration: 200ms;

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.40);
    }
}
</style>