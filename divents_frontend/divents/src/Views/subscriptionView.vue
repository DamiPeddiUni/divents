<template>
    <div class="container">
      <div class="title">
        My <span>Subs</span>.
      </div>
      <div class="events-container">
        <div v-for="(event, index) in events[0]" :key="index">
          <a :href="'/event/' + event._id" class="event-card">
            <div class="event-card-image" :style="{ 'background-image': 'url(' + event.photos[0] + ')' }"></div>
            <div class="event-card-text">
              <div class="event-card-header">
                <div class="event-card-location">{{event.location}}</div>
                <div class="event-card-date">{{new Date(event.date).toLocaleDateString("it-IT")}}</div>
              </div>
              <div class="event-card-title">{{event.title}}</div>
              <div class="event-card-subtitle">{{event.subtitle}}</div>
              <div class="event-card-subscribers">{{event.subscribers.length}} people take part</div>
            </div>
          </a>
        </div>
      </div>
    </div>
</template>
<script>
import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default ({
    name: 'subscriptionView',
    data() {
      return{
        events_id: [],
        events: [],
        user_id: ""
      };
    },
    methods: {
      getEventsList(){ //prendo gli evneti a cui un certo id è iscritto
        console.log("getEventList()")
        console.log("ho chiamato handle auth")
        console.log("Login id:")
        console.log(this.user_id)
        DataService.getSubscriptionsEvents(JSON.stringify(this.user_id))
        .then(response => {
          console.log("risposta ricevuta")
          this.events_id = response.data
          console.log(this.events_id)
          console.log(this.events_id[0])
          for(var i=0; i<this.events_id.length; i++)
          {
            DataService.getEventDetailsByID(this.events_id[i])
            .then(response =>{
              this.events[i]=response.data
              console.log(this.events[i])
            })
            .catch(err =>{
              console.log("errore nel reperimento dei dati di un evento (dall'id)")
            })
          }
        })
        .catch(error => {
          console.log("errore")
          console.log(error)
        })
        console.log("fine getEventList")
    },
    async handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.user_id = user.uid
          this.getEventsList()
        } else {
          console.log("User is not authenticated")
        }
      });
    },

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
    height: 310px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
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
</style>