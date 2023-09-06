import { TrashIcon, PencilAltIcon, EyeIcon } from "@heroicons/react/outline";
import formatISO9075 from "date-fns/formatISO9075";
import { Link } from "react-router-dom";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;

  return (
    <div className=" w-2/5 border shadow-lg border-t-4 border-t-teal-600 p-3 rounded">
      <h3 className=" text-xl text-center font-medium capitalize">{title}</h3>
      <p className=" text-sm indent-5 mt-2 text-justify">
        {content.slice(0, 120)}
      </p>
      <hr className="mt-1"/>
      <div className="flex justify-between  mt-2">
        <p>{formatISO9075(new Date(createdAt), { representation: "date" })}</p>
       
        <div className="flex items-center  gap-1">
          <TrashIcon width={20} className=" text-red-500" />
          <Link to={"/edit/" + _id}>
            <PencilAltIcon width={20} className=" text-teal-600" />
          </Link>
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className=" text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
