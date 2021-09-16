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
    const [payment, setPayment] = useState('');
    const [summary, setSummary] = useState({
        'tax'  : 0.00,
        'discount' : 0.00,
        'subTotal' : 0.00,
        'total' : 0.00
    });
    const url = 'http://127.0.0.1:8000';
    // const url = 'https://mis-pos.herokuapp.com';

    const getProducts = () => {
        axios.get(url + '/api/product')
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
        const check_index = cart.findIndex(item => item.id === productFromProp.id);
        if(check_index !== -1){
            cart[check_index].quantity++;
            setCart(cart => [...cart]);
        }else{
            setCart(cart => [...cart,  productFromProp]);
        }
        // console.log('add to cart:')
        console.log(summary);
        // console.log(cart);
    }

    const deleteProduct = (productId) => {
        const newProduct = cart.filter((item) => item.id !== productId);
        setCart(newProduct);
    }

    const payCash = (money) => {
        console.log('pay cash');
        let product_list = [];
        cart.map((cart_item) => (
            // console.log(cart_item)
            product_list.push({
                "item" : cart_item.id,
                "quantity" : cart_item.quantity
            })
        ));
        const data = {
            'payment' : payment,
            'totalPrice' : summary.subTotal,
            'products' : product_list
        }
        console.log('pay cash process');
        console.log(data);
        if(axios.post(url + '/api/transaction/add', data)){
            setCart([])
            setSummary({
                'tax'  : 0.00,
                'discount' : 0.00,
                'subTotal' : 0.00,
                'total' : 0.00
            });
            setPayment('');
        }
    }

    const cancelTransaction = () => {
        setCart([])
        setSummary({
            'tax'  : 0.00,
            'discount' : 0.00,
            'subTotal' : 0.00,
            'total' : 0.00
        });
        setPayment('');
    }

    useEffect(() => {
        getProducts();
        let subTotal = 0.0;
        console.log('set total: ')
        console.log(summary);
        cart.map((item) => (
            subTotal = subTotal + (item.price * item.quantity)
        ));
        let tax = subTotal * 0.12;
        const data = {
            'tax'  : tax,
            'discount' : 0.00,
            'subTotal' : subTotal,
            'total' : subTotal + tax
        };
        setSummary(data);
    }, [cart]);

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
                    <ItemAndPrice
                        cart={cart}
                        deleteProduct={deleteProduct}
                        summary={summary}
                        setPayment={setPayment}
                        payment={payment}
                        payCash={payCash}
                        cancelTransaction={cancelTransaction}
                    />
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
