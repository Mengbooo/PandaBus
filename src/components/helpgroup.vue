<template>
    <div class="group">
        <div class="groupline" v-for="item in items" :key="item.id" @click="handleClick(item.id)">
            <img :src="item.img1" alt="" class="img1">
            <p>{{ item.source }}</p>
            <img src="../assets/img/jump.png" alt="" class="img2">
        </div>
    </div>
    <div class="mask" v-if="showinformation" @click="closeInformation"></div>
    <div class="lostsurvey" v-if="showinformation">
        <p> 如有丢失物品请拨打
            <span @click="copyText(Number1)" class="telenum">{{ Number1 }}</span>
            联系校车工作人员找回失物。
            <br>
            想了解更多信息请搜索并加入熊猫车QQ反馈群
            <span @click="copyText(Number2)" class="QQnum">{{ Number2 }}</span>。
        </p>
    </div>
    <div class="copyinfo" v-show="iscopyinfo">
        <p>已复制到剪贴板</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { id: 21, source: '申请包车', img1: require('../assets/img/busSurvey.png') },
                { id: 22, source: '失物反馈', img1: require('../assets/img/LostSurvey.png') },
                { id: 23, source: '意见反馈', img1: require('../assets/img/adviceSurvey.png') },
            ],
            showinformation: false,
            iscopyinfo: false,
            Number1: 18186186905,
            Number2: 856599514
        };
    },
    methods: {
        handleClick(id) {
            if (id == 22) {
                umami.track(' 点击“帮助”组 ', 2);
                this.showinformation = true;
            }
            else if (id == 21) {
                umami.track(' 点击“帮助”组 ', 1);
                window.location.href = 'https://www.wjx.top/vm/Qgk5mdI.aspx ';
            }
            else if (id == 23) {
                umami.track(' 点击“帮助”组 ', 3);
                window.location.href = ' https://www.wjx.cn/vm/we0i1LN.aspx ';
            }
        },
        closeInformation() {
            this.showinformation = false;
        },
        copyText(text) {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.iscopyinfo = true;
            setTimeout(() => {
                this.iscopyinfo = false;
            }, 2000);
        },
    },
}

</script>

<style scoped>
.copyinfo p {
    font-size: 3.5dvw;
}

.copyinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 90dvw;
    height: 6dvh;
    border-radius: 3dvw;
    margin-top: 2dvh;
    position: fixed;
    top: 2dvw;
    z-index: 3;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.copyinfo p {
    font-size: 4dvw;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.group {
    position: fixed;
    bottom: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.groupline {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, rgb(45, 112, 112), rgb(108, 228, 214));
    border-radius: 5dvw;
    padding: 3dvw;
    width: 75dvw;
    height: 5dvh;
    margin-top: 3dvh;
    margin-bottom: 3dvh;
    box-shadow: 2px 5px 10px 5px rgba(0, 0, 0, 0.2);

}

.groupline p {
    margin-right: 20dvw;
    font-size: 4dvw;
    color: rgb(255, 255, 255);
}

.img1 {
    width: 30dvw;
}

.img2 {
    width: 8dvw;
}

.lostsurvey {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70dvw;
    height: 16dvh;
    border-radius: 5dvw;
    z-index: 2;
    background-color: rgb(255, 255, 255);
    padding: 2dvw;
    position: fixed;
    margin-top: 40dvh;
}

.lostsurvey p {
    font-size: 4dvw;
    color: black;
}

.telenum {
    font-size: 4dvw;
    line-height: 0;
    color: rgb(68, 214, 190);
    text-decoration: underline;
}

.QQnum {
    font-size: 4dvw;
    line-height: 0;
    color: rgb(68, 214, 190);
    text-decoration: underline;
}
</style>