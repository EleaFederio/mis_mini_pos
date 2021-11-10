import {Button, Col, Row} from "react-bootstrap";
import {FaFileImport, FaPlus, FaQuestion} from "react-icons/all";

const DiscountHeader  = (props) => {
    return (
        <Row>
            <Col>

                <Button
                    className={'mb-3 me-3'}
                    size={'sm'}
                    variant={'primary'}
                    onClick={props.showCreateModal}
                >
                    <FaPlus/>New Discount
                </Button>

                <Button
                    className={'mb-3'}
                    size={'sm'}
                    variant={'success'}
                >
                    <FaFileImport/> CSV Import
                </Button>

            </Col>
            <Col>
                <div className={'text-end'}>
                    <Button
                        className={'mb-3 rounded-circle'}
                        size={'sm'}
                        variant={'secondary'}
                    ><FaQuestion/></Button>
                </div>
            </Col>
        </Row>
    );
}

export default DiscountHeader;