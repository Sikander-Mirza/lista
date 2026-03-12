import React, { useState, useEffect } from "react";
import AddToNetwork from "../../../../../Components/Cards/AddToNetwork/AddToNetwork";
import Spinner from "../../../../../Components/Spinner/Spinner";
import Pagination from "../../../../../Components/Pagination/Pagination";
import ProfileModal from "../../../../../Components/ProfileModal/ProfileModal";

const AddtoNetworkSec = ({
  loading,
  AddNetwork,
  searchTerm,
  getJoinYear,
  showModal,
  setShowModal,
  handleReject,
  AddtoNetwork,
  selectedUser,
  setSelectedUser,
  type,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchTerm]);

  // Filter users not already accepted and match search
  const filtered = AddNetwork.filter((user) => user.connection_status === null);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedUsers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <section className="flex flex-col gap-7 sm:gap-10 items-center sm:items-start w-full">
        <h1 className="text-[21px] mt-5 font-Urbanist text-[#f5f5f5] bg-PurpleColor w-max px-6 py-1  rounded-[7px] sm:text-[23px] sm:px-8 sm:py-1.5 xl:text-[26px] 2xl:text-[30px] font-[700]">
          Add To Network
        </h1>

        <div className="flex flex-wrap gap-4 justify-center sm:justify-start w-full">
          {loading ? (
            <Spinner style={"w-14 h-20 text-PurpleColor"} />
          ) : paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <AddToNetwork
                key={user.id}
                id={user.id}
                InvesImage={user.headshot}
                InvesUserName={`${user.first_name} ${user.last_name}`}
                InvesDesc={user.title}
                location={user.city + ", " + user.state}
                propertyTypes={user.property_interests}
                memberSince={getJoinYear(user.created_at)}
                companyname={user.company_name}
                year={user.years_of_experiance}
                email={user.email}
                range={user.preferred_investment_range}
                phone={user.phone}
                showModal={showModal}
                setShowModal={setShowModal}
                onReject={handleReject}
                button={user.connection_status}
                onViewProfile={() => {
                  setShowModal(true);
                  setSelectedUser({
                    user,
                    type: "addToNetwork",
                    button: user.connection_status,
                  });
                }}
                AddtoNetwork={AddtoNetwork}
                type={"addToNetwork"}
              />
            ))
          ) : (
            <div className="text-black font-Inter font-semibold">
              No Users Found
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
      {selectedUser && (
        <ProfileModal
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

export default AddtoNetworkSec;
