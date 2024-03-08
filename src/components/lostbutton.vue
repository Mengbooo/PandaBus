<template>
  <button class="lostbutton" data-umami-event="点击菜单帮助按钮" id="select-lost-button">
    <div class="navlost">
      <img :src="imageUrl" alt="lost">
    </div>
    <div>
      <p :style="{ color: textColor }">{{ button2 }}</p>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      button2: '帮助',
      isButton2Select: false,
    }
  }
}
</script>

<style scoped>
.lostbutton {
  width: 50dvw;
  z-index:9;
  background-color: rgb(255,255,255);
  border: none;
}  
.lostbutton p {
  line-height: 0;
  font-size: 3dvw;
  text-decoration: none;
}

.navlost img {
  width: 5dvw;
  margin-top: 2dvw;
}
</style>
