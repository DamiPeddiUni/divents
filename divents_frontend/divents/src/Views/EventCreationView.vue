<template>
    <div class="container">
        <div class="page-title">Create a new <span>event</span>.</div>
        <div class="grid-container">
            <div>
                <table>
                    <tr>
                        <td>Title</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="title" v-on:input="update" class="input-text" v-model="details.title" placeholder="Title">  </textarea>
                            <div class="error">{{error.titleError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Short description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="shortDescription" class="input-text" v-model="details.brief_descr" placeholder="Brief description">  </textarea>
                            <div class="error">{{error.shortDescriError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Complete description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="completeDescription" class="input-text" v-model="details.detailed_descr" placeholder="Complete description">  </textarea>
                            <div class="error">{{error.completeDescrError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Requirements</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="requirements" class="input-text" v-model="details.requirements" placeholder="Requirements">  </textarea>
                            <div class="error">{{error.reqError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Key Words</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="keyWords" class="input-text" v-model="details.key_words" placeholder="Separated by ','">  </textarea>
                            <div class="error">{{error.keyWordsError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Location name</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="locationName" class="input-text" v-model="details.location_name" placeholder="Location name">  </textarea>
                            <div class="error">{{error.locationError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea v-on:input="update" id="addres" class="input-address" v-model="details.address" placeholder="Address: 'Via Mario Rossi 25 b'">  </textarea>
                            <div class="error">{{error.addressError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Date</td>
                    </tr>
                    <tr>
                        <td>
                            <input v-on:input="update" type="date" id="data" class="input-date" v-model="details.date">
                            <div class="error">{{error.dateError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Max subscribers</td>
                    </tr>
                    <tr>
                        <td>
                            <input v-on:input="update" type="number" min="1" max="10000" id="maxsub" class="input-maxsub" v-model="details.max_subscribers" placeholder="100">
                            <div class="error">{{error.maxSubError}}</div>
                        </td>
                    </tr>
                    <tr>
                      <td>
                        <button class="button" @click="createEvent">Crea Evento!</button>
                      </td>
                    </tr>
                </table>
            </div>
            <div>
              <input class="button" id="event-image-file" type="file" ref="fileInput">
              <div class="space"></div>
              <button class="button" id="event-image-btn" @click="saveImage">Salva immagine</button>
            </div>
        </div>
        <div class="space"></div>
    </div>
</template>

<script>
import DataService from '@/services/DataService';
import {getAuth, onAuthStateonchanged} from 'firebase/auth';

export default {
  name: 'CreateEventView',
  data() {
    return {
      details: {
        author: "",
        title: "",
        brief_descr: "",
        detailed_descr: "",
        requirements: "",
        key_words: "",
        location_name: "",
        address: "",
        latitude: "0",
        longitude: "0",
        date: "",
        photos: [],
        max_subscribers: "",
      },
      image: "",
      error: {
        titleError:"",
        shortDescriError:"",
        completeDescrError:"",
        reqError:"",
        keyWordsError:"",
        locationError:"",
        addressError:"",
        dateError:"",
        maxSubError:""
      }
    };
  },
  methods: {
    createEvent(){
      //{author, title, brief_descr, detailed_descr, requirements, key_words, location_name, address,
      // latitude, longitude, date, photos, max_subscribers}
      //this.details.latitude="" //devo prenderla da delle mappe??
      //this.details.longitude="" //devo prenderla da delle mappe??
      //Controllo che tutti i dati inseriti siano validi
      if(this.details.author.trim().length<=0){
        console.log("Errore nel prendere l'autore")
        return
      }
      else if(this.details.title.trim().length<=0){
        //Errore nell'inserimento del titolo
        error.titleError="Errore titolo non valido"
        return
      }
      else if(this.details.brief_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione breve
        error.titleError="Errore descrizione non valida"
        return
      }
      else if(this.details.detailed_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione completa
        error.titleError="Errore descrizione non valida"
      }
      else if(this.details.requirements.trim().length<=0){
        //Errore nell'inserimento dei requisiti
        return
        error.titleError="Errore requisiti non validi"
      }
      else if(this.details.key_words.trim().length<=0){
        //Errore nell'inserimento delle parole chiave
        error.titleError="Errore parole chiave non valide"
        return
      }
      else if(this.details.location_name.trim().length<=0){
        //Errore nell'inserimento nel nome del posto
        error.titleError="Errore nome location non valida"
        return
      }
      else if(this.details.address.trim().length<=0){
        //Errore nell'inserimento nell'indirizzo
        error.titleError="Errore indirizzo non valido"
        return
      }
      else if(false/*this.details.latitude.trim().length<=0*/){
        //Errore nell'inserimento della latitudine
        return
      }
      else if(false/*this.details.longitude.trim().length<=0*/){
        return
        //Errore nell'inserimento della longitudine
      }
      else if(this.details.data.trim().length<=0){
        //Errore nell'inserimento della data
        error.titleError="Errore data non valida"
        return
      }
      else if(this.details.photos=null){
        //Errore nell'inserimento delle foto
        return
      }
      else if(this.details.max_subscribers<=0){
        //Errore nell'inserimento del numero massimo di partecipanti
        error.titleError="Errore numero massimo iscritti non valido"
        return
      }
      //{author, title, brief_descr, detailed_descr, requirements, key_words, location_name, address,
      // latitude, longitude, date, photos, max_subscribers}
      else{
      var data = {
          author: this.details.author,
          title: this.details.title,
          brief_descr: this.details.brief_descr,
          detailed_descr: this.details.detailed_descr,
          requirements: this.details.requirements,
          key_words: this.details.key_words,
          location_name: this.details.location_name,
          address: this.details.address,
          latitude: this.details.latitude,
          longitude: this.details.longitude,
          date: this.details.date,
          photos: this.details.photos,
          max_subscribers: this.details.max_subscribers
        }
        console.log("stampo data: ")
        console.log(data)
        DataService.createEvent(JSON.stringify(data))
        .then(response => {
          console.log(response)
          if(response.status == 200){
            this.$router.push('/');
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    print(){
      console.log(this.details.title)
    },
    async saveImage(){
      this.image = this.$refs.fileInput.files[0]
      var self = this;
      this.getBase64(this.image, function(e){
        var b64 = e.target.result;
        self.details.photos.push(b64)
        console.log("stampo le foto")
        console.log(self.details.photos)
      })
    },
    getBase64(file, callback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = callback
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    handleAuth(){
      onAuthStateonchanged(getAuth(), (user) => {
        if (user) {
          console.log("Logged in as: " + user.displayName)
          this.details.author = user.uid
          console.log(user.uid)
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
    update(){
      if(this.details.title.trim().length>=0){
        //Errore nell'inserimento del titolo
        error.titleError=""
      }
      else if(this.details.brief_descr.trim().length>=0){
        //Errore nell'inserimento della descrizione breve
        error.titleError=""
      }
      else if(this.details.detailed_descr.trim().length>=0){
        //Errore nell'inserimento della descrizione completa
        error.titleError=""
      }
      else if(this.details.requirements.trim().length>=0){
        //Errore nell'inserimento dei requisiti
        error.titleError=""
      }
      else if(this.details.key_words.trim().length>=0){
        //Errore nell'inserimento delle parole chiave
        error.titleError=""
      }
      else if(this.details.location_name.trim().length>=0){
        //Errore nell'inserimento nel nome del posto
        error.titleError=""
      }
      else if(this.details.address.trim().length>=0){
        //Errore nell'inserimento nell'indirizzo
        error.titleError=""
      }
      else if(this.details.data.trim().length>=0){
        //Errore nell'inserimento della data
        error.titleError=""
      }
      else if(this.details.max_subscribers>=0){
        //Errore nell'inserimento del numero massimo di partecipanti
        error.titleError=""
      }
      

      if(this.details.author.trim().length<=0){
        console.log("Errore nel prendere l'autore")
      }
      else if(this.details.title.trim().length<=0){
        //Errore nell'inserimento del titolo
        error.titleError="Errore titolo non valido"
      }
      else if(this.details.brief_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione breve
        error.titleError="Errore descrizione non valida"
      }
      else if(this.details.detailed_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione completa
        error.titleError="Errore descrizione non valida"
      }
      else if(this.details.requirements.trim().length<=0){
        //Errore nell'inserimento dei requisiti
        error.titleError="Errore requisiti non validi"
      }
      else if(this.details.key_words.trim().length<=0){
        //Errore nell'inserimento delle parole chiave
        error.titleError="Errore parole chiave non valide"
      }
      else if(this.details.location_name.trim().length<=0){
        //Errore nell'inserimento nel nome del posto
        error.titleError="Errore nome location non valida"
      }
      else if(this.details.address.trim().length<=0){
        //Errore nell'inserimento nell'indirizzo
        error.titleError="Errore indirizzo non valido"
      }
      else if(this.details.data.trim().length<=0){
        //Errore nell'inserimento della data
        error.titleError="Errore data non valida"
      }
      else if(this.details.max_subscribers<=0){
        //Errore nell'inserimento del numero massimo di partecipanti
        error.titleError="Errore numero massimo iscritti non valido"
      }
    }
  },
  mounted(){
    this.handleAuth()
  }
}
</script>


<style scoped>
  .container{
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  }
  .page-title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .page-title span{
    color: #1B98E0;
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
    width: auto;
    height: auto;
    border-radius: 10px;
    border-spacing: 50px;
  }
  .input-text{
    background-color:rgb(240, 240, 240);
    border:0px;
    border-radius: 15px;
    min-height: 80px;
    min-width: 580px;
    padding: 10px;
  }
  .input-address{
    background-color:rgb(240, 240, 240);
    border:0px;
    border-radius: 10px;
    min-height: auto;
    min-width: 300px;
    text-align: center;
    padding: 5px;
  }
  .input-date{
    background-color:rgb(240, 240, 240);
    border:0px;
    border-radius: 10px;
    min-height: auti;
    padding: 10px;
  }
  .input-maxsub{
    background-color:rgb(240, 240, 240);
    border:0px;
    border-radius: 10px;
    min-height: auto;
    text-align: center;
    padding: 10px;
  }
  .button{
    background-color:rgb(240, 240, 240);
    border:0px;
    border-radius: 10px;
    min-height: auto;
    text-align: center;
    padding: 10px;
  }
  .space{
    min-height: 10px;
  }
  .error{
    color: red;
    font-style: bold;
  }
</style>
