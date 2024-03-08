<template>
    <div class="errorback">
        <div class="errorbox">
            <p class="errorinfo1">
                催车失败
            </p>
            <p class="errorinfo2">
                您的坐标不符合要求，请确认是否已经打开手机定位以及确认您在华中科技大学校内
            </p>
        </div>
    </div>
</template>

<style scoped>
.errorback {
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

.errorbox {
    background-color: rgb(33, 33, 33);
    width: 65dvw;
    height: 40dvw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 5dvw;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
}
.errorinfo1{
    font-size: 5dvw;
    color: rgb(59, 201, 185);
    line-height: 0%;

}
.errorinfo2{
    font-size: 3.5dvw;
    color: rgb(163, 163, 163);
    margin-left: 5dvw;
    margin-right: 5dvw;
}
</style>

<script>
</script>