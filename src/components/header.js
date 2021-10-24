import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Header(props){
    const [category, setCategory] =useState(1);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(props.url + '/api/branches')
            .then(res => {
                setCategories(res.data);
                // console.log(categories);
            }).catch(err => {
            // console.log(err)
        });
    }

    useEffect(() => {
        getCategories()
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
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categories.map((categorie) => (
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