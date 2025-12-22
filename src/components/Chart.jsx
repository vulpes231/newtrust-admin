import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice } from "../features/navSlice";
import { getUsers, selectManageUserSlice } from "../features/manageUserSlice";
import { getTrnxs, selectManageTrnxSlice } from "../features/manageTrnxSlice";
import {
  getPositions,
  selectAllPositions,
  selectPositionSlice,
} from "../features/positionSlice";

// Register chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend);

const Chart = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectNavSlice);
  const { users } = useSelector(selectManageUserSlice);
  const { trnxs } = useSelector(selectManageTrnxSlice);
  const positions = useSelector(selectAllPositions);
  const lineData = [
    { day: "Mo", revenue: 12000 },
    { day: "Tu", revenue: 8000 },
    { day: "We", revenue: 22000 },
    { day: "Th", revenue: 15000 },
    { day: "Fr", revenue: 23000 },
    { day: "Sa", revenue: 27000 },
    { day: "Su", revenue: 35000 },
  ];

  // Dummy data for Doughnut Chart
  const doughnutData = {
    labels: ["Users", "Transactions", "Positions"],
    datasets: [
      {
        data: [users?.length, trnxs?.length, positions?.length],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTrnxs());
    const queryData = {
      page: 1,
      limit: 10,
      filterBy: "",
      sortBy: "",
    };
    dispatch(getPositions(queryData));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-0">
      {/* Line Chart */}
      <div className="bg-white dark:bg-slate-800/20 text-gray-800 dark:text-white shadow-sm rounded-md border border-slate-300 dark:border-slate-700 px-2">
        <h2 className="text-lg font-semibold mb-4 px-4 pt-4">Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis dataKey="day" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#000" }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#colorUv)"
              strokeWidth={4}
              dot={{ r: 6, fill: "#fff", strokeWidth: 2, stroke: "#5156be" }}
              activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5156be" />
                <stop offset="100%" stopColor="#5156be" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Doughnut Chart */}
      {/* Doughnut Chart */}
      <div className="bg-white dark:bg-slate-800/20 dark:text-slate-300 shadow-sm rounded-md p-6 flex flex-col items-center border border-slate-300 dark:border-slate-700">
        <h2 className="text-lg font-semibold mb-4">System Overview</h2>
        <div className="w-64 h-64">
          <Doughnut
            data={doughnutData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    boxWidth: 12,
                    paddingX: 5,
                    paddingY: 20,
                    color: darkMode ? "#e5e7eb" : "#374151",
                  },
                  fullSize: true,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
