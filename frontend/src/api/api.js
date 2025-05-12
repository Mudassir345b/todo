import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mudassir345b-django--8000.prod1a.defang.dev/todos/',
});

export default API;
