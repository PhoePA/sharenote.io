import { TrashIcon, PencilAltIcon, EyeIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";
const Note = () => {
  return (
    <div className=" w-2/5 border shadow-lg border-t-4 border-t-teal-600 p-3 rounded">
      <h3 className=" text-xl font-medium">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </h3>
      <p className=" text-sm indent-5 text-justify">
        What if the last line of the list is what I want to write but not what
        the reader wants to read and the expected moment of the peak to the
        story between the best and strongest man for everyone and the mightiest
        anit-hero?
      </p>
      <div className="flex justify-end gap-1 mt-2">
        <TrashIcon width={20} className=" text-red-500" />
        <Link to={"/edit/1"}>
          <PencilAltIcon width={20} className=" text-teal-600" />
        </Link>
        <Link to={"/notes/1"}>
          <EyeIcon width={20} className=" text-gray-500" />
        </Link>
      </div>
    </div>
  );
};

export default Note;
