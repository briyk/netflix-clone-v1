import React,{useState} from "react";
import logo from "../assets/Logonetflix.png";
import banner from "../assets/banner.jpg";
import { Link , useNavigate } from "react-router-dom";
//import our context
import {useUserAuth} from '../context/authContext'



const SignIn = () => {
  //get user values
    const [email,setEmail] = useState('') ;
    const [password,setPassword] = useState('') ;
    const {user, signUpHandler} = useUserAuth();
  const navigate = useNavigate() ;
  //make handler to pass data on submit
  const handlerSumbmit = async (e) =>{
    e.preventDefault() ;
    try{
        await signUpHandler(email,password) ;
        navigate('/')
    } catch (error){
      console.log(error)
    } 
  }
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* <div className="absolute top-5 left-5 z-10 m-4">
        <Link to="/">
          <img
            src={logo}
            alt=""
            className="w-[120px] sm:w-[140px] md:w-[150px] lg:w-[167px] "
          />
        </Link>
      </div> */}
      <div className="w-full h-full">
        <div className="w-full h-screen absolute bg-gradient-to-r from-black flex justify-center items-center">
          <form onSubmit={handlerSumbmit} className="mt-4 w-[80%] sm:w-[60%] md:w-[450px] min-h-[500px]  absolute z-[100] bg-black/80 p-7">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sign Up</h2>
            <label htmlFor="email"></label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your mail"
              autoComplete="email"
              className="block my-4 bg-[#333] text-white w-full py-4 px-6 rounded-sm text-xl"
              required
            />
            <input
             onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              autoComplete="complete-password"
              className="block my-4 bg-[#333] text-white w-full py-4 px-6 rounded-sm text-xl"
              required
            />
            <button
              type="submit"
              className="mt-8 d-block w-full bg-[#e50914] border-0 outline-0 text-white p-4 font-medium text-xl rounded-sm"
            >
              Sign Up
            </button>
            <p className="mt-4 flex justify-between">
                <label> <input type="checkbox"/> remember me</label>
                <span>Need help ?</span>
            </p>
            <div className="mt-4 text-sm">
              <span>
                Already have Netflix account?{" "}
                <Link to="/signin" className="font-bold">
                  Sign In now
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
        <img className="w-full h-full object-cover" src={banner} alt="banner" />
      </div>
    </div>
  );
};

export default SignIn;
