<template>
    <div class="wholebody">
        <div class="returnbtn">
            <router-link to="/">
                <img src="../assets/img/leftarrow.png" alt="Return to the previous page" />
            </router-link>
        </div>
        <div class="Amap">
            <Amap :lineDataLength="lineData.id" :startIndex="lineData.id - 1" :selectedPoint="selectedPoint"
                :rotated="rotated" @vehicleData="handleVehicleData" />
        </div>
        <div class="mainbox" :key="lineData.id">
            <div class="up-downbtn" @click="handleclick()">
                <button></button>
            </div>
            <div class="linelist">
                <div class="wordsbox">
                    <div class="wordline1">
                        <p>{{ lineData.source }}</p>
                        <img :src="lineData.return" alt="" />
                        <p>{{ lineData.destination }}</p>
                    </div>
                    <div class="wordline2">
                        <p>{{ lineData.schedule }}</p>
                    </div>
                </div>
                <div class="changebtn" v-show="lineData.id === 1 || lineData.id === 2 || lineData.id === 3"
                    @click="switchDirection">
                    <img src="../assets/img/return-1.png" alt="" />
                    <p>切换方向</p>
                </div>
            </div>
            <!-- //busnotion.vue //busline.vue -->
            <div class="secondarybox" :style="{ maxHeight: isshow ? '50dvh' : 0 }">
                <div class="thirdbox">
                    <div class="businfobox" :style="{ maxHeight: isbusinfoshow ? '30dvh' : 0 }">
                        <p :style="{ opacity: isbusinfoshow ? 1 : 0 }">
                            <strong>{{ closestVehicleName }}号车</strong> 距离 <strong>{{ selectedPointName }}站</strong>
                            <br />
                            <strong>{{ closestVehicleDistance }}米</strong>
                        </p>
                    </div>
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
                </div>
                <div class="refreshbox">
                    <div class="refreshbtn" @click="rotateImage">
                        <img :class="{ 'rotate': rotated }" src="../assets/img/refresh.png" alt="" />
                        <p>刷新</p>
                    </div>
                    <div class="BYslogan">
                        <img src="../assets/img/BYlogo.png" alt="" />
                        <p>Powered By Bingyan Studio</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import apiData from '../../public/data/apiRoute.json';
import Amap from '../components/Amap.vue';
import axios from 'axios';

export default {
    data() {
        return {
            lineData: {},
            isshow: true,
            isbusinfoshow: false,
            isNormalDirection: true,
            stationdata: null,
            activeIndex: null,
            rotated: false,
            selectedPoint: null,
            closestVehicleName: '',
            selectedPointName: '',
            closestVehicleDistance: ''
        };
    },
    created() {
        this.getLineData();
    },
    methods: {
        handleVehicleData(closestVehicleName, selectedPointName, closestVehicleDistance) {
            // console.log(closestVehicleName, selectedPointName, Math.round(closestVehicleDistance));
            this.closestVehicleName = closestVehicleName;
            this.selectedPointName = selectedPointName;
            this.closestVehicleDistance = Math.round(closestVehicleDistance);
        },
        getLineData() {
            const id = this.$route.params.id;
            const route = apiData.data.routes.find(route => route.id === parseInt(id));
            // console.log(route)
            if (route.id == 1 || route.id == 2 || route.id == 3) {
                this.lineData = {
                    id: route.id,
                    source: route.beginLocation,
                    destination: route.endLocation,
                    schedule: `首班${route.beginTime} 末班${route.endTime} ${route.interval}分钟/每班`,
                    return: require('../assets/img/doubleArrow.png')
                };
            }
            else {
                this.lineData = {
                    id: route.id,
                    source: route.beginLocation,
                    destination: route.endLocation,
                    schedule: `按需调整班次整点发车`,
                    return: ''
                };
            }
        },
        handleclick() {
            this.isshow = !this.isshow;
        },
        switchDirection() {
            [this.lineData.source, this.lineData.destination] = [this.lineData.destination, this.lineData.source];
            this.isNormalDirection = !this.isNormalDirection;
            this.activeIndex = null;
            this.selectedPoint = null;
            this.isbusinfoshow = false;
        },
        handleClick(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null; // 取消激活状态
                this.selectedPoint = null; // 清空选中的点
                this.isbusinfoshow = false;
            } else {
                this.activeIndex = index; // 设置为激活状态
                this.isbusinfoshow = true;
                this.selectedPoint = this.pointsWithRoute[index]; // 更新选中的点
                // console.log(this.selectedPoint);
                this.isactive = !this.isactive;
            }
            // console.log(this.selectedPoint)
            // console.log(this.activeIndex)
        },
        rotateImage() {
            this.rotated = true;
            setTimeout(() => {
                this.rotated = false;
            }, 800);
        }
    },
    components: {
        Amap
    },
    computed: {
        pointsWithRoute() {
            if (this.stationdata) {
                const lineData = this.stationdata.find(data => data.id === this.lineData.id);
                if (lineData) {
                    // 根据 isNormalDirection 决定使用 points 还是 oppositePoints
                    const pointsArray = this.isNormalDirection ? lineData.points : lineData.oppositePoints;
                    return pointsArray.filter(point => point.route !== null).slice(0, 5).map(point => {
                        return point;
                    });
                }
            }
            return [];
        }
    },
    beforeMount() {
        axios
            .get('/data/apiLine.json')
            .then(response => {
                this.stationdata = response.data.data;
                // console.log(this.stationdata);
            })
            .catch(error => {
                console.error('Error fetching station data', error);
            });
    }
};
</script>
<style scoped>
.wholebody {
    position: fixed;
    width: 100dvw;
    height: 100dvh;
}

