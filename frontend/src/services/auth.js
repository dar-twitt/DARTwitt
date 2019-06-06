import api, {updateHeader} from './api';
import axios from "axios";

export function login(username, password){
    return api.post('/user/login/', {
        username: username,
        password: password
    }).then(response => {
        updateHeader('Authorization', `Token ${response.data}`)
    }).catch();
}
