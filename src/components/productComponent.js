import {Fragment} from "react";
import {Card, Col} from "react-bootstrap";

function ProductComponent(){
    return (<Fragment>
        <Col lg={4}>
            <Card>
                <Card.Img src={'https://davaogroceriesonline.com/wp-content/uploads/2020/11/Screen-Shot-2020-11-06-at-11.32.27-AM.png'} />
                <Card.Body>
                    <h5>Gardenia Wheat Bread</h5>
                    <p>sd sdfkl jfsdfdfk</p>
                    <h1><b>₱85.00</b></h1>
                </Card.Body>
            </Card>
        </Col>
    </Fragment>);
}

export default ProductComponent;