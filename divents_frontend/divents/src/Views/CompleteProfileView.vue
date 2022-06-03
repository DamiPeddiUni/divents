<template> <!-- html-->
  <div class="container">
    <div class="complete-title">Just a final<br><span>step</span>.</div>
    <div class="complete-panel">
      <div class="complete-input-title">
        What kind of user are you?
      </div>
      <div class="complete-big-radio">
        <div class="complete-small-radio">
          <label>
            <input type="radio" id="puser" name="type_account" value="0" v-model="user_type">
            Private User
          </label>
        </div>
        <div class="complete-small-radio">
          <label>
            <input type="radio" id="emanager" name="type_account" value="1"  v-model="user_type">
            Events Manager
          </label>
        </div>
      </div>

      <div class="row-input-photo">
        <div class="left-column-input">
          <div class="complete-input-title">
            Choose a username 
          </div>
          <input type="text" class="complete-input-text" placeholder="Username" v-model="user_name">
          <div class="complete-input-title">
            Describe yourself 
          </div>
          <textarea class="complete-textarea" placeholder="Description" rows="4" v-model="user_description"></textarea>
        </div>
        <div class="right-column-photo">
          <div class="complete-profile-picture" :style="{ 'background-image': 'url(' + user.photoURL + ')' }">
          </div>
          <!--<div class="complete-input-title">Change picture</div>-->
        </div>
      </div>

      <div v-show="user_type == 1">
        <div class="complete-input-title">
          Where are you located at? 
        </div>
        <input type="text" class="complete-input-text" placeholder="Location" v-model="user_location">
      </div>
    </div>
    <div class="submit-container">
      <button class="submit-button" @click="signUpButton">Sign up</button>
    </div>
  </div>
</template>

<script>

import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default {
  name: 'CompleteProfileView',
  data() {
    return { //variabili che compaiono nell'html
      user: {
        displayName: "",
        photoURL: ""
      }, 
      user_type: 0,
      user_name: "",
      user_description: "",
      user_location: ""
    };
  },
  methods: { // oggetto che contiene tutte le funzione
    handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          console.log("Logged in as: " + user.displayName)
          this.user = user
          this.user_name = user.displayName
          /*
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          };
          */
        } else {
          console.log("User is not authenticated")
        }
      });
    },
    signUpButton(){
      if (this.user_name.trim().length <= 0){
        console.log("Errore")
        return 
      }
      if (this.user_description.trim().length <= 0){
        console.log("Errore")
        return 
      }
      if (this.user_type == 1){
        if (this.user_location.trim().length <= 0){
          console.log("Errore")
          return 
        }
      }
      DataService.registerUser(JSON.stringify({
        auth_id: this.user.uid,
        name : this.user_name,
        email : this.user.email,
        type : this.user_type,
        profile_photo : this.user.photoURL,
        brief_presentation : this.user_description,
        location : this.user_location
      }))
      .then(response => {
        console.log(response)
        if (response.status == 200){
          DataService.generateToken(JSON.stringify({
            auth_id: this.user.uid
          }))
          .then((response) =>{
            localStorage.setItem('userToken', response.data.token);
            console.log(response.data.token)
            this.$router.push('/');
          })
          .catch((error) => {
            console.log("Errore nel controllo token")
          })
				}
      })
      .catch(error => {
        console.log(error)
      })
      
    }
  },
  mounted(){ // chiamata quando la pagina viene caricata
    this.handleAuth()
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
  .complete-title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .complete-title span{
    color: #1B98E0;
  }
  .complete-panel{
    margin-top: 30px;
    background-color: #F7F7F7;
    padding: 20px;
    border-radius: 10px;
  }
  .complete-input-text{
    width: calc(100% - 30px);
    padding: 10px 15px;
    background-color: white;
    border: none;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 25px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .complete-textarea{
    width: calc(100% - 30px);
    padding: 10px 15px;
    background-color: white;
    border: none;
    border-radius: 10px;
    margin-top: 5px;
    margin-bottom: 25px;
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .complete-big-radio{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .complete-small-radio{
    width: calc(100% - 30px);
    padding: 10px 15px;
    background-color: white;
    border-radius: 10px;
    margin: 3px 0px;
  }
  .complete-small-radio label{
    width: 100%;
    display: block;
  }
  .submit-container{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .submit-button{
    background-color: #1B98E0;
    border-radius: 30px;
    border: none;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
  }
  .row-input-photo{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .right-column-photo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .complete-profile-picture{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
