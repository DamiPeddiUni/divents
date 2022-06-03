import axios from 'axios';
let http = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// prima di ogni richiesta fai
http.interceptors.request.use(function(config) {
    config.headers.AuthToken = localStorage.getItem('userToken');
    return config;
});

export default http;