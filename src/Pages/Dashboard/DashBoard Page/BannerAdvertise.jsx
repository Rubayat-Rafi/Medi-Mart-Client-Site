import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const BannerAdvertise = () => {
    const axiosSecure = useAxiosSecure()

  const {data: banner = []}=useQuery({
    queryKey: ['banner'],
    queryFn: async () => {
        const {data} = await axiosSecure.get('/ads-banners')
        return data
    }
  })

  console.log(banner)

  
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Banner Advertise</h2>
        <div className="overflow-x-auto border rounded-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Image</th>
            <th>Medicine Name</th>
            <th>Description</th>
            <th>Seller Email</th>
            <th>Add to Slide</th>
          </tr>

          </thead>
          <tbody>
  
              <tr >
                <td className=" border">
                  <img src='' alt='medicine image' className="w-16 h-16 object-cover" />
                </td>
                <td className=" border">Condom</td>
                <td className=" border">Description</td>
                <td className=" border">alu@gmail.com</td>
                <td className=" border">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="toggle-checkbox"
                    />
                    <span className="ml-2 text-sm">Remove  Add</span>
                  </label>
                </td>
              </tr>

          </tbody>
        </table>
        </div>
      </div>
    );
};

export default BannerAdvertise;

