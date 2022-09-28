import axios from 'axios';
import { OptionsType } from './apiTypes';

export class ApiRoutes {
  URL: string;
  limit: number;

  constructor(options: OptionsType) {
    this.URL = options.URL;
    this.limit = 4;
  }

  search(query: string) {
    const headers = { 'Content-Type': 'application/json' };

    return axios.get(`${this.URL}search.json?q=${query}&limit=${this.limit}`, {
      headers,
    });
  }
}
