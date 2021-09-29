import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header(){
    return (
        <Navbar collapseOnSelect bg={'primary'} expand={'lg'} variant={'dark'}>
            <Container fluid>
                <Navbar.Brand as={Link} to={'/'}>MIS POS v.1</Navbar.Brand>
                <Navbar.Toggle aria-controls={'responsive-navbar-nav'}/>
                <Navbar.Collapse id={'responsive-navbar-nav'}>
                    <Nav className={'me-auto'}>
                        <Nav.Link as={Link} to={'/add'}>Add</Nav.Link>
                        <Nav.Link as={Link} to={'/transactions'}>Transactions</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            {/*<Button variant={'outline-danger'}>LOGOUT</Button>*/}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;