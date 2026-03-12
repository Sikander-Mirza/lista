

const HighlightBlock = ({Heading , Desc , ButtonName , ButtonLink ,onClick}) => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row justify-center sm:items-center md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%]">
        <div className=" sm:w-[65%]">
          <h1 className="text-[31px] leading-[37px] font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[30px] sm:leading-[39px] md:text-[32px] md:leading-[39px] sm:mb-2 2xl:text-[36px]">
           {Heading}
          </h1>
          <p className="text-[14px] leading-[18px] sm:text-[12.5px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:mt-0 md:mt-2 md:text-[13px]/5 2xl:text-[16px] ">
           {Desc}
          </p>
        </div>
        <div className="sm:w-[45%] lg:w-[35%]  flex sm:justify-end">
            <button onClick={onClick} className="hover-btn hover-btn-black px-5 font-Inter py-3 rounded-[7px] text-[14.5px] cursor-pointer sm:text-[13px] md:text-[14px] 2xl:text-[16px]">
              <span>{ButtonName}</span>
            </button>
        </div>
      </div>
    </>
  );
};

export default HighlightBlock;
