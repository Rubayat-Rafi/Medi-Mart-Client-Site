import { FaGoogle, FaFacebook } from "react-icons/fa";

const SignIn = () => {

    


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sign in to access your account
        </p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-[#059669] focus:outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-mainColor text-white py-2 rounded-lg
           hover:bg-secondBgColor">
            Sign In
          </button>
        </form>
        <div className="my-4 flex items-center justify-center">
        <div className="border-t w-full"></div>
      <div className="text-center  text-gray-500 w-full">Or continue with</div>
        <div className="border-t w-full"></div>
      </div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <FaGoogle className="mr-2" />
            Google
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg">
            <FaFacebook className="mr-2" />
            Facebook
          </button>
        </div>
        </div>
  );
};

export default SignIn;
