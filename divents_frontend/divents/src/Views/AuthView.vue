<template>
  <div class="container">
    <div class="auth-title">Join our<br><span>community</span>.</div>
    <div class="auth-panel">
      <div class="auth-text">Access via:</div>
      <div class="auth-google-button" @click="authWithGoogle"></div>
    </div>
  </div>
</template>

<script>

import DataService from '@/services/DataService';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

export default {
  name: 'AuthView',
  data() {
    return {
      user: null,
    };
  },
  methods: {
    authWithGoogle(){
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
			signInWithPopup(auth, provider)
			.then((result) => {
				this.user = result.user;
				console.log(auth.currentUser);
        this.checkUserAuth(this);
			})
			.catch((error) => {
				console.log(error);
			});
    },
    checkUserAuth(self){
      DataService.checkUserAuth(this.user.uid)
      .then(response => {
        var profile_completed = response.data.profile_completed
        console.log('entra in checkuserauth', profile_completed)
        if (profile_completed){
          console.log('1 profilo completo', this.user.uid)
          DataService.generateToken(JSON.stringify({
            auth_id: this.user.uid
          }))
          .then((response) =>{
            localStorage.setItem('userToken', response.data.token);
            console.log(response.data.token)
            self.$router.push('/');
          })
          .catch((error) => {
            console.log("Errore nel controllo token")
          })
        
        }else{
          console.log('aaaaaaaaaaaaaa')
          self.$router.push('/completeProfile');
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted(){
    
  }
}
</script>


<style scoped>
  .container{
    width: calc(100% - 20px);
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
  }
  .auth-title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .auth-title span{
    color: #1B98E0;
  }
  .auth-panel{
    margin-top: 30px;
  }
  .auth-google-button{
    margin-top: 20px;
    width: 50px;
    height: 50px;
    background-image: url('../assets/googleauth.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px;
    border-radius: 50%;
  }
</style>
