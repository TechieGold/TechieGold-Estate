import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebabse';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app)
  
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account'})

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultFromGoogle);
      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
         }),
      })
      const data = await res.json()

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="p-3 border rounded-lg bg-green-500 text-white uppercase hover:opacity-80">
          Continue with google
        </button>
  )
}

