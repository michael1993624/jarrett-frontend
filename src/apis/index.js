import axios, { AxiosHeaders } from "axios";
import { ACCESS_TOKEN } from "../libs/contants";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER
});

const onRequest = (config) => {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const mHeaders = AxiosHeaders.from({
                Authorization: `Bearer ${token}`,
            })

            if (mHeaders) {
                config.headers = mHeaders
            }
        }
    } catch (error) { 
        console.log(error);
    }

    return config
}

api.interceptors.request.use(onRequest)

api.interceptors.response.use(
    (response) => {
        return response.data
    },

    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        }
        return Promise.reject(error)
    }

)

const login = (data) => api.post('/signin', data);
const register = (data) => api.post('/signup', data);
const getUser = (id) => api.get(`/user/${id}`);
const updateUser = (id, data) => api.put(`/user/${id}`, data);
const addAccount = (data) => api.post('/account', data);
const deleteAccount = (id) => api.delete(`/account/${id}`);
const getAccounts = () => api.get(`/account/list`);
const getIntegrations = (id) => api.get(`/integration/${id}`);
const connectShopify = (accountId, data) => api.post(`/connect/${accountId}/shopify`, data);
const getPrediction = (accountId) => api.get(`/prediction/${accountId}`);
const predict = (accountId, data) => api.post(`/prediction/${accountId}`, data);
const getGoogleAdsCustomer = (data) => api.post('/get_google_customer', data);
const getFacebookAdsCustomer = (data) => api.post('/get_facebook_customer', data);
const connectGoogleAds = (accountId, data) => api.post(`/connect/${accountId}/google_ads`, data);
const connectFacebookAds = (accountId, data) => api.post(`/connect/${accountId}/facebook_ads`, data);

export const apis = {
    login,
    register,
    getUser,
    updateUser,
    getAccounts,
    addAccount,
    deleteAccount,
    getIntegrations,
    connectShopify,
    getPrediction,
    getFacebookAdsCustomer,
    predict,
    getGoogleAdsCustomer,
    connectGoogleAds,
    connectFacebookAds
}