import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg p-3 mx-auto'>
        <h1 className="text-3xl text-center my-9 font-semibold ">Sign up</h1>
        <form className="flex flex-col gap-4">
          <input className="border p-3 rounded-lg" type="text" placeholder="username"  id="username"/>
          <input className="border p-3 rounded-lg" type="email" placeholder="email" id="email" />
          <input className="border p-3 rounded-lg" type="password" placeholder="password" id="password" />
          <button className="bg-slate-700 p-3 border rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80">Sign up</button>
        </form>
        <div className='flex gap-2 my-4'>
          <p>Have an account?</p>
          <Link to={'/signIn'}>
            <span className='text-blue-700'>sign in</span>
          </Link>
        </div>
    </div>
  )
}
