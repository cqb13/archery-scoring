import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase";

export default function googleSignOut() {
  signOut(auth);
}
