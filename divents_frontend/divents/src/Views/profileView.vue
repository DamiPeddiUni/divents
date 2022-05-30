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
                    })
                    .catch(err =>{
                        console.log("Errore nel reperimento dei dettagli dell'utente")
                    })
                })
                .catch(err => {
                    console.log("Errore nella conversione dell'auth id")
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
</style>