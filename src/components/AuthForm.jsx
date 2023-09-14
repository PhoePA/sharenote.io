import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { ArrowSmLeftIcon, BackspaceIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
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
      .max(25,"Password is too Long")
      .required("Password is required!"),
  });

    const submitHandler = async (values) => {
      console.log(values);
    let API = `${import.meta.env.VITE_API}`;

    if (isLogin) {
      API = `${import.meta.env.VITE_API}/login`;
    } else {
      API = `${import.meta.env.VITE_API}/register`;
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={AuthFormSchema}
      >
        {() => (
          <Form className="w-1/2 mx-auto  p-3">
            <div>
              <Link to={"/"} className=" flex justify-end items-center">
                <ArrowSmLeftIcon width={30} height={40} /> Back
              </Link>
            </div>
            <div className=" items-center">
              <div>
                {isLogin ? (
                  <p className="text-center text-bold text-3xl mb-3 mt-3">
                    Login Here!
                  </p>
                ) : (
                  <p className="text-center text-bold text-3xl mb-3 mt-3">
                    Register Here!
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="username" className="font-medium block mb-1">
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
            <div className="">
              <label htmlFor="email" className="font-medium block mb-1">
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
              <label htmlFor="password" className="font-medium block mb-1">
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
    </div>
  );
};

export default AuthForm;
