<template>
  <div class="container">
    <div>
      <img class="image-containter" :src="'data:image/jpg;base64,' + event.photos[0]">
    </div>

    <div class="grid-container">
      <table>
        <tr>
          <td class="event-title" colspan="2">{{event.title}}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td class="text-right">{{data}}</td>
        </tr>
      </table>

      <table class="table">
        <tr>
          <td class="event-location">Location</td>
        </tr>
        <tr>
          <td class="event-date">{{data}}</td>
        </tr>
        <tr>
          <td class="partecipants-number">number of partecipants</td>
        </tr>
        <tr class="event-button-takepart">
          <td><button class="button">Iscriviti</button></td>
        </tr>
      </table>
    </div>
    <div class="grid-container">
      <div class="event-brief-description">
        {{event.brief_descr}}Event breif description
      </div>
      <div>
      </div>
    </div>

    <div class="grid-container">
      <div>
        {{event.detailed_descr}}Event Detailed description
      </div>
    </div>

    <div class="grid-container">
      <table class="table">
        <tr>
          <td>{{event.requirements}}</td>Event Requirements
        </tr>
      </table>
      <div>
        
      </div>
    </div>

    <div class="grid-container">
      MAPPA
    </div>

    <div class="grid-container">
      <table class="table">
        <tr rowspan="3">
          <td rowspan="3">
            immagine profilo
          </td>
          <td class="event-brief-description">
            {{user.name}} Nome utente
          </td>
          <td>
            <a v-bind:href="''+userLink">View profile</a>
          </td>
        </tr>
        <tr>
          <td>
             Descrizione utente
          </td>
          <td>
           
          </td>
          
        </tr>
        <tr>
          <td>
            <a href="">Contatta</a>
          </td>
          <td>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';

export default {
  name: 'DetailView',
  data() {
    return {
      event: {
        photos: []
      },
      user: "",
      data: "",
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
      })
      .catch(error => {
        
      })
    },
    getUserDetails(){
      DataService.getUserDetails(this.event.author)
      .then(response => {
        this.user = response.data
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
      
    }
  },
  mounted(){
    this.getEventDetails()
    this.getUserDetails()
  }
}
</script>


<style scoped>
  .container{
    width: 100%;
    max-width: 1024px;
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
    gap: 10px;
    margin-top: 40px;
  }
  .grid-container-3{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 350px;
    gap: 10px;
    height: 0px;
  }
  .background{
    background-color:rgb(240, 240, 240);
    width: auto;
    height: 100px;
    border-radius: 15px;
    border-spacing: 50px;
  }
  .background-1{
    background-color:rgb(240, 240, 240);
    width: auto;
    height: auto;
    border-radius: 15px;
  }
  .grid-container-1{
    display: grid;
    width: 70%;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .text-right{
    text-align: right;
  }
  .width{
    width: 350px;
  }
  .container-1 {
    display: flex;
    justify-content: space-between;
  }
  .border{
    /*centrare il testo e bottone sulla dx*/
    position:relative;
    left: 10px;
    top: 5px;
  }
  .button{
    background-color: #1B98E0;
    border-radius: 5px;
    width: 100px;
    height: 30px;
    border-width: 0px;
    color: white;
  }
  .table{
    border-collapse: separate;
    border-spacing: 15px 5px;
    background-color:rgb(240, 240, 240);
    width: auto;
    height: 100px;
    border-radius: 15px;
    border-spacing: 10px;
  }
  .event-brief-description{
    font-size: 25px;
    font-weight: bold;
    align-content: left;
  }
  .event-location{
    color: #1B98E0;
    font-weight: bold;
  }
</style>
