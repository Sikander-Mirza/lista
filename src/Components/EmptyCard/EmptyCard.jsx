import React from "react";
import EmptyCard from "../../assets/Illustration/MyOfferPage.png";
import { Link } from "react-router-dom";

const EmptyCards = ({ Title , type  }) => {

  const status = localStorage.getItem("status")





  return (
    <>
      {/* PAGE TITTLE  */}
      <section id={'Off-market'} className="flex flex-col justify-center items-center py-4 text-center absolute top-0  ">
        <div className="flex justify-center">
          <img className="w-[100%]" src={EmptyCard} alt="" />
        </div>
        <div className="flex flex-col justify-center items-center w-[100%]">
          <h1 className="font-Urbanist font-[600] text-[#00000] text-[20px]">
            {
              type && status !== "active" ?  Title : "Not Found"
            }
           
          </h1>
        </div>
        <div className="mt-5" >
          {
           type && status !== "active" && (
              <Link to="/pricing">
                <button className="bg-PurpleColor text-white hover-btn hover-btn-black px-5 text-[14px] py-2.5">
                  <span>Upgrade Now</span>
                </button>
              </Link>
            )
          }
        </div>
      </section>
    </>
  );
};

export default EmptyCards;
