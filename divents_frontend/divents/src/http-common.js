import axios from 'axios';
let http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


export default http;