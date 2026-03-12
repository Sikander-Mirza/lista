import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Components
import AlertModal from "../../../Components/AlertModal/AlertModal";
// Image
import ContactImage1_1 from "../../../assets/Illustration/ContactImage1.1.png";
import ContactImage1_2 from "../../../assets/Banners/ContactImage1.2.png";
import axios from "axios";
import Spinner from "../../../Components/Spinner/Spinner";
import TextAreas from "../../../Components/InputFields/TextAreas";

const HelpSupport = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setloading] = useState(false);
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // CONTACT FORM
  const ContactForm = async (data) => {
    try {
      setloading(true);
      const response = await axios.post(
        `${ApiKey}/support`,
        {
          first_name: user.first_name,
          last_name: user.first_name,
          email: user.email,
          message: data.Message,
          error_message: data.ErrMessageBox,
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
    setPhone("");
    reset();
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const res = await axios.get(`${ApiKey}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setUser(data);
      } catch (err) {
      }
    };
    loadInitialData();
  });

  return (
    <>
      {/* CONTACT SECTION START   */}
      <section className=" relative gap-48 py-7 min-[380px]:!px-3 sm:!py-10 md:!py-12 lg:!py-10 overflow-x-hidden flex justify-center items-center  ">
        {/* SHAPE  */}
        <div className="absolute -z-10 -end-30 overflow -top-10">
          <img className="w-[80%]" src={ContactImage1_2} alt="" />
        </div>

        <div className="flex justify-cente sm:px-6 lg:px-0 lg:pl-5 2xl:w-[100%]">
          {/* CONTACT FORM SECTION */}
          <div className=" w-[100%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col gap-8">
            {/* CONTACT INFO  */}
            <div>
              <h1 className="max-[400px]:text-[31px] text-[32px] leading-[36px] sm:text-[35px] font-[700] font-Urbanist  text-[#1E1E1E] md:text-[39px] lg:text-[43px] md:leading-[48px]">
                Customer Support
              </h1>
              <p className="text-[12px] font-Inter font-medium text-pretty text-Paracolor sm:text-[14px]/8 sm:leading-[18px] mt-5">
                Experiencing issues or have suggestions? Our support team is
                here to help. Fill out the form below and we’ll get back to you
                as soon as possible
              </p>
            </div>

            {/* CONTACT FORM */}
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
                  <span className=" sm:w-[50%] w-full">
                    <span>
                      <div className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px] ">
                        First Name
                      </div>
                      <div className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-full px-4 rounded-[6px] h-12 flex items-center cursor-not-allowed">
                        {user.first_name}
                      </div>
                    </span>
                  </span>
                  <span className=" sm:w-[50%] w-full">
                    <span>
                      <div className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px] ">
                        Last Name
                      </div>
                      <div className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-full px-4 rounded-[6px] h-12 flex items-center cursor-not-allowed">
                        {user.last_name}
                      </div>
                    </span>
                  </span>
                </div>

                {/* Email  */}
                <div>
                  <span>
                    <div className="block mb-1 font-[700] text-PurpleColor w-full max-[1280px]:text-[14px] max-[1666px]:text-[15px] min-[1666px]:text-[16px] ">
                      Email
                    </div>
                    <div className="bg-[#F3EEFF] text-[#1d1d1d] font-[600] font-Urbanist text-[14px] w-full px-4 rounded-[6px] h-12 flex items-center cursor-not-allowed">
                      {user.email}
                    </div>
                  </span>
                </div>

                {/* Message */}
                <div>
                  <TextAreas
                    label={"Message"}
                    placeholder={"Please enter your message here..."}
                    register={register("Message", {
                      required: "Message is required",
                    })}
                    name={"Message"}
                    error={errors.Message?.message}
                  ></TextAreas>
                </div>
                <div>
                  <TextAreas
                    name={"ErrMessageBox"}
                    label={"Error Message You Are Receiving?"}
                    placeholder={"Please enter your error message here..."}
                    register={register("ErrMessageBox")}
                  />
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
          </div>

          <div className="w-[42%] 2xl:w-[60%] hidden 2xl:flex lg:ml-10 xl:ml-0 justify-center 2xl:justify-center items-center">
            <span>
              <img src={ContactImage1_1} alt="" />
            </span>
          </div>
        </div>
      </section>
      {/* CONTACT SECTION END  */}
    </>
  );
};

export default HelpSupport;
