import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import discountValidation from "./discountValidation";
import {axios} from "../../lib/axios";

const DiscountModal = (props) => {

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        props.setDiscountData({
            ...props.discountData,
            [event.target.name] : event.target.value,
        })
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(props.discountData);

        setErrors(discountValidation(props.discountData))

    }

    useEffect(() => {
        // ***** Continuation of handleSubmit() *****  //
        if(props.title === 'Create Discount'){
            if(isEmpty(errors)){
                axios.post(props.url + '/api/discount', props.discountData)
                    .then((res) => {
                        props.setDiscountData(res.data.discount)
                        props.handleClose()
                        props.getDiscount()
                    }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }, [errors,])

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <div>
                    <h5 className={'text-center'}>{props.title}</h5>
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
                <Button variant="primary"  onClick={props.title === 'Create Discount' ? handleSubmit : props.updateDiscount} >
                    {props.title === 'Create Discount' ? 'Submit' : 'Save Changes'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DiscountModal;