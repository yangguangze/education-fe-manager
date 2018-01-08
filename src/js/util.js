import axios from 'axios';




export function request(url, data) {
    return axios.post(url, data);
}