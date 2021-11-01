import {Fragment, useEffect, useState} from "react";
import {Button, Pagination, Spinner, Table} from "react-bootstrap";
import axios from "axios";
import ProductComponent from "../productComponent";
import {decode} from "html-entities";

const ProductTable = (props) => {

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

    const showURL = (url) => {
        setProductEndPoint(productUrl + url);
        while(!productEndPoint){

        }
        getProducts()
        // console.log(productEndPoint);
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Fragment>
            <h5 className={'text-center'}>Product Table</h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className={'text-center'}>Name</th>
                        <th className={'text-center'}>Category</th>
                        <th className={'text-center'}>Price</th>
                        <th className={'text-center'}>Actions</th>
                    </tr>
                </thead>
                <tbody>
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
                        products.data.map((product) => (
                            <tr key={product.id}>
                                <td className={'text-center'}>{product.name}</td>
                                <td className={'text-center'}>{product.category}</td>
                                <td className={'text-center'}>{product.price}</td>
                                <td className={'text-center'}></td>
                            </tr>
                        ))
                }
                </tbody>
            </Table>
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
        </Fragment>
    );
}

export default ProductTable;