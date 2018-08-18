import Vue from "vue";
import axios from "./axios";

export function post(url: string, data: string, error: string) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      res => {
        resolve(res);
      },
      err => {
        err = error ? error : err;
      }
    );
  });
}
export function get(url: any, data: any, error: any) {
  return new Promise<any>((resolve, reject) => {
    axios.post(url, data).then(
      res => {
        resolve(res);
      },
      err => {
        err = error ? error : err;
      }
    );
  });
}
