import { Button } from "@heroui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { CardSlice } from "../Slices/addtocartSlice";


function ProductCard({off, thumbnail, title, des, rating, category, price, discountPercentage, className,ondelete, deleteicon}) {


let dispatch = useDispatch()

  const handleCard=()=>{
    dispatch(CardSlice({
      
    }))


  }


  return (
    <div className={`w-full md:w-72.5 bg-white border border-border2 rounded-[15px] px-2 md:px-6 py-3 md:py-6 overflow-hidden relative hover:shadow-2xl transition duration-250 ${className}`}>
      {
        off && 
        <div className="absolute bg-[#F74B81] top-0 left-0 w-14 h-8 rounded-br-[20px] flex justify-center items-center">
        <p className="text-white text-xs font-normal font-lato">{off}</p>
      </div>
      }

 {
  deleteicon &&  
  <div className="absolute bg-[#F74B81] top-0 right-0 w-14 h-8 rounded-bl-[20px] flex justify-center items-center">
      {deleteicon}

      </div>
 }

      <div className="flex justify-center items-center">
        <img
          src={thumbnail}
          alt="image"
          className="w-30 h-30  md:w-50 md:h-50 object-cover"
        />
      </div>
      <p className="text-xs font-lato font-normal text-secondary2 mt-2 md:mt-4 line-clamp-1">{title}</p>
    
      <h3 className="text-[15px] font-medium md:leading-6 text-cardtittle tracking-[0.48px] overflow-hidden py-2 line-clamp-2 max-h-14">
        {des}
      </h3>
      <div className="flex items-center gap-x-2 md:gap-x-5">
        <div className="flex items-center gap-x-1 md:gap-x-2">
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
        </div>
        <span className="text-[#B6B6B6] text-sm font-lato">({rating})</span>
      </div>
      <p className="text-sm text-[#B6B6B6] font-lato mt-2 mb-3 md:mb-6">
        By <span className="text-primary">{category}</span>
      </p>

      <div className="flex justify-between flex-col md:flex-row items-start  md:items-center ">
        <div className="flex items-center gap-x-3">
          <p className="text-success font-bold text-[15px] md:text-[18px] font-quicksand">
            ${price}
          </p>
          <p className="text-secondary2 text-xs font-semibold line-through">
            ${discountPercentage}
          </p>
        </div>

        <Button onClick={handleCard} className="bg-primary text-white rounded text-xs md:text-sm font-bold font-lato w-full md:w-fit mt-2 md:mt-0">
          <AiOutlineShoppingCart className="text-xl"/>
          Add
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
