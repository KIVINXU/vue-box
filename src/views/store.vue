<template>
  <div>
    <mt-header title="输入单号" style="background-color: #a8d8ff;font-size: 1em;color:#333">
      <router-link :to="{path: '/', query: {id: $route.query.id}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <input type="tel" ref="input" :maxlength="20"
           class="storeInput"
           v-model="storeInput"
           autofocus>
    <mt-button size="large"
               class="store-btn"
               @click="confirmPass">确认</mt-button>
    <span class="info" @click="handleOpenError">柜门无法打开？</span>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui'
  import { submitPass } from '../api'
  export default {
    name: 'store',
    data() {
      return {
        storeInput: '',
      }
    },
    created() {
      this.getQueryID();
    },
    watch: {
      '$route.query'() {
        this.getQueryID();
      }
    },
    methods: {
      getQueryID() {
        let qid = this.$route.query.id;
        //id长度为20位且开头为'89860'
        if (qid && qid.length === 20 && qid.indexOf('89860') !== -1) {
          return true;
        }
        Toast({
          message: '网址错误',
          duration: 2000,
        });
        return false;
      },
      confirmPass() {
        if(this.getQueryID()) {
          let confirmData = {
            method: 'Carry',
            id: this.$route.query.id,
            password: this.storeInput,
            user: this.$route.query.user  //取的时候user为0
          };
          submitPass('/cabinets/eqprtu', confirmData)
            .then(response => {
              const data = response.data;
              if(data.msg && data.msg !== ''){
                Toast({
                  message: data.msg,
                  duration: 3000
                });
              }
              if(data.code === '00000') {
                this.$router.push({
                  path: '/',
                  query: {id: this.$route.query.id}
                })
              }
            })
        }
      },
      //柜门无法打开操作
      handleOpenError() {
        this.$router.push({
          path: '/error',
          query: {id: this.$route.query.id}
        })
      }
    }
  }
</script>
<style>
  .storeInput {
    text-align: center;
    margin: 5vh auto 0;
    border: 1px solid #888;
    border-radius: 6px;
    outline: none;
    width: 80vw;
    height: 40px;
    line-height: 40px;
    display: block;
    padding: 0;
    font-size: 2em;
    color: #333;
  }
  .store-btn {
    margin: 5vh auto 0;
    width: 80vw;
    background-color: #00ffe2;
    color: #333;
  }
  .info {
    display: block;
    margin-top: 2vh;
    margin-right: 10vw;
    color: #666;
    float: right;
  }
</style>
