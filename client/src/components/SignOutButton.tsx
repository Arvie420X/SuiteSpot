import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";

import * as apiClient from "../api-client";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      // 1. show the toast
      showToast({ message: "Signed out successfully!", type: "SUCCESS" });
      // 2. navigate to the home page
      //   navigate("/");
    },
    onError: (error: Error) => {
      // show the toast
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate(); // this invokes the apiClient.signIn
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#FFFADD] hover:bg-[#FFFD8C] px-3 font-bold hover text-[#793FDF] rounded-md"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
