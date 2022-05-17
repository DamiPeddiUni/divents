<template>
  <div class="container">
    <div class="search-panel">
      <div class="search-title">Search <span>events</span>.</div>
      <div class="search-input-panel">
        <input class="search-input" type="text" placeholder="Search">
      </div>
    </div>
    <div class="events-container">
      <div class="order-by-panel">Order by: </div>
      <div v-for="(event, index) in events" :key="index">
        <div class="event-card">
          <div class="event-card-image"></div>
          <div class="event-card-text">
            <div class="event-card-header">
              <div class="event-card-location">{{event.location}}</div>
              <div class="event-card-date">{{new Date(event.date).toLocaleDateString("it-IT")}}</div>
            </div>
            <div class="event-card-title">{{event.title}}</div>
            <div class="event-card-subtitle">{{event.subtitle}}</div>
            <div class="event-card-subscribers">{{event.subscribers.length}} people take part</div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more-container">
      <button class="load-more-button">Load more events</button>
    </div>
  </div>
  
</template>

<script>

import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoggedIn: false,
      events: {},
    };
  },
  methods: {
    getEventsList(){
      DataService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.isLoggedIn = true;
          console.log("Logged in as: " + user)
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
    }
  },
  mounted(){
    this.getEventsList()
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
  .search-title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .search-title span{
    color: #1B98E0;
  }
  .search-input-panel{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .search-input{
    background: transparent;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .search-input:hover{
    background: #f2f2f2;
  }
  .events-container{
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .event-card{
    width: 100%;
    height: 310px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
  }
  .event-card-image{
    width: 100%;
    height: 150px;
    border-radius: 10px 10px 0 0;
    background: rgba(0, 0, 0, 0.2);
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
  .load-more-container{
    width: 100%;
    margin-top: 50px;
  }
  .load-more-button{
    display: block;
    background: transparent;
    border: none;
    margin: 0 auto;
    outline: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .load-more-button:hover{
    background: #f2f2f2;
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
</style>
