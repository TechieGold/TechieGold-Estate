import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  {/* This function gets, tracks and stores form inputs */}
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  {/* This function handle form submit, also includes functionality to handle errors */}
  const handleSubmit = async (e) => {
    e.preventDefault(); {/*  prevents reload each time submit is clicked on.*/}
    if (!formData.username || !formData.email || !formData.password){
      setErrorMessage('All field are required')
    }
    try {   
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
  
      if (data.success === false){
        return setErrorMessage(data.message);  
      }
      setLoading(false);
      if (res.ok){
        navigate('/signIn');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='max-w-lg p-3 mx-auto'>
        <h1 className="text-3xl text-center my-9 font-semibold ">Sign up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="border p-3 rounded-lg" type="text" placeholder="username"  id="username" onChange={handleChange}/>
          <input className="border p-3 rounded-lg" type="email" placeholder="email" id="email" onChange={handleChange}/>
          <input className="border p-3 rounded-lg" type="password" placeholder="password" id="password" onChange={handleChange}/>
          <button 
            disabled={loading}
            className="bg-slate-700 p-3 border rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80">
              {loading ? 'loading' : 'Sign up'}
          </button>
        </form>
        <div className='flex gap-2 my-4'>
          <p>Have an account?</p>
          <Link to={'/signIn'}>
            <span className='text-blue-700'>sign in</span>
          </Link>
        </div>
        {errorMessage && <p className='text-red-500 mt-5'>{errorMessage}</p> }
    </div>
  )
}
