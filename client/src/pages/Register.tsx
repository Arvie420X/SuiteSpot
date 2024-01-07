import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }, // destructure the errors from the form state
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Register successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken"); // waiting for the invalidation before navigating
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold text-[#793FDF]">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-[#7091F5] text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
            {...register("firstName", { required: "This field is required" })} // ... is spreading individual property from register into this input
          ></input>
          {errors.firstName && (
            <span className="text-[#FF6666]">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-[#7091F5] text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-[#FF6666]">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-[#7091F5] text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-[#FF6666]">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-[#793FDF] text-[#FFFD8C] p-2 font-bold hover:bg-[#97FFF4] hover:text-[#793FDF] text-xl rounded-md"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
