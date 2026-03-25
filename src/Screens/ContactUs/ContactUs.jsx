import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// Components
import Spinner from "../../Components/Spinner/Spinner";
import Inputs from "../../Components/InputFields/Inputs";
import TextAreas from "../../Components/InputFields/TextAreas";
import AlertModal from "../../Components/AlertModal/AlertModal";
import CountrySelector from "../../Components/RegisterCountrySelector/CountrySelection";
import { Helmet } from 'react-helmet-async';
// Image
import ContactImage1_1 from "../../assets/Illustration/ContactImage1.1.png";
import ContactImage1_2 from "../../assets/Banners/ContactImage1.2.png";


const ContactUs = () => {

  const ApiKey = import.meta.env.VITE_API_KEY;
  

  // STATES 
  const [loading, setloading] = useState(false);
  const [Phone , setPhone]= useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  // CONTACT FORM
  const ContactForm = async (data) => {
      
    function formatUSPhone(phone) {
      const cleaned = phone.replace(/\D/g, "");
      const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phone;
    }
    const formatted = formatUSPhone(Phone);

    try {
      setloading(true);
      const response = await axios.post(
        `${ApiKey}/contact`,
        {
          first_name: data.FirstName,
          last_name: data.LastName,
          email: data.Email,
          phone: formatted,
          subject: data.Subject,
          message: data.Message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      AlertModal({
        icon: "success",
        title: "Thank You",
        iconColor: "#703BF7",
        text: response.data.message,
      });
    } catch (error) {
      setloading(false);
      AlertModal({
        icon: "error",
        iconColor: "red",
        title: "Failed Request",
        text: error.data.message,
      });
    } finally {
      setloading(false);
    }
    reset();
  };

  return (
    <>

 <Helmet>
        <title>Contact Newlista | Investor Support & Networking</title>
        <meta
          name="description"
          content="Reach out to Newlista for investor support, partnership opportunities or help accessing off‑market commercial real‑estate deals on our investor‑only network."
        />
        <link rel="canonical" href="https://www.newlista.com/contact-us" />
      </Helmet>

      {/* CONTACT SECTION START   */}
      <section className=" relative px-6 sm:px-16 md:px-20 gap-28 py-20 sm:py-24 md:py-32 overflow-x-hidden flex justify-center items-center ">
        {/* SHAPE  */}
        <div className="absolute -z-10 -end-30 overflow -top-10">
          <img className="w-[80%]" src={ContactImage1_2} alt="Newlista" />
        </div>

        <div className="flex justify-center 2xl:w-[85%] min-[1780px]:!w-[75%]">
          {/* CONTACT FORM SECTION */}
          <div className=" w-[100%] lg:w-[58%] xl:w-[55%] 2xl:w-[50%] flex flex-col gap-8">
            {/* CONTACT INFO  */}
            <div>
              <h1 className="max-[400px]:text-[31px] text-[32px] leading-[36px] sm:text-[35px] font-[700] font-Urbanist  text-[#1E1E1E] md:text-[43px] 2xl:text-[48px] md:leading-[48px]">
               Contact Newlista Investor Support & Partnerships
              </h1>
              <p className="text-[12.5px] font-Inter font-medium text-pretty text-Paracolor mt-2 sm:text-[14px] lg:text-[15px] sm:leading-[18px] 2xl:text-[16px] 2xl:leading-[23px] ">
                Have questions or need more information? Reach out directly to us, and we’ll get back to you as soon as possible.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center !h-[75vh]">
                <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(ContactForm)}
                className="flex flex-col gap-4"
              >
                {/* Name  */}
                <div className="flex flex-wrap sm:flex-nowrap gap-5 w-[100%]">
                  <span className="sm:w-[50%] w-full">
                    <Inputs
                      name={"FirstName"}
                      register={register("FirstName", {
                        required: "First name is required",
                      })}
                      error={errors.FirstName?.message}
                      labels={"First Name"}
                      placeholder={"Enter your first name"}
                    ></Inputs>
                  </span>
                  <span className=" sm:w-[50%] w-full">
                    <Inputs
                      register={register("LastName", {
                        required: "Last name is required",
                      })}
                      name={"LastName"}
                      labels={"Last Name"}
                      placeholder={"Enter your last name"}
                      error={errors.LastName?.message}
                    ></Inputs>
                  </span>
                </div>

                {/* Email  */}
                <div>
                  <Inputs
                    register={register("Email", {
                      required: "Email is required",
                    })}
                    type={"email"}
                    name={"Email"}
                    labels={"Email Address"}
                    error={errors.Email?.message}
                    placeholder={"Enter a valid email (e.g., you@email.com)"}
                  ></Inputs>
                </div>

                {/* Phone Number*/}
                <Controller
  name="phone"
  control={control}
  render={({ field }) => (
    <CountrySelector
      phone={field.value}
      setPhone={field.onChange}
      error={errors.phone?.message}
    />
  )}
/>
                {/* Location  */}
                <div>
                  <Inputs
                    register={register("Subject", {
                      required: "Subject is required",
                    })}
                    name={"Subject"}
                    labels={"Subject"}
                    error={errors.Subject?.message}
                    placeholder={"Enter General Inquiry"}
                  ></Inputs>
                </div>

                {/* Message */}
                <div>
                  <TextAreas
                    require={true}
                    label={"Message"}
                    placeholder={"Please enter your message here..."}
                    register={register("Message", {
                      required: "Message is required",
                    })}
                    name={"Message"}
                    error={errors.Message?.message}
                  ></TextAreas>
                </div>

                {/* Send Message Button */}
                <div className="mt-1">
                  <button
                    className="text-[15px] sm:text-[16px] hover-btn hover-btn-purple font-[700] w-[100%] h-11 text-white font-Urbanist rounded-[6px]"
                    type="submit"
                  >
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

            {/* CONTACT FORM */}
          </div>
          {/* IMAGE SECTION  */}
          <div className="w-[42%] 2xl:w-[40%] hidden lg:flex lg:ml-10 xl:ml-0 justify-center 2xl:justify-end items-center">
            <span>
              <img src={ContactImage1_1} alt="Newlista" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
