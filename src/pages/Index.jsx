import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import Note from "../components/Note";
import Plus from "../components/Plus";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);

    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);

    setLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const customAlert = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <section className="flex justify-center gap-6 px-20 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              getNotes={getNotes}
              customAlert={customAlert}
            />
          ))}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center m-auto">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#222a33"]}
          />
          <p className=" text-5xl m-2">Loading.... Please Wait! </p>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Plus />
    </section>
  );
};

export default Index;
