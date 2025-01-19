import { useEffect, useState } from "react";
import AddMedicineModal from "../../../modal/AddMedicineModal";

const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
      },
    })
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, []);

  const handleAddMedicine = (medicine) => {
    fetch("http://localhost:5000/api/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(medicine),
    })
      .then((response) => response.json())
      .then((newMedicine) => setMedicines([...medicines, newMedicine]));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Add Medicine
        </button>
      </div>
      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Company</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.itemName}</td>
              <td>{medicine.category}</td>
              <td>{medicine.company}</td>
              <td>${medicine.price}</td>
              <td>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddMedicineModal
          onClose={() => setIsModalOpen(false)}
          onAddMedicine={handleAddMedicine}
        />
      )}
    </div>
  );
};

export default ManageMedicines;
