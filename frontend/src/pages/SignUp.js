import React, { useState } from 'react';
import loginIcons from '../images/login fav icon.jpg';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name : "",
    confirmPassword : "",
    profilePic : ""
  });
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      
      ...prev,
      [name]: value
      
    }));
  };

  const handleUploadPic = async(e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    //console.log("imagePic", imagePic)
    setData((preve) =>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })

  }



  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){
      //console.log("SummaryApi.SignUp.url", SummaryApi.SignUp.url)
      const dataResponse = await fetch(SummaryApi.SignUp.url,{
        method : SummaryApi.SignUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

     // toast(dataApi.message)
  
      //console.log("data", dataApi)
    }else{
      toast.error("password and confirm password did not match")
      //console.log("password and confirm password did not match")
    }

    
    // Add your form submission logic here
  };

  //console.log("data login", data);

  return (
    <section id='signup'>
      <div className='max-auto-container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
          <img src={data.profilePic || loginIcons} alt='login icons'/>
          </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer  text-center absolute bottom-0 w-full'>
                  Upload photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
              </label>

            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div className='grid'>

              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
              <input 
                type='email' 
                placeholder='Enter you email' 
                name='email'
                value={data.email}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent'/>
              </div>

            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>

            </div>
            <div>
              <label>Confirm Password: </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter your password'
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </div>

            </div>

            <button className='bg-blue-400 text-white px-6 py-2 w-full max-w-[150px] hover:bg-blue-800 rounded-full mx-auto block mt-6'>
              Sign Up
            </button>
          </form>
          
          <p className='my-6'>
            Already have an account? <Link to={"/login"} className='hover:text-yellow-400 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
