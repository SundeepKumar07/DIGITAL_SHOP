import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false); // close dropdown
  };

  return (
    <div className="absolute z-10 w-[262px] bg-white rounded-b-md shadow-md py-2">
      {categoriesData &&
        categoriesData.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleSubmit(cat)}
            className={`${styles.noramlFlex} px-3 py-2 hover:bg-gray-100 cursor-pointer transition`}
          >
            <img
              src={cat.image_Url}
              alt={cat.title}
              className="w-6 h-6 object-contain mr-3 select-none"
            />
            <h3 className="text-sm font-medium select-none">{cat.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;