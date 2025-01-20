import { FaSearch } from "react-icons/fa";
import ShopTable from "../Components/ShopTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hook/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  console.log(medicines)


  refetch();
  if (isLoading) return <LoadingSpinner/>;
  if (!medicines.length) return <div>No medicines found.</div>;

  const handleViewClick = (medicine) => {
    setSelectedMedicine(medicine);
    document.getElementById("my_modal_5").showModal();
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - price * (discount / 100);
  };

  // ar to cart option
  const handleSelectCart = async (medicine) => {


    const discountPrice = calculateDiscountedPrice(
      medicine?.price,
      medicine?.discount
    );
    const selectCart = {
      name: medicine.itemName,
      image: medicine.image,
      price: discountPrice,
      quantity: medicine.quantity,
      buyerEmail: user?.email,
      count: medicine?.counter
    };

    try {
      if (user) {
        const result = await axiosSecure.post("/cart", selectCart);
        console.log(result);
        navigate("/dashboard/cart-page");
        toast.success("Product added in the cart.");
        // if(){

        //   const {
        //     data: carts = [],
        //     isLoading,
        //     refetch,
        //   } = useQuery({
        //     queryKey: ["carts", user?.email],
        //     queryFn: async () => {
        //       const { data } = await axiosSecure.get(`/carts/${user?.email}`);
        //       return data;
        //     },
        //   });
        // }

      } else {
        navigate("/join-us/signup", {
          state: { from: window.location.pathname },
        });
        toast.error("Please SignUp before making a purchase.");
      }
    } catch (error) {
      console.log(error);
    }
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
        <ShopTable
          handleSelectCart={handleSelectCart}
          calculateDiscountedPrice={calculateDiscountedPrice}
          handleViewClick={handleViewClick}
          medicines={medicines}
        />
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
