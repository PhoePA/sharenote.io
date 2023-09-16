import { BookmarkAltIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className=" bg-slate-200 py-4 px-10">
      <div className="flex justify-between">
        <Link to={"/"} className="flex">
          <BookmarkAltIcon width={40} height={35} className=" text-teal-600" />
          <h1 className=" text-teal-600 font-semibold text-5xl">
            ShareNote.io
          </h1>
        </Link>
        <div className="flex gap-3">
          <Link to={"/create"} className="object-center my-2">
            <button className=" text-teal-600">Share</button>
          </Link>
          <Link to={"/login"} className="object-center my-2">
            <button className=" text-teal-600">Login</button>
          </Link>
          <Link to={"/register"} className="object-center my-2">
            <button className=" text-teal-600">Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
