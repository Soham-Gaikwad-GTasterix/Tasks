import {

  useState

} from "react";

import {

  FaUsers,
  FaDollarSign,
  FaShoppingCart,
  FaChartLine

} from "react-icons/fa";

import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

import StatCard
from "../components/StatCard";

function Dashboard() {

  const [sidebarOpen,
    setSidebarOpen] =
      useState(false);

  return (

    <div
      className="
        min-h-screen
      "
    >

      <Sidebar

        sidebarOpen={
          sidebarOpen
        }

        setSidebarOpen={
          setSidebarOpen
        }

      />

      <div
        className="
          lg:ml-72
        "
      >

        <Navbar
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <main
          className="
            p-4
            md:p-8
          "
        >

          {/* CARDS */}

          <div

            className="
              grid

              grid-cols-1

              sm:grid-cols-2

              xl:grid-cols-4

              gap-6
            "
          >

            <StatCard
              title="Users"
              value="1,250"
              trend="+12%"
              icon={<FaUsers />}
            />

            <StatCard
              title="Revenue"
              value="$45K"
              trend="+20%"
              icon={<FaDollarSign />}
            />

            <StatCard
              title="Orders"
              value="540"
              trend="+8%"
              icon={<FaShoppingCart />}
            />

            <StatCard
              title="Growth"
              value="18%"
              trend="+5%"
              icon={<FaChartLine />}
            />

          </div>

        </main>

      </div>

    </div>

  );
}

export default Dashboard;