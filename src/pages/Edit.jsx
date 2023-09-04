import NoteForm from "../components/NoteForm";

const Edit = () => {
  return (
    <section className=" p-10">
      <NoteForm isCreate={false} />
    </section>
  );
};

export default Edit;
