<template>
  <button class="callbus" @click="startCountDown" :style="backgroundStyle" data-umami-event="点击催车按钮"
    id="callbus-button" :disabled="isCallingBus">
    <img src="../assets/img/callBus.png" alt="callbus" v-show="!countdowning" >
    <span>{{ countdownMessage }}</span>
  </button>
  <callbusinfo v-show="showInfo" />
  <callbuserror v-show="showError" />
</template>

<script>
import callbusinfo from '../components/callbusinfo.vue'
import callbuserror from '../components/callbuserror.vue'
import axios from 'axios';

const COUNTDOWN_INTERVAL = 10000; // 10秒
const GRADIENT_ACTIVE = 'linear-gradient(45deg, rgb(153, 94, 0), rgb(255, 200, 0))';
const GRADIENT_INACTIVE = 'linear-gradient(45deg, rgb(49, 126, 126), rgb(108, 228, 214))';

export default {
  components: {
    callbusinfo,
    callbuserror,
  },
  data() {
    return {
      showError: false,
      showInfo: false,
      isCallingBus: false,
    }
  },
  computed: {
    countdowning() {
      return this.$store.state.countdowning;
    },
    countdown() {
      return this.$store.state.countdown;
    },
    backgroundStyle() {
      return {
        background: this.countdowning ? GRADIENT_ACTIVE : GRADIENT_INACTIVE
      };
    },
    countdownMessage() {
      return this.countdowning ? `${this.countdown}秒后可催车` : '催一催';
    },
  },
  methods: {
    async startCountDown() {
      try {
        const position = await this.getCurrentPosition();
        // console.log(position)
        if (this.isPositionInRange(position)) {
          const apiUrl1 = "/api/bus/alert";
          const lat = position.kT;
          const lon = position.KL;
          await axios.post(apiUrl1, { lat, lon });
          this.isCallingBus = true;
          this.showInfo = true;
          setTimeout(() => {
            this.showInfo = false;
          }, 4000);
          this.$store.commit('startCountDown');
          this.startWaitingInterval(lat, lon);
          try {
            const apiUrl3 = "/api/bus/waiting";
            const response = await axios.get(apiUrl3);
            this.responseData = response.data;
            // console.log(this.responseData);
          } catch (error) {
            console.error(error);
          }
        } else {
          this.showError = true;
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        AMap.plugin("AMap.Geolocation", () => {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
          });
          geolocation.getCurrentPosition((status, result) => {
            if (status === "complete") {
              resolve(result.position);
            } else {
              reject(new Error("Failed to get current position."));
            }
          });
        });
      });
    },
    isPositionInRange(position) {
      return (
        position.kT >= 30.505 &&
        position.kT <= 30.520 &&
        position.KL >= 114.380 &&
        position.KL <= 114.440
      );
    },
    async startWaitingInterval(lat, lon) {
      const apiUrl2 = "/api/bus/waiting";
      let count = 0;
      const intervalId = setInterval(async () => {
        if (count >= 6) {
          clearInterval(intervalId);
          // console.log(count);
          this.isCallingBus = false;
          return;
        }
        try {
          const response = await axios.post(apiUrl2, { lat, lon });
          // console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        count++;
        console.log(count);
      }, COUNTDOWN_INTERVAL);
    },
  },
};
</script>

<style scoped>
.callbus {
  width: 30dvw;
  height: 6dvh;
  border-radius: 16dvw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 48%;
  right: 5%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 2;
  border: none;
}

.callbus img {
  width: 5dvw;
}

.callbus span {
  font-size: 4dvw;
  margin-left: 2dvw;
  color: rgb(255, 255, 255)
}
</style>