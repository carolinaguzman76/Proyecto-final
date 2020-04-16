import React from 'react'

import './Start.css'

import Carousel from 'react-bootstrap/Carousel'


const Start = () => {


    return (

        <>
            <h1>esto es el inicio</h1>
            <p>instrucciones</p>

            <Carousel className="carouselInstructions">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/conta1.png"
                        alt="Intrucciones 1"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/conta2.png"
                        alt="Intrucciones 2"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/conta3.png"
                        alt="Intrucciones 3"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>

    )
}

export default Start












