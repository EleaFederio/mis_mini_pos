import Header from "./components/header";
import {Button, Col, Container, Row} from "react-bootstrap";
import ItemAndPrice from "./components/itemAndPrice";
import ProductSearch from "./components/productSearch";
import ProductComponent from "./components/productComponent";
import axios from "axios";
import {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";

function App() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState({
        'tax'  : 0.00,
        'discount' : 0.00,
        'subTotal' : 0.00,
        'total' : 0.00
    })

    const getProducts = () => {
        axios.get('http://127.0.0.1:8000/api/product')
            .then(res => {
                setProducts(res.data.data);
            }).catch(err => {
                console.log(err)
        });
    }

    const searchProduct = (url) => {
        axios.get(url)
            .then(res => {
                setProducts(res.data);
            }).catch(err => {
            console.log(err)
        });
    }

    const addToCart = (productFromProp) => {
        let hahaha = (cart => productFromProp.id === cart.id);
        console.log(hahaha === true);
        setTimeout(() => {
            setCart(cart => [...cart,  productFromProp]);
        }, 2000);
      console.log(cart);
    }



    useEffect(() => {
        getProducts();
    }, []);

  return (
    <div>
        <Header/>
        <Container fluid className={'mt-4'}>
            <Row>
                <Col sm={7}>
                    <ProductSearch searchProduct={searchProduct} />
                    <Container>
                        <Row className={'mt-5'}>
                            {
                                products.map((product) => (
                                    <ProductComponent
                                        className={'mt-5'}
                                        product={product}
                                        key={product.id}
                                        addToCart={addToCart}
                                    />
                                ))
                            }
                        </Row>
                    </Container>
                </Col>
                <Col sm={5}>
                    <ItemAndPrice cart={cart} summary={summary}/>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
