import { categories } from "../data";
import "../styles/categories.css"
import { Link } from "react-router-dom";
const Category = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Discover an array of rental options in Tumkur tailored to suit every student's needs. Dive into the vibrant local culture, relish the familiar comforts of home, and craft cherished memories in your ideal living space.
      </p>

      <div className="categories_list">
        {/* we are just accessing start 6 categories using slices. */}
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;