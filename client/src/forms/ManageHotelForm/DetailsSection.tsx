import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3 text-[#793FDF]">Add Hotel</h1>
      <label className="text-sm font-bold flex-1 text-[#7091F5]">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("name", { required: "This field is required" })}
        ></input>
        {errors.name && (
          <span className="text-[#FF6666] text-sm font-bold">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-sm font-bold flex-1 text-[#7091F5]">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
            {...register("city", { required: "This field is required" })}
          ></input>
          {errors.city && (
            <span className="text-[#FF6666] text-sm font-bold">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-sm font-bold flex-1 text-[#7091F5]">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
            {...register("country", { required: "This field is required" })}
          ></input>
          {errors.country && (
            <span className="text-[#FF6666] text-sm font-bold">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-sm font-bold flex-1 text-[#7091F5]">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-[#FF6666] text-sm font-bold">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-sm font-bold max-w-[50%] text-[#7091F5]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal border-[#793FDF] text-[#793FDF]"
          {...register("pricePerNight", { required: "This field is required" })}
        ></input>
        {errors.pricePerNight && (
          <span className="text-[#FF6666] text-sm font-bold">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="text-sm font-bold max-w-[50%] text-[#7091F5]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 font-normal border-[#793FDF] text-[#793FDF]"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-[#FF6666] text-sm font-bold">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
