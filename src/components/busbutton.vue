<template>
  <button class="busbutton" data-umami-event="点击菜单校车按钮" id="select-bus-button">
    <div class="navbus">
      <img :src="imageUrl" alt="bus">
    </div>
    <div>
      <p :style="{ color: textColor }">{{ button1 }}</p>
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
      button1: '校车',
      isButton1Select: true,
    }
  }
}
</script>

<style scoped>
.busbutton {
  width: 50dvw;
  z-index:9;
  background-color: rgb(255, 255, 255);
  border: none;
}  
.busbutton p {
  line-height: 0;
  font-size: 3dvw;
}

.navbus img {
  width: 5dvw;
  margin-top: 2dvw;
}
</style>
