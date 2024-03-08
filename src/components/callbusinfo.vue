<template>
    <div class="buscomeback">
        <div class="buscomebox">
            <p class="buscomeboxp1">催车成功</p>
            <img src="../assets/img/calledBus.svg" alt="">
            <p class="buscomeboxp2">熊猫车正火速赶来 !</p>
        </div>
    </div>
</template>

<style scoped>
.buscomeback {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    position: fixed;
    top: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buscomebox{
    background-color: rgb(43, 43, 43);
    width: 60dvw;
    height: 40dvw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 5dvw;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}
.buscomebox img {
    width: 40dvw;
    height: auto;
}

.buscomebox p{
    font-size: 4dvw;
    color: aliceblue;
}
</style>

<script>
</script>