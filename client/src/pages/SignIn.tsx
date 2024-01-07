import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // 1. show the toast
      showToast({ message: "Sign in successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      // 2. navigate to the home page
      navigate("/");
    },
    onError: (error: Error) => {
      // show the toast
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // handleSubmit check if the form and field is valid
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // when the mutate is called react query calls the function defined like apiClient.signIn
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold ">Sign In</h2>

      <label className="text-[#7091F5] text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("email", { required: "This field is required" })} // ... is spreading individual property from register into this input
        ></input>
        {errors.email && (
          <span className="text-[#FF6666]">{errors.email.message}</span>
        )}
      </label>
      <label className="text-[#7091F5] text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-[#FF6666]">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-[#793FDF] text-[#FFFD8C] p-2 font-bold hover:bg-[#97FFF4] hover:text-[#793FDF] text-xl rounded-md"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
