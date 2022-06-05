<template>
    <div class="container">
      <div class="title">
        My <span>Subs</span>.
      </div>
      <div class="events-container">
        <div v-for="(event, index) in events" :key="index">
          <div class="event-card">
            <a :href="'/event/' + event._id">
              <div class="event-card-image" :style="{ 'background-image': 'url(' + event.photos[0] + ')' }"></div>
              <div class="event-card-text">
                <div class="event-card-header">
                  <div class="event-card-location">{{event.location}}</div>
                  <div class="event-card-date">{{new Date(event.date).toLocaleDateString("it-IT")}}</div>
                </div>
                <div class="event-card-title">{{event.title}}</div>
                <div class="event-card-subtitle">{{event.brief_descr}}</div>
                <div class="event-card-subscribers">{{event.subscribers.length}} people take part</div>
                <button class="qrcode-button" v-on:click="(e) => showQRCode(e, event.reservationCode)">Show QRCode</button>
              </div>
            </a>
            
          </div>
          
        </div>
      </div>
      <div v-show="showingQRCode" class="qrcode-panel" @click="toggleQRCode">
        <qrcode-vue :value="qrCode" :size="300" level="H"/>
      </div>
    </div>
</template>
<script>
import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import QrcodeVue from 'qrcode.vue'

export default ({
  name: 'subscriptionView',
  components: {
    QrcodeVue
  },
  data() {
    return{
      events_id: [],
      events: [],
      user_id: "",
      qrCode: "",
      showingQRCode: false
    };
  },
  methods: {
    getEventsList(){ //prendo gli evneti a cui un certo id è iscritto
      DataService.getSubscriptionsEvents()
      .then(response => {
        
        this.events = response.data
      })
      .catch(error => {
        console.log("errore")
        console.log(error)
      })
      //Correggi la visualizzazione dell'errore se l'array di eventi è vuoto
    },
    async handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          DataService.getIDFromAuthID(user.uid)
          .then(response =>{
            this.user_id=response.data
            
            this.getEventsList()
          })
          .catch(err =>{
            console.log("errore nel tentativo di convertire l'auth id")
          })
          
        } else {
          console.log("User is not authenticated")
        }
      });
    },
    showQRCode(e, code){
      e.preventDefault();
      this.qrCode = code;
      this.toggleQRCode();
    },
    toggleQRCode(){
      this.showingQRCode = !this.showingQRCode;
    }

  },
  mounted(){
    this.handleAuth()
  }
})
</script>

<style scoped>
  .container{
    width: calc(100% - 20px);
    max-width: 1024px;
    padding: 10px;
    margin: 0 auto;
  }
  .title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .title span{
    color: #1B98E0;
  }
  .events-container{
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media screen and (max-width: 1024px){
    .events-container{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media screen and (max-width: 640px){
    .events-container{
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (max-width: 480px){
    .events-container{
      grid-template-columns: 1fr;
    }
  }
  .event-card{
    width: 100%;
    height: 350px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
    text-decoration: none;
    display: block;
    color: black;
  }
  .event-card a{
    text-decoration: none;
    display: block;
    color: black;
  }
  .event-card-image{
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0 0;
    background: rgba(0, 0, 0, 0.2);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .event-card-text{
    padding: 10px;
  }
  .event-card-header{
    height: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .event-card-location{
    font-size: 12px;
    color: #1B98E0;
  }
  .event-card-date{
    font-size: 12px;
  }
  .event-card-title{
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .event-card-subtitle{
    height: 48px;
    font-size: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .event-card-subscribers{
    height: 16px;
    font-size: 12px;
    color: #1B98E0;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .qrcode-button{
    display: block;
    width: 100%;
    height: 30px;
    background-color: #1B98E0;
    color: white;
    border-radius: 5px;
    border: none;
    outline: none;
    margin-top: 10px;
  }
  .qrcode-panel{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.124);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>