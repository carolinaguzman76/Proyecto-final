import axios from 'axios'

export default class Services {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/categories`,
            withCredentials: true
        })
    }

    getAllBudgets = () => this.service.get('/getAllBudgets').then(response => response.data) 
    deleteBudget = id => this.service.get(`/deleteBudget/${id}`).then(response => response.data)
}