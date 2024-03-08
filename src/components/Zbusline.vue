<template>
    <div class="buslinebox">
        <div class="buttonboxgroup" v-for="(point, index) in pointsWithRoute" :key="index">
            <div class="line" v-if="index !== 0"></div>
            <div class="buttonbox" @click="handleClick(index)">
                <div :class="['button', { 'button-active': activeIndex === index }]">
                    <img src="../assets/img/return.png" alt="" v-if="index != 0" />
                    <p v-if="index === 0">始</p>
                </div>
                <div class="point">
                    <p>{{ point.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        lineId: {
            type: Number,
            required: true
        },
        isNormalDirection: { // 新增 prop
            type: Boolean,
            default: true // 默认值为 true，表示正常方向
        }
    },
    data() {
        return {
            stationdata: null,
            activeIndex: null,
        };
    },
    methods: {
        handleClick(index) {
            // 如果点击的是当前激活的 buttonbox，则取消激活状态，否则设置为激活状态
            this.activeIndex = this.activeIndex === index ? null : index;
        },
    },
    computed: {
        pointsWithRoute() {
            if (this.stationdata) {
                const lineData = this.stationdata.find(data => data.id === this.lineId);
                if (lineData) {
                    // 根据 isNormalDirection 决定使用 points 还是 oppositePoints
                    const pointsArray = this.isNormalDirection ? lineData.points : lineData.oppositePoints;
                    return pointsArray.filter(point => point.route !== null).slice(0, 5).map(point => {
                        point.clicked = false;
                        // 在每个点上添加经纬度信息
                        const latitude = point.latitude;
                        const longitude = point.longitude;
                        point.latitude = latitude;
                        point.longitude = longitude;
                        return point;
                    });
                }
            }
            return [];
        },
    },
    beforeMount() {
        axios.get('/data/apiLine.json')
            .then((response) => {
                this.stationdata = response.data.data;
                console.log(this.stationdata)
            })
            .catch((error) => {
                console.error('Error fetching station data', error);
            });
    }
};
</script>

<style scoped>
.buslinebox {
    display: flex;
    justify-content: center;
    height: 15dvh;
    padding: 5dvh 0 10dvh 0;
}

.buttonbox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttonboxgroup {
    display: flex;
    align-items: flex-start;
}

.button {
    background-color: rgb(68, 214, 190);
    border-radius: 50%;
    padding: 1dvw;
    width: 4dvw;
    height: 4dvw;
    align-items: center;
    justify-content: center;
    display: flex;
}

.button-active {
    background-color: rgb(246, 177, 88);
    /* 激活状态下的背景颜色 */
}

.button p {
    line-height: 0;
    font-size: 3dvw;
    color: rgb(235, 251, 248);
}

.button img {
    width: 3.5dvw;
}

.point p {
    margin-top: 1dvh;
    line-height: 0;
    font-size: 4dvw;
    color: rgb(0, 0, 0);
    writing-mode: vertical-lr;
    letter-spacing: 0.1dvh;
}

.line {
    width: 12dvw;
    height: 0.5dvh;
    background-color: rgb(236, 251, 248);
    /* position: absolute; */
    margin-top: 1dvh;
}
</style>
  