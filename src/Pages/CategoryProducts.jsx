import { useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { category } = useParams();
  const [medicines, setMedicines] = useState([]);
  console.log(category);



  return (
    <div className="mx-auto w-11/12 max-w-[1440px] my-10">
      <h1 className="text-2xl font-bold mb-4">Category: {category}</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        <tr>
              <td className="border p-2">Napa</td>
              <td className="border p-2">Beximco Pharmaceuticals Ltd.</td>
              <td className="border p-2">6 Taka</td>
              <td className="border p-2 flex items-center justify-center gap-5">
                <button className="text-blue-500">Select</button>
                <button className="text-green-500">View</button>
              </td>
            </tr>
          {/* {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td className="border p-2">{medicine.name}</td>
              <td className="border p-2">{medicine.company}</td>
              <td className="border p-2">${medicine.price}</td>
              <td className="border p-2">
                <button className="text-blue-500">Select</button>
                <button className="ml-2 text-green-500">View</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryProducts;
