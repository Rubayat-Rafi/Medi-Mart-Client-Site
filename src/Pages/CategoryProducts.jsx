import { useParams } from "react-router-dom";

const CategoryProducts = () => {

    const {category} = useParams();
    console.log(category)

    return (
        <div>
            this is {category} products
        </div>
    );
};

export default CategoryProducts;