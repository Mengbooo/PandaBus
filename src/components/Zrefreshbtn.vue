<template>
    <div class="refreshbox" >
      <div class="refreshbtn" @click="rotateImage">
        <img :class="{ 'rotate': rotated }" src="../assets/img/refresh.png" alt="">
        <p>刷新</p>
      </div>
      <div class="BYslogan">
        <img src="../assets/img/BYlogo.png" alt="">
        <p>Powered By Bingyan Studio</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rotated: false
      };
    },
    methods: {
      rotateImage() {
        this.rotated = true;
        setTimeout(() => {
          this.rotated = false;
        }, 800); 
      }
    }
  };
  </script>

<style scoped>
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
</style>