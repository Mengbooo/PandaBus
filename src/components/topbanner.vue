<template>
    <div class="topbanner" data-umami-event=" 点击“关于我们” " id="top-banner">
        <img src="../assets/img/banner.png" alt="原神,启动!" @click="handleclick">
    </div>
    <div class="mask" v-if="showImageGroup" @click="hideImageGroup">
        <div class="imgsgroup" v-if="showImageGroup">

            <div class="PandaBus">
                <img src="../assets/img/PandaBus.svg" alt="PandaBus">
            </div>
            <div class="HustBus">
                <img src="../assets/img/HustBus.svg" alt="HustBus">
            </div>
            <div class="aboutBY">
                <img src="../assets/img/aboutBY.svg" alt="aboutBY">
            </div>
            <div class="exit">
                <img src="../assets/img/exit.svg" alt="exit">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showImageGroup: false,

        }
    },
    methods: {
        handleclick() {
            this.showImageGroup = true;
        },
        hideImageGroup() {
            this.showImageGroup = false;
        },

    }
}

</script>

<style scoped>
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.topbanner img {
    width: 85dvw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 5%;
    left: 7.5%;
    box-shadow: 2px 5px 10px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5dvw;

}

.imgsgroup {
    width: 85dvw;
    height: 75dvh;
    border-radius: 5dvw;
    z-index: 2;
    background-color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    background-image: url("../assets/img/BYbg\ \(1\).png");
    background-position: 0% 100%;
    padding: 2dvw;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.PandaBus img {
    width: 15dvw;
    height: auto;
    margin-top: 5dvh;
}

.HustBus img {
    width: 65dvw;
    height: auto;
    margin-top: 2dvh;
    margin-bottom: 2dvh;
}

.aboutBY img {
    width: 65dvw;
    height: auto;
}

.exit img {
    width: 30dvw;
    position: inherit;
    height: auto;
}
</style>