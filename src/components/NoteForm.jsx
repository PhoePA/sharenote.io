import { BackspaceIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

//custom error message
import StyledErrorMessage from "./StyledErrorMessage";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, "Title must have at least 3 characters!")
      .max(20)
      .required("Title is required!"),
    content: Yup.string()
      .trim()
      .min(2, "Content must have at least 2 characters!")
      .max(800)
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

  const submitHandler = (values) => {
    console.log(values);
  };
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
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
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
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
