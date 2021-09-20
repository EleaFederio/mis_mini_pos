import {Fragment, useEffect} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import SalesTable from "./cardComponents/salesTable";

const ItemAndPrice = (props) => {

    useEffect(() => {
        // console.log(props.payment <= props.summary.total)
        console.log(props.summary.total)
        console.log(props.summary.total.toFixed(2) >= props.payment )
    })

    return (
        <Fragment>
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
                                <Form.Control
                                    type={'text'}
                                    value={props.payment}
                                    onChange={(e) => props.setPayment(e.target.value)}
                                    placeholder={'Enter Amount'}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={'mt-3 mb-3'}>
                        <Col>
                            <Button
                                variant={'danger'}
                                onClick={props.cancelTransaction}
                                disabled={props.cart.length === 0}
                            >
                                Cancel
                            </Button>
                        </Col>
                        <Col lg={2}>
                            <Button
                                onClick={() => props.payCash(3000)}
                                variant={'primary'}
                                disabled={ !(props.payment >= props.summary.total)}
                            >
                                Pay
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </Fragment>
    )
}

export default ItemAndPrice;