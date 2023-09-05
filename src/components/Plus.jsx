import { PlusIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";
const Plus = () => {
  return (
    <Link
      to={"/create"}
      className=" bg-teal-600 p-2 text-white rounded-full w-50 h-50 fixed bottom-10 right-20"
    >
      <PlusIcon width={30} height={30} />
    </Link>
  );
};

export default Plus;
