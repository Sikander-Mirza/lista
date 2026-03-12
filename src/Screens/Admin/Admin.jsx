import React from "react";
import { Route, Routes } from "react-router-dom";
// COMPONENTS 
import Inbox from "./Inbox/Inbox";
import Inquiry from "./Inquiry/Inquiry";
import Listing from "./Listing/Listing";
import MyOffers from "./MyOffer/MyOffer";
import Dashboard from "./Dashboard/Dashboard";
import Analytics from "./Analytics/Analytics";
import MyNetwork2 from "./MyNetwork/MyNetwork2";
import HelpSupport from "./HelpSupport/HelpSupport";
import SingleAnalytics from "./Analytics/SingleAnalytics";
import AccountSetting from "./AccountSetting/AccountSetting";
import AdminSidebar from "../../Components/AdminSideBar/AdminSidebar";
import SubscriptionSetting from "./SubscriptionSetting/SubscriptionSetting";
import NotFound from "../404NotFound/NotFound";
import ProtectiveRoute from "../../Configuration/ProtectiveRoute/ProtectiveRoute";
import UserGetRoute from "../../Configuration/ProtectiveRoute/UserGetRoute";

const Admin = () => {
  return (
    <>
    <AdminSidebar screen={
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<UserGetRoute component={<Dashboard />}/>} />
            <Route path="/listing" element={<UserGetRoute component={ <Listing />}/> } />
            <Route path="/network" element={  <ProtectiveRoute component={< MyNetwork2/>} />  } />
            <Route path="/inquiry" element={ <ProtectiveRoute component={< Inquiry/>} />} />
            <Route path="/myoffers" element={ <ProtectiveRoute component={< MyOffers/>} />} />
            <Route path="/analytics" element={<ProtectiveRoute component={< Analytics/>} />} />
            <Route path="/analytics/:id" element={<ProtectiveRoute component={< SingleAnalytics/>} />} />
            <Route path="/inbox" element={<ProtectiveRoute component={< Inbox/>} />} />
            <Route path="/customer-support" element={<ProtectiveRoute component={<HelpSupport />} />} />
            <Route path="/account-setting" element={ <AccountSetting />}  />
            <Route path="/subscription" element={< SubscriptionSetting/>}  />
          </Routes>
    }>
    </AdminSidebar>

    </>
  );
};

export default Admin;
