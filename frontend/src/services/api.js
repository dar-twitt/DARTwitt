import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

if( localStorage.getItem('token') ){
    api.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`;
}

export function updateHeader(name, value){
    api.defaults.headers.common[name] = value;
}

export default api;
