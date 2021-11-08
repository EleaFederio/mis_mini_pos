import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {useState} from "react";
import discountValidation from "./discountValidation";
import data from "bootstrap/js/src/dom/data";

const DiscountModal = (props) => {

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        props.setDiscountData({
            ...props.discountData,
            [event.target.name] : event.target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(discountValidation(props.discountData))
        if(errors === {}){
            data = {
                name : props.discountData.name,
                percent : props.discountData.percent
            }
            props.addDiscount(data)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <div>
                    <h5 className={'text-center'}>Create Discount</h5>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className={'mt-3'}>
                        <Form.Label>Name</Form.Label>
                        <FormControl
                            type={'text'}
                            name={'name'}
                            value={props.discountData.name}
                            placeholder={'Discount Name...'}
                            onChange={handleChange}
                            isInvalid={errors.name}
                        />
                        {errors.name && <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className={'mt-3'}>
                        <Form.Label>Discount by %</Form.Label>
                        <FormControl
                            type={'text'}
                            name={'percent'}
                            value={props.discountData.percent}
                            placeholder={'Discount Percentage...'}
                            onChange={handleChange}
                            isInvalid={errors.percent}
                        />
                        {errors.percent && <Form.Control.Feedback type="invalid">
                            {errors.percent}
                        </Form.Control.Feedback>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary"  onClick={handleSubmit} >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DiscountModal;