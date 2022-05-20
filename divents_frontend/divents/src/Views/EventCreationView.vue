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
                            <textarea id="title" class="input-text" v-model="details.title" placeholder="Title">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Short description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="shortDescription" class="input-text" v-model="details.brief_descr" placeholder="Brief description">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Complete description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="completeDescription" class="input-text" v-model="details.detailed_descr" placeholder="Complete description">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Requirements</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="requirements" class="input-text" v-model="details.requirements" placeholder="Requirements">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Key Words</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="keyWords" class="input-text" v-model="details.key_words" placeholder="Separated by ','">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Location name</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="locationName" class="input-text" v-model="details.location_name" placeholder="Location name">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="addres" class="input-address" v-model="details.addres" placeholder="Address: 'Via Mario Rossi 25 b'">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Date</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="date" id="data" class="input-date" v-model="details.date">
                        </td>
                    </tr>
                    <tr>
                        <td>Max subscribers</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="number" min="1" max="10000" id="maxsub" class="input-maxsub" v-model="details.max_subscribers" placeholder="100">
                        </td>
                    </tr>
                    <tr>
                      <td>
                        <button @click="print">Stampa!</button>
                      </td>
                    </tr>
                </table>
            </div>
            <div>
              <input id="event-image-file" type="file" ref="fileInput">
              <button id="event-image-btn" @click="saveImage">Salva immagine</button>
            </div>
        </div>
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
        latitude: "",
        longitude: "",
        date: "",
        photos: "",
        max_subscribers: "",
      },
      image: "",
      images: []
    };
  },
  methods: {
    createEvent(){
      //{author, title, brief_descr, detailed_descr, requirements, key_words, location_name, address,
      // latitude, longitude, date, photos, max_subscribers}
      details.latitude=null //devo prenderla da delle mappe??
      details.longitude=null //devo prenderla da delle mappe??
      DataService.createEvent(details)
      
      //Controllo che tutti i dati inseriti siano validi
      if(this.details.author.trim().length<=0){
        console.log("Errore nel prendere l'autore")

      }
      else if(this.details.title.trim().length<=0){
        //Errore nell'inserimento del titolo
      }
      else if(this.details.brief_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione breve
      }
      else if(this.details.detailed_descr.trim().length<=0){
        //Errore nell'inserimento della descrizione completa
      }
      else if(this.details.requirements.trim().length<=0){
        //Errore nell'inserimento dei requisiti
      }
      else if(this.details.key_words.trim().length<=0){
        //Errore nell'inserimento delle parole chiave
      }
      else if(this.details.location_name.trim().length<=0){
        //Errore nell'inserimento nel nome del posto
      }
      else if(this.details.address.trim().length<=0){
        //Errore nell'inserimento nell'indirizzo
      }
      else if(false/*this.details.latitude.trim().length<=0*/){
        //Errore nell'inserimento della latitudine
      }
      else if(false/*this.details.longitude.trim().length<=0*/){
        //Errore nell'inserimento della longitudine
      }
      else if(this.details.data.trim().length<=0){
        //Errore nell'inserimento della data
      }
      else if(this.details.photos=null){
        //Errore nell'inserimento delle foto
      }
      else if(this.details.max_subscribers<=0){
        //Errore nell'inserimento del numero massimo di partecipanti
      }
      //{author, title, brief_descr, detailed_descr, requirements, key_words, location_name, address,
      // latitude, longitude, date, photos, max_subscribers}
      else{
        DataService.createEvent(JSON.stringify({
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
        }))
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
    saveImage(){
      this.image = this.$refs.fileInput.files[0]
      console.log(this.image)
      images.push(this.getBase64(this.image))
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return reader.result
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    handleAuth(){
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          console.log("Logged in as: " + user.displayName)
          this.details.author = user
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
</style>
