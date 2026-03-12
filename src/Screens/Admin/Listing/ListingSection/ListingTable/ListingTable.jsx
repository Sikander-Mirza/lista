import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../../../Components/Spinner/Spinner";
import EditIcon from "../../../../../assets/Icons/EditIcon.png";
import { ChartNoAxesCombined, ChevronLeft, Lock, PencilOff, Trash2 } from "lucide-react";
import RightSideArrow from "../../../../../assets/Icons/ListingRightSideArrow.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../../Components/ConfirmationModal/ConfirmationModal";
import { useConfirmation } from "../../../AccountSetting/Fields/Confirmation";
import TruncatedText from "../../../../../Components/TruncatedText/TruncatedText";
import ListingMobileTable from "../../../../../Components/Admin/Listing/ListingMobileTable";

const ListingTable = ({ status, propertyType, priceRange, search }) => {

  const ApiKey = import.meta.env.VITE_API_KEY;
  const Status = localStorage.getItem("status");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByViews, setSortByViews] = useState(null);
  const Islocked = !token || Status !== "active";

  const itemsPerPage = 5;
  const { isOpen, confirm, handleConfirm, handleCancel } = useConfirmation();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${ApiKey}/user-properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings(res.data?.data || []);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const applyFilters = (properties) => {
    return properties.filter((item) => {
      const matchesStatus = status
        ? item.listing_status?.toLowerCase() === status.toLowerCase()
        : true;

      const matchesType = propertyType
        ? item.property_type?.toLowerCase() === propertyType.toLowerCase()
        : true;

      const rawPrice = item.sale_price != null ? item.sale_price : item.lease_rate;
      const price = rawPrice
        ? Number(rawPrice.toString().replace(/,/g, ''))
        : NaN;


      const matchesPrice = (() => {
        if (!priceRange || isNaN(price)) return true;

        switch (priceRange) {
          case "Under $250K":
            return price < 250000;
          case "$250K – $500K":
            return price >= 250000 && price <= 500000;
          case "$500K – $1M":
            return price >= 500000 && price <= 1000000;
          case "$1M – $2.5M":
            return price >= 1000000 && price <= 2500000;
          case "$2.5M – $5M":
            return price >= 2500000 && price <= 5000000;
          case "$5M – $10M":
            return price >= 5000000 && price <= 10000000;
          case "$10M – $25M":
            return price >= 10000000 && price <= 25000000;
          case "$25M – $50M":
            return price >= 25000000 && price <= 50000000;
          case "Over $50M":
            return price > 50000000;
          default:
            return true;
        }
      })();

      const matchesSearch = search
        ? item.property_name?.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesStatus && matchesType && matchesPrice && matchesSearch;
    });
  };

  const sortListingsByViews = (listings) => {
    if (!sortByViews) return listings;
    return [...listings].sort((a, b) => {
      const viewA = a.views_count || 0;
      const viewB = b.views_count || 0;
      return sortByViews === "asc" ? viewA - viewB : viewB - viewA;
    });
  };

  const filteredListings = applyFilters(listings);
  const sortedListings = sortListingsByViews(filteredListings);
  const totalPages = Math.ceil(sortedListings.length / itemsPerPage);
  const currentListings = sortedListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleConfirmation = async (id) => {
    setSelectedId(id);
    setConfirmationAction("edit");
    const confirmed = await confirm();
    if (confirmed) {
      navigate(`/create-property?editId=${id}`);
    }
  };

  const handleDeleteConfirmation = async (id) => {
    setSelectedId(id);
    setConfirmationAction("delete");
    const confirmed = await confirm();
    if (confirmed) {
      try {
        await axios.get(`${ApiKey}/delete-property/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings((prev) => prev.filter((listing) => listing.id !== id));
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSortByViews(null);
  }, [status, propertyType, priceRange, search]);

  return (
    <>
      <div className=" pt-8 sm:px-4 md:px-3 xl:bg-white  rounded-b-[13px] xl:w-full overflow-x-auto xl:h-[88vh]">
        {loading ? (
          <div className="flex justify-center items-center !h-[75vh]">
            <Spinner style={"w-14 h-20 text-PurpleColor z-50"} />
          </div>
        ) : (

          <section>
            <table className="hidden xl:block min-w-[880px] w-full text-sm text-left rtl:text-right text-gray-500 bg-[#fcfcfc]">
              <thead className="text-[13.5px] tracking-[1.5px] sm:tracking-normal sm:text-[14px] md:text-[15px] text-white font-Urbanist uppercase bg-[#1E1E1E]">
                <tr>
                  <th className="px-6 py-4.5 rounded-tl-2xl">Property Name</th>
                  <th className="px-6 py-4.5">Type</th>
                  <th className="px-6 py-4.5">Price</th>
                  <th className="px-6 py-4.5">Status</th>
                  <th className="px-6 py-4.5">Date Listed</th>
                  <th
                    onClick={() =>
                      setSortByViews((prev) => (prev === "desc" ? "asc" : "desc"))
                    }
                    className="px-6 py-4.5 cursor-pointer select-none"
                  >
                    Views{" "}
                  </th>
                  <th className="px-6 py-4.5 rounded-tr-3xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentListings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center bg-white py-10 text-gray-500 font-Urbanist text-[16px]"
                    >
                      No listings found.
                    </td>
                  </tr>
                ) : (
                  currentListings.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50 font-Urbanist"
                    >
                      <th
                        scope="row"
                        className="w-[26%] text-[14px] px-4 py-6 font-medium text-gray-900 whitespace-nowrap sm:text-[14px] md:text-[16px] "
                      >
                        <NavLink
                          className={"hover:border-b-[1px] pb-2"}
                          to={`/properties/${item.id}`}
                        >
                          <TruncatedText text={item.property_name} maxLength={35} />
                        </NavLink>
                      </th>
                      <td className="w-[18%] text-start px-3.5 py-6 text-[#222222] font-[550] text-[16px]">
                        <TruncatedText text={item.property_type} maxLength={12} />
                      </td>
                      <td className="w-[15%] text-start px-3.5 py-6 text-[#222222] font-[550] text-[16px]">
                        {item.listing_type === "For Sale" && <TruncatedText text={item.sale_price} maxLength={9} />}
                        {item.listing_type === "For Lease" && <TruncatedText text={item.lease_rate} maxLength={9} />}
                        {item.listing_type === "Both (For Sale & For Lease)" && <TruncatedText text={item.sale_price + "/sale" + item.lease_rate + "/lease"} maxLength={9} />}
                      </td>
                      <td className="px-3.5 py-6 text-[#222222] font-[550] text-[16px] flex gap-1 items-center mt-3 ml-2 sm:ml-0 sm:mt-2.5">
                        <div
                          className={`h-2 w-2 rounded-full ${item.listing_status === "Available"
                            ? "bg-[#02E327]"
                            : item.listing_status === "Loss"
                              ? "bg-[#E31D1C]"
                              : "bg-[#4379EE]"
                            }`}
                        ></div>
                        {item.listing_status}
                      </td>
                      <td className="w-[35%] sm:w-[22%] text-center px-3.5 py-6 text-[#222222] font-[550] text-[16px]">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="text-center font-Inter font-[550] text-[#222222] text-[16px]">
                        {item.views_count}
                      </td>
                      <td className="px-4 py-6 text-[#222222] font-[550] text-[16px] flex gap-1.5 justify-center">
                        {!Islocked ? (
                          <Link title="Property Analytics" to={`/admin/analytics/${item.id}`}>
                            <ChartNoAxesCombined />
                          </Link>
                        ) : (
                          <span className="relative">
                            <span className="">
                              <Lock
                                strokeWidth={3}
                                className="absolute text-red-600 size-2 -right-1 z-50 sm:size-2 -top-1 sm:mt-0 "
                              />
                            </span>
                            <ChartNoAxesCombined className="cursor-not-allowed" />
                          </span>
                        )}

                        <button
                          onClick={() => handleConfirmation(item.id)}
                          className="cursor-pointer"
                          title="Edit Property"
                        >
                          <img
                            className="w-5.5 h-5.5"
                            src={EditIcon}
                            alt="Edit"
                          />
                        </button>
                        <button title="Delete Property" onClick={() => handleDeleteConfirmation(item.id)}>
                          <Trash2 className="size-5 cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="xl:hidden">
              <ListingMobileTable
                loading={loading}
                items={currentListings}          // same page slice as desktop
                navigate={navigate}
                setSortByViews={setSortByViews}
                Islocked={Islocked}
                onEdit={handleConfirmation}      // opens your confirmation modal then navigates
                onDelete={handleDeleteConfirmation}
              />
            </div>
          </section>
        )}
      </div>

      {!loading && listings.length > 0 && (
        <section className="mt-3 flex justify-between items-center px-5">
          <div>
            <h1 className="font-Urbanist font-semibold text-[16px] sm:text-[17px]">
              Page {currentPage} of {totalPages || 1}
            </h1>
          </div>
          <div>
            <div className="border-[1px] border-solid border-[#222222] flex rounded-[7px]">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-r-[1px] border-solid border-[#BBBBBB] px-3.5 py-2 disabled:opacity-50 cursor-pointer"
              >
                <img className="w-2.5 h-3" src={RightSideArrow} alt="Prev" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 disabled:opacity-50 cursor-pointer"
              >
                <img
                  className="w-2.5 h-3 rotate-180"
                  src={RightSideArrow}
                  alt="Next"
                />
              </button>
            </div>
          </div>
        </section>
      )}

      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        message={
          confirmationAction === "delete"
            ? "Do you want to Delete this Property?"
            : "Do you want to Edit this Property?"
        }
        confirmLabel="Yes"
        icon={
          confirmationAction === "delete" ? (
            <Trash2
              strokeWidth={1.75}
              className="size-16 text-red-600 bg-amber-50 px-3.5 py-3.5 rounded-full"
            />
          ) : (
            <PencilOff
              strokeWidth={1.75}
              className="size-16 text-blue-600 bg-blue-100 px-3.5 py-3.5 rounded-full"
            />
          )
        }
        style={confirmationAction === "delete" ? "bg-red-600" : "bg-blue-600"}
      />
    </>
  );
};

export default ListingTable;
