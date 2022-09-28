import axios from 'axios';
import { OptionsType } from './apiTypes';

export class ApiRoutes {
  URL: string;

  constructor(options: OptionsType) {
    this.URL = options.URL;
  }

  search(query: string) {
    return axios.get(URL + 'search.json?q=' + query);
  }
}
