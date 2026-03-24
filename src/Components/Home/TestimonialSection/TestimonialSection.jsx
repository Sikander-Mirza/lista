import RevImage1 from "../../../assets/fallback/RevImage1.jpg";
import RevImage2 from "../../../assets/fallback/RevImage2.jpg";
import RevImage3 from "../../../assets/fallback/RevImage3.jpg";
import Testimonials from '../../Testimonials/Testimonials'


const TestimonialSection = () => {
    return (
            <section className="flex flex-col justify-center items-center py-3  gap-10 px-6 sm:gap-7 sm:py-5 sm:px-8 md:px-0 lg:py-16 w-[100%] xl:w-[94%] 2xl:w-[80%]">
                {/* CONTENT SECTION  */}
                <div className="md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%]">
                    <h2 className="text-[31px] leading-[39px] font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[33px] sm:leading-[48px]">
                        What Our Clients Say
                    </h2>

                    <p className="text-[14px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[13.5px]/5.5  ">
                        Read the success stories and heartfelt testimonials from our
                        valued clients. Discover why they chose Newlista for their real
                        estate needs
                    </p>
                </div>
                {/* CARDSECTION  */}
                <div className="flex flex-col gap-7 sm:gap-4 sm:flex-row sm:flex-wrap md:w-[84%] min-[870px]:!w-[90%] md:gap-5 lg:!w-[84%]">
                    <Testimonials
                        RevTitle={""}
                        RevParagraph={
                            "Newlista transformed my real estate investing—helped me close an off-market commercial deal. It's easy to use and opened doors to exclusive opportunities and valuable connections."
                        }
                        Stars={5}
                        RevImage={RevImage1}
                        UserName={"Mike O"}
                        Desination={"Investor "}
                    ></Testimonials>
                    <Testimonials
                        RevTitle={""}
                        RevParagraph={
                            "As a seasoned investor, Newlista gives me the edge with exclusive off-market deals, smart alerts, and pro networking. Sharing listings with select buyers has led to faster, more profitable closes."
                        }
                        Stars={5}
                        RevImage={RevImage2}
                        UserName={"Charles K"}
                        Desination={"Investor"}
                    ></Testimonials>
                    <Testimonials
                        RevTitle={""}
                        RevParagraph={
                            "Newlista is changing how I connect with other investors. Its pro networking and exclusive off-market listings help me find hidden gems and share deals efficiently—truly a game-changer in real estate."
                        }
                        Stars={5}
                        RevImage={RevImage3}
                        UserName={"Michael M"}
                        Desination={"Investor"}
                    ></Testimonials>
                </div>
            </section>
    )
}

export default TestimonialSection