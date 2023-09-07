import { BackspaceIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useEffect, useState } from "react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});

  const { id } = useParams();

  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);

    if (response.status === 200) {
      const note = await response.json();
      // console.log(note);
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
  };

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Title must have at least 3 characters!")
      .max(100)
      .required("Title is required!"),
    content: Yup.string()
      .trim()
      .min(2, "Content must have at least 2 characters!")
      .max(5000)
      .required("Content is required!"),
  });

  // validation from formik
  // const validate = (values) => {
  //   const errors = {};

  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must have 10 characters!";
  //   }
  //   if (values.content.trim().length < 10) {
  //     errors.content = "Content must have 10 characters!";
  //   }
  //   return errors;
  // };

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;
    let method;
    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create-notes`;
      method = "POST";
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
      method = "PUT";
    }

      const response = await fetch(API, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201 || response.status === 200) {
        setRedirect(true);
      } else {
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
 
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
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

      <div className="flex items-center justify-between mb-7">
        <h1 className=" text-2xl font-bold">
          {isCreate ? "Create a New Note!" : "Edit Your Note!"}
        </h1>
        <Link to={"/"}>
          <ArrowSmLeftIcon width={30} height={40} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form action="#">
            <div className="">
              <label htmlFor="title" className="font-medium block mb-1">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="text-lg border border-teal-600 p-2 w-full rounded-lg"
              />
              {/* {errors.title && touched.title && <p>{errors.title}</p>} custom error message */}
              {/* <ErrorMessage name="title" /> no need ErrorMessage if Yup is used*/}
              <StyledErrorMessage name="title" />
            </div>
            <div className="">
              <label htmlFor="content" className="font-medium block mb-1">
                Note Description
              </label>
              <Field
                as="textarea"
                type="text"
                rows={5}
                name="content"
                id="content"
                className="text-lg border border-teal-600 p-2 w-full rounded-lg"
              />
              {/* {errors.content && touched.content && <p>{errors.content}</p>} */}
              {/* <ErrorMessage name="content" /> */}
              <StyledErrorMessage name="content" />
            </div>
            <Field type="text" name="note_id" id="note_id" hidden />
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
                {isCreate ? "Share Note" : "Save Note"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
