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
    const [title,  setTile] = useState();


    const [discountData, setDiscountData] = useState({
        name : '',
        percent : 0
    });

    const [discounts, setDiscounts] = useState();


    const [pointer, setPointer] = useState();

    const showCreateModal = () => {
        setDiscountData({
            ...discountData,
            name : '',
            percent : 0
        });
        setTile('Create Discount')
        handleShow()
    }

    const showUpdateModal = (id) => {
        setTile('Update Discount')
        selectDiscount(id)
        handleShow()
    }

    const getDiscount = () => {
        axios.get(props.url + '/api/discount')
            .then((result) => {
                setDiscounts(result.data)
            }).catch((error) => {
                console.log(error)
        })
    }

    const selectDiscount = (id) => {
        axios.get(props.url + '/api/discount/' + id)
            .then((res) => {
                setPointer(id);
                setDiscountData({
                   ...discountData,
                    name : res.data.discount.name,
                    percent : res.data.discount.percent
                });
            })
    }

    const updateDiscount = () => {
        axios.put(props.url + '/api/discount/' + pointer,  discountData)
            .then((res) => {
                console.log(props.url + '/api/discount/' + pointer)
                setDiscounts(res.data.discount)
                handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
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

            <DiscountHeader
                showCreateModal={showCreateModal}
            />

            <DiscountTable
                discounts={discounts}
                deleteDiscount={deleteDiscount}
                showUpdateModal={showUpdateModal}
            />

            <DiscountModal
                show={show}
                title={title}
                handleClose={handleClose}
                discountData={discountData}
                setDiscountData={setDiscountData}
                getDiscount={getDiscount}
                url={props.url}
                updateDiscount={updateDiscount}
            />

        </Fragment>
    )
}

export default DiscountComponent;