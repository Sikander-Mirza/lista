
const ServiceCardShowcase = () => {
    return (
        <>
            <section className="flex justify-center py-16 md:pt-20 md:pb-10">
                <div className="bg-[#F1ECFF] flex flex-col justify-center w-[90%] sm:w-[90%] gap-3  md:gap-8 rounded-[15px] px-5 sm:px-7 py-5 md:py-10 lg:py-14 md:w-[86%] min-[890px]:!w-[91%] lg:!w-[84%] xl:px-10 xl:!w-[80%] 2xl:!w-[72%]">
                    <div className="flex flex-col  text-center">
                        <h2 className="text-[27px] font-[700] font-Urbanist  text-[#1E1E1E]  md:text-[34px] xl:text-[36px] leading-[48px] 2xl:text-[44px]">
                            Our Services
                        </h2>
                    </div>
                    <div className="flex flex-col flex-wrap">
                        {/* CARD 1 PART  */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-7">
                            <div className="bg-white sm:w-[47%] lg:w-[33%] px-5 py-5 rounded-[8px] flex justify-center flex-col lg:py-7 xl:py-5  gap-3 2xl:px-6 2xl:py-8">
                                <h2 className="font-semibold font-Urbanist text-[17px] md:text-[19px] xl:text-[21px] 2xl:text-[24.5px]">
                                    🏢 Off-Market Listings
                                </h2>
                                <p className="text-[#222222] font-Inter text-[12.5px] md:text-[14px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px]">
                                    Gain access to exclusive property listings not available on
                                    public platforms.
                                </p>
                            </div>
                            <div className="bg-white px-5 sm:w-[47%] lg:w-[33%] py-5 rounded-[8px]  flex justify-center flex-col  gap-3 2xl:px-6 2xl:py-8">
                                <h2 className="font-semibold font-Urbanist text-[17px] md:text-[19px] xl:text-[21px] 2xl:text-[24.5px]">
                                    🔗 Real Estate Networking
                                </h2>
                                <p className="text-[#222222] font-Inter text-[12.5px] md:text-[14px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px]">
                                    Connect with fellow investors to build valuable relationships
                                    and explore collaborative opportunities.
                                </p>
                            </div>
                            <div className="bg-white w-[98%] lg:w-[33%] px-5 py-5 rounded-[8px] flex justify-center flex-col  gap-3 2xl:px-6 2xl:py-10">
                                <h2 className="font-semibold font-Urbanist text-[17px] md:text-[19px] xl:text-[21px] 2xl:text-[24.5px]">
                                    📊 Investment Insights
                                </h2>
                                <p className="text-[#222222] font-Inter text-[12.5px] md:text-[14px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px]">
                                    Stay informed with the latest market trends and data to make
                                    strategic investment decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceCardShowcase