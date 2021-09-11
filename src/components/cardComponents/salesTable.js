import {Fragment} from "react";
import {Table} from "react-bootstrap";

function SalesTable(){
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
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                </tr>
            </tbody>
        </Table>
    </Fragment>)
}

export default SalesTable;