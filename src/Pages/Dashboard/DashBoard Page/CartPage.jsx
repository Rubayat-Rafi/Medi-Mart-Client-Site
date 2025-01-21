import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import CartTable from "../../../Components/CartTable";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: carts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/carts/${user?.email}`);
      return data;
    },
  });


  if (isLoading) return <LoadingSpinner />;
  if (!carts.length) return <div>No data found.</div>;

  const handleCartDelete = async(id) => {
        await axiosSecure.delete(`/detele-cart/${id}`).then(res=> {
            if(res.data.deletedCount > 0){
                toast.success('Delete Successfully!')
                refetch();
            }
        })
  }

  return (
    <div className="mx-auto max-w-[1440px] w-11/12">
      <div className="flex items-center justify-between my-5">
        <div>
          <h1 className="text-xl font-bold">My Cart</h1>
        </div>
        {/* buttons  */}
        <div className="">
          <Button className=" mx-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
            Clear Cart
          </Button>

          <Button className=" mx-2 rounded-md bg-mainColor py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
            Checkout
          </Button>
        </div>
      </div>
      <div className="border rounded-lg mb-10">
        <CartTable refetch={refetch} handleCartDelete={handleCartDelete} carts={carts} />
      </div>
    </div>
  );
};

export default CartPage;
