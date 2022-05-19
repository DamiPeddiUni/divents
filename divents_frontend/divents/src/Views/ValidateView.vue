<template>
  <div class="container">
    <div class="check-title">Check a<br><span>reservation</span>.</div>
    <div class="check-panel">
      <button class="check-button" @click="toggleScanning">Scan QR code</button>
    </div>
    <div class="">
      <div class="partecipants-title">{{partecipants.length}} <span>partecipants</span> so far</div>
      <div class="partecipants-list">
        <div class="partecipant">
          <div class="partecipant-name">Partecipant Name</div>
        </div>
      </div>
    </div>
    <div class="scan-panel" v-show="scanning">
      <video id="scan-video"></video>
      <button class="check-button" @click="toggleScanning">Close scanner</button>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';
import QrScanner from 'qr-scanner'

export default {
  name: 'CreateEventView',
  data() {
    return {
      partecipants: [],
      scanning: false,
      qrscanner: null,
    };
  },
  methods: {
    toggleScanning(){
      this.scanning = !this.scanning
      if (this.scanning){
        this.qrscanner.start();
      }else{
        this.qrscanner.stop();
      }
    },
    scannedQrCodeResult(result){
      this.toggleScanning()
    }
  },
  mounted(){
    var self = this
    this.qrscanner = new QrScanner(document.getElementById("scan-video"), result => self.scannedQrCodeResult(result))
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
  .scan-panel{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  .scan-video{
    width: 100%;
    height: 100%;
  }
  .scan-panel button{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
