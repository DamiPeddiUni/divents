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
                            <textarea id="title" class="input-text" v-model="details.title">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Short description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="shortDescription" class="input-text" v-model="details.brief_descr">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Complete description</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="completeDescription" class="input-text" v-model="details.detailed_descr">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Requirements</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="requirements" class="input-text" v-model="details.requirements">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Key Words</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="keyWords" class="input-text" v-model="details.key_words">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                    </tr>
                    <tr>
                        <td>
                            <textarea id="addres" class="input-address" v-model="details.addres">  </textarea>
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
                            <input type="number" id="maxsub" class="input-maxsub" v-model="details.max_subscribers">
                        </td>
                    </tr>
                    <tr>
                      <td>
                        <button @click="print">Stampa!</button>
                      </td>
                    </tr>
                </table>
            </div>
              <input id="event-image-file" type="file" ref="fileInput">
              <input id="event-image-btn" type="button" @click="saveImage" text="salva immagini">
            <div>
              <!--<input type="file" id="files" name="files" multiple v-model="details.photos">-->
              <!--
                <input type="file" @change="uploadFile" ref="file">
                <button @click="submitFile">Upload!</button>
              -->
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '@/services/DataService';
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
      details.author="" //devo prenderlo tramite api dal login
      details.latitude="" //devo prenderla da delle mappe??
      details.longitude="" //devo prenderla da delle mappe??
      DataService.createEvent(details)
    },
    print(){
      console.log(this.details.title)
    },
    saveImage(){
      this.image = this.$refs.fileInput.files[0]
      console.log(this.image)
      this.getBase64(this.image)
      
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
    }
  },
  mounted(){
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
