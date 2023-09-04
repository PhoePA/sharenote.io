import NoteForm from "../components/NoteForm";

const Create = () => {
  return (
    <section className="p-10">
      <NoteForm isCreate={true} />
    </section>
  );
};

export default Create;
