
<<<<<<< HEAD
import {BrowserRouter, Route} from "react-router-dom";
import Main from "./Main";
import Add from "./Add";
import TransactionList from "./TransactionList";
=======
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
//     const url = 'http://127.0.0.1:8000';
    const url = 'https://mis-pos.herokuapp.com';

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
>>>>>>> 77dcbd6bcac056f5fd6baecc5637e52eb5612350

function App() {

  return (
   <BrowserRouter>
       <Route path={'/'} exact component={Main}></Route>
       <Route path={'/add'} component={Add}></Route>
       <Route path={'/transactions'} component={TransactionList}></Route>
   </BrowserRouter>
  );
}

export default App;
