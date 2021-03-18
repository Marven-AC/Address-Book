import { Navbar, NavbarBrand, Button } from 'reactstrap';

function NavbarMenu(){
    return (
        <div className="App col-12">
          <Navbar dark color="primary">
              <div className="container">
                <NavbarBrand href="/">Address Book</NavbarBrand>
                <Button>Add</Button>
              </div>
              
            </Navbar>
        </div>
      );
}

export default NavbarMenu;