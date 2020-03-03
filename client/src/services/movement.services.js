import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/movements',
            withCredentials: true
        })
    }

    getAllMovements = () => this.service.get('/getAllMovements').then(response => response.data)
    getMovementDetails = id => this.service.get(`/getOneMovement/${id}`).then(response => response.data)
    postMovement = movement => this.service.post(`/new`, movement).then(response => response.data)
}