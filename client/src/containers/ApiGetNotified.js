// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from 'axios';
import _ from 'lodash';
import { setAppState } from '../actions/actions'
import cookies from 'react-cookies';

import { URL, GETNOTIFIED } from '../config/Api';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export function errorHandler(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}

export const ApiGetNotified = {
    submitEmail: (getNotifiedEmail, dispatch) => {
        
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',

            },
        }
        var body = new URLSearchParams();
        body.append('email', getNotifiedEmail);
        body.append('appCodeName', navigator.appCodeName);
        body.append('appName', navigator.appName);
        body.append('language', navigator.language);
        body.append('platform', navigator.platform);
        body.append('vendor', navigator.vendor);
        body.append('width', screen.width);
        body.append('height', screen.height);

        return axios
            .post(URL + GETNOTIFIED, body, config)
            .then(function (response) {
                dispatch(setAppState({getNotifiedRequested: true}));
                
            })
            .catch(function (error) { 
                errorHandler(error)
            });
    },
   
}

