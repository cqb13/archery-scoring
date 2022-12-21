import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Button from "../components/elements/Button";
import Profile from "../components/pageComponents/Profile";
import googleSignOut from "../utils/googleSignOut";
import googleSignIn from "../utils/googleSignIn";

const Account = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="Account">
      <h1>Account</h1>
      <hr />
      {user ? (
        <div>
          <Profile name={user.displayName} pfp={user.photoURL} />
          <Button class="Account-Button" onClick={googleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <Button class="Account-Button" onClick={googleSignIn}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Account;
