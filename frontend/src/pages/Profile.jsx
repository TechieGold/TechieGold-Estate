import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebabse';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function Profile() {
  const dispatch = useDispatch()

  const { currentUser, loading, error } = useSelector((state)=> state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setimageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  

  useEffect(() => {
    if (file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() +  file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        setimageUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => 
            setFormData({...formData, avatar: getDownloadURL}));
      }
    )
  }
  const handleChange = async(e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const res = await fetch(`api/user/update/${currentUser._id}1`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false){
        dispatch(updateUserFailure(data.message))
      }
      dispatch(updateUserSuccess(data));
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) =>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
        <img
          className='w-24 h-24 rounded-full object-cover self-center mt-2 cursor-pointer'
          onClick={()=>fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} alt="profile photo" />

        {/* Displays the image upload status,
        providing feedback on errors, progress, and success. */}
        <p className='text-sm self-center'>
          { imageUploadError ? (
              <span className='text-red-700'>Could not upload image, try again!</span>
            ): imageUploadProgress > 0 && imageUploadProgress < 100 ? (
              <span className='text-slate-500'>{`Uploading ${imageUploadProgress}%`}</span>
            ) :  imageUploadProgress === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (' ')    
          }
        </p>
        
        <input
          className='border p-3 rounded-lg'
          type="text"
          placeholder='Username'
          defaultValue={currentUser.username}
          id='username'
          onChange={handleChange}/>
        <input 
          className='border p-3 rounded-lg' 
          type="email" 
          placeholder='email'
          defaultValue={currentUser.email}
          id='email' 
          onChange={handleChange}/>
        <input 
          className='border p-3 rounded-lg' 
          type="password" 
          placeholder='Password'
          defaultValue='**********' 
          id='password' 
          onChange={handleChange}/>
        <button
          disabled={loading}
          className='bg-slate-700 text-white uppercase p-3 rounded-lg opacity-95 hover:opacity-80'>
            { loading ? 'loading' : 'update '}
        </button>
        {/* <button className='bg-green-600 p-3 rounded-lg text-white uppercase'>create listing</button> */}
      </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-500 cursor-pointer'>Delete account</span>
          <span className='text-red-500 cursor-pointer'>Sign out</span>
        </div>
        <p className='text-red-700 mb-4'>{error ? error : ' '}</p>
    </div>
  )
}
