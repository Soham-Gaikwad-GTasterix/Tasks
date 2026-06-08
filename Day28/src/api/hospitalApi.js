import axios from "axios";


const hospitalApi = axios.create({

  baseURL:
    "http://localhost:3001"

});


export default hospitalApi;