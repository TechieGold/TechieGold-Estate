import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})  
  }
  console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false){
       dispatch(signInFailure(data.message))
        return;

      }
      if (res.ok){
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input  className="border p-3 rounded-lg" type="email" placeholder="Email" id="email"  onChange={handleChange}/>
        <input className="border p-3 rounded-lg" type="password"  placeholder="Password" id="password" onChange={handleChange}/>
        <button
          disabled={loading}
            className="bg-slate-700 p-3 border rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80">
            { loading ? 'loading' : 'sign in'}
        </button>
      </form>
      <div className="flex gap-4 mt-4">
        <p>Dont have an account?</p>
        <Link to={'/signup'}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
    </div>
  )
}
