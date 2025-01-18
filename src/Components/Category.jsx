import { Link } from "react-router-dom";

const Category = () => {
  const categories = [
    {
      name: "OTC Medicine",
      image:
        "https://img.icons8.com/?size=100&id=5pOiloZUygM1&format=png&color=000000",
      medicineCount: 120,
      category: "otc-medicine",
    },
    {
      name: "Women's Choice",
      image: "https://img.icons8.com/?size=100&id=82229&format=png&color=000000",
      medicineCount: 85,
      category: "womens-choice",
    },
    {
      name: "Sexual Wellness",
      image: "https://img.icons8.com/?size=100&id=66268&format=png&color=000000",
      medicineCount: 60,
      category: "sexual-wellness",
    },
    {
      name: "Diabetic Care",
      image: "https://img.icons8.com/?size=100&id=14817&format=png&color=000000",
      medicineCount: 70,
      category: "diabetic-care",
    },
    {
      name: "Baby Care",
      image: "https://img.icons8.com/?size=100&id=45534&format=png&color=000000",
      medicineCount: 50,
      category: "baby-care",
    },
  ];

  return (
    <div className="w-11/12 max-w-[1440px] mx-auto my-8 md:my-14">
      <h3 className="text-center text-xl mb-6 font-bold">Product Categories</h3>
      <div className="flex items-center justify-center gap-5 flex-wrap">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.category}`}
            className="p-4 border  shadow hover:shadow-lg flex items-center rounded-full"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover h-10 "
            />
            <div className="ml-2">
              <h3 className="text-base font-bold mt-2">{category.name}</h3>
              <p className="text-[10px]">{category.medicineCount} Medicines</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
