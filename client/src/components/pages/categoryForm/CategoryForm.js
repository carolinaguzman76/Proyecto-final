import React, { Component } from 'react'

import './CategoryForm.css'

import CategoriesServices from '../../../services/category.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FilesServices from '../../../services/files.services'

class CategoryForm extends Component {

    constructor(props) {
        super(props)
        this.categoryServices = new CategoriesServices()
        this.filesServices = new FilesServices()
        this.state = {
            category: {
                name: ''
            }
        }
    }

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postCategory = () => {
        this.categoryServices.postCategory(this.state.category)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            category: { ...this.state.category, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postCategory()
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.category.name} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">Crear nueva categoria</Button>
            </Form>
        )
    }
}

export default CategoryForm