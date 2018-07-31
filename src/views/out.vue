<template>
  <div>
    <mt-header title="输入取件码" style="background-color: #a8d8ff;font-size: 1em;color:#333">
      <router-link :to="{path: '/', query: {id: $route.query.id}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!--<ul class="write-input clearfix">-->
      <!--<input type="tel"  ref="input" :maxlength="8"-->
             <!--class="realInput"-->
             <!--v-model="realInput"-->
             <!--autofocus-->
             <!--@keyup="getNum()"-->
             <!--@keydown="delNum()">-->
      <!--<li v-for="item in disInputs">-->
        <!--<input type="tel" maxlength="1"-->
               <!--readonly  v-model="item.value">-->
      <!--</li>-->
    <!--</ul>-->
    <input type="tel" ref="input" :maxlength="6"
           class="realInput"
           v-model="realInput"
           autofocus>
    <mt-button size="large"
               class="confirm-btn"
               @click="confirmPass">确认</mt-button>
    <span class="info" @click="handleOpenError">柜门无法打开？</span>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui'
  import { submitPass } from '../api'
  export default {
    name: 'out',
    data() {
      return {
        disInputs:[
          {value:''},
          {value:''},
          {value:''},
          {value:''},
          {value:''},
          {value:''},
          {value:''},
          {value:''}
        ],
        realInput: '',
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
      //获取真实输入框的值，赋值给显示的数组
      getNum() {
        for(let i = 0; i < this.realInput.length; i++) {
          this.disInputs[i].value = this.realInput.charAt(i);
        }
      },
      delNum() {
        let e = window.event;
        if(e.keyCode === 8) {
          if(this.realInput.length > 0) {
            this.disInputs[this.realInput.length - 1].value = '';
          }
        }
      },
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
            method: 'Take',
            id: this.$route.query.id,
            password: this.realInput,
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
  .write-input {
    width: 80vw;
    text-align: center;
    margin: 5vh auto 0;
    position: relative;
    height: 40px;
    border: 1px solid #888;
    border-radius: 6px;
    overflow: hidden;
  }
  .write-input li{
    float: left;
    width: 10vw;
    min-height: 40px;
    margin-left: -1px;
    border-left:1px solid #888;
  }
  .write-input li input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border:0;
    width: 10vw;
    padding: 0;
    text-align: center;
    min-height: 40px;
    line-height: 40px;
    font-size: 1.4em;
    color: #000;
  }
  .realInput {
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
  /*.realInput {*/
    /*-webkit-appearance: none;*/
    /*-moz-appearance: none;*/
    /*-ms-appearance: none;*/
    /*resize: none;*/
    /*outline: none;*/
    /*caret-color: transparent;*/
    /*border: 0;*/
    /*z-index: 99;*/
    /*position: absolute;*/
    /*width: 80vw;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*background: none;*/
    /*display: block;*/
    /*padding: 0;*/
    /*!*left: 50%;*!*/
    /*!*margin-left: -40vw;*!*/
    /*top: 0;*/
    /*opacity: 0;*/
    /*font-size: 2em;*/
    /*color: #000;*/
    /*text-indent: -5em;*/
  /*}*/
  .confirm-btn {
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
