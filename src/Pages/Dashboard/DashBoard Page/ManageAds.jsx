import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AdsModal from "../../../Modal/AdsModal";

const ManageAds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Manage Ads</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mainColor hover:bg-secondBgColor text-white p-2 rounded"
        >
          Ask for Ads
        </button>
      </div>
      <div className="overflow-x-auto border  rounded-lg">
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

            <tr>
              <th>1</th>
              <td>itemName</td>
              <td>company</td>
              <td>genericName</td>
              <td></td>
              <td className="flex items-center gap-2  justify-between">
                <button className="text-lg hover:scale-105 transition text-primaryTextColor">
                  <FaEye />
                </button>
                <button className="text-xl hover:scale-105 transition text-red-500">
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* open ads post modal  */}
      {isModalOpen && <AdsModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ManageAds;
