<template>
    <div class="container">
        <div class="grid-container">
            <div>
                <div class="search-title">Profile <span> Overview </span></div>
                <table class="table">
                    <tr>
                        <td rowspan="3" class="img-td">
                            <img class="profile-image" :src="user_details.profile_photo">
                        </td>
                        <td>
                            <b>Nome:</b> {{user_details.name}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Tipo profilo:</b> {{user_details.type}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Location:</b> {{user_details.location}}
                        </td>
                    </tr>
                </table>
                <div class="descr">
                    <div class="gray-panel">
                        {{user_details.brief_presentation}}
                    </div>
                </div>
                <div>Events:</div>
                <div class="space"></div>
                <div class="events-container">
                    <div v-for="(event, index) in events" :key="index">
                    <a :href="'/event/' + event._id" class="event-card">
                        <div class="event-card-image" :style="{ 'background-image': 'url(' + event.photos[0] + ')' }"></div>
                        <div class="event-card-text">
                        <div class="event-card-header">
                            <div class="event-card-location">{{event.location}}</div>
                            <div class="event-card-date">{{new Date(event.date).toLocaleDateString("it-IT")}}</div>
                        </div>
                        <div class="event-card-title">{{event.title}}</div>
                        <div class="event-card-subtitle">{{event.subtitle}}</div>
                        <div class="event-card-subscribers">{{event.subscribers.length}} people take part</div>
                        </div>
                    </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataService from '@/services/DataService';
    import {getAuth, onAuthStateChanged} from 'firebase/auth';
    export default ({
        name: 'profileView',
        data() {
            return{
                user_id: "",
                user_details: {},
                events: {},
            };
        },
        methods: {
            async handleAuth(){
                onAuthStateChanged(getAuth(), (user) => {
                    if (user) {
                        this.user_id = user.uid
                    } else {
                        console.log("User is not authenticated")
                    }
                });
            },
            getUserDetails(){
                DataService.getIDFromAuthID(this.$route.params.id)
                .then(result => {
                    DataService.getUserDetails(result.data)
                    .then(result =>{
                        this.user_details=result.data
                        this.getUserEvents()
                    })
                    .catch(err =>{
                        console.log("Errore nel reperimento dei dettagli dell'utente")
                    })
                })
                .catch(err => {
                    console.log("Errore nella conversione dell'auth id")
                })
                
            },
            getUserEvents(){
                DataService.getSubscriptionsEvents(JSON.stringify(this.user_id))
                .then(response => {
                        this.events = response.data
                    })
                    .catch(error => {
                        console.log("errore")
                        console.log(error)
                })
            }
        },
        mounted(){
            this.handleAuth()
            this.getUserDetails()
        }
    })
</script>

<style>
    .container{
        width: calc(100% - 20px);
        max-width: 1024px;
        padding: 10px;
        margin: 0 auto;
    }
    .grid-container{
        display: grid;
        width: 100%;
        grid-template-columns: 1fr;
        gap: 10px;
        margin-top: 40px;
    }
    .search-title{
        font-size: 50px;
        font-weight: bold;
        line-height: 50px;
        margin-top: 50px;
        margin-bottom: 20px;
    }
    .search-title span{
        color: #1B98E0;
    }
    .gray-panel{
        border-radius: 10px;
        padding: 20px;
        background-color: #F7F7F7;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .profile-image{
        border-radius: 48px;
        max-height: 150px;
    }
    .right-spacing{
        min-height: 100px;
    }
    .table{
        width: 100%;
    }
    .img-td{
        max-width: 100px;
    }
    .descr{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .events-container{
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 1024px){
        .events-container{
        grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 640px){
        .events-container{
        grid-template-columns: 1fr 1fr;
        }
    }
    @media screen and (max-width: 480px){
        .events-container{
        grid-template-columns: 1fr;
        }
    }
    .event-card{
        width: 100%;
        height: 310px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;
        text-decoration: none;
        display: block;
        color: black;
    }
    .event-card-image{
        width: 100%;
        height: 150px;
        border-radius: 10px 10px 0 0;
        background: rgba(0, 0, 0, 0.2);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .event-card-text{
        padding: 10px;
    }
    .event-card-header{
        height: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .event-card-location{
        font-size: 12px;
        color: #1B98E0;
    }
    .event-card-date{
        font-size: 12px;
    }
    .event-card-title{
        height: 40px;
        font-size: 20px;
        font-weight: bold;
        line-height: 20px;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .event-card-subtitle{
        height: 48px;
        font-size: 12px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .event-card-subscribers{
        height: 16px;
        font-size: 12px;
        color: #1B98E0;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .space{
        padding: 5px;
    }
</style>