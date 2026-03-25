import axios from "axios";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";



// Components

import Spinner from "../../Components/Spinner/Spinner";

import PlansTabs from "../../Components/OurPlans/PlansTabs";



// IMAGE

import Shape from "../../assets/Illustration/Shape.png";

import Shape2 from "../../assets/Illustration/Shape2.png";

import HomeSec5_2 from "../../assets/Illustration/HomeSec5.2.png";

import PricingSec2_1 from "../../assets/Illustration/PricingSec2.1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Reducers/authSlice/authSlice";
import AlertModal from "../../Components/AlertModal/UpgradeModal";
import Swal from "sweetalert2";
import showProfileIncompleteModal from "../../Components/AlertModal/showProfileIncompleteModal";
import { Helmet } from 'react-helmet-async';




const freebenefits = [

  {

    label: "Browse all public listings ",

    checked: true,

  },

  {

    label: "Create and publish listings",

    checked: true,

  },

  {

    label: "Contact any listing owner through the Contact Property Owner / Inquiry form",

    checked: true,

  },

  {

    label: "Receive and reply to inquiries (email-based communication) ",

    checked: true,

  },

  {

    label: "No private inbox or message history",

    checked: false,

  },

  {

    label: "No investor-to-investor private dashboard messaging",

    checked: false,

  },

  // {

  //   label: "Make Direct Property Offers and Receive Instant Notifications",

  //   checked: false,

  // },

  // {

  //   label: "Exclusive Early-Access Listings",

  //   checked: false,

  // },

  // {

  //   label: "Premium Customer Support",

  //   checked: false,

  // },

];



const benefits = [

  {

    label: "Private inbox & full message history inside the dashboard",

    checked: true,

  },

  {

    label: "Direct investor-to-investor messaging (no email clutter)",

    checked: true,

  },

  {

    label: "Message any user from the dashboard inbox ",

    checked: true,

  },

  {

    label: "Faster communication workflow (in-dashboard threads)",

    checked: true,

  },

  {

    label: "Early access to premium features as they roll out",

    checked: true,

  }

  // {

  //   label: "Make Direct Property Offers and Receive Instant Notifications",

  //   checked: true,

  // },

  // {

  //   label: "Exclusive Early-Access Listings",

  //   checked: true,

  // },

  // {

  //   label: "Premium Customer Support",

  //   checked: true,

  // },

];



