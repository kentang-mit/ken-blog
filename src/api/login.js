import Axios from 'axios'
import md5 from 'md5'

export default{
  login(username, password){
    var config = {
      method: 'post',
      url: '/api/login',
      data: {
        username: username,
        password: md5(password)
      }
    }
    return Axios(config);
  }
}