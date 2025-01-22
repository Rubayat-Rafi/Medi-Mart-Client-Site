import axios from "axios";

// upload image to imgbb and return url
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGE_API_KEY}`,
    formData
  );

  return data.data.display_url;
};

// save user in database.............
export const saveUser = async (user, role = "user") => { 
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
      role: role, 
    })
    };

      