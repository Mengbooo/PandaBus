<template>
  <div class="wholeBody">
    <topnotion />
    <linesgroup />
    <callbus />
    <router-view></router-view>
  </div>
  <Amap :lineDataLength="4" :startIndex="0" :rotated="true" />
  <div class="buttongroup">
    <busbutton :imageUrl="require('../assets/img/navBusSelected.png')" textColor="aqua" />
    <router-link to="/about" style="text-decoration: none;">
      <lostbutton :imageUrl="require('../assets/img/navLost.png')" textColor="grey" />
    </router-link>
  </div>
</template>
  
<script>
import topnotion from '../components/topnotion.vue'
import busbutton from '../components/busbutton.vue'
import lostbutton from '../components/lostbutton.vue'
import linesgroup from '../components/linesgroup.vue'
import callbus from '../components/callbus.vue'
import Amap from '../components/Amap.vue'


export default {
  name: 'App',
  components: {
    topnotion,
    busbutton,
    lostbutton,
    linesgroup,
    callbus,
    Amap,

  }
}
</script>
  
<style >
.wholeBody {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 防止点击line时，有蓝色边框残余 */
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707876;
  /* margin-top: 20dvh; */
}

body {
  background: linear-gradient(to bottom, rgb(121, 121, 121), rgb(255, 255, 255));
  margin: 0;

}

.buttongroup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8dvh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
}

*{
    user-select: none;
}
</style>
  