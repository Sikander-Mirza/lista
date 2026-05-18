import axios from "axios";
import { useEffect, useState } from "react";


// COMPONENTS
import SearchFilters from "./SearchFilters";
import ProfileSection from "./NetworkSections/ProfileSection/ProfileSection";
import AddtoNetworkSec from "./NetworkSections/AddtoNetworkSec/AddtoNetworkSec";
import OurNetwork from "./NetworkSections/OurNetwork/OurNetwork";
import OurRequest from "./NetworkSections/OurRequest/OurRequest";
import { set, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const TabNames = [
  { name: "Discover Investors", TabLink: "addToNetwork" },
  { name: "My Connections", TabLink: "myNetwork" },
  { name: `Requests`, TabLink: "pending" },
];

const MyNetwork2 = () => {
  const ApiKey = import.meta.env.VITE_API_KEY;
  const tokens = localStorage.getItem("token");
  const [loading, setloading] = useState(false);
  const location = useLocation();

  const { register, watch, setValue, reset, control } = useForm({
    defaultValues: {
      propertyinterest: "",
      search: "",
      investmentRange: "",
      state: "",
    },
  });
  const [activeTab, setActiveTab] = useState("addToNetwork");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam === "pending" || tabParam === "myNetwork" || tabParam === "addToNetwork") {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const propertyinterest = watch("propertyinterest");
  const investmentRange = watch("investmentRange");
  const search = watch("search");
  const state = watch("state");

  const [AddNetwork, setAddNetwork] = useState([]);
  const [MyNetwork, setMyNetwork] = useState([]);
  const [SentRequest, setSentRequest] = useState([]);
  const [PendinNetwork, setPendingNetwork] = useState([]);
  const [selectedUser, setSelectedUser] = useState([null]);
  const [type, settype] = useState();
  const [showModal, setShowModal] = useState(false);

  const currentUserId = JSON.parse(localStorage.getItem("User"))?.id;


  const getJoinYear = (timestamp) => new Date(timestamp).getFullYear();

  const applyFilters = (users) => {
    return users.filter((user) => {
      const searchTerm = search?.toLowerCase() || "";
      // const selectedInterest = propertyinterest?.toLowerCase() || "";
      const selectedInvestment = investmentRange?.toLowerCase() || "";
      const selectedStates = Array.isArray(state)
        ? state.map((s) => s.toLowerCase())
        : [];
      const selectedInterest = Array.isArray(propertyinterest)
        ? propertyinterest.map((s) => (typeof s === "string" ? s.toLowerCase() : ""))
          .filter(Boolean)
        : [];


      const fullName = `${user.first_name || ""} ${user.last_name || ""
        }`.toLowerCase();
      const title = user.title?.toLowerCase() || "";
      const userState = user.state?.toLowerCase() || "";
      const investment = user.preferred_investment_range?.toLowerCase() || "";
      const interests = Array.isArray(user.property_interests)
        ? user.property_interests.map((i) => i.toLowerCase())
        : [];


      const matchesSearch = search
        ? fullName.includes(searchTerm) ||
        title.includes(searchTerm) ||
        interests.some((interest) => interest.includes(searchTerm))
        : true;

      const matchesInterest =
        selectedInterest.length > 0
          ? selectedInterest.includes("any") || selectedInterest.some((val) => interests.includes(val))
          : true;

      const matchesInvestment = investmentRange
        ? selectedInvestment === 'any' || investment === selectedInvestment
        : true;

      const matchesState =
        selectedStates.length > 0
          ? selectedStates.includes('any') || selectedStates.includes(userState)
          : true;

      return (
        matchesSearch && matchesInterest && matchesInvestment && matchesState
      );
    });
  };

  useEffect(() => {
    const GetNetwork = async () => {
      setloading(true);
      try {
        const response = await axios.get(`${ApiKey}/users`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        const Data = response.data;
        setMyNetwork(Data.my_connections);
        setAddNetwork(Data.all_users);
        setPendingNetwork(Data.received_requests);
        setSentRequest(Data.sentRequests);
      } catch (error) {
        setloading(false);
      } finally {
        setloading(false);
      }
    };
    GetNetwork();
  }, []);

  const AddtoNetwork = async (id) => {
    setloading(true);
    try {
      const response = await axios.post(
        `${ApiKey}/connections/request`,
        {
          to_user_id: id,
          action_url: `${window.location.origin}/admin/network?tab=pending`
        },
        { headers: { Authorization: `Bearer ${tokens}` } }
      );

      const sentUser = AddNetwork.find((user) => user.id === id);

      setAddNetwork((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, connection_status: "pending" } : user
        )
      );

      if (sentUser) {
        setSentRequest((prev) => [
          {
            id: Math.random(),
            from_user_id: currentUserId,
            to_user_id: sentUser.id,
            status: "pending",
            created_at: new Date().toISOString(),
            to_user: sentUser,
          },
          ...prev,
        ]);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  const PendingRequest = async (Val, id) => {
    try {
      await axios.patch(
        `${ApiKey}/connections/${id}/update`,
        {
          status: Val,
          action_url: `${window.location.origin}/admin/network?tab=myNetwork`
        },
        { headers: { Authorization: `Bearer ${tokens}` } }
      );

      const acceptedUser = PendinNetwork.find(
        (user) => user.id === id
      )?.from_user;

      setPendingNetwork((prev) => prev.filter((user) => user.id !== id));

      if (Val === "accepted" && acceptedUser) {
        setMyNetwork((prev) => [...prev, acceptedUser]);
      }
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const RemoveNetwork = async (Val, id) => {
    try {
      setloading(true);
      const response = await axios.get(
        `${ApiKey}/network/remove-connection/${id}`,
        {
          headers: { Authorization: `Bearer ${tokens}` },
        }
      );
      if (response.data.message === "Connection removed successfully") {
        setMyNetwork((prev) => prev.filter((user) => user.id !== id));
        setAddNetwork((prev) => prev.filter((user) => user.id !== id));
        setPendingNetwork((prev) => prev.filter((user) => user.id !== id));
        setSentRequest((prev) =>
          prev.filter((req) => req.from_user?.id !== id)
        );
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <ProfileSection />

      <SearchFilters
        register={register}
        watch={watch}
        setValue={setValue}
        reset={reset}
        control={control}
      />

      <div className="w-full">
        <div className="flex justify-center items-center gap-2 sm:gap-4 2xl:gap-10 2xl:bg-transparent mt-11 mb-6 sm:bg-gray-200 rounded-[10px] w-full">
          {TabNames.map((val, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(val.TabLink)}
              className={`flex-1  max-w-[140px] sm:max-w-full max-[380px]:text-[13.5px] text-[15px] leading-[17px] sm:text-[17px] md:text-[17.5px] xl:text-[19px] 2xl:text-[22px] font-Urbanist py-2.5 sm:py-4 md:py-4.5 px-0 md:px-4 sm:rounded-[7px] 2xl:py-5.5 font-semibold text-center transition duration-200 items-center cursor-pointer relative ${activeTab === val.TabLink
                ? "sm:bg-PurpleColor border-b-[2px] sm:border-none text-PurpleColor border-PurpleColor sm:text-white"
                : "sm:bg-gray-200 sm:text-gray-700"
                }`}
            >
              <span className="w-max">{val.name}</span>
              {val.TabLink === "pending" && PendinNetwork.length > 0 && (
                <span className="text-[11px] absolute bg-red-600 ml-[4px] px-[6px] pt-[1px] text-white rounded-full font-bold">
                  {PendinNetwork.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "myNetwork" && (
          <OurNetwork
            loading={loading}
            RemoveNetwork={RemoveNetwork}
            searchTerm={search}
            getJoinYear={getJoinYear}
            showModal={showModal}
            setShowModal={setShowModal}
            MyNetwork={applyFilters(MyNetwork)}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            type={type}
          />
        )}

        {activeTab === "addToNetwork" && (
          <AddtoNetworkSec
            loading={loading}
            AddNetwork={applyFilters(AddNetwork)}
            searchTerm={search}
            getJoinYear={getJoinYear}
            showModal={showModal}
            setShowModal={setShowModal}
            AddtoNetwork={AddtoNetwork}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            type={type}
          />
        )}

        {activeTab === "pending" && (
          <OurRequest
            loading={loading}
            PendinNetwork={applyFilters(PendinNetwork)}
            PendingRequest={PendingRequest}
            searchTerm={search}
            getJoinYear={getJoinYear}
            showModal={showModal}
            setShowModal={setShowModal}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            type={type}
            sentRequest={applyFilters(SentRequest)}
          />
        )}
      </div>
    </>
  );
};

export default MyNetwork2;
