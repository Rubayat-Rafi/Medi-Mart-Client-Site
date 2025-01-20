import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import CartTable from "../../../Components/CartTable";
import LoadingSpinner from "../../../Components/LoadingSpinner";

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

  console.log(carts);
  refetch();
  if (isLoading) return <LoadingSpinner />;
  if (!carts.length) return <div>No medicines found.</div>;


  return (
    <div>
      <h1>My Cart</h1>
      <div>
        {carts.map(cart => <CartTable key={cart._id} cart={cart} />) }
      </div>
    </div>
  );
};

export default CartPage;
