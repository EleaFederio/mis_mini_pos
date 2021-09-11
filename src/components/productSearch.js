import {Fragment} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

function ProductSearch(){
    return (<Fragment>
        <Form.Group>

            <Row>
                <Form.Label>Product Name</Form.Label>
                <Col lg={3}>
                    <Form.Control type={'text'} placeholder={'Enter Product Name...'}/>
                </Col>
                <Col lg={2}>
                    <Button variant={'primary'}>Search</Button>
                </Col>
                <Col lg={2}/>
                <Col lg={3}>
                    <Form.Control type={'text'} placeholder={'Enter Product Code...'}/>
                </Col>
                <Col lg={2}>
                    <Button variant={'primary'}>Search</Button>
                </Col>
            </Row>
        </Form.Group>
    </Fragment>);
}

export default ProductSearch;