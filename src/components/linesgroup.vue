<template>
    <div class="linesgroup">
        <router-link v-for="item in items" :key="item.id" :to="`/Line${item.id}`" class="line">
            <div class="dot">
                <img :src="item.dot" alt="">
            </div>
            <div class="wordsbox">
                <div class="wordline1">
                    <p>{{ item.source }}</p>
                    <img :src="item.return" alt="">
                    <p>{{ item.destination }}</p>
                </div>
                <div class="wordline2">
                    <p v-if="item.id == 1 || item.id == 2 || item.id == 3">{{ item.schedule }}</p>
                    <p v-if="item.id == 4">{{ item.description }}</p>
                </div>
            </div>
            <div class="rightarrow">
                <img src="../assets/img/rightArrow.png" alt="rightarrow">
            </div>
        </router-link>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        axios.get('https://api.hust.online/hustbus/api/v1/route')
            .then(response => {
                this.items = response.data.data.routes.map(route => ({
                    id: route.id,
                    source: route.beginLocation,
                    destination: route.endLocation,
                    description: route.description,
                    schedule: `首班${route.beginTime}  末班${route.endTime}  ${route.interval}分钟/每班`,
                    dot: this.getDotImagePath(route.id),
                    return: route.id === 4 ? '' : require('../assets/img/return-1.png')
                }));
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        getDotImagePath(routeId) {
            const dotImages = {
                4: require('../assets/img/dotPink.png'),
                3: require('../assets/img/dotYellow.png'),
                2: require('../assets/img/dotGreen.png'),
                default: require('../assets/img/dotBlue.png')
            };
            return dotImages[routeId] || dotImages.default;
        },
    }
};
</script>
  
<style scoped>
.linesgroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 255, 255);
    border-radius: 4dvw;
    width: 90dvw;
    height: auto;
    position: fixed;
    bottom: 10%;
    padding-top: 2dvh;
    padding-bottom: 2dvh;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 2;
}

.line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80dvw;
    text-decoration: none;
    color: rgb(0, 0, 0);
}


.wordsbox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 65dvw;
    height: 8dvh;
}

.wordline1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.wordline1 p {
    line-height: 0;
    font-size: 2.3dvh;
    text-decoration: none;
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

.wordline2 p{
    line-height: 0;
    font-size: 1.5dvh;
    text-decoration: none;
    color: rgb(100, 100, 100);
}

.dot img {
    width: 4dvw;
    margin-right: 4dvw;
}

.rightarrow img {
    width: 2dvw;
}
</style>
  