import {Button, Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import ItemAndPrice from "./components/itemAndPrice";
import ProductSearch from "./components/productSearch";
import ProductComponent from "./components/productComponent";
import axios from "axios";
import {useEffect, useState} from "react";
import {decode} from 'html-entities';

function Main(props) {

    const [products, setProducts] = useState([
    ]);
    const productUrl = props.url + '/api/product';
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState('');
    const [summary, setSummary] = useState({
        'tax'  : 0.00,
        'discount' : 0.00,
        'subTotal' : 0.00,
        'total' : 0.00
    });
    const [productEndPoint, setProductEndPoint] = useState(productUrl);
    // const url = 'http://127.0.0.1:8000';
    // const url = 'https://mis-pos.herokuapp.com';

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

    const searchProduct = (url) => {
        console.log(url);
        axios.get(url)
            .then(res => {
                setProducts(res);
                console.log(res);
                console.log(products);
            }).catch(err => {
            // console.log(err)
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
        // console.log(summary);
        // console.log(cart);
    }

    const deleteProduct = (productId) => {
        const newProduct = cart.filter((item) => item.id !== productId);
        setCart(newProduct);
    }

    const payCash = (money) => {
        // console.log('pay cash');
        let product_list = [];
        cart.map((cart_item) => (
            // console.log(cart_item)
            product_list.push({
                "item" : cart_item.id,
                "quantity" : cart_item.quantity,
                "branch_id" : parseInt(props.branch)
            })
        ));
        console.log('XXXXXXXXXXXXX' + product_list)
        const data = {
            'payment' : payment,
            'totalPrice' : summary.subTotal,
            'products' : product_list
        }
        console.log('pay cash process');
        console.log(data);
        if(axios.post(props.url + '/api/transaction/add', data)){
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

    const showURL = (url) => {
        setProductEndPoint(productUrl + url);
        while(!productEndPoint){

        }
        getProducts()
        // console.log(productEndPoint);
    }



    useEffect(() => {
        getProducts();

        let subTotal = 0.0;
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
        // console.log('Hahahahahahaha');
        // console.log(products)
    }, [cart, productEndPoint]);

    return (
        <div>
            <Container fluid className={'mt-4'}>
                <Row>
                    <Col sm={7}>
                        <ProductSearch searchProduct={searchProduct} getProducts={getProducts} url={props.url} />
                        <Container>
                            <Row className={'mt-5'}>
                                {
                                    !products.data ? (
                                            <Button disabled>
                                                <Spinner
                                                    as={'span'}
                                                    animation={'grow'}
                                                    size={'sm'}
                                                    role={'status'}
                                                    aria-hidden={true}
                                                />
                                                Loading...
                                            </Button>
                                    ) :

                                        // console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX', products.data)
                                    products.data.map((product) => (
                                        <ProductComponent
                                            className={'mt-5'}
                                            product={product}
                                            key={product.id}
                                            addToCart={addToCart}
                                        />
                                    ))
                                }
                            </Row>
                            <Pagination className={'mt-3'}>
                                {
                                    !products.links ? '' :
                                    products.links.map((link) => (
                                        <Pagination.Item
                                            disabled={link.url === null}
                                            onClick={() => showURL(link.url)}
                                            active={link.active}
                                        >
                                            <span>{decode(link.label)}</span>
                                        </Pagination.Item>
                                    ))
                                }
                            </Pagination>
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

export default Main;
