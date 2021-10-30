import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Header(props){


    const getBranches = () => {
        axios.get(props.url + '/api/branches')
            .then(res => {
                props.setBranches(res.data);
                console.log(props.branches);
            }).catch(err => {
            // console.log(err)
        });
    }

    useEffect(() => {
        getBranches()
    }, [])

    return (
        <Navbar collapseOnSelect bg={'primary'} expand={'lg'} variant={'dark'}>
            <Container fluid>
                <Navbar.Brand as={Link} to={'/'}>MIS POS v.1</Navbar.Brand>
                <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                <Navbar.Collapse id={'responsive-navbar-nav'}>
                    <Nav className={'me-auto'}>
                        <Nav.Link as={Link} to={'/add'}>Add</Nav.Link>
                        <Nav.Link as={Link} to={'/transactions'}>Transactions</Nav.Link>
                        <Nav.Link as={Link} to={'/reports'}>Data Warehouse</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link >Select Branch</Nav.Link>
                        <Form.Group className="justify-content-end">
                            {/*<Form.Label>Category</Form.Label>*/}
                            <Form.Select
                                // name={'category'}
                                // defaultValue={category}
                                onChange={(e) => props.setBranch(e.target.value)}
                            >
                                {
                                    props.branches.map((categorie) => (
                                        <option
                                            key={categorie.id}
                                            value={categorie.id}
                                        >
                                            {categorie.branch_name}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;