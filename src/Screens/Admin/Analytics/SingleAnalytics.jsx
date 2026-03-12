import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Title,
} from "chart.js";

// Icons
import DashboardIcon1 from "../../../assets/Icons/DashboardIcon1.1.png";
import DashboardIcon2 from "../../../assets/Icons/DashboardIcon2.1.png";
import DashboardIcon3 from "../../../assets/Icons/DashboardIcon3.1.png";
import DashboardIcon4 from "../../../assets/Icons/DashboardIcon4.1.png";
import UpIcon from "../../../assets/Icons/DashboardIcon1.11.png";
import DownIcon from "../../../assets/Icons/DashboardIcon1.22.png";
import { ChevronDownIcon } from "flowbite-react";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Title
);

export default function PropertyViewChartCards() {
  const { id } = useParams();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");

  const [filter, setFilter] = useState("Daily");
  const [labels, setLabels] = useState([]);
  const [views, setViews] = useState([]);
  const [offerStats, setOfferStats] = useState({
    accepted: 0,
    received: 0,
    pending: 0,
    shared: 0,
  });

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await axios.get(
          `${ApiKey}/single-property-analytic/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isToday = (dateStr) => {
          const date = new Date(dateStr);
          date.setHours(0, 0, 0, 0);
          return date.getTime() === today.getTime();
        };

        const accepted = data.accepted_offers || [];
        const received = data.offers_received || [];
        const pending = data.pending_offers || [];
        const shared = data.social_shares || [];

        setOfferStats({
          accepted: {
            all: accepted.length,
            today: accepted.filter((o) => isToday(o.created_at)).length,
          },
          received: {
            all: received.length,
            today: received.filter((o) => isToday(o.created_at)).length,
          },
          pending: {
            all: pending.length,
            today: pending.filter((o) => isToday(o.created_at)).length,
          },
          shared: {
            all: shared.length,
            today: shared.filter((o) => isToday(o.created_at)).length,
          },
        });

        // Views grouped by filter
        const views = data.total_listing_views || [];
        const grouped = {};

        views.forEach((view) => {
          const dateObj = new Date(view.created_at);
          let key;

          if (filter === "Daily") {
            key = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
          } else if (filter === "Weekly") {
            const startOfWeek = new Date(dateObj);
            const day = startOfWeek.getDay();
            startOfWeek.setDate(dateObj.getDate() - day); // Sunday as start
            key = startOfWeek.toISOString().split("T")[0];
          } else if (filter === "Monthly") {
            key = `${dateObj.getFullYear()}-${String(
              dateObj.getMonth()
            ).padStart(2, "0")}`; // YYYY-MM
          } else if (filter === "Last 90 Days") {
            const ninetyDaysAgo = new Date();
            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
            if (dateObj < ninetyDaysAgo) return;
            key = dateObj.toISOString().split("T")[0];
          } else if (filter === "Last 24 Hours") {
            const now = new Date();
            const oneDayAgo = new Date();
            oneDayAgo.setTime(now.getTime() - 24 * 60 * 60 * 1000); // last 24 hours
            if (dateObj < oneDayAgo) return;
            // Group by hour
            const hour = dateObj.getHours().toString().padStart(2, "0");
            const day = dateObj.toISOString().split("T")[0];
            key = `${day} ${hour}:00`;
          }

          grouped[key] = (grouped[key] || 0) + 1;
        });

        const sortedKeys = Object.keys(grouped).sort();
        const labelFormatted = sortedKeys.map((key) => {
          if (filter === "Monthly") {
            const [year, month] = key.split("-");
            return new Date(year, month).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            });
          } else if (filter === "Last 24 Hours") {
            return key; // keep as 'YYYY-MM-DD HH:00'
          } else {
            return new Date(key).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          }
        });

        setLabels(labelFormatted);
        setViews(sortedKeys.map((k) => grouped[k]));
      } catch (error) {
      }
    };

    loadAnalytics();
  }, [id, filter]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index", // Show all items with same X label
      intersect: false, // Do not require cursor to intersect point/bar
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleColor: "#111827",
        bodyColor: "#374151",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `Views: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9CA3AF", font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#9CA3AF", font: { size: 12 } },
        grid: { color: "#F3F4F6", drawTicks: false },
      },
    },
  };

  const statCards = [
    {
      label: "Offers Received",
      value: offerStats.received.all,
      today: offerStats.received.today,
      icon: DashboardIcon1,
    },
    {
      label: "Pending Offers",
      value: offerStats.pending.all,
      today: offerStats.pending.today,
      icon: DashboardIcon2,
    },
    {
      label: "Accepted Offers",
      value: offerStats.accepted.all,
      today: offerStats.accepted.today,
      icon: DashboardIcon3,
    },
    {
      label: "Social Shares",
      value: offerStats.shared.all,
      today: offerStats.shared.today,
      icon: DashboardIcon4,
    },
  ];

  return (
    <>
      <div className="min-h-screen pr-3 sm:px-3 lg:px-0">
        {/* STAT CARDS */}
        <section className="grid sm:grid-cols-2 xl:grid-cols-3 min-[1780px]:grid-cols-4 flex-wrap gap-5 mt-5 min-[890px]:mt-9">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-[14px] p-6 flex flex-col justify-between gap-5"
            >
              <div className="flex justify-between">
                <span>
                  <h4 className="text-[15px] 2xl:text-[17px] font-Urbanist font-[500] text-[#666666]">
                    {card.label}
                  </h4>
                  <h1 className="font-Urbanist text-[#222222] text-[30px] md:text-[35px] font-[700] 2xl:text-[40px]">
                    {card.value}
                  </h1>
                </span>
                <span>
                  <img className="max-[390px]:w-13 w-14 xl:w-16 2xl:w-[72px]" src={card.icon} alt="" />
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-4 w-5"
                    src={card.today > 0 ? UpIcon : DownIcon}
                    alt=""
                  />
                </span>
                <span>
                  <h4 className="text-[#606060] font-Urbanist font-[600] text-[15px]">
                    {card.today || 0} new today
                  </h4>
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* FILTER + CHARTS */}
        <section className=" xl:pr-7 mt-9">
          <div className="mb-5 sm:items-center flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
            <div>
              <h1 className="font-Urbanist font-bold text-[24px] sm:text-[25px] md:text-[28px] xl:text-[32px] leading-[43px] w-max">
                Property View Analytics
              </h1>
            </div>
            <div className="relative w-max ">
              <select
                id="viewFilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="block sm:w-full pr-3 pl-4 sm:pr-8.5 sm:pl-6 py-2.5 rounded-[8px] font-semibold text-[13.5px] md:text-[15px] border-b-[1px] border-gray-300 focus:ring-PurpleColor focus:border-PurpleColor text-[#fcfcfc] font-Urbanist outline-none appearance-none cursor-pointer bg-black  2xl:text-[17px] 2xl:py-3 "
              >
                <option value="Daily">Select</option>
                <option value="Last 24 Hours">Last 24 Hours</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Last 90 Days">Last 90 Days</option>
              </select>
              <ChevronDownIcon
                className={`pointer-events-none absolute top-3 right-3 size-5 fill-[#fcfcfc] text-black`}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 ">
            {/* LINE CHART */}
            <div className="bg-white rounded-xl px-6 py-6 sm:py-10 shadow-lg">
              <div className="h-44 md:h-56 xl:h-64 2xl:h-72">
                <Line
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Views",
                        data: views,
                        fill: true,
                        borderColor: "#3B82F6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: "#3B82F6",
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* BAR CHART */}
            <div className="bg-white flex justify-center items-center rounded-xl px-6 py-6 sm:py-0">
              <div className="h-44 md:h-56 xl:h-64 w-full 2xl:h-72">
                <Bar
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Views",
                        data: views,
                        backgroundColor: "#10B981",
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
