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
                        <td class="background">
                            <textarea id="title" class="input-text">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Short description</td>
                    </tr>
                    <tr>
                        <td class="background">
                            <textarea id="shortDescription" class="input-text">  </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Complete description</td>
                    </tr>
                    <tr>
                        <td class="background">
                            <textarea id="completeDescription" class="input-text">  </textarea>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <input type="file" @change="uploadFile" ref="file">
                <button @click="submitFile">Upload!</button>
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
      Images: ""
    };
  },
  methods: {
    uploadFile() {
    this.Images = this.$refs.file.files[0];
    },
    submitFile() {
    const formData = new FormData();
    formData.append('file', this.Images);
    const headers = { 'Content-Type': 'multipart/form-data' };
    axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
        res.data.files; // binary representation of the file
        res.status; // HTTP status
    });
    },
    mounted(){
        
    }
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
    border-radius: 15px;
    border-spacing: 50px;
  }
  .input-text{
      background-color:rgb(240, 240, 240);
      border:0px;
      border-radius: 15px;
      min-height: 80px;
      min-width: 580px;
  }
</style>
