import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/moviments',
            withCredentials: true
        })
    }

    getAllMoviments = () => this.service.get('/getAllMoviments').then(response => response.data)
    getMovimentDetails = id => this.service.get(`/getOneMoviment/${id}`).then(response => response.data)
    postMoviment = moviment => this.service.post(`/new`, moviment).then(response => response.data)
}