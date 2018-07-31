<template>
  <div>
    <mt-header title="反馈信息" style="background-color: #a8d8ff;font-size: 1em;color:#333">
      <router-link :to="{path: '/', query: {id: $route.query.id}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="联系人" :state="nameState"
              @keyup.native="nameVali"
              :disableClear="true"
              placeholder="请输入联系人姓名" v-model="uploadMsg.name"></mt-field>
    <mt-field label="手机号" :state="telState"
              @keyup.native="telVali"
              :disableClear="true"
              placeholder="请输入手机号码" type="tel" v-model="uploadMsg.tel"></mt-field>
    <mt-field label="取件码" :state="passwdState"
              @keyup.native="passwdVali"
              :disableClear="true"
              placeholder="请输入取件码" type="tel"
              v-model="uploadMsg.passwd"></mt-field>
    
    <mt-field label="详细描述" placeholder="请详细描述问题" type="textarea" rows="4" v-model="uploadMsg.descr"></mt-field>
    <mt-button size="large"
               class="confirm-btn"
               @click="confirmPass">确认</mt-button>
  </div>
</template>
<script>
  import { Toast, Indicator } from 'mint-ui'
  import { submitUser } from '../api'
  export default {
    name: 'error',
    data() {
      return {
        uploadMsg: {
          id: this.$route.query.id,
          name: '',
          tel: '',
          passwd: '',
          descr: ''
        },
        nameState: '',
        telState: '',
        passwdState: '',
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
      nameVali() {
        if(this.uploadMsg.name !== ''){
          this.nameState = 'success'
        }else {
          this.nameState = 'error';
          Toast({
            message: '联系人姓名不能为空',
            duration: 2000,
          });
        }
      },
      telVali() {
        if(this.uploadMsg.tel !== ''){
          this.telState = 'success'
        }else {
          this.telState = 'error';
          Toast({
            message: '手机号码不能为空',
            duration: 2000,
          });
        }
      },
      passwdVali() {
        if(this.uploadMsg.passwd !== ''){
          this.passwdState = 'success'
        }else {
          this.passwdState = 'error';
          Toast({
            message: '取件码不能为空',
            duration: 2000,
          });
        }
      },
      getState() {
        if(this.nameState !== 'success' || this.telState !== 'success' || this.passwdState !== 'success'){
          this.nameState = 'error';
          this.telState = 'error';
          this.passwdState = 'error';
          return false
        }else {
          return true
        }
      },
      confirmPass() {
        if(this.getQueryID() && this.getState()) {
          let Data = Object.assign({method: 'Error'}, this.uploadMsg);
          submitUser('/cabinets/eqprtu', Data)
            .then(response => {
              const data = response.data;
              if(data.msg && data.msg !== ''){
                Toast({
                  message: data.msg,
                  duration: 3000
                });
              }
//              if(data.code === '00000') {
//                this.$router.push({
//                  path: '/',
//                  query: {id: this.$route.query.id}
//                })
//              }
            })
        }
      }
    }
  }
</script>
<style>
  .mint-field {
    background-color: #a0d8ff;
    color: #333;
    border: 1px solid #aaa;
    border-radius: 6px;
    margin-bottom: -1px;
  }
  .confirm-btn {
    margin: 5vh auto 0;
    width: 80vw;
    background-color: #00ffe2;
    color: #333;
  }
</style>
