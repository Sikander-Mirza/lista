import React, { useEffect, useState } from "react";
import { CheckIcon, X } from "lucide-react";
import axios from "axios";
import Spinner from "../../../Components/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const freebenefits = [
  { label: "View Featured Listings", checked: true },
  { label: "Basic Listings", checked: true },
  { label: "View Off-Market Listings", checked: false },
  { label: "Create & Expand Investor Network", checked: false },
  {
    label: "Send and receive messages directly through your private dashboard",
    checked: false,
  },
  { label: "Analytics on Listings & Profile Views", checked: false },
  {
    label: "Make Direct Property Offers and Receive Instant Notifications",
    checked: false,
  },
  { label: "Exclusive Early-Access Listings", checked: false },
  { label: "Premium Customer Support", checked: false },
];

const premiumBenefits = [
  { label: "View Featured Listings", checked: true },
  { label: "Basic Listings", checked: true },
  { label: "View Off-Market Listings", checked: true },
  { label: "Create & Expand Investor Network", checked: true },
  { label: "Premium Customer Support", checked: true },
  { label: "Analytics on Listings & Profile Views", checked: true },
  { label: "Exclusive Early-Access Listings", checked: true },
  {
    label: "Make Direct Property Offers and Receive Instant Notifications",
    checked: true,
  },
  {
    label: "Send and receive messages directly through your private dashboard",
    checked: true,
  },
];

