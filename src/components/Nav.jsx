import { BookmarkAltIcon } from "@heroicons/react/outline";
import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import { useContext } from "react";
import Plus from "../components/Plus";
const Nav = () => {
  // const token = localStorage.getItem("token");
  // console.log(token);
  const {token,  updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className=" bg-slate-200 py-4 px-10">
      <div className="flex justify-between">
        <Link to={"/"} className="flex">
          <BookmarkAltIcon width={40} height={35} className=" text-teal-600" />
          <h1 className=" text-teal-600 font-semibold text-5xl">
            ShareNote.io
          </h1>
        </Link>
        <div className="flex flex-col gap-3 justify-end items-end">
          {token? (
            <>
              <div className="flex gap-2">
                <Link to={"/create"} className="object-center">
                  <button className=" text-teal-600">SHARE NOTE</button>
                </Link>
                <button
                  type="button"
                  className=" text-teal-600"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
              <Plus />
            </>
          ) : (
            <div className="flex gap-2">
              <Link to={"/login"} className="object-center my-2">
                <button className=" text-teal-600">Login</button>
              </Link>
              <Link to={"/register"} className="object-center my-2">
                <button className=" text-teal-600">Register</button>
              </Link>
            </div>
          )}
          {token && token.user_mail && (
            <p className="text-teal-600">
              <span>Login as </span>
              {token.user_mail}
            </p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
