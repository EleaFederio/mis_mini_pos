import {Fragment} from "react";
import {Button, Table} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons";

const SalesTable = (props) => {
    return (<Fragment>
        <Table bordered>
            <thead>
                <tr>
                    <th className={'table-dark text-center'}>Item</th>
                    <th className={'table-dark text-center'}>Quantity</th>
                    <th className={'table-dark text-center'}>Price</th>
                    <th className={'table-dark text-center'}>Total</th>
                    <th className={'table-dark'}></th>
                </tr>
            </thead>
            <tbody>
            {
                props.cart.map((cartItem) => (
                    <tr key={cartItem.id}>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.quantity}</td>
                        <td>₱{(cartItem.price * 1).toFixed(2)}</td>
                        <td>₱{(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                        <td>
                            <Button
                                variant={'danger'}
                                size={'sm'}
                                onClick={() => props.deleteProduct(cartItem.id)}
                            >
                                <Trash/>
                            </Button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    </Fragment>)
}

export default SalesTable;