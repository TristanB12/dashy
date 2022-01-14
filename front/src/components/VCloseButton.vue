<template>
    <button>+</button>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
button {
    width: 30px;
    height: 30px;
    font-size: 25px;
    font-weight: 400;
    background-color: #FC5C65;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transform: rotateZ(45deg) translateX(-50%);
    transition-duration: 200ms;

    &:hover {
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.30);
    }
}
</style>