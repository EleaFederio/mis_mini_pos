import {Fragment} from "react";
import {Button, Col, Pagination, Row, Spinner, Table} from "react-bootstrap";
import {decode} from "html-entities";
import {AiFillEdit, AiFillEye, BsFillTrashFill} from "react-icons/all";


const ProductTable = (props) => {

    return (
        <Fragment>
            <h5 className={'text-center'}>Product Table</h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className={'text-center'}>Name</th>
                        <th className={'text-center'}>Description</th>
                        <th className={'text-center'}>Category</th>
                        <th className={'text-center'}>Price</th>
                        <th className={'text-center'}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    !props.products.data ? (
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
                        props.products.data.map((product) => (
                            <tr key={product.id}>
                                <td className={'text-center'}>{product.name}</td>
                                <td className={'text-center'}>{product.description}</td>
                                <td className={'text-center'}>{product.category}</td>
                                <td className={'text-center'}>₱{product.price}</td>
                                <td className={'text-center'} width={180}>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant={'secondary'}
                                                size={'sm'}
                                                onClick={() => props.showModalUpdateDetails(product.id)}
                                            >
                                                <AiFillEdit/>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant={'danger'} size={'sm'}><BsFillTrashFill/></Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </Table>
            <Pagination className={'mt-3'}>
                {
                    !props.products.links ? '' :
                        props.products.links.map((link) => (
                            // console.log(link.url),
                            <Pagination.Item
                                disabled={link.url === null}
                                // onClick={props.showUrl(link.ur)}
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