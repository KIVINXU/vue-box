<template>
  <div>
    <div class="main-div">
      <div class="image-div">
        <img src="../assets/background.png" width="58%" alt="">
      </div>
      <p class="title-text">
        <span>智能云储柜</span>
        <span class="title-en">Intelligent Cabinets</span>
      </p>
      <div class="btn-div">
        <mt-button class="out-btn"
                   :disabled="btnFlag"
                   style="margin-right: 3vw"
                   @click.native="handleStore(1)">存</mt-button>
        <mt-button class="out-btn"
                   :disabled="btnFlag"
                   @click.native="handleJump(0)">取</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { submitUser } from '../api'
  export default {
    name: 'starter',
    data(){
      return {
        queryId: '', //柜子编号
        btnFlag: true
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
        if(qid && qid.length === 20 && qid.indexOf('89860') !== -1){
          this.btnFlag = false;
          this.queryId = this.$route.query.id;
        }else {
          Toast({
            message: '网址错误',
            duration: 2000,
          });
          this.btnFlag = true;
        }
      },
      handleJump(user) {
        this.$router.push({
          path: '/open',
          query: {id: this.queryId, user: user}
        })
      },
      handleStore(user) {
        this.$router.push({
          path: '/store',
          query: {id: this.queryId, user: user}
        })
      }
    }
  }
</script>
<style>
  .main-div {
    height: 90%;
    padding-top: 2vh;
  }
  .image-div {
    height: 60vh;
    width: 50vh;
    line-height: 60vh;
    border-radius: 50%;
    margin: 0 auto;
    background-color: #eef5fe;
  }
  .image-div img {
    vertical-align: middle;
  }
  .title-text {
    color: #333;
    font-size: 2rem;
  }
  .title-text .title-en {
    font-size: 1.2rem;
    display: block
  }
  .btn-div {
    padding: 3vh;
  }
  .btn-div .out-btn{
    width: 40vw;
    height: 9vh;
    font-size: 2rem;
    background-color: #00ffe2;
    color: #333;
  }
  
</style>
