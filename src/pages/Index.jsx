import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import Note from "../components/Note";
import Plus from "../components/Plus";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotes = async (pageNum) => {
    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);

    setLoading(false);
  };

  useEffect(() => {
    getNotes(currentPage);
  }, [currentPage]);

  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    <section>
      <div className="flex justify-center m-10 gap-6 flex-wrap h-screen">
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
          <div className="flex flex-col justify-center items-center m-auto h-32">
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
      </div>
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
      <div className="w-full flex items-center justify-center gap-20 fixed bottom-10 right-1">
        {currentPage > 1 && (
          <button
            type="button"
            className="bg-teal-600 p-2 text-white rounded"
            onClick={handlePre}
          >
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            type="button"
            className="bg-teal-600 p-2 text-white rounded"
            onClick={handleNext}
          >
            Next Page
          </button>
        )}
      </div>
    </section>
  );
};

export default Index;
