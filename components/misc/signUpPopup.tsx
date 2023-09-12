import Button from "@components/general/button";
import googleSignIn from "@/utils/firebase/account/googleSignIn";

export default function SignUpPopup({
  updateSignUpPopup
}: {
  updateSignUpPopup: (value: boolean) => void;
}) {
  const signUpProcess = () => {
    updateSignUpPopup(false);
    googleSignIn();
  };

  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-dark bg-opacity-30'>
      <section className='shadow-card rounded-md p-10 border border-gray-300 bg-lightest flex flex-col w-1/2 gap-2'>
        <h1 className='text-center text-5xl'>Sign In</h1>
        <hr />
        <p>You must have an account for this action</p>
        <div className='flex gap-2'>
          <Button title='Sign In / Sign Up' onClick={signUpProcess} />
          <Button title='Cancel' onClick={() => updateSignUpPopup(false)} />
        </div>
      </section>
    </div>
  );
}
