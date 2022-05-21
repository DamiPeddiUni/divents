<template>
  <div class="container">
    <div>
      <img class="image-containter" :src="event.photos[0]">
    </div>

    <div class="grid-container">
      <div>
        <div class="event-title" colspan="2">{{event.title}}</div>
        <div class="flex-two-column">
          <div class="light-blue-text">Location</div>
          <div class="text-right">{{data}}</div>
        </div>
        <div class="event-brief-description">
          {{event.brief_descr}}
        </div>
        <div class="event-detailed-description">
          {{event.detailed_descr}}
        </div>
        <div class="gray-panel">
          {{event.requirements}}
        </div>
        <div class="map-container">
          Come join us!
        </div>
        <div class="gray-panel author-container">
          <div class="author-image" :style="{ 'background-image': 'url(' + user.profile_photo + ')' }"></div>
          <div class="author-text">
            <div class="author-name">{{user.name}}</div>
            <div class="author-description">{{user.brief_presentation}}</div>
            
          </div>
        </div>
      </div>
      <div>
        <div class="gray-panel">
          <div class="event-location">Location</div>
          <div class="event-date">{{data}}</div>
          <div class="partecipants-number light-blue-text">{{event.subscribers.length}} take part</div>
          <div class="event-button-takepart">
            <button v-if="isLoggedIn" class="button" id="take-part-button" @click="takePartButton">Take part</button>
            <a v-if="loggedInUser.uid == user.auth_id" class="verifyButton" id="take-part-button" :href="'/validate/' + this.$route.params.id">Verify subscribers</a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default {
  name: 'DetailView',
  data() {
    return {
      event: {
        photos: [],
        subscribers: []
      },
      user: {
        auth_id: ""
      },
      data: "",
      loggedInUser: {
        uid: ""
      },
      isLoggedIn: false,
    };
  },
  methods: {
    getEventDetails(){
      return DataService.getEventDetails(this.$route.params.id)
      .then(response => {
        this.event = response.data
        //Da modificare o aggiungere una volta completata la pagina visualizzazione utente
        //userLink="http://localhost:8080/user/"+this.event.author
        this.printDate()
        this.getUserDetails()
      })
      .catch(error => {
        
      })
    },
    getUserDetails(){
      DataService.getUserDetails(this.event.author)
      .then(response => {
        this.user = response.data
        console.log(this.user)
      })
      .catch(error => {
        
      })
    },
    printDate(){
      var date = new Date(this.event.date)
      var year=date.getFullYear()
      var month=date.getMonth()+1
      var day=date.getDate()
      this.data= day+"/"+month+"/"+year
      
    },
    takePartButton(){
      DataService.addReservation(this.$route.params.id, JSON.stringify({
        auth_id: this.loggedInUser.uid
      }))
      .then(response => {
        this.$router.go()
      })
    },
    handleAuth(){
      onAuthStateChanged(getAuth(), (loggedInUser) => {
        if (loggedInUser) {
          this.loggedInUser = loggedInUser;
          this.isLoggedIn = true;
          this.checkUserTakingPart();
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
    checkUserTakingPart(){
      DataService.getUserTakingPart(this.$route.params.id, JSON.stringify({
        auth_id: this.loggedInUser.uid
      }))
      .then((result) => {
        var userTakePart = result.data.userTakePart;
        if (userTakePart){
          document.getElementById("take-part-button").disabled = true;
          document.getElementById("take-part-button").innerHTML = "You already take part";
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.getEventDetails()
    
    this.handleAuth()
  }
}
</script>


<style scoped>
  .container{
    width: calc(100% - 20px);
    max-width: 1024px;
    padding: 10px;
    margin: 0 auto;
  }
  .event-title{
    font-size: 35px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 20px;
    align-content: left;
  }
  .image-containter{
    width: 100%;
    border-radius: 15px;
  }
  .grid-container{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 350px;
    gap: 20px;
    margin-top: 30px;
  }
  .button{
    background-color: #1B98E0;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    border-width: 0px;
    color: white;
    cursor: pointer;
    display: block;
  }
  .button:disabled{
    opacity: 0.5;
  }
  .verifyButton{
    width: 100%;
    display: block;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
    color: black;
  }
  .event-brief-description{
    font-size: 20px;
    margin-top: 20px;
  }
  .event-detailed-description{
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .event-location{
    color: #1B98E0;
    font-weight: bold;
  }
  .flex-two-column{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .light-blue-text{
    font-size: 14px;
    font-weight: lighter;
    color: #1B98E0;
    align-items: center;
  }
  .gray-panel{
    border-radius: 10px;
    padding: 20px;
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .map-container{
    margin-top: 20px;
  }
  .author-container{
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 10px;
    margin-top: 30px;
  }
  .author-image{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: red;
  }
  .author-text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .author-name{
    font-size: 14px;
  }
  .author-description{
    font-size: 12px;
  }
</style>
