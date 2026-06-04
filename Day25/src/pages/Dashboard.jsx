import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import LatestAppointments from "../components/LatestAppointments";
import { typography } from "../theme/typography";
import { motion } from "framer-motion";

import {
  useTheme
} from "../context/ThemeContext";

import {
  FaDollarSign,
  FaUsers,
  FaClipboardCheck,
  FaChartLine
} from "react-icons/fa";

function Dashboard({
  darkMode,
  setDarkMode,
  collapsed,
  setCollapsed
}) {

  const { colors } = useTheme();

  const user = 

    JSON.parse(

      localStorage.getItem(

        "user"

      )
      
    );  

  return (
    <motion.div 
      
      style={{ backgroundColor: colors.background }} 

      inital={{
        opacity: 0,
        y: 30
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}
      
      className="min-h-screen overflow-hidden"

    >

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        style={{
          marginLeft:
            window.innerWidth >= 768
              ? (collapsed ? "80px" : "288px")
              : "0px"
        }}
        className="
          min-h-screen
          transition-all
          duration-300
        "
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div
          className="
            fixed
            top-0
            right-0
            w-[500px]
            h-[500px]
            bg-indigo-600/10
            blur-[120px]
            rounded-full
            pointer-events-none
          "
        />

        <main
          className="
            max-w-[1500px]
            mx-auto
            px-4
            sm:px-6
            sm:pt-24
            lg:px-8
            lg:pt-28
            py-8
          "
        >

          <div className="mb-10">

          <h1
            
            style={{ color: colors.text }}

            className={`
              ${typography.h1}
            `}
          >
              Overview
            </h1>

            <p
              className="
                text-slate-400
                mt-2
              "
            >
              Welcome back, {user?.name}
            </p>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-4
              gap-6
            "
          >

            <KPICard
              title="Budget"
              value="$24,000"
              icon={<FaDollarSign />}
              change="12%"
              positive={true}
              color="bg-indigo-600"
            />

            <KPICard
              title="Customers"
              value="1,620"
              icon={<FaUsers />}
              change="8%"
              positive={true}
              color="bg-green-600"
            />

            <KPICard
              title="Tasks Progress"
              value="75%"
              icon={<FaClipboardCheck />}
              change="4%"
              positive={false}
              color="bg-orange-500"
            />

            <KPICard
              title="Revenue"
              value="$68,400"
              icon={<FaChartLine />}
              change="18%"
              positive={true}
              color="bg-pink-600"
            />

          </div>

          <div
            className="
              mt-8
              grid
              xl:grid-cols-3
              gap-6
            "
          >

            <div className="xl:col-span-3">
              <RevenueChart />
            </div>

          </div>

          <div className="mt-8">
            <LatestAppointments />
          </div>

        </main>

      </div>

    </motion.div>
  );
}

export default Dashboard;
