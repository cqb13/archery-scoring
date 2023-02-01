import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const NavBar = () => {
  const [user] = useAuthState(auth);

  //!!!: if the back arrow in the browser is used, the active class is not updated to the correct page
  const changePage = (event) => {
    const buttons = document.querySelectorAll(".Switch-Page");

    buttons.forEach((button) => {
      button.classList.remove("Active");
    });

    event.target.classList.add("Active");
  };

  return (
    <nav className='Sticky'>
      <Link to='/' className='Switch-Page Active' onClick={changePage}>
        Score
      </Link>
      <Link to='/history' className='Switch-Page' onClick={changePage}>
        History
      </Link>
      <Link to='/about' className='Switch-Page' onClick={changePage}>
        About
      </Link>
      <Link to='/account' className='Switch-Page' onClick={changePage}>
        {user ? user.displayName : "Account"}
      </Link>
    </nav>
  );
};

export default NavBar;
