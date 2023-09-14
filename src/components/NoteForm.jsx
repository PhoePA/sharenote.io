import { useEffect, useRef, useState } from "react";
import { BackspaceIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//custom error message
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();
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
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

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
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File Type is not Supported",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
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

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);

    fileRef.current.value = "";
  };

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

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(API, {
      method,
      body: formData,
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form encType="multipart/form-data">
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
            <div className="">
              <div className="flex justify-between">
                <label htmlFor="cover_image" className="font-medium block mb-1">
                  Cover Image{" "}
                  <span className="text-xs font-medium">(Optional)</span>
                </label>

                {previewImg && (
                  <p
                    className=" cursor-pointer text-teal-600"
                    onClick={() => {
                      clearPreviewImg(setFieldValue);
                    }}
                  >
                    Clear
                  </p>
                )}
              </div>
          
                {isUpload ? (
                  <p
                    className=" cursor-pointer text-teal-600 mb-2 text-xs"
                    onClick={() => setIsUpload(false)}
                  >
                    Disable Cover Image
                  </p>
                ) : (
                  <p
                    className=" cursor-pointer text-teal-600"
                    onClick={() => setIsUpload(true)}
                  >
                    Upload Cover Image
                  </p>
                )}
            
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_image"
                    className="mb-3"
                    hidden
                    ref={fileRef}
                    onChange={(event) => {
                      handleImageChange(event, setFieldValue);
                    }}
                  />
                  <div
                    className=" border border-dashed border-teal-600 flex justify-center items-center h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 z-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    {isCreate ? (
                      <>
                        {previewImg && (
                          <img
                            src={previewImg}
                            alt={"preview"}
                            className="absolute opacity-50 h-full object-cover z-10"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={
                          previewImg
                            ? previewImg
                            : `${import.meta.env.VITE_API}/${
                                oldNote.cover_image
                              }`
                        }
                        alt={"preview"}
                        className="absolute opacity-50 h-full object-cover z-10"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            <StyledErrorMessage name="cover_image" />
            {/* <Field type="text" name="note_id" id="note_id" hidden /> */}
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
