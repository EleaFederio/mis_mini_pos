import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {FaPen, FaTrash} from "react-icons/all";

const DiscountTable = (props) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th className={'text-center'}>Name</th>
                <th className={'text-center'}>Discount (%)</th>
                <th className={'text-center'}>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                !props.discounts?
                    (
                        <Spinner animation={"border"}/>
                    )
                    :
                    props.discounts.map((discount) => (
                        <tr>
                            <td className={'text-center'}>{ discount.name }</td>
                            <td className={'text-center'}>{ discount.percent }%</td>
                            <td className={'text-center'}>
                                <Row>
                                    <Col>
                                        <Button
                                            size={'sm'}
                                            variant={'secondary'}
                                            onClick={() => props.showUpdateModal(discount.id)}
                                        ><FaPen/></Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            size={'sm'}
                                            variant={'danger'}
                                            onClick={() => props.deleteDiscount(discount.id)}
                                        ><FaTrash/></Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))
            }
            </tbody>
        </Table>
    )
}

export default DiscountTable;