import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/categories`,
            withCredentials: true
        })
    }

    getAllMovements = () => this.service.get('/getAllMovements').then(response => response.data)
    getMovementDetails = id => this.service.get(`/getOneMovement/${id}`).then(response => response.data)
    postMovement = movement => this.service.post(`/new`, movement).then(response => response.data)
    deleteMovement = id => this.service.get(`/deleteMovement/${id}`).then(response => response.data)
}