
import {Fragment} from "react";
import Header from "./components/header";

import BarChart from "./components/BarChart";
import {Card, Col, Container, Row} from "react-bootstrap";


const Report = () => {




    return (
        <Fragment>
            <Container>
                <h1 className={'text-center'}>Data Warehouse</h1>
                <Row>
                    <Col lg={6} className={'mt-2'}>
                        <Card>
                            <Card.Body>
                                <BarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6} className={'mt-2'}>
                        <Card>
                            <Card.Body>
                                <BarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6} className={'mt-2'}>
                        <Card>
                            <Card.Body>
                                <BarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Report;