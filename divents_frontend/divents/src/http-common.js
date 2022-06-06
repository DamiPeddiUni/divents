import axios from 'axios';
let http = axios.create({
    baseURL: "https://divents.herokuapp.com",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export default http;