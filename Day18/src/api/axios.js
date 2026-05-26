import axios from "axios";


const api = axios.create({

  baseURL:
    "https://jsonplaceholder.typicode.com"

});


/*
=====================================
REQUEST INTERCEPTOR
=====================================
*/

api.interceptors.request.use(

  (config) => {

    console.log(
      "Request Sent:",
      config.url
    );

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }

);


/*
=====================================
RESPONSE INTERCEPTOR
=====================================
*/

api.interceptors.response.use(

  (response) => {

    console.log(
      "Response Received:",
      response.status
    );

    return response;
  },

  (error) => {

    console.log(
      "Global API Error"
    );

    return Promise.reject(error);
  }

);


export default api;