import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/categories',
            withCredentials: true
        })
    }

    getAllCategories = () => this.service.get('/getAllCategories').then(response => response.data)
    // getMovementDetails = id => this.service.get(`/getOneMovement/${id}`).then(response => response.data)
    postCategory = category => this.service.post(`/categoryNew`, category).then(response => response.data)
    deleteCategory = id => this.service.get(`/deleteCategory/${id}`).then(response => response.data)
}