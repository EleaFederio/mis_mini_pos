import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductTable from "./product_components/ProductTable";
import {BsFillBagPlusFill} from "react-icons/all";

const AddProductModal = (props) => {

    const [productId, setProductId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] =useState(1);
    const [cardTitle, setCardTitle] = useState('');

    //***** Add Product Modal Controls *****//
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //***** Add Product Modal Controls *****//
    const [productModal, setProductModal] = useState(false);
    const productModalClose = () => setProductModal(false);
    const productModalShow = () => setProductModal(true);

    //***** Product Data & State *****//
    const [products, setProducts] = useState([]);
    const productUrl = props.url + '/api/products';
    const [productEndPoint, setProductEndPoint] = useState(productUrl);

    const getProducts = () => {
        axios.get(productEndPoint)
            .then(res => {
                setProducts(res.data);
                // console.log('++++++++++++++++++++++++++')
                // console.log(products)
            }).catch(err => {
            // console.log(err)
        });
    }

    const showModalAddProduct = () => {
        handleShow();
        setCardTitle('Add New Product');
    }

    const showModalUpdateDetails = (id) => {
        setCardTitle('Update this Product');
        axios.get(props.url + '/api/product/' + id)
            .then(res => {
                setProductId(res.data.product.id);
                setName(res.data.product.name);
                setDescription(res.data.product.description)
                setPrice(res.data.product.price);
                setCategory(res.data.product.category_id);
            }).catch(err => {
            console.log(err)
        });
        // console.log({
        //     name : name,
        //     description : description,
        //     price : price,
        //     category : category
        // })
        handleShow();
    }

    const closeModalUpdateProduct = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setCategory(0)
        handleClose();
    }

    const updateProduct = () => {
        let data = {
            'name' : name,
            'description' : description,
            'price' : price,
            'category_id' : category
        }
        console.log(data);
        axios.put(props.url + '/api/product/update/' + productId, data)
            .then(res => {
                setProducts(res.data);
                setName('');
                setDescription('');
                setPrice(0);
                setCategory(0)
                handleClose()
            }).catch(err => {
                console.log(err)
        })
    }

    const deleteProduct = (id) => {
        axios.delete(props.url + '/api/product/' + id)
            .then(res =>  {
                setProducts(res.data);
            }).catch(err => {
                console.log(err)
        })
    }

    const showURL = (url) => {
        setProductEndPoint(productUrl + url);
        while(!productEndPoint){

        }
        getProducts()
        // console.log(productEndPoint);
    }

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

    const addProduct = () => {
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
                handleClose();
                getProducts();
            }).catch(err => {
            // console.log(err)
        });
    }

    useEffect(() => {
        getCategories();
        getProducts();
    }, [])

    return (
        <Container className={'mt-3'}>
            <Button variant={"primary"} onClick={showModalAddProduct}><BsFillBagPlusFill/> Add Product</Button>

            <ProductTable
                products={products}
                showUrl={showURL}
                productModalShow={productModalShow}
                showModalUpdateDetails={showModalUpdateDetails}
                deleteProduct={deleteProduct}
            />

            {/* Add Product MOdal */}
            <Row className={'justify-content-center align-items-center'}>
                <Col md={5}>
                    <Modal show={show} >
                        <Modal.Header style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <h5 className={'text-center'}>{cardTitle}</h5>
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
                                        value={category}
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
                            <Button
                                variant={"secondary"}
                                onClick={cardTitle === 'Update this Product' ? closeModalUpdateProduct : handleClose}
                            >Cancel</Button>
                            <Button
                                variant={"primary"}
                                onClick={cardTitle === 'Update this Product' ? updateProduct : addProduct}
                            >Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProductModal;