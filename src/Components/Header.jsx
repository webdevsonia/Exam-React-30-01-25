import { Container, Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <>
        <Navbar className="bg-body-tertiary mb-5 p-3 rounded-pill Regular shadow">
            <Navbar.Brand href="/">Product</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end text-dark">
              <Nav.Link href="/add">Add Product [+]</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    </>
  );
}

export default Header;
