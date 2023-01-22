import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const googleSignOut = () => {
  signOut(auth);
};

export default googleSignOut;
