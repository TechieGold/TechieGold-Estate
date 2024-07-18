import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state)=> state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='w-24 h-24 rounded-full object-cover self-center mt-2 cursor-pointer' src={currentUser.avatar} alt="profile photo" />
        <input className='border p-3 rounded-lg' type="text" placeholder='Username' id='username'/>
        <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' />
        <input className='border p-3 rounded-lg' type="password" placeholder='Password' id='password' />
        <button className='bg-slate-700 text-white uppercase p-3 rounded-lg opacity-95 hover:opacity-80'>Update</button>
        {/* <button className='bg-green-600 p-3 rounded-lg text-white uppercase'>create listing</button> */}
      </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-500 cursor-pointer'>Delete account</span>
          <span className='text-red-500 cursor-pointer'>Sign out</span>
        </div>
    </div>
  )
}
