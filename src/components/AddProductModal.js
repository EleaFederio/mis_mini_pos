import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductTable from "./product_components/ProductTable";

const AddProductModal = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] =useState(1);

    //***** Modal Controls *****//
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategories = () => {
        axios.get(props.url + '/api/categories')
            .then(res => {
                setCategories(res.data);
                // console.log(categories);
            }).catch(err => {
            // console.log(err)
        });
    }

    const [categories, setCategories] = useState([]);

    const addproduct = () => {
        let data = {
            'name' : name,
            'description' : description,
            'price' : price,
            'category_id' : category
        }
        axios.post(props.url + '/api/product/add', data)
            .then(res => {
                // console.log(res);
                setName('');
                setDescription('');
                setPrice(0);
                setCategory(0)
                handleClose()
            }).catch(err => {
            // console.log(err)
        });
    }



    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Container className={'mt-3'}>
            <Button variant={"primary"} size={'sm'} onClick={handleShow}>Add Product</Button>

            <ProductTable url={props.url} />

            {/* Add Product MOdal */}
            <Row className={'justify-content-center align-items-center'}>
                <Col md={5}>
                    <Modal show={show} >
                        <Modal.Header style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <h5 className={'text-center'}>Add New Product</h5>
                        </Modal.Header>
                        <Modal.Body>
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
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"secondary"} onClick={handleClose}>Cancel</Button>
                            <Button variant={"primary"} onClick={addproduct}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProductModal;