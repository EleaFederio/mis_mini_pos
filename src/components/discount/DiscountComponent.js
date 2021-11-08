import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import DiscountTable from "./DiscountTable";
import DiscountHeader from "./DiscountHeader";
import DiscountModal from "./DiscountModal";

const DiscountComponent = (props) => {

    // ***** Modal States ***** //
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [discountData, setDiscountData] = useState({
        name : '',
        percent : 10
    });

    const [discounts, setDiscounts] = useState();

    const getDiscount = () => {
        axios.get(props.url + '/api/discount')
            .then((result) => {
                setDiscounts(result.data)
            }).catch((error) => {
                console.log(error)
        })
    }

    const addDiscount = (data) => {
        console.log(data);
        // axios.post(props.url + '/api/discount' + data)
        //     .then((result) => {
        //         setDiscounts(result.data)
        //     }).catch((error) => {
        //     console.log(error)
        // })
    }

    const deleteDiscount = (id) => {
        axios.delete(props.url + '/api/discount/' + id)
            .then((result) => {
                setDiscounts(result.data.discount)
            }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getDiscount();
    }, [])

    return(
        <Fragment>
            <DiscountHeader handleShow={handleShow} />
            <DiscountTable
                discounts={discounts}
                deleteDiscount={deleteDiscount}
            />

            <DiscountModal
                show={show}
                handleClose={handleClose}
                discountData={discountData}
                setDiscountData={setDiscountData}
                addDiscount={addDiscount}
            />

        </Fragment>
    )
}

export default DiscountComponent;