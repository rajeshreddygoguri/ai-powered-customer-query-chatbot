import axios from 'axios'

const instance = axios.create({
    baseURL:'https://backend-zhed.onrender.com',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteUser = (url) => instance.delete(url);


  instance.interceptors.request.use(function (config) {
    // something before request is sent
    return config;
  }, function (error) {
    // something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
        // console.log('intercpert response',error)
    return response;
  }, function (error) {
    // console.log('intercpert response',error)
    return Promise.reject(error);
  });
