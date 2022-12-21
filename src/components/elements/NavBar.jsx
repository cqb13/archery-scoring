import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Button from "./Button";
import googleSignIn from "../../utils/googleSignIn";

const NavBar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav>
      <div className="Links">
        <Link to="/" className="Switch-Page">
          Score
        </Link>
        <Link to="/about" className="Switch-Page">
          About
        </Link>
      </div>
      <div className="User">
        {user ? (
          <Link to="/account" className="Switch-Page">
            {user.displayName}
          </Link>
        ) : (
          <Button class="Switch-Page" onClick={googleSignIn}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
