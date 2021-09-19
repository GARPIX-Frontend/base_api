import axios from "axios";
import * as constants from './constants';
// import paginationSerializer from './serializers/paginationSerializer';
// import {getLimitOffset} from './utils';

const AUTH_TOKEN_KEY = 'auth_token';

class BaseApi {
  url: string;
  getAuthToken: () => string | null;
  setAuthToken: (token: string) => boolean;
  removeAuthToken: () => boolean;

  constructor(url: string) {
    this.url = url;
    this.getAuthToken = () => {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    };
    this.setAuthToken = (token: string) => {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return true;
    };
    this.removeAuthToken = () => {
      try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return true
      } catch {
        return false; // no key
      }
    };
  }

  axiosOverride = (axios: any) => {
    const Token = this.getAuthToken();
    axios.defaults.headers.common['Authorization'] = `Token ${Token}`;
    return axios
  };

  post = async (url: string, params: any, axiosParams = {}) => {
    return await this.send(url, 'post', params, axiosParams);
  };

  get = async (url: string, params: any, axiosParams = {}) => {
    const base_url = this.url;
    const newAxios = this.axiosOverride(axios);
    const res = await newAxios({
      method: 'get',
      params: params,
      url: `${base_url}${url}`,
      ...axiosParams
    });
    return res;
  };

  put = async (url: string, params: any, axiosParams = {}) => {
    return await this.send(url, 'put', params, axiosParams);
  };

  patch = async (url: string, params: any, axiosParams = {}) => {
    return await this.send(url, 'patch', params, axiosParams);
  };

  delete = async (url: string, params: any, axiosParams = {}) => {
    return await this.send(url, 'delete', params, axiosParams);
  };

  send = async (url: string, method: any, params: any, axiosParams = {}) => {
    const base_url = this.url;
    const newAxios = this.axiosOverride(axios);
    const res = await newAxios({
      method: method,
      data: params,
      url: `${base_url}${url}`,
      ...axiosParams
    });
    return res;
  }
}

export default BaseApi;

export {
  constants,
  // paginationSerializer,
  // getLimitOffset,
};
