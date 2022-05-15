<template>
  <div class="events-container">
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
</template>

<script>

import DataService from '@/services/DataService';

export default {
  name: 'HomeView',
  data() {
    return {
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
    }
  },
  mounted(){
    this.getEventsList()
  }
}
</script>


<style scoped>
  .events-container{
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
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
