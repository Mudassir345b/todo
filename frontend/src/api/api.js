import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tododatabiqsbackend-9fe440fe3362.herokuapp.com/api/',
});

export default API;
