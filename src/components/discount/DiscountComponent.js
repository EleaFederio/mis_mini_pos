import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import DiscountTable from "./DiscountTable";
import DiscountHeader from "./DiscountHeader";
import DiscountModal from "./DiscountModal";
import {Alert, Button, Form, Modal} from "react-bootstrap";
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
    const [discountError, setDiscountError] = useState();
    const [first, setFirst] = useState(true);

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
        setFirst(false);
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

        promise.then((datas) => {
            datas.map((data) => {
                setDiscountError(!data.hasOwnProperty('name'))
                setDiscountError(!data.hasOwnProperty('percent'))
            });
            setCsvData(datas);
            console.log(discountError);
        });
    }

    const uploadCsvData = () => {
        console.log(csvData);
        axios.post(props.url + '/api/discount/upload', csvData)
            .then((res) => {
                console.log(res.data);
                setShowCSVModal(false)
                getDiscount()
            }).catch((error) => {
                console.log('Hahaha')
        })
    }

    const openDiscountModal = () => {
        console.log('Open Discount Modal')
        setShowCSVModal(true);
        setDiscountError(false)
        setFirst(true);
    }

    useEffect(() => {
        getDiscount();
        console.log('Discount Error'+ first)
    }, [discountError])

    return(
        <Fragment>

            <DiscountHeader
                showCreateModal={showCreateModal}
                openDiscountModal={openDiscountModal}
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
                    <Alert
                        show={discountError}
                        variant={'danger'}
                    >
                        Invalid Format or File!
                    </Alert>
                    <Form.Group>
                        <Form.Label>CSV File</Form.Label>
                        <Form.Control
                            type={'file'}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                readSpreadSheet(file)
                            }}
                            name={'csvFile'}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={'secondary'}
                        onClick={() => setShowCSVModal(false)}
                    >Close</Button>
                    <Button
                        disabled={discountError === true ||  first === true ? true : false}
                        variant={'primary'}
                        onClick={uploadCsvData}
                    >Upload</Button>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}

export default DiscountComponent;