import {Button, Container, Nav, Navbar} from "react-bootstrap";

function Header(){
    return (
        <Navbar collapseOnSelect bg={'primary'} expand={'lg'} variant={'dark'}>
            <Container fluid>
                <Navbar.Brand>Cashier's Name</Navbar.Brand>
                <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                <Navbar.Collapse id={'responsive-navbar-nav'}>
                    <Nav className={'me-auto'}>

                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button variant={'outline-danger'}>LOGOUT</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;