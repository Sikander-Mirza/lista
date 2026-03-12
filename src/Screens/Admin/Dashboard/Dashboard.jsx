import React, { useEffect, useState } from "react";
// IMAGES
import DashboardIcon1_1 from "../../../assets/Icons/DashboardIcon1.1.png";
import DashboardIcon2_1 from "../../../assets/Icons/DashboardIcon2.1.png";
import DashboardIcon3_1 from "../../../assets/Icons/DashboardIcon3.1.png";
import DashboardIcon4_1 from "../../../assets/Icons/DashboardIcon4.1.png";
import DashboardIcon1_11 from "../../../assets/Icons/DashboardIcon1.11.png";
import DashboardIcon1_22 from "../../../assets/Icons/DashboardIcon1.22.png";
import axios from "axios";
import Spinner from "../../../Components/Spinner/Spinner";

const Dashboard = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const [listingStats, setListingStats] = useState({
    totalCount: 0,
    todayCount: 0,
    pendingCount: 0,
    activeCount: 0,
    todayPendingCount: 0,
    todayActiveCount: 0,
  });

  const [networkStats, setNetworkStats] = useState({
    totalNetwork: 0,
    todayNetwork: 0,
  });

  useEffect(() => {
    const GetListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiKey}/user-properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allListings = response.data?.data || [];
        const today = new Date().toLocaleDateString("en-CA");


        const totalCount = allListings.length;

        const todaysListings = allListings.filter((listing) => {
          const createdDate = listing.created_at?.split("T")[0];
          return createdDate === today;
        });
        const todayCount = todaysListings.length;

        const pendingCount = allListings.filter(
          (listing) => listing.listing_status === "Pending"
        ).length;

        const activeCount = allListings.filter(
          (listing) => listing.listing_status === "Available"
        ).length;

        const todayPendingCount = todaysListings.filter(
          (listing) => listing.listing_status === "Pending"
        ).length;

        const todayActiveCount = todaysListings.filter(
          (listing) => listing.listing_status === "Available"
        ).length;


        setListingStats({
          totalCount,
          todayCount,
          pendingCount,
          activeCount,
          todayPendingCount,
          todayActiveCount,
        });
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    GetListing();

    const GetNetwork = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ApiKey}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allUsers = response.data?.my_connections || [];
        const today = new Date().toLocaleDateString("en-CA");

        const todayUsers = allUsers.filter((user) => {
          const createdDate = user.created_at?.split("T")[0];
          return createdDate === today;
        });

        setNetworkStats({
          totalNetwork: allUsers.length,
          todayNetwork: todayUsers.length,
        });
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    GetNetwork();
  }, [ApiKey, token]);

  useEffect(() => {
    const CurrentPricing = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiKey}/current-subscribtion`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem(
          "status",
          response.data.subscription.status !== null ?
            response.data.subscription.status : "inactive"
        );
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    CurrentPricing();
  }, []);

  return (
    <>
      <section className="py-6 px-2 sm:px-3 min-[890px]:px-0 2xl:min-h-screen ">
        {/* PAGE TITTLE  */}
        <div>
          <h1 className="text-[30px] font-Urbanist text-[#222222] sm:text-[30px] font-[700]">
            Dashboard
          </h1>
        </div>

        {/* CARDS SECTION  */}
        {!loading ? (
          <div className="flex flex-wrap gap-5 mt-5 min-[890px]:mt-9">
            {/* CARD 1 */}
            <div className="w-[100%] flex flex-col justify-between bg-white px-5 gap-5 py-7  sm:w-[47%] lg:w-[40%] rounded-[14px] xl:w-[31%] 2xl:w-[23%]">
              <div className="flex justify-between ">
                <span>
                  <h4 className="text-[15px] font-Urbanist font-[500] text-[#666666]">
                    Total Listings
                  </h4>
                  <h1 className="font-Urbanist text-[#222222] text-[30px] md:text-[35px] font-[700]">
                    {listingStats.totalCount}
                  </h1>
                </span>
                <span>
                  <img
                    className="max-[390px]:w-14 w-16"
                    src={DashboardIcon1_1}
                    alt=""
                  />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-4 w-5"
                    src={
                      listingStats.todayCount > 0
                        ? DashboardIcon1_11
                        : DashboardIcon1_22
                    }
                    alt=""
                  />
                </span>
                <span>
                  <h4 className="text-[#606060] font-Urbanist font-[600] text-[15px]">
                    {listingStats.todayCount} New Listings Today
                  </h4>
                </span>
              </div>
            </div>
            {/* CARD 2 */}
            <div className="w-[100%] flex flex-col justify-between bg-white px-5 gap-5 py-7  rounded-[14px] sm:w-[47%] lg:w-[40%] xl:w-[31%] 2xl:w-[23%]">
              <div className="flex justify-between">
                <span>
                  <h4 className="text-[15px] font-Urbanist font-[500] text-[#666666]">
                    Active Listings
                  </h4>
                  <h1 className="font-Urbanist text-[#222222] text-[30px] md:text-[35px] font-[700]">
                    {listingStats.activeCount}
                  </h1>
                </span>
                <span>
                  <img
                    className="max-[390px]:w-14 w-16"
                    src={DashboardIcon2_1}
                    alt=""
                  />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-4 w-5"
                    src={
                      listingStats.todayActiveCount > 0
                        ? DashboardIcon1_11
                        : DashboardIcon1_22
                    }
                    alt=""
                  />
                </span>
                <span>
                  <h4 className="text-[#606060] font-Urbanist font-[600] text-[15px]">
                    {listingStats.todayPendingCount} Newly Activated Today
                  </h4>
                </span>
              </div>
            </div>
            {/* CARD 3 */}
            <div className="w-[100%] flex flex-col justify-between bg-white px-5 gap-5 py-7 rounded-[14px] sm:w-[47%] lg:w-[40%]  xl:w-[31%] 2xl:w-[23%]">
              <div className="flex justify-between">
                <span>
                  <h4 className="text-[15px] font-Urbanist font-[500] text-[#666666]">
                    Network Connections
                  </h4>
                  <h1 className="font-Urbanist text-[#222222] text-[30px] md:text-[35px] font-[700]">
                    {networkStats.totalNetwork}
                  </h1>
                </span>
                <span>
                  <img
                    className="max-[390px]:w-14 w-16"
                    src={DashboardIcon3_1}
                    alt=""
                  />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-4 w-5"
                    src={
                      listingStats.todayNetwork > 0
                        ? DashboardIcon1_11
                        : DashboardIcon1_22
                    }
                    alt=""
                  />
                </span>
                <span>
                  <h4 className="text-[#606060] font-Urbanist font-[600] text-[15px]">
                    {networkStats.todayNetwork} New Connections Today
                  </h4>
                </span>
              </div>
            </div>
            {/* CARD 4 */}
            <div className="w-[100%] flex flex-col justify-between bg-white px-5 gap-5 py-7 rounded-[14px] sm:w-[47%] lg:w-[40%] xl:w-[31%] 2xl:w-[23%]">
              <div className="flex justify-between">
                <span>
                  <h4 className="text-[15px] font-Urbanist font-[500] text-[#666666]">
                    Pending Listing
                  </h4>
                  <h1 className="font-Urbanist text-[#222222] text-[30px] md:text-[35px] font-[700]">
                    {listingStats.pendingCount}
                  </h1>
                </span>
                <span>
                  <img
                    className="max-[390px]:w-14 w-16"
                    src={DashboardIcon4_1}
                    alt=""
                  />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-4 w-5"
                    src={
                      listingStats.todayPendingCount > 0
                        ? DashboardIcon1_11
                        : DashboardIcon1_22
                    }
                    alt=""
                  />
                </span>
                <span>
                  <h4 className="text-[#606060] font-Urbanist font-[600] text-[15px]">
                    {listingStats.todayPendingCount} Listing Today
                  </h4>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center !h-[75vh]">
            <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
          </div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
