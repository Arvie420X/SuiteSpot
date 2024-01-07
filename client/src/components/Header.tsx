import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-[#793FDF] py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-[#FFFD8C] font-bold tracking-tight">
          <Link to="/">SuiteSpot</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white hover:text-[#793FDF] px-3 py-3 font-bold hover:bg-[#97FFF4] rounded-md"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white hover:text-[#793FDF] px-3 py-3 font-bold hover:bg-[#97FFF4] rounded-md"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center bg-[#FFFADD] text-[#793FDF] px-3 font-bold hover:bg-[#FFFD8C] rounded-md"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
