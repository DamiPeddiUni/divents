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
      
    };
  },
  methods: {
    authWithGoogle(){
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
			signInWithPopup(auth, provider)
			.then((result) => {
				console.log(result.user);
				console.log(auth.currentUser);

				// if completed
        this.$router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
    }
  },
  mounted(){
    
  }
}
</script>


<style scoped>
  .container{
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
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
