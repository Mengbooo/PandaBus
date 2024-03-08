<template>
    <div class="up-downbtn" @click="handleclick()">
        <button></button>
    </div>
    <div class="linelist">
        <div class="wordsbox">
            <div class="wordline1">
                <p>{{ lineData.source }}</p>
                <img :src="lineData.return" alt="">
                <p>{{ lineData.destination }}</p>
            </div>
            <div class="wordline2">
                <p>{{ lineData.schedule }}</p>
            </div>
        </div>
        <div class="changebtn" v-show="lineData.id === 1 || lineData.id === 2 || lineData.id === 3">
            <img src="../assets/img/return-1.png" alt="">
            <p>切换方向</p>
        </div>
    </div>
</template>


<script>
import refreshbtn from '../components/refreshbtn.vue'

export default {
    computed: {
        lineData() {
            const id = this.$route.params.id;
            if (id === '1') {
                return {
                    id: 1,
                    source: '校大门',
                    destination: '韵苑',
                    schedule: '首班7:00 末班22:00 15分钟/每班',
                    return: require('../assets/img/doubleArrow.png')
                };
            } else if (id === '2') {
                return {
                    id: 2,
                    source: '韵苑',
                    destination: '紫菘',
                    schedule: '首班7:00 末班22:00 15分钟/每班',
                    return: require('../assets/img/doubleArrow.png')
                };
            } else if (id === '3') {
                return {
                    id: 3,
                    source: '喻园',
                    destination: '校大门',
                    schedule: '首班7:00 末班22:00 15分钟/每班',
                    return: require('../assets/img/doubleArrow.png')
                };
            } else if (id === '4') {
                return {
                    id: 4,
                    source: '主校区大循环',
                    destination: '',
                    schedule: '按需调整班次,整点发车',
                    return: ''
                };
            }
        },
    },
    components: {
        refreshbtn,
    },
    methods: {
        handleclick() {
            this.isshow = !this.isshow
        },
    },
    data() {
        return {
            isshow: true
        }
    }
};
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-active {
    position: absolute;
}

.up-downbtn {
    width: 100dvw;
    padding: 1dvh 0 1dvh 0;
}

.up-downbtn button {
    width: 10dvw;
    height: 0.5dvh;
    border: none;
    background-color: rgb(95, 95, 95);
    border-radius: 4dvw
}

.mainbox {
    height: auto;
    border-radius: 3dvw 3dvw 0 0;
    margin-top: auto;
    background-color: rgb(209, 209, 209);
}

.linelist {
    display: flex;
    align-items: flex-start;
    align-items: center;
    padding: 1dvh 0 3dvh 0;

}

.changebtn {
    width: 25dvw;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(177, 253, 222);
    border-radius: 3dvw;
    margin-left: 15dvw;
}

.changebtn img {
    width: 5dvw;
}

.changebtn p {
    color: rgb(23, 99, 72);
    font-size: 3.5dvw;
    margin-left: 2dvw;
}

/* ************************************************** */

.linebody {
    position: fixed;
    z-index: 4;
    width: 100dvw;
    height: 100dvh;
    background-color: rgb(167, 167, 167);
    display: flex;
    flex-direction: column;
}

.returnbtn img {
    width: 8dvw;
    padding-left: 2dvw;
    padding-right: 2dvw;
}

.returnbtn {
    padding-top: 2dvh;
    padding-bottom: 2dvh;
    z-index: 5;
    display: flex;
    justify-content: flex-start;
}

/* ************************************************** */
.wordsbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50dvw;
    height: auto;
    margin-left: 5dvw;
}

.wordline1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wordline1 p {
    line-height: 0;
    font-size: 4.5dvw;
    text-decoration: none;
    color: rgb(0, 0, 0);

}

.wordline1 img {
    width: 4dvw;
    margin-left: 1dvw;
    margin-right: 1dvw;
}

.wordline2 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wordline2 p {
    line-height: 0;
    font-size: 3dvw;
    text-decoration: none;
    color: rgb(0, 0, 0);
}

/* ************************************************** */
</style>