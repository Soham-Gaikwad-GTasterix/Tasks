import axios from "axios";


const hospitalApi = axios.create({

  baseURL:
    "https://jsonplaceholder.typicode.com"

});


export default hospitalApi;