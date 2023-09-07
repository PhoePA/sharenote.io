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

        <Link to={"/create"} className="object-center w-10 h-10">
          <button className="float-right bg-teal-800 p-2 rounded text-white">
            Share
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
