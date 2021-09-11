import Header from "./components/header";
import {Col, Container, Row} from "react-bootstrap";
import ItemAndPrice from "./components/itemAndPrice";
import ProductSearch from "./components/productSearch";
import ProductComponent from "./components/productComponent";

function App() {
  return (
    <div>
        <Header/>
        <Container fluid className={'mt-4'}>
            <Row>
                <Col sm={7}>
                    <ProductSearch />
                    <Container>
                        <Row className={'mt-5'}>
                            <ProductComponent/>
                        </Row>
                    </Container>
                </Col>
                <Col sm={5}>
                    <ItemAndPrice/>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
