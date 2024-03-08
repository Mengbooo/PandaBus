<template>
    <div class="mask_loading">
        <div class="loadingback">
            <img src="../assets/img/refresh.png" alt="" class="loading">
            <p>加载中</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "loading",
    data() {
        return {
        }

    },

}
</script>
<style scoped>
.loading {
    width: 15dvw;
    height: 15dvw;
    left: 50%;
    top: 50%;
    z-index: 13;
    animation: rotate 2s linear infinite;
}
@keyframes rotate {
    0% { transform: rotate(0deg); } 
    100% { transform: rotate(360deg); } 
}
.loadingback p{
    font-size: 3.5dvw;
}
.loadingback{
    background-color: rgb(43, 43, 43);
    width: 40dvw;
    height: 40dvw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 5dvw;
}
.mask_loading {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>