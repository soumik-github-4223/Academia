"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setroute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

//create YUP schema for validation
const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your email"),
  password: Yup.string().required("Enter your password").min(6),
});

const Login: FC<Props> = ({ setroute, setOpen, refetch }) => {
  const [show, setshow] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Login successfull");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  //destructure some values from formik
  const { values, touched, errors, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with Academia</h1>
      <form onSubmit={handleSubmit}>
        {/* email input */}
        <label htmlFor="email" className={`${styles.label}`}>
          Enter your email
        </label>

        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="example@email.com"
          className={`${errors.email && touched.email && "border-red-500 "} ${
            styles.input
          } `}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        {/* password input */}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@#$"
            className={`${
              errors.password && touched.password && "border-red-500 "
            } ${styles.input} `}
          />

          {!show ? (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        {/* submit button */}
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />

        {/* Login as guest */}
        <div
          className="w-full flex items-center justify-center mt-3 cursor-pointer"
          onClick={() => {
            formik.setValues({
              email: "aryatestcustom@gmail.com",
              password: "123456789",
            });
            handleSubmit();
          }}
        >
          <button className={`${styles.button} bg-orange-700 `}>Login as Guest<span className=" text-emerald-50 pl-1"> (No email password required)</span> </button>
        </div>
        <br />

        {/* social auths */}
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-white ">
          Or Join with
        </h5>
        <div className="flex items-center justify-center my-3 ">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2"
            onClick={() => signIn("github")}
          />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setroute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
