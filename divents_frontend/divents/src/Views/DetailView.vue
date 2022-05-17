<template>
  <div class="container">
    <!--detailview {{this.$route.params.id}}-->

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
          <td class="text-right">{{event.date}}</td>
        </tr>
      </table>

      <table class="table">
        <tr>
          <td class="event-location">Location</td>
        </tr>
        <tr>
          <td class="event-date">{{day}}/{{month}}/{{year}}</td>
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

    <!--
    <div class="grid-container-3">
      <div class="container-1">
        <div>Location</div>
        <div>{{event.date}}</div>
      </div>
      <div>

      </div>
    </div>
    -->

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
            View profile
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
            Contatta
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
      day: "a",
      month: "a",
      year: "a"
    };
  },
  methods: {
    getEventDetails(){
      return DataService.getEventDetails(this.$route.params.id)
      .then(response => {
        this.event = response.data
        /*console.log("Author id:")
        console.log(this.event.author)*/
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
      //Codice per formattare la data in modo giusto
      var data = new String(this.event.date)
      this.year=this.data.substring(0,4);
      this.day=this.data.substring(5,7);
      this.month=this.data.substring(8,10);
      console.log(year)
    }
  },
  async mounted(){
    await this.getEventDetails()
    this.getUserDetails()
    this.printDate()
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
