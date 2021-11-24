import {Fragment, useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Modal, Row, Tab, Tabs} from "react-bootstrap";
import axios from "axios";
import AddProductModal from "./components/AddProductModal";
import DiscountComponent from "./components/discount/DiscountComponent";

const Add = (props) => {


    //***** Tab Switching Variable *****//
    const [tabKey, setTabKey] = useState('products');




    return <Fragment>
        <Container >
            <h1  className={'text-center mt-3'}>Dashboard</h1>
            {/***** Switchable tab between Products and Discount *****/}
            <Tabs
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                className={'mt-3'}
                style={{
                    backgroundColor: '#ddd',
                    color: 'white'
                }}
            >
                <Tab eventKey={'products'} title={'Products'}>
                    <Card>
                        <Card.Body>
                            <AddProductModal url={props.url}/>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey={'discount'} title={'Discount'}>
                    <Card>
                        <Card.Body>
                            <DiscountComponent url={props.url} />
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    </Fragment>
}

export default Add;