const Pricing = () => {



  const ApiKey = import.meta.env.VITE_API_KEY;

  const token = localStorage.getItem("token");

  const ProfileComplete = localStorage.getItem("ProfileComplete")
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { user, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!token) {
      // navigate("/login");
    } else {
      dispatch(fetchUser({ token, apiKey: ApiKey }));
    }
  }, [dispatch, token, ApiKey]);



  // STATES

  const [PricingData, setPricingData] = useState([]);

  const [Loading, setLoading] = useState(false);

  const [checked, setchecked] = useState();

  const [AdminPay, setAdminPay] = useState(false)



  const isCurrentPlan = checked?.plan_id === PricingData?.id;

  const isActive = checked?.status === "active";

  let buttonText = "Get Started";
  let disabled = false;
  let buttonLink = "/register";
  let onClick = null;
  let tooltip = ""

  if (token) {

    if (AdminPay === true) {

      buttonText = "Get Started"
      buttonLink = "";
      onClick = () => Subscription(PricingData.id);

    } else if (user && user.profile_complete === 0) {
      buttonText = "Upgrade";
      tooltip = "Finish your profile to subscribe to premium"
      buttonLink = "";
      onClick = () => showProfileIncompleteModal();

    } else if (!checked || checked?.plan_id === null) {

      buttonText = "Upgrade";

      buttonLink = "";

      onClick = () => Subscription(PricingData.id);

    } else if (isCurrentPlan && isActive) {

      buttonText = "Activated";

      disabled = true;

      buttonLink = "";

    } else if (!isCurrentPlan && isActive) {
      buttonText = "Manage";
      buttonLink = "/admin/subscription";
    }
  }


  useEffect(() => {

    const GetPricing = async () => {

      setLoading(true);

      try {

        const response = await axios.get(`${ApiKey}/plans`);

        setPricingData(response.data.plans);

      } catch (error) {

        setLoading(false);

      } finally {

        setLoading(false);

      }

    };

    GetPricing();

  }, []);



  useEffect(() => {

    const CurrentPricing = async () => {

      setLoading(true);

      try {

        const response = await axios.get(`${ApiKey}/current-subscribtion`, {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        });

        setchecked(response.data.subscription);

        if (response.data.subscription.by_admin === 1 || response.data.subscription.by_admin === true) {

          setAdminPay(true)

        }



        localStorage.setItem(

          "status",

          response.data.subscription.status !== null &&

          response.data.subscription.status

        );

      } catch (error) {

        setLoading(false);

      } finally {

        setLoading(false);

      }

    };

    CurrentPricing();

  }, []);



  const Subscription = async (id) => {

    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/subscribe`,
        {
          plan_id: id,
          success_url: `${window.location.origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/pricing`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = response.data.checkout_url;
      CurrentPricing();

    } catch (error) {
      setLoading(false);

    } finally {
      setLoading(false);

    }

  };


  console.log(PricingData)



  return (

    <>

 <Helmet>
        <title>Newlista Investor Membership Pricing & Off‑Market Access</title>
        <meta
          name="description"
          content="Explore Newlista’s flexible membership plans. Choose the pricing tier that fits your investing goals and access our investor‑only network for off‑market deals."
        />
      </Helmet>


      {/* PRICING SECTION  */}

      <section>

        <div className="relative isolate max-[350px]:px-4 px-6 py-24 sm:py-32 lg:px-8 flex flex-col justify-center items-center overflow-hidden">

          {/* SHAPE START  */}
          <div
            className="absolute left-[74%]  w-[50%]  inset-x-0 -top-[10%] -z-10 transform-gpu overflow-hidden  blur-3xl"
            aria-hidden="true"
          >
            <img src={Shape} alt="Newlista" />

          </div>

          <div
            className="absolute -left-[15%]  w-[50%]  inset-x-0 top-[25%] -z-10 transform-gpu overflow-hidden  blur-3xl"
            aria-hidden="true"
          >
            <img src={Shape2} alt="Newlista" />
          </div>

          {/* SHAPE END  */}



          {/* HEADER SECTION  */}

          <div className="mx-auto max-w-4xl text-center">

            <h2 className="max-[350px]:text-[13.5px] text-base/7 font-semibold text-PurpleColor">
              Pricing
            </h2>

            <h1 className="lg:mt-2 max-[350px]:text-[28px] max-[350px]:leading-[33px] text-[33px] leading-[36px] sm:leading-[45px] sm:text-[40px] font-Urbanist  tracking-tight text-balanc text-gray-900 lg:text-5xl font-[700]">
              Investor Membership Pricing & Off‑Market Access
            </h1>
          </div>

          <p className="mx-auto mt-4 lg:mt-6 max-w-3xl text-center text-[14.5px] sm:text-lg font-medium text-pretty text-gray-600 sm:text-md/8 font-Urbanist">
            Make offers, evaluate deals, and grow your real estate network.
          </p>



          {/* HEADER SECTION END  */}



          {/* TABS SEC START  */}

          {!Loading ? (
            <div className="md:w-[55%] min-[800px]:!w-[100%] min-[1600px]:!w-[87%] min-[1780px]:!w-[79%]">
              <div className="grid xl:flex justify-center  px-1 min-[400px]:!px-6 mt-10 grid-cols-1 min-[800px]:!grid-cols-2 items-center gap-y-6 sm:gap-y-10  lg:gap-y-10 sm:!px-24 md:!px-2  min-[800px]:!px-8 lg:!px-28 xl:!px-8 2xl:!px-[6%]  xl:!grid-cols-2 gap-6">
                  <div className="max-w-[400px] ">
                    <PlansTabs
                      features={freebenefits}
                      desc={""}
                      featured={
                        token
                          ? !checked || checked?.plan_id === null
                            ? true
                            : false
                          : false
                      }
                      PlanName={"Free"}
                      Pricing={"0 "}
                      Duration={""}
                      ButtonText={
                        !token
                          ? "Get Started Free"
                          : !checked || checked?.plan_id === null
                            ? "Activated"
                            : checked?.status === "active"
                              ? "Downgrade"
                              : "Upgrade"
                      }
                      disabled={
                        !token ? false : !checked || checked?.status === "active"
                      }
                      buttonLink={
                        !token
                          ? "/register"
                          : !checked || checked?.plan_id === null
                            ? ""
                            : checked?.status === "active"
                              ? "/admin/subscription"
                              : ""
                      }
                      Onclick={
                        token &&
                          checked?.status !== "active" &&
                          checked?.plan_id !== null
                          ? () => Subscription(freePlanId)
                          : undefined
                      }
                    />
                  </div>


                  <div className="max-w-[400px]">
                    <PlansTabs

                      key={PricingData.id}


                      features={benefits}
                      desc={"Limited-time introductory plan. Pricing and features may change for future billing periods. "}

                      featured={token && isCurrentPlan && isActive}

                      PlanName={PricingData.title}

                      Pricing={`${PricingData.price} `}

                      Duration={`/ ${PricingData.type}`}

                      ButtonText={buttonText}

                      disabled={disabled}

                      tooltip={tooltip}


                      buttonLink={buttonLink}

                      Onclick={onClick}

                      id={PricingData?.id}

                    />

                  </div>

              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center !h-[75vh]">
              <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
            </div>
          )}

        </div>

      </section>

      {/* PRICING SECTION END */}



      {/* SECTION 2 START  */}



      <section className="flex justify-center items-center">

        <div className="flex flex-col justify-center gap-6 px-5 pb-16 sm:py-20 sm:pt-12 sm:gap-10 sm:pb-9 lg:pb-20 sm:px-8 md:px-0 md:items-center w-[100%] xl:w-[98%] 2xl:w-[85%] min-[1780px]:!w-[78%]">

          <div className="md:w-[84%]">

            <h2 className=" text-center md:text-start text-[28px]  leading-[38px] font-[700] font-Urbanist  text-[#1E1E1E] sm:text-[37px] sm:leading-[48px] xl:text-[34px] xl:-mb-5 2xl:mb-0">

              Unlock Your Full Real Estate Potential

            </h2>

          </div>

          <div className="md:w-[84%] border-solid border-[1px] border-[#BBBBBB] flex flex-col items-center rounded-[10px] pb-7 pt-3 md:py-4 lg:py-5 xl:py-0   md:flex-row relative">

            <div className="w-[55%] sm:w-[35%]  md:w-[24%] sm:h-[90%] xl:-mb-2">

              <img className="" src={PricingSec2_1} alt="Newlista" />

            </div>

            <div className="flex flex-col justify-center items-center text-center gap-5 py-2 px-5 sm:px-10 md:w-[50%] md:px-3 lg:px-5 xl:px-16 ">

              <h2 className="font-Inter font-bold text-[16.5px] leading-[22px] sm:text-[24px] md:text-[20px] lg:text-[22px] sm:leading-[25px] min-[1780px]:!text-[28px] min-[1780px]:!leading-[32px]">

                Not sure which plan is right for you? Contact Us for a

                personalized recommendation.{" "}

              </h2>

              <Link className="w-full" to={"/contact-us"}>

                <button className="hover-btn-purple hover-btn py-2 text-[15px] sm:text-[16px] text-white font-Inter rounded-[8px] w-full cursor-pointer min-[1780px]:!w-[90%] min-[1780px]:!py-3 min-[1780px]:!text-[17px]">

                  <span>Contact Us</span>

                </button>

              </Link>

            </div>

            <div className="hidden md:block  w-[25%] h-[90%]">

              <img className="" src={HomeSec5_2} alt="Newlista" />

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 2 END  */}

    </>

  );

};



export default Pricing;

