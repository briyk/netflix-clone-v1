import React from "react";
import logo from "../assets/Logonetflix.png";
import { Link , useNavigate } from "react-router-dom";
import userImg from "../assets/man.png";
import { useUserAuth } from "../context/authContext";

const Navbar = () => {

  const { user, logOutHandler } = useUserAuth();
  const navigate = useNavigate() ;
  //handl log ou
  const handleLogOut = async () =>{
    try{
        await logOutHandler(user)
        navigate('/')
    } catch(error){
      console.log(err)
    }
  }
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center max-w-[1400px] p-6 z-[100] w-full absolute">
        <Link to="/">
        <img src={logo} alt="logo" className="w-[6.75rem] h-[2rem]" />
        </Link>
      {user?.email ? (
        <div className="flex items-center mt-4 sm:mt-auto">
          <Link
            to="/account"
            className="rounded-sm flex items-center cursor-pointer mr-2"
          >
            <img
              src={userImg}
              className="w-[30px] h-[30px] rounded-full mr-2"
              alt=""
            />
            <button type="button">Account</button>
          </Link>
          <button type="button" className="btn btn-red rounded-sm" onClick={handleLogOut}>
            <Link>Log out</Link>
          </button>
        </div>
      ) : (
        <div className="flex mt-2 sm:mt-auto">
          <button className="btn btn-white rounded-sm mr-2" type="button">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="btn btn-red rounded-sm" type="button">
            <Link to="/signin">Sign In</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
