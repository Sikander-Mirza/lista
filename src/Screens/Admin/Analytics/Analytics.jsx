import React, { useEffect, useState } from "react";
// IMAGES
import DashboardIcon1_1 from "../../../assets/Icons/DashboardIcon1.1.png";
import DashboardIcon5_1 from "../../../assets/Icons/DashboardIcon5.1.png";
import DashboardIcon6_1 from "../../../assets/Icons/DashboardIcon6.1.png";
import DashboardIcon2_1 from "../../../assets/Icons/DashboardIcon2.1.png";
import DashboardIcon4_1 from "../../../assets/Icons/DashboardIcon4.1.png";
import DashboardIcon3_1 from "../../../assets/Icons/DashboardIcon3.1.png";
import Spinner from "../../../Components/Spinner/Spinner";
import axios from "axios";
import { LogIn } from "lucide-react";

const ListItem = [
  {
    metric: "👀 Total Listing Views",
  },
  {
    metric: "📩 Inquiries Received",
  },
  {
    metric: "💰 Offers Made & Received",
  },
  {
    metric: "🤝 New Network Connections",
  },
  {
    metric: "📊 Featured Listing Views",
  },
  {
    metric: "📢 Social Shares",
  },
];

// At the top of the file, before the component definition:
const dashboardCards = [
  {
    title: "Standard Listings Views",
    key: "stadard_listing_views",
    icon: DashboardIcon1_1,
    alt: "Standard Listings Icon",
  },
  {
    title: "Featured Listings Views",
    key: "featured_listing_views",
    icon: DashboardIcon3_1,
    alt: "Featured Listings Icon",
  },
  {
    title: "Off Market Listings Views",
    key: "off_listing_views",
    icon: DashboardIcon5_1,
    alt: "Off Market Listings Icon",
  },
  {
    title: "Received Offers",
    key: "offers_received",
    icon: DashboardIcon2_1,
    alt: "Received Offers Icon",
  },
  {
    title: "Accepted Offers",
    key: "accepted_offers",
    icon: DashboardIcon4_1,
    alt: "Accepted Offers Icon",
  },
  {
    title: "Pending Offers",
    key: "pending_offers",
    icon: DashboardIcon6_1,
    alt: "Pending Offers Icon",
  },
];


const Analytics = () => {
  const token = localStorage.getItem("token");
  const ApiKey = import.meta.env.VITE_API_KEY;

  const [Loading, setLoading] = useState(false);
  const [Analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const FindAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiKey}/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    FindAnalytics();
  }, []);

  return (
    <>
      <section className="py-6 px-2 sm:px-0">
        {/* PAGE TITTLE  */}
        <div className="flex justify-between">
          <h1 className="font-Urbanist text-[#222222] text-[30px] 2xl:text-[35px] font-[700]">
            Analytics
          </h1>
        </div>
      </section>

      {!Loading ? (
        <div className="flex flex-col sm:flex-row gap-5 px- sm:px-0">
          <section className="sm:w-[100%] min-[1760px]:w-[80%]">
            {/* CARD SECTION  */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center">
              {/* CARD 1 */}
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  className="w-[90%] sm:w-[95%] flex flex-col justify-start py-8 px-5 gap-3 2xl:py-10 bg-white rounded-[14px]"
                >
                  <div className="flex justify-between items-center">
                    <span>
                      <h4 className="text-[14px] sm:text-[15px] 2xl:text-[17px] font-Urbanist font-[500] text-[#666666]">
                        {card.title}
                      </h4>
                      <h1 className="text-[35px] 2xl:text-[42px] font-Urbanist font-[700] text-[#222222]">
                        {Analytics[card.key]}
                      </h1>
                    </span>
                    <span>
                      <img className="w-[45px] sm:w-[55px] 2xl:w-[72px]" src={card.icon} alt={card.alt} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TABLE SECTION  */}

            <div className="mt-10 overflow-x-auto rounded-[10px] sm:w-[75%] lg:w-[70%] 2xl:w-[60%]">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 font-Urbanist">
                <thead className="text-[13px] sm:text-[14px] 2xl:text-[16px] text-white uppercase bg-[#1E1E1E]">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-4 rounded-tl-2xl min-w-[90px] sm:min-w-[120px]"
                    >
                      Metric
                    </th>
                    <th
                      scope="col"
                      className="pr-4 sm:px-4 py-4 rounded-tr-2xl min-w-[60px] sm:min-w-[100px]"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      👀 Total Listing Views
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]">
                      {Analytics.total_listing_views}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      📩 Total Properties
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]">
                      {Analytics.total_properties}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      💰 Offers Made & Received
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]" >
                      {Analytics.offers_made + Analytics.offers_received}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      🤝 Total Network Connections
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]">
                      {Analytics.network_connections}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      📊 Featured Listing Views
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]">
                      {Analytics.featured_listing_views}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                    <th
                      scope="row"
                      className="px-5 py-4 text-gray-900 whitespace-nowrap text-[14px] sm:text-[15px] 2xl:text-[16px] font-semibold"
                    >
                      📢 Social Shares
                    </th>
                    <td className="px-4 py-4 text-[#222222] font-semibold text-[14px] sm:text-[15px] 2xl:text-[16px]">
                      {Analytics.social_shares}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>

          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center !h-[75vh]">
          <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
        </div>
      )}
    </>
  );
};

export default Analytics;
