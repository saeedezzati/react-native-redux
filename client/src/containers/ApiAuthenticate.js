// https://tools.ietf.org/html/rfc6749#section-4.4
import axios from 'axios';
import _ from 'lodash';
import { setAppState, setToken, requestUserInfo, receiveUserInfo, receiveUserTokenInfo, requestProfileInfo, receiveProfileInfo, clearUserInfo, clearProfileInfo, clearGamesList, clearTeamList, clearCurrentTeam, clearAppState, clearPlayerStats, clearTeamStats } from '../actions/actions'
import cookies from 'react-cookies';

import { URL, SID, FB_LOGIN, TOKEN, CONVERT_TOKEN, USERS, FORGOT_PASSWORD } from '../config/Api';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const clientId = {'app': 'abU74l88jMkioI4C3AmtDm6wYqlltlMgCDPNugHp', 'facebook': 'Edq2kN3s2nJlnk3OX9NlVi3MgZx0KOcPSpdKsug1'}

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

export const ApiAuthenticate = {
    getUserProfile: (token, id, dispatch) => {
        var loginMethod = token.login_method;
        var appToken = token.access_token;
        
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                'X-CSRFToken': cookies.load('csrftoken'),
                'Authorization': 'Bearer ' + appToken,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                'f': loginMethod=='app' ? 'a' : 's'
            }
        }
        // dispatch(requestUserInfo());
        // dispatch(requestProfileInfo());
        return axios
            .get(URL + USERS + id + '/', config)// login to website with user social id
            .then(function (response) {
                // var user_id = response.data.id
                dispatch(receiveUserTokenInfo(response.data, token));
                // dispatch(receiveProfileInfo(response.data));
                if(loginMethod!='app'){
                    window.close()
                }
            })
            .catch(function (error) { //URL + USERS + social_id
                errorHandler(error)
            });
    },
    convertToken: (loginMethod, socialId, socialToken, dispatch) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        var body = new URLSearchParams();
        body.append('grant_type', 'convert_token');
        body.append('client_id', clientId[loginMethod]);
        body.append('backend', loginMethod);
        body.append('token', socialToken);

        return axios
            .post(URL + CONVERT_TOKEN, body, config)// convert fb token to app token
            .then(function (response) {
                // dispatch(setToken(response.data));
                var token = response.data;
                token.login_method = loginMethod;
                token.expires_at = Date.now()+36000*1000;
                ApiAuthenticate.getUserProfile(token, socialId, dispatch)
            })
            .catch(function (error) { // URL + CONVERT_TOKEN,
                errorHandler(error)
            });
    },
    refreshToken: (token, dispatch, callback, args) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        var refreshToken = token.refresh_token;
        var loginMethod = token.login_method;

        var body = new URLSearchParams();
        body.append('grant_type', 'refresh_token');
        body.append('client_id', clientId[loginMethod]);
        body.append('refresh_token', refreshToken);

        return axios
            .post(URL + TOKEN, body, config)// convert fb token to app token
            .then(function (response) {
                var token = response.data;
                token.login_method = loginMethod;
                token.expires_at = Date.now()+36000*1000;
                dispatch(setToken(token));
                callback(token, ...args, dispatch)
            })
            .catch(function (error) { // URL + CONVERT_TOKEN,
                errorHandler(error)
            });
    },
    authenticate: (loginMethod, rememberMe, email, password, dispatch) => {
        var config = {
            headers: {
                // 'Access-Control-Allow-Headers': '*',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
                // 'X-Forwarded-Host': '4ren4.com:8000',
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: loginMethod=='app' ? false : true,
        }
        var body = new URLSearchParams();
        body.append('grant_type', 'password');
        body.append('client_id', clientId[loginMethod]);
        body.append('username', email);
        body.append('password', password);
        
        if(loginMethod=='app'){
            return axios
            .post(URL + TOKEN, body,  config)
            .then(function (response) {
                // dispatch(setToken(response.data));
                if(rememberMe){
                    dispatch(setAppState({rememberMe: rememberMe, email: email, password: password}));
                }
                var token = response.data;
                token.login_method = loginMethod;
                token.expires_at = Date.now()+36000*1000;
                ApiAuthenticate.getUserProfile(token, 0, dispatch)
                
            })
            .catch(function (error) { 
                errorHandler(error)
            });
        }else{
            return axios
                .get(URL + SID,  config)
                .then(function (response) {
                    // var response = { 'data': { "auth_time": 1514407100, "id": "1799534280061052", "expires": 5136753, "granted_scopes": ["email", "public_profile"], "denied_scopes": null, "access_token": "EAAD08rQQTskBANAh1w95tMI41b6sjl2TeqN4FD7sgbNmcN91ZBBum22Wj2VxSvf8OXI02dCAImuB274YYtlUBd299fP8rGPpdDRpBgopd8GBLmPeZCQjKW0Wb02k2PuH8cXBWgX8gIHi7XURP6cuhfu8YqIefzIKz9EfmAWQZDZD", "token_type": null } }
                    var extraData = (response.data[loginMethod].extra_data).slice(0);
                    var socialId = response.data[loginMethod].uid;
                    var socialToken = JSON.parse(extraData).access_token;
                    ApiAuthenticate.convertToken(loginMethod, socialId, socialToken, dispatch)
                    
                })
                .catch(function (error) { // URL + SID,
                    errorHandler(error)
                });
        }
        
    },
    forgotPassword: (email, dispatch) => {
        var config = {
            headers: {
                'X-CSRFToken': cookies.load('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params:{
                email: email
            }
        }

        var body = new URLSearchParams();
        body.append('email', 'email');

        return axios
            .post(URL + FORGOT_PASSWORD, config)
            .then(function (response) {
                dispatch(setAppState({forgotPasswordMessage: 'Check your email to reset your password'}));

            })
            .catch(function (error) {
                dispatch(setAppState({forgotPasswordMessage: 'This email doesn\'t exist in our database' }));

                errorHandler(error)
            });
    },
    deauthenticate: (dispatch) => {
        // dispatch(clearAppState());
        dispatch(clearUserInfo());
    }
}
// export function isLoggedIn() {
//   // Also check if the token is valid. If not use refresh-token to get a new one.
//   return store.getState().token[store.getState().token.length-1] != null;
// }
