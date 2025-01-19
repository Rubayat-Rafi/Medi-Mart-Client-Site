import { FaSearch } from "react-icons/fa";
import ShopTable from "../Components/ShopTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/shop-medicine");
      return data;
    },
  });

  refetch();
  if (isLoading) return <div>Loading medicines...</div>;
  if (!medicines.length) return <div>No medicines found.</div>;

  const handleViewClick = (medicine) => {
    console.log(medicine);
    setSelectedMedicine(medicine);
    document.getElementById("my_modal_5").showModal();
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - price * (discount / 100);
  };

  return (
    <div className="mx-auto max-w-[1440px] w-11/12">
      <h1 className="text-xl font-bold my-4">Shop Page</h1>

      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="mb-4 w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for products..."
            value=""
            //   onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
          />
          <button className="">
            <FaSearch />
          </button>
        </div>

        {/* filter section  */}
        <select className=" mb-4 w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none">
          <option disabled selected>
            Filter Category
          </option>
          <option>Homer</option>
          <option>Marge</option>
          <option>Bart</option>
          <option>Lisa</option>
          <option>Maggie</option>
        </select>
      </div>
      {/* shop table  */}
      <div className="border rounded-lg mb-10">
        <ShopTable calculateDiscountedPrice={calculateDiscountedPrice} handleViewClick={handleViewClick} medicines={medicines} />
      </div>

      {/* Modal for viewing specific medicine */}
      {selectedMedicine && (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="w-full h-full object-cover">
              <img className="rounded-lg" src={selectedMedicine.image} />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex  items-end gap-2">
                <h3 className="font-bold text-xl">
                  {selectedMedicine.itemName}
                </h3>
                <p className="text-[12px]">{selectedMedicine.mass}</p>
              </div>
              <p className="text-green-500 font-semibold">
                {selectedMedicine.genericName}
              </p>
              <div>
                <p className="mb-2">{selectedMedicine.company}</p>
                <div className="flex items-center gap-6">
                  <p className="flex items-center font-semibold text-lg gap-1 ">
                    <FaBangladeshiTakaSign />
                    {calculateDiscountedPrice(
                      selectedMedicine.price,
                      selectedMedicine.discount
                    )}
                  </p>
                  <p className="flex items-center line-through text-red-500 text-sm gap-1 ">
                    <FaBangladeshiTakaSign /> {selectedMedicine.price}.00
                  </p>
                </div>
                <p className="text-xs mt-2">{selectedMedicine.description}</p>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Shop;
