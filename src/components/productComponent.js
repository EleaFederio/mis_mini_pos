import {Fragment} from "react";
import {Badge, Button, Card, Col} from "react-bootstrap";

const ProductComponent = (props) =>{
    return (<Fragment>
        <Col lg={4}>
            <Card className={'mt-3'}>
                <Card.Img src={'https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png'} />
                <Card.Body>
                    <Badge  bg={'info'}>{props.product.category}</Badge>
                    <h5 style={{marginBottom: 0}}>{props.product.name}</h5>
                    <p style={{marginBottom: 0}}>{props.product.description}</p>
                    <h1
                        style={{
                            marginBottom: 0,
                            color: 'red',
                            paddingBottom: 0
                        }}
                    ><b>₱{props.product.price}</b></h1>
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