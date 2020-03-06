import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/typesPayment`,
            withCredentials: true
        })
    }

    getAllTypesPayment = () => this.service.get('/getAllTypesPayment').then(response => response.data)
    postTypePayment = typePayment => this.service.post(`/typePaymentNew`, typePayment).then(response => response.data)
    deleteTypePayment = id => this.service.get(`/deleteTypePayment/${id}`).then(response => response.data)
}