import { Navbar, NavbarBrand } from 'reactstrap';
import AddOrg from './AddOrgModal';
function NavbarMenu(){
    return (
        <div className="App col-12">
          <Navbar dark color="primary">
              <div className="container">
                <NavbarBrand href="/">Address Book</NavbarBrand>
                
                <AddOrg />
              </div>
              
            </Navbar>
        </div>
      );
}

export default NavbarMenu;