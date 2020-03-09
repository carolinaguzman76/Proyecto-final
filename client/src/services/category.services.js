import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/categories`,
            withCredentials: true
        })
    }

    getAllCategories = () => this.service.get('/getAllCategories').then(response => response.data)
    getOneCategory = id => this.service.get(`/getOneCategory/${id}`).then(response => response.data)
    postCategory = category => this.service.post(`/categoryNew`, category).then(response => response.data)
    deleteCategory = id => this.service.get(`/deleteCategory/${id}`).then(response => response.data)
}