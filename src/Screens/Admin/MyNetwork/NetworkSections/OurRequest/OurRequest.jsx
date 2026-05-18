import React, { useState, useEffect } from "react";
import AddToNetwork from "../../../../../Components/Cards/AddToNetwork/AddToNetwork";
import Spinner from "../../../../../Components/Spinner/Spinner";
import Pagination from "../../../../../Components/Pagination/Pagination";
import PendingUserModal from "../../../../../Components/ProfileModal/PendingUserModal";
const OurRequest = ({
  loading,
  PendinNetwork,
  sentRequest,
  searchTerm,
  getJoinYear,
  showModal,
  setShowModal,
  handleReject,
  setSelectedUser,
  PendingRequest,
  selectedUser,
  type,
}) => {
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageSent, setCurrentPageSent] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPagePending(1);
    setCurrentPageSent(1);
  }, [searchTerm]);

  // 🔍 Filter both sections separately
  const filteredPending = PendinNetwork.filter((user) =>
    `${user.from_user.first_name} ${user.from_user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    );

  const filteredSent = sentRequest
    .filter((user) => user.to_user)
    .filter((user) =>
      `${user.to_user.first_name} ${user.to_user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const totalPagesPending = Math.ceil(filteredPending.length / pageSize);
  const totalPagesSent = Math.ceil(filteredSent.length / pageSize);

  const paginatedPending = filteredPending.slice(
    (currentPagePending - 1) * pageSize,
    currentPagePending * pageSize
  );

  const paginatedSent = filteredSent.slice(
    (currentPageSent - 1) * pageSize,
    currentPageSent * pageSize
  );

  return (
    <>
      <section className="flex flex-col gap-7 sm:gap-10 items-center sm:items-start w-full">
        <h1 className="text-[20px] mt-5 font-Urbanist text-[#f5f5f5] bg-PurpleColor w-max px-6 py-1  rounded-[7px] sm:text-[23px] sm:px-8 sm:py-1.5 xl:text-[26px] 2xl:text-[30px] font-[700]">
          Received Requests
        </h1>

        {/* 🔻 Received Requests */}
        <div className="w-full">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            {loading ? (
              <Spinner style={"w-14 h-20 text-PurpleColor"} />
            ) : paginatedPending.length > 0 ? (
              paginatedPending.map((user) => (
                <AddToNetwork
                  key={user.id}
                  id={user.id}
                  InvesImage={user.from_user.headshot}
                  InvesUserName={`${user.from_user.first_name} ${user.from_user.last_name}`}
                  InvesDesc={user.from_user.title}
                  location={`${user.from_user.city}, ${user.from_user.state}`}
                  propertyTypes={user.from_user.property_interests}
                  memberSince={getJoinYear(user.created_at)}
                  email={user.from_user.email}
                  phone={user.from_user.phone}
                  range={user.from_user.preferred_investment_range}
                  companyname={user.from_user.company_name}
                  year={user.from_user.years_of_experiance}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  onReject={handleReject}
                  onViewProfile={() => {
                    setSelectedUser({
                      user: user,
                      type: "pending",
                      PendingRequest,
                    });
                    setShowModal(true);
                  }}
                  PendingRequest={PendingRequest}
                  type="pending"
                />
              ))
            ) : (
              <div className="text-black font-Inter font-semibold">
                No Received Requests Found
              </div>
            )}
          </div>

          {!loading && totalPagesPending > 1 && (
            <Pagination
              currentPage={currentPagePending}
              totalPages={totalPagesPending}
              onPageChange={setCurrentPagePending}
            />
          )}
        </div>

        {/* 🔻 Sent Requests */}
        <div className="w-full items-center sm:items-start flex flex-col">
          <h1 className="text-[20px] mt-5 font-Urbanist text-[#f5f5f5] bg-PurpleColor w-max px-6 py-1  rounded-[7px] sm:text-[23px] sm:px-8 sm:py-1.5 xl:text-[26px] 2xl:text-[30px] font-[700] mb-7">
            Sent Requests
          </h1>
          <div className="flex flex-wrap gap-4 mb-7 justify-center sm:justify-start">
            {loading ? (
              <Spinner style={"w-14 h-20 text-PurpleColor"} />
            ) : paginatedSent.length > 0 ? (
              paginatedSent.map((user) => (
                <AddToNetwork
                  key={user.to_user?.id ?? user.id} // fallback if user.to_user is missing
                  id={user.id}
                  InvesImage={user.to_user?.headshot || ""} // fallback image if undefined
                  InvesUserName={`${user.to_user?.first_name || ""} ${
                    user.to_user?.last_name || ""
                  }`}
                  InvesDesc={user.to_user?.title || ""}
                  location={`${user.to_user?.city || ""}, ${
                    user.to_user?.state || ""
                  }`}
                  propertyTypes={user.to_user?.property_interests || []}
                  memberSince={getJoinYear(user.to_user?.created_at)}
                  email={user.to_user?.email || ""}
                  phone={user.to_user?.phone || ""}
                  range={user.to_user?.preferred_investment_range || ""}
                  companyname={user.to_user?.company_name || ""}
                  year={user.to_user?.years_of_experiance || ""}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  onReject={handleReject}
                  onViewProfile={() => {
                    setSelectedUser({
                      user: user,
                      type: "sent",
                    });
                    setShowModal(true);
                  }}
                  type="addToNetwork"
                  button={"pending"}
                />
              ))
            ) : (
              <div className="text-black font-Inter font-semibold">
                No Sent Requests Found
              </div>
            )}
          </div>

          {!loading && totalPagesSent > 1 && (
            <Pagination
              currentPage={currentPageSent}
              totalPages={totalPagesSent}
              onPageChange={setCurrentPageSent}
            />
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedUser && (
        <PendingUserModal
          user={selectedUser}
          id={selectedUser.id}
          onReject={handleReject}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          type={type}
        />
      )}
    </>
  );
};

export default OurRequest;
