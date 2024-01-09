import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="text-2xl font-bold mb-3">
      <div className="grid grid-cols-2 p-6 gap-5 bg-[#7091F5] rounded-md">
        <label className="text-[#FFFD8C] text-sm font-bold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal text-[#793FDF]"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-[#FF6666] text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-[#FFFD8C] text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal text-[#793FDF]"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-[#FF6666] text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
