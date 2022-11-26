import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";


function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              className="exploreCategoryImg"
              alt="rent"
            />
            <p className="exploreCategoryName">Places For Rent</p>
          </Link>
          <Link to='/category/sale'>
          <img
              src={sellCategoryImage}
              className="exploreCategoryImg"
              alt="rent"
            />
            <p className="exploreCategoryName">Places For Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