const SubscriptionSetting = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("status");
  const [loading, setLoading] = useState(false);
  const [CurrentPlan, setCurrentPlan] = useState(null);
  const [AdminPay, setAdminPay] = useState(false)


    const { user, error } = useSelector((state) => state.auth);



    console.log(user);
    



  const ProfileComplete = localStorage.getItem("ProfileComplete")

  

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiKey}/current-subscribtion`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentPlan(response.data.subscription);
        localStorage.setItem(
          "status",
          response.data.subscription.status !== null &&
          response.data.subscription.status
        );
        if (response.data.subscription.by_admin === 1 || response.data.subscription.by_admin === true) {
          setAdminPay(true)
        }

      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPlan();

    if(user && user.profile_complete === 0){
      navigate("/admin/account-setting")
    }
  }, [location.pathname , user]);

  // Plan data fallback
  const planName = CurrentPlan?.plan.title || "Free";
  const planPrice = CurrentPlan?.plan.price || 0;
  const planDuration = CurrentPlan?.plan.type || "Unlimited";
  const planStatus = CurrentPlan?.status || "Active";
  const planBenefits = CurrentPlan ? premiumBenefits : freebenefits;

  const handleManageSubscription = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (status !== "active") {
      navigate("/pricing");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${ApiKey}/manage-subscribtion`,
        {
          return_url: `${window.location.origin}/admin/subscription`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <section className="sm:px-2 2xl:w-[90%] min-[1780px]:!w-[70%]">
        {/* Heading Section */}
        <section className="p flex justify-between items-start mt-8 pb-5">
          <div className="flex flex-wrap max-[350px]:gap-3 gap-5 sm:flex-row justify-between items-center">
            <h1 className="font-Urbanist text-[#222222] text-[26px] sm:text-[30px] xl:text-[35px] font-[700]">
              Subscription Setting
            </h1>
          </div>
        </section>

        {!loading ? (
          <>
            <section>
              <div className="flex flex-col gap-2">
                <div className="bg-[#ffffff] px-4 sm:px-5 py-4 rounded-[10px] flex justify-between">
                  <div>
                    <h2 className="font-Urbanist text-[#222222] text-[17px] sm:text-[20px] xl:text-[24px] font-[700]">
                      {planName}
                    </h2>
                    <p className="font-Urbanist text-Paracolor text-[15px] sm:text-[16px] xl:text-[19px] font-[600]">
                      {"Duration"}
                    </p>
                    <p className="font-Urbanist text-Paracolor text-[15px] sm:text-[16px] xl:text-[19px] font-[600]">
                      {!planDuration ? "Unlimited" : `Billed ${planDuration}`}
                    </p>
                  </div>
                  <div className="text-end flex flex-col sm:gap-1">
                    <h1 className="font-Inter text-[#222222] text-[17px] sm:text-[20px] xl:text-[24px] font-[700]">
                      ${planPrice}
                    </h1>
                    <p className="font-Urbanist text-Paracolor text-[15px] sm:text-[16px] font-semibold flex items-center justify-end">
                      {AdminPay ? CurrentPlan.expire_at.split(" ")[0] : planDuration}
                    </p>
                    <p className="font-Urbanist text-[#2e7200] font-semibold flex text-[15px] sm:text-[16px] items-center justify-end gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2e7200] relative" />
                      {planStatus}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits + Plan Pricing Section */}
            <section className="mt-7">
              <div className="flex flex-col-reverse items-center sm:gap-5 sm:flex-row bg-transparent border-[#d3d3d3] border rounded-2xl px-4.5 sm:pl-4 md:pl-7">
                {/* Left: Plan Benefits */}
                <div className="flex flex-col gap-2 sm:w-[55%] md:w-[60%] py-8 font-Urbanist">
                  <p className="text-PurpleColor font-bold text-[15px] xl:text-[16px] leading-[19px]">
                    Current Plan
                  </p>
                  <h2 className="font-[700] text-[29px] xl:text-[35px] leading-[35px] xl:leading-[40px]">{planName}</h2>

                  <div>
                    <h3 className="font-semibold mb-2 flex gap-2 items-center justify-start">
                      <span className="xl:w-[25%] text-[15px] xl:text-[16px]">What’s Included</span>
                      <span className="w-[50%] sm:w-[60%] xl:w-[68%] h-[1px] bg-Paracolor"></span>
                    </h3>
                    {planBenefits.map((feature, index) => (
                      <li
                        key={index}
                        className="flex gap-x-3 font-[600] text-[13.5px] xl:text-[15px]"
                      >
                        <span>
                          {feature.checked ? (
                            <CheckIcon className="h-5 w-4.5 md:h-6 md:w-5 text-PurpleColor block" />
                          ) : (
                            <X className="h-6 w-5 text-red-600 block" />
                          )}
                        </span>
                        <span className="block">{feature.label}</span>
                      </li>
                    ))}
                  </div>
                </div>

                {/* Right: Price Card */}
                <div className="text-white bg-black py-10 lg:py-14 rounded-xl px-6 flex justify-center items-center flex-col gap-2 text-center w-[260px] sm:w-[45%] md:w-[40%] sm:mr-3 mt-6 sm:mt-0">
                  <p className="font-Urbanist font-semibold">
                    <span className="font-Inter font-bold text-[38px] md:text-[43px] xl:text-[50px]">
                      ${1}
                    </span>{" "}
                    <span className="text-[15px]">USD</span>
                  </p>

                  {AdminPay ? <button
                    onClick={() => { navigate('/pricing') }}
                    className="hover-btn hover-btn-purple font-Urbanist font-semibold mb-2 bg-[#e9e9e9] text-black border-[#e9e9e9] hover:border-Paracolor text-[14px] xl:text-[16px]"
                  >
                    <span>
                      Upgrade
                    </span>
                  </button> : <button
                    onClick={handleManageSubscription}
                    className="hover-btn hover-btn-purple font-Urbanist font-semibold mb-2 bg-[#e9e9e9] text-black border-[#e9e9e9] hover:border-Paracolor text-[14px] xl:text-[16px]"
                  >
                    <span>
                      {token
                        ? status === "active"
                          ? "Manage"
                          : "Upgrade now"
                        : "Upgrade now"}
                    </span>
                  </button>}



                  <p className="font-Urbanist font-semibold text-[14.1px] xl:text-[16px]">
                    Invoices and receipts available for easy company reimbursement
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center !h-[75vh]">
            <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
          </div>
        )}
      </section>
    </>
  );
};

export default SubscriptionSetting;
