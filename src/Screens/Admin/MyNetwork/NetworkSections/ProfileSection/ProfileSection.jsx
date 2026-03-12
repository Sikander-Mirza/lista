// IMAGES
import InvestorIcon1 from "../../../../../assets/Icons/InvestorIcon1.png";
import DummyLogo from "../../../../../assets/fallback/UnknowUser.png";
// REDUX
import { useSelector } from "react-redux";
// COMPONENTS 
import Spinner from "../../../../../Components/Spinner/Spinner";

const ProfileSection = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user)
    return (
      <div className="flex justify-center h-[65vh] items-center">
        <Spinner style={"w-12 h-16 text-PurpleColor z-50"} />
      </div>
    );

  const BackgroundImages = {
    backgroundImage: `url(${
      user?.banner ? import.meta.env.VITE_IMAGE_KEY + user.banner : "DummyLogo"
    })`,
    backgroundPosition: "5%",
  };

  return (
    <>
      <section className=" py-5">
        <div
          style={BackgroundImages}
          className="relative flex items-center justify-center overflow-hidden rounded-[10px] bg-gray-900"
        >
          <h1 className="font-Inter font-bold text-[27px] sm:text-[32px] xl:text-[35px]  2xl:text-[43px] text-white  text-center py-14 xl:py-16.5  2xl:py-21 relative ">
            My Network
          </h1>
        </div>
      </section>
      <section className="flex max-[400px]:flex-col items-center max-[400px]:gap-0 gap-4 sm:gap-5 sm:py-3 sm:flex-row ">
        <div>
          <div className="w-full h-auto  max-[400px]:max-w-[150px] max-w-[140px] sm:max-w-[150px] lg:max-w-[160px]  xl:max-w-[180px] 2xl:max-w-[220px] mx-auto">
            <img
              className="w-full aspect-square rounded-full object-cover border-4 border-PurpleColor"
              src={
                user?.headshot
                  ? import.meta.env.VITE_IMAGE_KEY + user.headshot
                  : DummyLogo
              }
              alt="Profile"
            />
          </div>
        </div>

        <div className="flex max-[400px]:items-center gap-1 flex-col sm:items-start sm:gap-2 mt-3 sm:mt-0">
          <h4 className="font-Inter font-bold text-[27px] sm:text-[31px] lg:text-[33px] xl:text-[38px] 2xl:text-[43px]">
            {user?.first_name + " " + user?.last_name || "Guest"}
          </h4>
          <h6 className="font-Inter text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-[500] max-[400px]:text-center text-start">
            {user.title || "Not Provided"}
          </h6>
          <ul className="flex flex-wrap max-[400px]:items-center justify-center gap-4 sm:justify-start sm:items-start sm:gap-5 ">
            <li className="flex gap-2 justify-center items-center">
              <img className="w-4 h-4 2xl:w-5 2xl:h-5" src={InvestorIcon1} alt="" />
              <p className="font-Inter text-[12px] sm:text-[13px] xl:text-[14px] 2xl:text-[18px] text-Paracolor font-[600]">
                {user.city + ", " + user.state || "Not Provided"}
              </p>
            </li>
            {/* <li className="flex gap-2 justify-center items-center">
              <img className="w-4 h-4 " src={MessageIcon2} alt="" />
              <p className="font-Inter text-[14px] text-Paracolor font-[600]">
                {user.email || "guest@guest.com"}
              </p>
            </li>
            <li className="flex gap-2 -mt-2 sm:mt-0 justify-center items-center">
              <img className="w-4 h-4" src={CallIcon} alt="" />
              <p className="font-Inter text-[14px] text-Paracolor font-[600]">
                {user.phone || "123456789"}
              </p>
            </li> */}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ProfileSection;
