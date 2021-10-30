
import {Fragment, useEffect, useState} from "react";
import Header from "./components/header";

import BarChart from "./components/BarChart";
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";


const Report = (props) => {

    const [dataWareHouse, setDataWareHouse] = useState([]);

    const getWareHouseData = () => {
        axios.get(props.url + '/api/year/sale/2021')
            .then(res => {
                setDataWareHouse(res.data.data);
                console.log('++++++++++++++++++++++++++')
                console.log(dataWareHouse)
            }).catch(err => {
            // console.log(err)
        });
    }

    useEffect(() => {
        getWareHouseData()
    },[]);


    return (
        <Fragment>
            <Container>
                <h1 className={'text-center'}>Data Warehouse</h1>
                <Row>
                    {
                        dataWareHouse.map((branch) => (
                            <Col lg={6} className={'mt-2'} key={branch.id}>
                                <Card>
                                    <Card.Body>
                                        <BarChart data={branch} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </Fragment>
    )
}

export default Report;