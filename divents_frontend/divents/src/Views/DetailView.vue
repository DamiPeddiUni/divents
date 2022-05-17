<template>
  <div class="container">
    <!--detailview {{this.$route.params.id}}-->
    <div>
      <img class="image-containter" :src="'data:image/jpg;base64,' + event.photos[0]">
    </div>
    <div class="grid-container">
      <div class="event-title">
        {{event.title}}
      </div>
      <div class="background">
        <div class="border">
          <div class="event-location">
            Location
          </div>
          <div class="event-date">
            {{day}}/{{month}}/{{year}} <!--Il codice che inizializza queste variabili è acnora da fare-->
          </div>
          <div class="partecipants-number">
            number of partecipants
          </div>
          <div class="event-button-takepart">
            <button class="button">Iscriviti</button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-container">
      <div class="container-1">
        <div class="item">Location</div>
        <div class="item">Date</div>
      </div>
      <div>

      </div>
    </div>

    <div class="grid-container">
      <div>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
      </div>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';
import moment from 'moment';
import Vue from 'vue'




export default {
  name: 'DetailView',
  data() {
    return {
      event: {
        photos: []
      },
      day:'giorno',
      month:'mese',
      year:'anno'
    };
  },
  methods: {
    getEventDetails(){
      DataService.getEventDetails(this.$route.params.id)
      .then(response => {
        this.event = response.data
        //console.log(this.event)
      })
      .catch(error => {
        this.events = response.data
      })
    },
    printDate(){
      //Codice per formattare la data in modo giusto
    }
  },
  mounted(){
    this.getEventDetails()
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
  .background{
    background-color:rgb(240, 240, 240);
    width: 350px;
    height: 100px;
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
  
</style>
