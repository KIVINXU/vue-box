var aesjs = require('aes-js');
import request from '../utils/request'

//密码加密
export function cryptoPass(password) {
  let key = [0x7a, 0x6a, 0x64, 0x67, 0x6d, 0x7e, 0x21, 0x40, 0x23, 0x24, 0x25, 0x5e, 0x26, 0x2a, 0x28, 0x29];
  
  //产生随机数
  let iv = [], rn;
  for(let i = 0; i < 16; i++) {
    rn = Math.floor(Math.random()*256);
    iv[i] = rn;
  }
  //加密
  let password_bytes = aesjs.utils.utf8.toBytes(password);
  let aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 1);
  let encrypted_bytes = aesCfb.encrypt(password_bytes);
  //转为hex
  return aesjs.utils.hex.fromBytes(iv) + aesjs.utils.hex.fromBytes(encrypted_bytes);
}

//提交密码
export function submitPass(url, data) {
  data.password = cryptoPass(data.password);
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
//提交存还是取
export function submitUser(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data
  })
}
