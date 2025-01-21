import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../hook/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../hook/useAxiosPublic";

const CartTable = ({ carts = [], handleCartDelete, refetch }) => {
  const axiosPublic = useAxiosPublic();

  const handleIncrement = async (id, price, quantity) => {
    if (quantity <= 0) {
      return toast.error("nafiz vaiii");
    }
    try {
      const res = await axiosPublic.patch(`/update-count/${id}`, {
        count: "increase",
        price,
        quantity,
      });
      if (res.status === 200) {
        refetch();
      }
    } catch (err) {
      toast.error(err.res.data.message);
    }
  };
  const handleDecrement = async (id, price, quantity, count) => {
    console.log(price);

    if (count <= 0) {
      return toast.error("Abdullah  vaiii");
    }

    try {
      const res = await axiosPublic.patch(`/update-count/${id}`, {
        count: "decrement",
        price,
        quantity,
      });
      if (res.status === 200) {
        refetch();
      }
    } catch (err) {
      toast.error(err.res.data.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Medicine Image</th>
            <th>Medicine Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {carts.map((cart, idx) => (
            <tr key={cart._id}>
              <th>{idx + 1}</th>
              <td>
                <img
                  className="w-16 h-16 rounded-lg object-cover"
                  src={cart.image}
                />
              </td>
              <td>{cart.name}</td>
              <td>{cart.price} Taka</td>
              <td>{cart?.quantity}</td>
              <td className="space-x-3">
                <button
                  className="py-1 px-2 bg-mainColor text-white rounded-md hover:bg-secondBgColor "
                  onClick={() =>
                    handleIncrement(cart?._id, cart?.price, cart?.quantity)
                  }
                >
                  +
                </button>
                <span>{cart.count}</span>
                <button
                  className=" px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 "
                  onClick={() =>
                    handleDecrement(
                      cart?._id,
                      cart?.price,
                      cart?.quantity,
                      cart?.count
                    )
                  }
                >
                  -
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleCartDelete(cart._id)}
                  className=" font-bold text-xl hover:scale-105 transition text-red-500"
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
CartTable.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleCartDelete: PropTypes.func.isRequired,
};

export default CartTable;
