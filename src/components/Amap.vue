<template>
    <div class="app-container">
        <div style="background-color: #ffffff;">
            <div id="container"></div>
        </div>
    </div>
    <loading v-if="showLoading" />
</template>

<style scoped>
#container {
    width: 100dvw;
    height: 92dvh;
}

.app-container {
    z-index: 1;
}

.amap-logo {
    z-index: 1;
}

.amap-icon img {
    width: auto;
}
</style>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader"
import loading from '../components/loading.vue'
import { reactive, ref, toRefs, onMounted, nextTick, onUnmounted, watch } from 'vue';
import { shallowRef } from '@vue/reactivity'
import axios from 'axios';
const emit = defineEmits(['vehicleData']);
const showLoading = ref(true);
const props = defineProps({
    lineDataLength: {
        type: Number,
        required: true
    },
    startIndex: {
        type: Number,
        required: true
    },
    selectedPoint: {
        type: Object,
        default() {
            return []
        }
    },
    rotated: {
        type: Boolean,
        required: true
    }
});


// 地图初始化以及line的四个地图 Amap~line
let map = shallowRef(null);
let refreshTimer = null;
let img0 = require("../assets/img/BYlogo.png");
let img1 = require("../assets/img/dotBlue.png");
let img2 = require("../assets/img/dotGreen.png");
let img3 = require("../assets/img/dotYellow.png");
let img4 = require("../assets/img/dotPink.png");
let busimg0 = require('../assets/img/busNorth.png')
let busimg1 = require('../assets/img/busWest.png')
let busimg2 = require('../assets/img/busNorth.png')
let busimg3 = require('../assets/img/busEast.png')
let markers = [];
watch(() => props.selectedPoint, (newPoint) => {
    if (newPoint !== null) {
        fetchVehicleLocations();
    }
});
watch(() => props.rotated, (newRotated) => {
    if (newRotated) {
        fetchVehicleLocations();
    }
});
const fetchVehicleLocations = () => {
    axios.get('https://api.hust.online/hustbus/api/v1/bus/all')
        .then((response) => {
            let vehicleData = response.data.data;
            // console.log(vehicleData);
            markers.forEach(marker => marker.setMap(null));
            markers = [];
            // 存储距离和车辆名称的数组
            let distances = [];

            // 添加点标记
            vehicleData.forEach((vehicle) => {
                let { lat, lon, direct } = vehicle;
                let position = [lon, lat];

                // 根据方向选择对应的车辆图标
                let busImg;
                switch (direct) {
                    case 0:
                        busImg = busimg0;
                        break;
                    case 1:
                        busImg = busimg1;
                        break;
                    case 2:
                        busImg = busimg2;
                        break;
                    case 3:
                        busImg = busimg3;
                        break;
                    default:
                        busImg = busimg0;
                        break;
                }

                // 添加车辆图标到地图上
                let marker = new AMap.Marker({
                    position: position,
                    icon: new AMap.Icon({
                        image: busImg,
                        imageSize: [15, 15],
                        imageOffset: new AMap.Pixel(0, 0),
                    }),
                    offset: new AMap.Pixel(-5, -5),
                    collision: true,
                    size: [30, 30],
                });
                map.add(marker);
                markers.push(marker);
            });
            // 计算距离
            if (props.selectedPoint !== null && props.selectedPoint.length != 0) {
                vehicleData.forEach((vehicle) => {
                    let { name, lat, lon } = vehicle;
                    let startPoint = new AMap.LngLat(props.selectedPoint.longitude, props.selectedPoint.latitude);
                    let endPoint = new AMap.LngLat(lon, lat);
                    let distance = AMap.GeometryUtil.distance(startPoint, endPoint);
                    distances.push({ name: name, distance: distance });
                });

                let closestVehicle = distances.reduce((prev, curr) => {
                    return (prev.distance < curr.distance) ? prev : curr;
                });
                // console.log(closestVehicle.name, props.selectedPoint.name, closestVehicle.distance);
                emit('vehicleData', closestVehicle.name, props.selectedPoint.name, closestVehicle.distance);
            }
        });

    AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            useNative: true,
        });
        geolocation.getCurrentPosition((status, result) => {
            // console.log(status)//获取用户当前的精确位置
            if (status == "complete") {
                // 但是它的经度有点离谱，定位到成都了？maybe电脑端原因
                // 2/13 回老家测了一遍，定位又非常准确
                let Iposition = result.position;
                // console.log(Iposition)
                let marker0 = new AMap.Marker({
                    position: [Iposition.lng, Iposition.lat],
                    icon: new AMap.Icon({
                        image: img0,
                        imageSize: [20, 20],
                        imageOffset: new AMap.Pixel(0, 0),
                    }),
                    offset: new AMap.Pixel(-5, -5),
                    collision: true,
                    size: [50, 50],
                });
                map.add(marker0);
                markers.push(marker0);

            }
            else {
                console.log('geolocation error')
            }
        })
    })

}
onMounted(() => {
    AMapLoader.load({
        key: "70927cd873df5b2ac1184894365771b4",
        version: "2.0",
        plugins: [Geolocation],
    })
        .then((AMap) => {
            nextTick(() => {
                showLoading.value = false;
            });
            map = new AMap.Map("container", {
                viewMode: "2D",
                zoom: 14.1,
                center: [114.42164887402342, 30.503331951035417],
                mapStyle: 'amap://styles/normal',
                touchZoom: true,
                dragEnable: true,
            });

            axios.get('/data/apiLine.json')
                .then((response) => {

                    //路线  &  站点 
                    const lineData = response.data.data;
                    // console.log(lineData)
                    for (let i = props.startIndex; i < props.lineDataLength; i++) {
                        const path = [];
                        lineData[i].points.forEach(point => {
                            path.push(new AMap.LngLat(point.longitude, point.latitude));
                            if (point.route != null) {
                                if (i == 0) {
                                    let marker1 = new AMap.Marker({
                                        position: [point.longitude, point.latitude],
                                        icon: new AMap.Icon({
                                            image: img1,
                                            imageSize: [10, 10],
                                            imageOffset: new AMap.Pixel(0, 0),
                                        }),
                                        offset: new AMap.Pixel(-5, -5),
                                        collision: true,
                                        size: [15, 15],
                                    });
                                    map.add(marker1);
                                } else if (i == 1) {
                                    let marker2 = new AMap.Marker({
                                        position: [point.longitude, point.latitude],
                                        icon: new AMap.Icon({
                                            image: img2,
                                            imageSize: [10, 10],
                                            imageOffset: new AMap.Pixel(0, 0),
                                        }),
                                        offset: new AMap.Pixel(-5, -5),
                                        collision: true,
                                        size: [15, 15],
                                    });
                                    map.add(marker2);
                                } else if (i == 2) {
                                    let marker3 = new AMap.Marker({
                                        position: [point.longitude, point.latitude],
                                        icon: new AMap.Icon({
                                            image: img3,
                                            imageSize: [10, 10],
                                            imageOffset: new AMap.Pixel(0, 0),
                                        }),
                                        offset: new AMap.Pixel(-5, -5),
                                        collision: true,
                                        size: [15, 15],
                                    });
                                    map.add(marker3);
                                } else if (i == 3) {
                                    let marker4 = new AMap.Marker({
                                        position: [point.longitude, point.latitude],
                                        icon: new AMap.Icon({
                                            image: img4,
                                            imageSize: [10, 10],
                                            imageOffset: new AMap.Pixel(0, 0),
                                        }),
                                        offset: new AMap.Pixel(-5, -5),
                                        collision: true,
                                        size: [15, 15],
                                    });
                                    map.add(marker4);
                                }

                            }
                        });
                        var polyline = new AMap.Polyline({
                            path: path,
                            strokeWeight: 7,
                            strokeOpacity: 1,
                            strokeColor: lineData[i].color,
                            lineJoin: "round",
                        });
                        map.add(polyline);
                    }
                    for (let i = props.startIndex; i < props.lineDataLength; i++) {
                        //由于第三条线路的oppositePoint为null，导致切换线路功能会在line3出现报错，故重写了下本地的json文件，后面再看情况修改代码
                        if (i === 2) {
                            continue;
                        }

                        const path1 = [];

                            lineData[i].oppositePoints.forEach(oppositePoint => {
                                path1.push(new AMap.LngLat(oppositePoint.longitude, oppositePoint.latitude));
                                if (oppositePoint.route != null) {
                                    if (i == 0) {
                                        let marker1 = new AMap.Marker({
                                            position: [oppositePoint.longitude, oppositePoint.latitude],
                                            icon: new AMap.Icon({
                                                image: img1,
                                                imageSize: [10, 10],
                                                imageOffset: new AMap.Pixel(0, 0),
                                            }),
                                            offset: new AMap.Pixel(-5, -5),
                                            collision: true,
                                            size: [15, 15],
                                        });                         
                                        map.add(marker1);
                                    } else if (i == 1) {
                                        let marker2 = new AMap.Marker({
                                            position: [oppositePoint.longitude, oppositePoint.latitude],
                                            icon: new AMap.Icon({
                                                image: img2,
                                                imageSize: [10, 10],
                                                imageOffset: new AMap.Pixel(0, 0),
                                            }),
                                            offset: new AMap.Pixel(-5, -5),
                                            collision: true,
                                            size: [15, 15],
                                        });
                                        map.add(marker2);
                                    } else if (i == 2) {
                                        let marker3 = new AMap.Marker({
                                            position: [oppositePoint.longitude, oppositePoint.latitude],
                                            icon: new AMap.Icon({
                                                image: img3,
                                                imageSize: [10, 10],
                                                imageOffset: new AMap.Pixel(0, 0),
                                            }),
                                            offset: new AMap.Pixel(-5, -5),
                                            collision: true,
                                            size: [15, 15],
                                        });
                                        map.add(marker3);
                                    } else if (i == 3) {
                                        let marker4 = new AMap.Marker({
                                            position: [oppositePoint.longitude, oppositePoint.latitude],
                                            icon: new AMap.Icon({
                                                image: img4,
                                                imageSize: [10, 10],
                                                imageOffset: new AMap.Pixel(0, 0),
                                            }),
                                            offset: new AMap.Pixel(-5, -5),
                                            collision: true,
                                            size: [15, 15],
                                        });
                                        map.add(marker4);
                                    }

                                }
                            });
                        
                        var polyline1 = new AMap.Polyline({
                            path: path1,
                            strokeWeight: 7,
                            strokeOpacity: 1,
                            strokeColor: lineData[i].color,
                            lineJoin: "round",
                        });
                        map.add(polyline1);
                    }
                })

                .catch((e) => {
                    console.log(e);
                });

            // 首次加载时调用获取车辆位置数据的函数
            fetchVehicleLocations();
            // 设置定时器，每隔 30 秒更新一次位置数据
            refreshTimer = setInterval(fetchVehicleLocations, 10000);
        });
})

