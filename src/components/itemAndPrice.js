import {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import SalesTable from "./cardComponents/salesTable";
import axios from "axios";

const ItemAndPrice = (props) => {
    const [discountFormState, setDiscountFormState] = useState(true);
    const [discounts, setDiscounts]  = useState();

    const getDiscounts = () => {
        axios.get(props.url + '/api/discount')
            .then((result) => {
                setDiscounts(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getDiscounts()
        console.log(discounts)
    }, [])

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
                        <Col lg={3}/>
                        <Col lg={3}>
                            <Button
                                hidden={ props.summary.total === 0 ? true : false}
                                active={discountFormState}
                                variant={'secondary'}
                                size={'sm'}
                                onClick={() => {
                                    setDiscountFormState(!discountFormState)
                                    discountFormState ? props.setDiscount(discounts[0].percent) : props.setDiscount(0)

                                    // setDiscounts(discounts[0].percent)
                                }}
                            >Add Discount</Button>
                        </Col>
                        <Col lg={3}>
                            <Form.Group hidden={discountFormState}>
                                <Form.Select
                                    defaultValue={''}
                                    size={'sm'}
                                    onChange={(e) => {
                                        props.setDiscount(e.target.value)
                                        props.setDiscountName(e.target.options[e.target.selectedIndex].text)
                                        console.log(props.summary)
                                    }}
                                >
                                    {
                                        !discounts ?
                                            <Spinner animation={"grow"} />
                                            :
                                            discounts.map((discount) => (
                                                <option
                                                    key={discount.id}
                                                    value={discount.percent}
                                                    name={discount.name}
                                                >
                                                    {discount.name}
                                                </option>
                                            ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={3}/>
                    </Row>
                    <Row>
                        <Col><b>SUB-TOTAL:</b></Col>
                        <Col lg={3}><b>₱{props.summary.subTotal.toFixed(2).toLocaleString()}</b></Col>
                    </Row>
                    <Row>
                        <Col><b>TAX:</b></Col>
                        <Col lg={3}><b>₱{props.summary.tax.toFixed(2).toLocaleString()}</b></Col>
                    </Row>
                    <Row>
                        <Col><b>DISCOUNT:</b></Col>
                        {/*<Col lg={3}><b>₱{props.summary.discount.toFixed(2)}</b></Col>*/}
                        <Col lg={3}><b>% {props.discount}</b></Col>
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
                                disabled={ props.payment === '' || props.summary.total === 0 ? true : !(props.payment >= props.summary.total)}
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