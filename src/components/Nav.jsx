import { BookmarkAltIcon } from "@heroicons/react/outline";
import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import { useContext } from "react";
import Plus from "../components/Plus";
const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

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
        <div className="flex gap-3 justify-center items-center">
          {token ? (
            <>
              <Link to={"/create"} className="object-center my-2">
                <button className=" text-teal-600">SHARE NOTE</button>
              </Link>
              <button
                type="button"
                className=" text-teal-600"
                onClick={logoutHandler}
              >
                Logout
              </button>
             <Plus />
            </>
          ) : (
            <>
              <Link to={"/login"} className="object-center my-2">
                <button className=" text-teal-600">Login</button>
              </Link>
              <Link to={"/register"} className="object-center my-2">
                <button className=" text-teal-600">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
