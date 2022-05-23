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
                            <textarea id="title" @change="update(1)" class="input-text" v-model="details.title" placeholder="Title">  </textarea>
                            <div class="error">{{error.titleError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Short description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(2)" id="shortDescription" class="input-text" v-model="details.brief_descr" placeholder="Brief description">  </textarea>
                            <div class="error">{{error.shortDescriError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Complete description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(3)" id="completeDescription" class="input-text" v-model="details.detailed_descr" placeholder="Complete description">  </textarea>
                            <div class="error">{{error.completeDescrError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Requirements</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(4)" id="requirements" class="input-text" v-model="details.requirements" placeholder="Requirements">  </textarea>
                            <div class="error">{{error.reqError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Key Words</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(5)" id="keyWords" class="input-text" v-model="details.key_words" placeholder="Separated by ','">  </textarea>
                            <div class="error">{{error.keyWordsError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Location name</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(6)" id="locationName" class="input-text" v-model="details.location_name" placeholder="Location name">  </textarea>
                            <div class="error">{{error.locationError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea @change="update(7)" id="addres" class="input-address" v-model="details.address" placeholder="Address: 'Via Mario Rossi 25 b'">  </textarea>
                            <div class="error">{{error.addressError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Date</td>
                    </tr>
                    <tr>
                        <td>
                            <input @change="update(8)" type="date" id="data" class="input-date" v-model="details.date">
                            <div class="error">{{error.dateError}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Max subscribers</td>
                    </tr>
                    <tr>
                        <td>
                            <input @change="update(9)" type="number" min="1" max="10000" id="maxsub" class="input-maxsub" v-model="details.max_subscribers" placeholder="100">
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
              <input @change="update(10)" class="button" id="event-image-file" type="file" ref="fileInput">
              <div class="space"></div>
              <button class="button" id="event-image-btn" @click="saveImage">Salva immagine</button>
              <div class="error">{{error.photosError}}</div>
            </div>
        </div>
        <div class="space"></div>
    </div>
</template>

<script>
import DataService from '@/services/DataService';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

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
        maxSubError:"",
        photosError:""
      }
    };
  },
  methods: {
    createEvent(){
      //this.details.latitude="" //devo prenderla da delle mappe??
      //this.details.longitude="" //devo prenderla da delle mappe??
      //Controllo che tutti i dati inseriti siano validi
      this.update(1)
      this.update(2)
      this.update(3)
      this.update(4)
      this.update(5)
      this.update(6)
      this.update(7)
      this.update(8)
      this.update(9)
      this.update(10)
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
    },
    print(){
      console.log(this.details.title)
    },
    async saveImage(){
      this.update(10)
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
      onAuthStateChanged(getAuth(), (user) => {
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
    update(z){
      switch (z){
        case 1: console.log("caso 1")
          if(this.details.title==""){
            //Errore nell'inserimento del titolo
            this.error.titleError="Errore titolo non valido"
            }
            else{
              this.error.titleError=""
            }
            break;
        case 2: 
          if(this.details.brief_descr==""){
            //Errore nell'inserimento della descrizione breve
            this.error.shortDescriError="Errore descrizione non valida"
          }
          else{
            this.error.shortDescriError=""
          }
          break;
        case 3:
          if(this.details.detailed_descr==""){
            //Errore nell'inserimento della descrizione completa
            this.error.completeDescrError="Errore descrizione non valida"
          }
          else{
            this.error.completeDescrError=""
          }
          break;
        case 4:
          if(this.details.requirements==""){
            //Errore nell'inserimento dei requisiti
            this.error.reqError="Errore requisiti non validi"
          }
          else{
            this.error.reqError=""
          }
          break;
        case 5:
          if(this.details.key_words==""){
            //Errore nell'inserimento delle parole chiave
            this.error.keyWordsError="Errore parole chiave non valide"
          }
          else{
            this.error.keyWordsError=""
          }
          break;
        case 6:
          if(this.details.location_name==""){
            //Errore nell'inserimento nel nome del posto
            this.error.locationError="Errore nome location non valida"
          }
          else{
            this.error.locationError=""
          }
          break;
        case 7:
          if(this.details.address==""){
            //Errore nell'inserimento nell'indirizzo
            this.error.addressError="Errore indirizzo non valido"
          }
          else{
            this.error.addressError=""
          }
          break;
        case 8:
          if(this.details.data==""){
            //Errore nell'inserimento della data
            this.error.dateError="Errore data non valida"
          }
          else{
            this.error.dateError=""
          }
          break;
        case 9:
          if(this.details.max_subscribers<=0){
            //Errore nell'inserimento del numero massimo di partecipanti
            this.error.maxSubError="Errore numero massimo iscritti non valido"
          }
          else{
            this.error.maxSubError=""
          }
          break;
        case 10:
          if(this.details.photos.length==0){
            this.error.photosError="Errore non sono state inserite delle foto"
          }
          else{
            this.error.photosError=""
          }
          break;
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
