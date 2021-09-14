import {Fragment, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import SalesTable from "./cardComponents/salesTable";

const ItemAndPrice = (props) => {


    return (<Fragment>
        <Card>
            <Card.Header>Item and Price</Card.Header>
            <Card.Body>
                <SalesTable
                    cart={props.cart}
                    deleteProduct={props.deleteProduct}
                />
                <hr className={'mt-5'}/>
            </Card.Body>
            <Container>
                <Row>
                    <Col><b>TAX:</b></Col>
                    <Col lg={3}><b>₱{props.summary.tax.toFixed(2).toLocaleString()}</b></Col>
                </Row>
                <Row>
                    <Col><b>DISCOUNT:</b></Col>
                    <Col lg={3}><b>₱{props.summary.discount.toFixed(2)}</b></Col>
                </Row>
                <Row>
                    <Col><b>SUB-TOTAL:</b></Col>
                    <Col lg={3}><b>₱{props.summary.subTotal.toFixed(2).toLocaleString()}</b></Col>
                </Row>
                <Row>
                    <Col><b>TOTAL AMOUNT:</b></Col>
                    <Col lg={3}><b>₱{props.summary.total.toFixed(2)}</b></Col>
                </Row>
                <Row>
                    <Col lg={'6'}>
                        <Form.Group className={'mt-4'}>
                            <Form.Label>Fee</Form.Label>
                            <Form.Control type={'text'} placeholder={'Enter Amount'} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-3 mb-3'}>
                    <Col>
                        {/*<Button variant={'danger'}>Cancel</Button>*/}
                    </Col>
                    <Col lg={2}>
                        <Button variant={'primary'}>Pay</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    </Fragment>)
}

export default ItemAndPrice;