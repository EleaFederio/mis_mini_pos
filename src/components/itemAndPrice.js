import {Fragment} from "react";
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import SalesTable from "./cardComponents/salesTable";

function ItemAndPrice(){
    return (<Fragment>
        <Card>
            <Card.Header>Item and Price</Card.Header>
            <Card.Body>
                <SalesTable/>
                <hr className={'mt-5'}/>
            </Card.Body>
            <Container>
                <Row>
                    <Col><b>TAX:</b></Col>
                    <Col lg={2}><b>₱40.44</b></Col>
                </Row>
                <Row>
                    <Col><b>DISCOUNT:</b></Col>
                    <Col lg={2}><b>₱40.44</b></Col>
                </Row>
                <Row>
                    <Col><b>SUB-TOTAL:</b></Col>
                    <Col lg={2}><b>₱40.44</b></Col>
                </Row>
                <Row>
                    <Col><b>TOTAL AMOUNT:</b></Col>
                    <Col lg={2}><b>₱40.44</b></Col>
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
                        <Button variant={'danger'}>Cancel</Button>
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