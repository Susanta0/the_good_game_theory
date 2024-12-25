import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductDetails = ({
  image,
  name,
  price,
  rating: { average, reviews },
}) => {

  const renderStars = () => {
    const fullStars = Math.floor(average);
    const hasHalfStar = average % 1 >= 0.5; 
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 

    return (
      <>
        {Array(fullStars).fill(<FaStar className="text-yellow-500" />)}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars).fill(<FaRegStar className="text-yellow-500" />)}
      </>
    );
  };
  
  const [imgSrc, setImgSrc] = useState(image); 
  const fallbackImage = "https://via.placeholder.com/150"; 


  return (
    <div className="border h-[250px] bg-gray-100 rounded-md">
       <img src={imgSrc} alt={name} className="m-auto" onError={()=> setImgSrc(fallbackImage)} />
      
      <div className="p-2 flex flex-col gap-y-6">
        <h2 className="font-semibold">
          Name: <span className="font-thin">{name.slice(0, 20) + "..."}</span>
        </h2>
        <div className="flex items-center">
          <span className="mr-4 font-semibold">Price: <span className="font-thin">{price}</span></span>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <span className="mr-2 font-semibold">Rating:</span>
              <div className="flex">{renderStars()}</div>
            </div>
            <p className="font-semibold">Reviews: <span className="font-thin">{reviews}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
