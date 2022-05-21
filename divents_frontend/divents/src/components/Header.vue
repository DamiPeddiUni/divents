<template>
  <div class="container">
    <div class="header-panel" v-if="this.isLoggedIn">
        <div class="header-left-navigation-panel">
            <a href="/">Home</a>
            <a href="/createEvent">Create Event</a>
            <a href="#" @click="this.logOut">Logout</a>
        </div>
        <a href="/profile" class="header-profile-pic" :style="{ 'background-image': 'url(' + profilePic + ')' }"></a>
    </div>
    <div class="header-panel" v-else>
        <a href="/">Home</a>
        <a href="/auth">Login</a>
    </div>
  </div>
</template>

<script>

import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      profilePic: null,
    };
  },
  methods: {
    handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.profilePic = user.photoURL;
          console.log("Logged in as: " + user.displayName)
          /*
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          };
          */
        } else {
          this.isLoggedIn = false;
          console.log("User is not authenticated")
        }
      });
    },
    logOut(){
      getAuth().signOut()
      .then(() => {
        this.$router.push('/');
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted(){
    this.handleAuth()
  }
}
</script>


<style scoped>
  .container{
      background: #F7F7F7;
      width: calc(100% - 20px);
      height: 50px;
      padding: 0 10px;
  }
  .header-panel{
      display: flex;
      height: 100%;
      width: 100%;
      max-width: 1024px;
      margin: 0 auto;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
  }
  .container a{
      font-size: 12px;
      text-decoration: none;
      color: black;
  }
  .header-profile-pic{
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      background-color: #e5e5e5;
      border-radius: 50%;
  }
  .header-left-navigation-panel{
      display: flex;
      flex-direction: row;
      gap: 10px;
  }
  .header-left-navigation-panel a{
      font-size: 12px;
  }
</style>
