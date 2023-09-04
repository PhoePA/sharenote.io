import { BookmarkAltIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <Link to={"/"}>
      <nav className=" bg-slate-200 py-4 px-10 flex">
        <BookmarkAltIcon width={40} height={35} className=" text-teal-600" />
        <h1 className=" text-teal-600 font-semibold text-5xl">ShareNote.io</h1>
      </nav>
    </Link>
  );
};

export default Nav;
