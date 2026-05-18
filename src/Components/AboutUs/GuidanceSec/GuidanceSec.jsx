import AboutIcon1_1 from "../../../assets/Illustration/AboutIcon1.1.png";
import AboutIcon1_2 from "../../../assets/Illustration/AboutIcon1.2.png";
import AboutIcon1_3 from "../../../assets/Illustration/AboutIcon1.3.png";

const GuidanceSec = () => {
  return (
      <section className="flex justify-center py-0 md:py-16 ">
        <div className="flex flex-col xl:items-center justify-center gap-7 w-[87%] sm:w-[90%] md:w-[85%] min-[870px]:!w-[91%] lg:!w-[84%]  xl:!w-[94.5%] 2xl:!w-[84%]">
          <div className="flex flex-col  xl:w-[85%] ">
            <h2 className="text-[26px] sm:text-[32px] leading-[39px] font-[700] font-Urbanist  text-[#1E1E1E] md:text-[33px] sm:leading-[48px]">
              How Can We Help You?
            </h2>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-8 xl:w-[85%]">
            {/* CARD 1  */}
            <div className="sm:w-[47%] lg:w-[33%] bg-black rounded-[10px] px-5.5 py-8 flex flex-col gap-4 min-h-[190px] justify-center">
              <div>
                <img
                  className="w-[20%] sm:w-[24%] md:w-[20%] lg:w-[23%] xl:w-[21.5%]"
                  src={AboutIcon1_1}
                  alt="Newlista"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-textColor font-Inter font-semibold text-[18px] md:text-[20px] xl:text-[23px] leading-[25px]">
                  Tailored Investment Support
                </h2>
                <p className="text-textColor font-Inter text-[12px] md:text-[13.5px] xl:text-[16px]">
                  Whether you're a first-time investor or an experienced
                  professional, we provide insights and resources to help you
                  find and secure the best opportunities.
                </p>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="sm:w-[47%] lg:w-[33%] bg-black rounded-[10px] px-5.5 py-8 flex flex-col gap-4 min-h-[190px] justify-center">
              <div>
                <img   
                  className="w-[20%] sm:w-[24%] md:w-[22%] lg:w-[23%] xl:w-[22.5%]"
                  src={AboutIcon1_2}
                  alt="Newlista"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-textColor font-Inter font-semibold text-[18px] md:text-[20px] xl:text-[23px]  leading-[22px]">
                  Seamless Connections
                </h2>
                <p className="text-textColor font-Inter text-[12px] md:text-[13.5px] xl:text-[16px]">
                  Build meaningful relationships with real estate professionals,
                  buyers, and sellers through our intuitive networking tools
                  designed to foster collaboration.
                </p>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="w-[98%] lg:w-[33%] bg-black rounded-[10px] px-5.5 py-8 flex flex-col gap-4 min-h-[190px] justify-center">
              <div className="w-[100px]">
                <img
                  className="w-[55%] min-[380px]:w-[60%] md:w-[60%] xl:w-[70%]"
                  src={AboutIcon1_3}
                  alt="Newlista"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-textColor font-Inter font-semibold text-[18px] md:text-[20px] xl:text-[23px]  sm:leading-[29px] leading-[24px] ">
                  Efficient Commercial Transactions
                </h2>
                <p className="text-textColor font-Inter text-[12px] md:text-[13.5px] xl:text-[16px]">
                  From listing to closing, execute your commercial real estate
                  deals with precision on our streamlined platform. Designed
                  exclusively for commercial professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default GuidanceSec