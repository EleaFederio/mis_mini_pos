import {Fragment, useEffect, useState} from "react";
import Header from "./components/header";
import {Accordion, Button, Card, Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import axios from "axios";
import {decode} from "html-entities";

const TransactionList = (props) => {

    const [transactions, setTransactions] = useState([]);
    const transactionUrl = props.url + '/api/transactions';
    const [transactionEndPoint, setTransactionEndPoint] = useState(transactionUrl);

    const getTransactions = () => {
        axios.get(transactionEndPoint)
            .then(res => {
                setTransactions(res.data)
                console.log(transactions)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const showURL = (url) => {
        setTransactionEndPoint(transactionUrl + url);
        while(!setTransactionEndPoint){

        }
        getTransactions()
        // console.log(productEndPoint);
    }

    useEffect(() => {
       getTransactions()
    }, [transactionEndPoint]);

    return (
      <Fragment>
          <h1  className={'text-center mt-3'}>Transactions List</h1>
          <Container className={'mt-5'}>
              {
                  // console.log(transactions.data)
                  // transactions.data.map((transaction) => (
                  //     <p>{transaction.sales_id}</p>
                  // ))


                  !transactions.data ?
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
                      :
                      transactions.data.map((transaction) => (
                          <Accordion defaultActiveKey={0}>
                              <Accordion.Item eventKey={transaction.sales_id}>
                                  <Accordion.Header>
                                      Reference Number:{'\u00A0\u00A0'}<b>{transaction.reference_number}</b>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                      <Row>
                                          <Col>
                                              <p style={{marginBottom: 0}}><b>Tax: </b>₱{transaction.tax}</p>
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
                                                  <Col lg={4} className={'mt-2'}>
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

              {/*
                * Page Pagination
              */}
              <Pagination className={'mt-3'}>
                  {
                      // transactions.links.data.map((link) => {
                      //     console.log(link)
                      // })

                      // console.log(!transactions.links)

                      !transactions.links ? '' :
                          transactions.links.map((link) => (
                              // console.log(link.url),
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
      </Fragment>
    );
}

export default TransactionList;