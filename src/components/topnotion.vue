<template>
  <div class="topNotion">
    <div class="notionIcon">
      <img src="../assets/img/notion.png" alt="notion">
    </div>
    <div class="Notioninfo">
      <div class="notionLine">
        <p>{{ text }}</p>
      </div>
      <div class="groupNum">
        <span @click="copyText(number)">{{ number }}</span>
      </div>
    </div>
  </div>

  <div class="copyinfo" v-show="iscopyinfo">
    <p>已复制到剪贴板</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'topnotion',
  data() {
    return {
      iscopyinfo: false,
      text: '',
      number: '',
      noticeContent: '',
    }
  },
  methods: {
    copyText(text) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.iscopyinfo = true;
      setTimeout(() => {
        this.iscopyinfo = false;
      }, 3000);
    },
    async fetchNoticeContent() {
      try {
        const response = await axios.get('https://api.hust.online/hustbus/api/v1/notice/all');
        const data = response.data;
        // console.log(data)
        if (data.success && data.data.length > 0) {
          const notice = data.data[0].content[0];
          this.noticeContent = notice;
          const noticetext = notice.match(/^(.+)\${/)[1];
          this.text = noticetext;
          const noticenumber = notice.match(/\${([^}]*)}\$/)[1];
          this.number = noticenumber;
        }
      } catch (error) {
        console.error(error);
        this.noticeContent = "获取公告时出错";
      }
    },
  },
  created() {
    this.fetchNoticeContent();
  }
}

</script>

<style scoped>
.copyinfo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  width: 90dvw;
  height: 6dvh;
  border-radius: 3dvw;
  margin-top: 2dvh;
  position: fixed;
  top: 2dvw;
  z-index: 3;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.copyinfo p {
  font-size: 4dvw;
}

.topNotion {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  width: 90dvw;
  height: 6dvh;
  border-radius: 3dvw;
  margin-top: 2dvh;
  position: fixed;
  top: 2dvw;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;

}

.Notioninfo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.notionIcon img {
  width: 5dvw;
  margin-top: 3px;
}

.notionLine {
  font-size: 3.5dvw;
  margin-right: 2dvw;
  margin-left: 2dvw;
  line-height: 0;
}

.notionLine p {
  font-size: 3.5dvw;
  color: rgb(110, 110, 110);
}

.groupNum {
  font-size: 3.5dvw;
  line-height: 0;
  color: aqua;
  text-decoration: underline;
}
</style>
