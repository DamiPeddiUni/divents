<template>
  <div>
    homeview
  </div>
</template>

<script>

import DataService from '@/services/DataService';

export default {
  name: 'HomeView',
  data() {
    return {
      events: {},
    };
  },
  methods: {
    getEventsList(){
      DataService.getEvents()
      .then(response => {
        console.log("data")
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.getEventsList()
  }
}
</script>


<style scoped>
</style>
