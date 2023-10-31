import { NavLink, Link } from "react-router-dom";

const Navbar = () =>{
    return(
        
           <nav>
              <div className ="logo">

                <Link to ="/about">
                   <h3>Logo</h3>
                </Link>
             
              </div>

              <ul>
                <li><NavLink className='item'>Home</NavLink></li>
                <li><NavLink className='item'>Services</NavLink></li>
              </ul>
          </nav>
        
    );
};

export default Navbar;