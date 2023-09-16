import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { ArrowSmLeftIcon, BackspaceIcon } from "@heroicons/react/outline";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const AuthForm = ({ isLogin }) => {
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: Yup.string()
      .trim()
      .min(3, "Username is too Short!")
      .max(20, "Username is too Long")
      .required("Username is required!"),
    email: Yup.string()
      .trim()
      .required("Email is required!")
      .email("Please Enter an Valid Email Format!"),
    password: Yup.string()
      .trim()
      .min(5, "Password is too Short!")
      .max(25, "Password is too Long")
      .required("Password is required!"),
  });

  const submitHandler = async (values) => {
    const { username, email, password } = values;

    if (isLogin) {
      // login codes
    } else {
      const response = await fetch(`${import.meta.env.VITE_API}/register`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        setRedirect(true);
      } else if (response.status === 400) {
        const data = await response.json();
        const pickedErrorMessage = data.errorMessages[0].msg;
        toast.error(pickedErrorMessage, {
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
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Link
        to={"/"}
        className="flex w-3/4 justify-end items-center text-teal-600 m-5  font-medium"
      >
        <ArrowSmLeftIcon width={30} height={40} /> Back
      </Link>

      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={AuthFormSchema}
      >
        {() => (
          <Form className="w-3/5 mx-auto border p-5 bg-gray-100 rounded-md">
            <div className=" items-center">
              <div>
                {isLogin ? (
                  <p className="text-center text-bold text-3xl mb-3 mt-3 text-teal-600">
                    Login Here!
                  </p>
                ) : (
                  <p className="text-center text-bold text-3xl mb-3 mt-3 text-teal-600">
                    Register Here!
                  </p>
                )}
              </div>
            </div>
            {!isLogin && (
              <div className="">
                <label htmlFor="username" className="font-medium block mb-1 text-teal-600">
                  Username
                </label>

                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="text-lg border border-teal-600 p-2 w-full rounded-lg"
                />

                <StyledErrorMessage name="username" />
              </div>
            )}
            <div className="">
              <label htmlFor="email" className="font-medium block mb-1 text-teal-600">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-lg border border-teal-600 p-2 w-full rounded-lg"
              />

              <StyledErrorMessage name="email" />
            </div>
            <div className="">
              <label htmlFor="password" className="font-medium block mb-1 text-teal-600">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-lg border border-teal-600 p-2 w-full rounded-lg"
              />

              <StyledErrorMessage name="password" />
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
                className="text-white bg-teal-600 py-2 font-2xl w-full rounded"
              >
                {isLogin ? "Log In" : "Register"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
    </div>
  );
};

export default AuthForm;
