import {Fragment, useEffect, useState} from "react";
import Header from "./components/header";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const Add = () => {

    const url = 'http://127.0.0.1:8000';
    // const url = 'https://mis-pos.herokuapp.com';
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] =useState(1);

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(url + '/api/categories')
            .then(res => {
                setCategories(res.data);
                console.log(categories);
            }).catch(err => {
            console.log(err)
        });
    }

    const addproduct = () => {
        let data = {
            'name' : name,
            'description' : description,
            'price' : price,
            'category_id' : category
        }
        axios.post(url + '/api/product/add', data)
            .then(res => {
                console.log(res);
                setName('');
                setDescription('');
                setPrice(0);
                setCategory(0)
            }).catch(err => {
            console.log(err)
        });
    }


    useEffect(() => {
        getCategories()
    }, [categories])

    return <Fragment>
        <Header/>
        <Container className={'h-100'}>
            <Row className={'justify-content-center align-items-center'}>
                <Col md={5}>
                    <Card style={{marginTop: '8vh'}}>
                        <p
                            className={'text-center mb-0'}
                            style={{marginTop: '2vh'}}
                        >
                            <b>Add New Product</b>
                        </p>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type={'text'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={'Enter Product Name...'}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type={'text'}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={'Enter Description...'}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type={'text'}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder={'Enter Price...'}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        name={'category'}
                                        defaultValue={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {
                                            categories.map((categorie) => (
                                                <option
                                                    key={categorie.id}
                                                    value={categorie.id}
                                                >
                                                    {categorie.category_name}
                                                </option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button
                                        className={'btn-block mt-5'}
                                        onClick={addproduct}
                                    >
                                        <b>Add</b>
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </Fragment>
}

export default Add;