.Amap {
    z-index: 1;
    position: absolute;
    top: 0;
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
    background-color: rgb(255, 255, 255);
    z-index: 3;
    position: absolute;
    bottom: 0%;
}

.linelist {
    display: flex;
    align-items: flex-start;
    align-items: center;
    padding: 1dvh 0 3dvh 0;
    z-index: 3;
}

.changebtn {
    width: 25dvw;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(235, 253, 251);
    border-radius: 3dvw;
    margin-left: 15dvw;
    z-index: 3;
}

.changebtn img {
    width: 5dvw;
    z-index: 3;
}

.changebtn p {
    color: rgb(52, 191, 182);
    font-size: 3.5dvw;
    margin-left: 2dvw;
    z-index: 3;
}

/* ************************************************** */



.returnbtn img {
    width: 8dvw;
    padding-left: 2dvw;
    padding-right: 2dvw;
    z-index: 2;
    position: absolute;
}

.returnbtn {
    padding-top: 2dvh;
    padding-bottom: 2dvh;
    z-index: 0;
    width: 12dvw;
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
    z-index: 3;
}

.wordline1 {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.wordline1 p {
    line-height: 0;
    font-size: 4.5dvw;
    text-decoration: none;
    color: rgb(0, 0, 0);
    z-index: 3;

}

.wordline1 img {
    width: 4dvw;
    margin-left: 1dvw;
    margin-right: 1dvw;
    z-index: 3;
}

.wordline2 {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.wordline2 p {
    line-height: 0;
    font-size: 3dvw;
    text-decoration: none;
    color: rgb(153, 153, 153);
    z-index: 3;
}

/* ************************************************** */
.secondarybox {
    transition: max-height 1s ease;
    z-index: 3;
}

/* ************************************************** */
.businfobox {
    height: 9dvh;
    width: 40dvw;
    margin-left: 5dvw;
    margin-bottom: 2dvh;
    border-radius: 2dvw;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: max-height 1s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
}

.businfobox p {
    transition: opacity 0.5s ease-in-out;
    font-size: 3dvw;
    color: rgb(77, 77, 77);
}

/* busline */
.buslinebox {
    display: flex;
    justify-content: center;
    height: 15dvh;
    padding: 2dvh 0 4dvh 0;
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

/* ************************************************** */
/* refreshbtn */

.rotate {
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.refreshbox {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: auto;
}

.refreshbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, rgb(49, 126, 126), rgb(108, 228, 214));
    width: 25dvw;
    height: 6dvh;
    border-radius: 15dvw;
}

.refreshbtn img {
    width: 5dvw;
}

.refreshbtn p {
    font-size: 4dvw;
    margin-left: 2dvw;
    color: rgb(255, 255, 255);
}

.BYslogan {
    display: flex;
    align-items: center;
    justify-content: center;

}

.BYslogan img {
    width: 5dvw;
}

.BYslogan p {
    font-size: 3dvw;
    margin-left: 3dvw;
    color: rgb(102, 102, 102);
}

*{
    user-select: none;
}
</style>