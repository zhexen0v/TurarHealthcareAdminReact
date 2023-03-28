import axios from "axios";

const instance = axios.create({
     baseURL: 'http://localhost:4000' //'https://backend.portfolio-adilzhexenov.kz'//
});

export default instance;