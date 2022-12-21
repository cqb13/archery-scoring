import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const googleSignOut = () => {
  signOut(auth);
};

export default googleSignOut;
