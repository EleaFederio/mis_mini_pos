import {Fragment, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

const ProductSearch = (props) => {

    const [searchUrl, setSearchUrl] = useState('');

    return (<Fragment>
        <Form.Group>

            <Row>
                <Form.Label>Product Name</Form.Label>
                <Col lg={3}>
                    <Form.Control
                        type={'text'}
                        value={searchUrl}
                        onChange={(e) => setSearchUrl(e.target.value)}
                        placeholder={'Enter Product Name...'}
                    />
                </Col>
                <Col lg={2}>
                    <Button 
                    variant={'primary'} 
                    onClick={
                        searchUrl === '' ?
                        () => props.getProducts()
                        :
                        () => props.searchProduct(props.url + '/api/product/search/' + searchUrl)
                    }
                    >
                        Search
                    </Button>
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
