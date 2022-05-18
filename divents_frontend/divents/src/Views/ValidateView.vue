<template>
  <div class="container">
    <div class="check-title">Check a<br><span>reservation</span>.</div>
    <div class="check-panel">
      <button class="check-button">Scan QR code</button>
    </div>
    <div class="">
      <div class="partecipants-title">{{partecipants.length}} <span>partecipants</span> so far</div>
      <div class="partecipants-list">
        <div class="partecipant">
          <div class="partecipant-name">Partecipant Name</div>
        </div>
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
      partecipants: []
    };
  },
  methods: {
    
  },
  mounted(){
    
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
  .check-title{
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .check-title span{
    color: #1B98E0;
  }
  .check-button{
    padding: 15px 25px;
    color: white;
    background-color: #1B98E0;
    border: none;
    outline: none;
    border-radius: 30px;
    margin-top: 20px;
    cursor: pointer;
  }
  .partecipants-title{
    margin-top: 100px;
    font-size: 30px;
    font-weight: bold;
    line-height: 50px;
  }
  .partecipants-title span{
    color: #1B98E0;
  }
  .partecipants-list{
    margin-top: 20px;
  }
  .partecipant{
    width: calc(100% - 40px);
    padding: 15px 20px;
    box-shadow: #f2f2f2 0 0 5px;
  }
</style>
