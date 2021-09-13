import {Fragment} from "react";
import {Button, Card, Col} from "react-bootstrap";

const ProductComponent = (props) =>{
    return (<Fragment>
        <Col lg={4}>
            <Card>
                <Card.Img src={'https://davaogroceriesonline.com/wp-content/uploads/2020/11/Screen-Shot-2020-11-06-at-11.32.27-AM.png'} />
                <Card.Body>
                    <h5 style={{marginBottom: 0}}>{props.product.name}</h5>
                    <p style={{marginBottom: 0}}>{props.product.description}</p>
                    <h1 style={{marginBottom: 0}}><b>₱{props.product.price}</b></h1>
                    <div className={'d-grid gap-2'}>
                        <Button
                            size={'sm'}
                            onClick={() => props.addToCart({
                                'id' : props.product.id,
                                'name' : props.product.name,
                                'description' : props.product.description,
                                'quantity' : 1,
                                'category_id' : props.product.category_id,
                                'price' : props.product.price
                            })}
                        >Add</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Fragment>);
}

export default ProductComponent;