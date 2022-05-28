<template>
    <div class="template">
        <div class="grid-container">
            <div>
                <table>
                    <tr>
                        <td>
                            
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                come stai
            </div>
        </div>
    </div>
</template>

<script>
    import DataService from '@/services/DataService';
    import {getAuth, onAuthStateChanged} from 'firebase/auth';
    export default ({
        name: 'subscriptionView',
        data() {
            return{
                
            };
        },
        methods: {
            async handleAuth(){
            onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                this.user_id = user.uid
                this.getEventsList()
                } else {
                console.log("User is not authenticated")
                }
            });
            },
        },
        mounted(){
        this.handleAuth()
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
        grid-template-columns: 1fr 350px;
        gap: 10px;
        margin-top: 40px;
    }
</style>