import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import Note from "../components/Note";
import Plus from "../components/Plus";
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

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
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

      <Plus />
    </section>
  );
};

export default Index;
