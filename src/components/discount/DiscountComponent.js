import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import DiscountTable from "./DiscountTable";
import DiscountHeader from "./DiscountHeader";
import DiscountModal from "./DiscountModal";
import {Button, Form, Modal} from "react-bootstrap";
import * as XLSX from 'xlsx';

const DiscountComponent = (props) => {

    // ***** Modal States ***** //
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title,  setTile] = useState();

    // ***** This Controls the CSV Reader Modal ***** //
    const [showCSVModal, setShowCSVModal] = useState(false);
    const [csvData, setCsvData] = useState({});


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

    const readSpreadSheet = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((data) => {
            setCsvData(data)
            console.log(data)
        });
    }

    useEffect(() => {
        getDiscount();
    }, [])

    return(
        <Fragment>

            <DiscountHeader
                showCreateModal={showCreateModal}
                setShowCSVModal={setShowCSVModal}
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

            <Modal show={showCSVModal} onHide={() => setShowCSVModal(false)}>
                <Modal.Header>
                    <Modal.Title>Upload Discount List</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/*  Form for CSV File  */}
                    <Form.Group>
                        <Form.Label>CSV File</Form.Label>
                        <Form.Control
                            type={'file'}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                readSpreadSheet(file)
                            }}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={'secondary'}
                        onClick={() => setShowCSVModal(false)}
                    >Close</Button>
                    <Button
                        variant={'primary'}

                    >Upload</Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}

export default DiscountComponent;