// 地图聚焦 ~station
let bigimg1 = require('../assets/img/bigDotBlue.png')
let bigimg2 = require('../assets/img/bigDotGreen.png')
let bigimg3 = require('../assets/img/bigDotYellow.png')
let bigimg4 = require('../assets/img/bigDotPink.png')
var previousMarker = null

watch(() => props.selectedPoint, (newVal) => {
    if (newVal != null) {
        map.setZoomAndCenter(16, [newVal.longitude, newVal.latitude - 0.004], false, 2000);
        // 由于地图中心点靠下，故做该处理以保证点位在可显范围内
        let bigImg;
        switch (props.lineDataLength) {
            case 1:
                bigImg = bigimg1;
                break;
            case 2:
                bigImg = bigimg2;
                break;
            case 3:
                bigImg = bigimg3;
                break;
            case 4:
                bigImg = bigimg4;
                break;
            default:
                return;
        }
        const marker = new AMap.Marker({
            position: [newVal.longitude, newVal.latitude],
            icon: new AMap.Icon({
                image: bigImg,
                imageSize: [30, 35],
                imageOffset: new AMap.Pixel(0, 0),
            }),
            offset: new AMap.Pixel(-15, -32),
            collision: true,
            size: [100, 100],
        });
        map.add(marker);
        // 保存之前的大图标
        if (previousMarker) {
            map.remove(previousMarker);
        }
        previousMarker = marker;
    }
    else {
        map.setZoomAndCenter(14, [114.42087639782713, 30.499985579466813], false, 1500);
        // 清除之前的大图标
        if (previousMarker) {
            map.remove(previousMarker);
            previousMarker = null;
        }
    }
});


onUnmounted(() => {
    map.destroy();
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
});


</script>
