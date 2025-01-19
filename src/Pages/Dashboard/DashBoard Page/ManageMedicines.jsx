import { useState } from "react";
import AddMedicineModal from "../../../modal/AddMedicineModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const ManageMedicines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: medicines = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["medicines", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/medicines/${user?.email}`);
      return data;
    },
  });

  console.log(medicines);
  if (isLoading) return <div>Loading medicines...</div>;
  if (!medicines.length) return <div>No medicines found.</div>;

  refetch();

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
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Add Medicine
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Medicine Name</th>
              <th>Company</th>
              <th>Generic Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {medicines.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>{medicine.itemName}</td>
                <td>{medicine.company}</td>
                <td>{medicine.genericName}</td>
                <td>{medicine.price}</td>
                <td className="flex items-center gap-4">
                  <button onClick={() => handleViewClick(medicine)}>
                    View
                  </button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddMedicineModal onClose={() => setIsModalOpen(false)} />
      )}

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
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ManageMedicines;
