import { BackspaceIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const NoteForm = ({ isCreate }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-7">
        <h1 className=" text-2xl font-bold">
          {isCreate ? "Create a New Note!" : "Edit Your Note!"}
        </h1>
        <Link to={"/"}>
          <ArrowSmLeftIcon width={30} height={40} />
        </Link>
      </div>
      <form action="#">
        <div className="">
          <label htmlFor="title" className="font-medium block mb-1">
            Note Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-lg border border-teal-600 py-2 w-full rounded-lg mb-5"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="font-medium block mb-1">
            Note Description
          </label>
          <textarea
            type="text"
            rows={5}
            name="description"
            id="description"
            className="text-lg border border-teal-600 py-2 w-full rounded-lg mb-3 px-5"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="text-white  bg-teal-600 py-2 font-medium w-full rounded"
          >
            <Link to={"/"} className="flex items-center justify-center">
              <BackspaceIcon width={30} height={40} /> Cancel
            </Link>
          </button>
          <button
            type="submit"
            className="text-white bg-teal-600 py-2 font-medium w-full rounded"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
