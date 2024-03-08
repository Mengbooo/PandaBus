<template>
  <div class="wholebody" >
    <div class="imggroup">
      <topbanner />
      <helpgroup />
    </div>
    <p style="font-size: 3dvw;">
      Powered By Bingyan Studio
    </p>
  </div>
  <div class="buttongroup">
    <router-link to="/" style="text-decoration: none;">
      <busbutton :imageUrl="require('../assets/img/navBus.png')" textColor="grey" />
    </router-link>
    <lostbutton :imageUrl="require('../assets/img/navLostSelected.png')" textColor="aqua" />
  </div>
</template>


<script>
import busbutton from '../components/busbutton.vue'
import lostbutton from '../components/lostbutton.vue'
import topbanner from '../components/topbanner.vue'
import helpgroup from '../components/helpgroup.vue'


export default {
  name: "App2",
  components: {
    busbutton,
    lostbutton,
    topbanner,
    helpgroup,
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707876;
  /* margin-top: 20dvh; */
}

body {
  background-color: rgb(80, 80, 80);
  margin: 0;

}


.imggroup {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wholebody {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wholebody p {
  position: fixed;
  bottom: 8%;
}

*{
    user-select: none;
}

</style>