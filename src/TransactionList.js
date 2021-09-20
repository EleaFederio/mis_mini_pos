import {Fragment, useEffect, useState} from "react";
import Header from "./components/header";
import {Accordion, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";

const TransactionList = () => {

    const url = 'http://127.0.0.1:8000/api/transactions';
    const [transactions, setTransactions] = useState([]);

    const getTransactions = () => {
        axios.get(url)
            .then(res => {
                setTransactions(res.data)
                console.log(transactions)
            })
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(() => {
       getTransactions()
    }, []);

    return (
      <Fragment>
          <Header/>
          <h1  className={'text-center mt-3'}>Transactions List</h1>
          <Container className={'mt-5'}>
              {
                  transactions.map((transaction) => (
                     <Accordion defaultActiveKey={0}>
                         <Accordion.Item eventKey={transaction.id}>
                             <Accordion.Header>
                                 <b>Reference Number:</b>   {transaction.reference_number}
                             </Accordion.Header>
                             <Accordion.Body>
                                 <Row>
                                     <Col>
                                         <p style={{marginBottom: 0}}><b>Tax: </b>₱{(transaction.total * 0.12).toFixed(2)}</p>
                                     </Col>
                                     <Col>
                                         <p style={{marginBottom: 0}}><b>Sub Total: </b>₱{transaction.sub_total}</p>
                                     </Col>
                                     <Col>
                                         <p style={{marginBottom: 0}}><b>Total: </b>₱{transaction.total}</p>
                                     </Col>
                                 </Row>
                                 <Row>
                                     <Col>
                                         <p><b>Payment: </b>₱{transaction.payment}</p>
                                     </Col>
                                     <Col>
                                         <p><b>Change: </b>₱{transaction.change}</p>
                                     </Col>
                                     <Col>
                                         <p><b>Date: </b>{transaction.created_at}</p>
                                     </Col>
                                 </Row>
                                 <Row>
                                     {
                                         transaction.product.map((product_item) => (
                                            <Col lg={4}>
                                                <Card>
                                                    <Card.Header>
                                                        <b>{product_item.name}</b>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <p style={{marginBottom: 0}}>
                                                            <b>Description :</b> {product_item.description}
                                                        </p>
                                                        <p style={{marginBottom: 0}}>
                                                            <b>Price :</b> ₱{product_item.price}
                                                        </p>
                                                        <p style={{marginBottom: 0}}>
                                                            <b>Quantity :</b> {product_item.quantity}pcs
                                                        </p>
                                                        <p style={{marginBottom: 0}}>
                                                            <b>Total :</b> ₱{product_item.total}
                                                        </p>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                         ))
                                     }
                                 </Row>
                             </Accordion.Body>
                         </Accordion.Item>
                     </Accordion>
                  ))
              }
          </Container>
      </Fragment>
    );
}

export default TransactionList;