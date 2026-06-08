import { useEffect } from "react";

import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import LatestAppointments from "../components/LatestAppointments";

import { typography } from "../theme/typography";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import usePatients from "../hooks/usePatients";
import useDoctors from "../hooks/useDoctors";
import useAppointments from "../hooks/useAppointments"

import {
  useTheme
} from "../context/ThemeContext";

import {
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaBed,
  FaStethoscope
} from "react-icons/fa";

gsap.registerPlugin(
  ScrollTrigger
);

function Dashboard() {

  const { colors } = useTheme();

  const { patients } = usePatients();

  const { doctors } = useDoctors();

  const { appointments } = useAppointments();

  const user = 

    JSON.parse(

      localStorage.getItem(

        "user"

      )
      
    );
    
  useEffect(() => {

    const tl = gsap.timeline();

    tl.from(
      ".kpi-card",
      {
        stagger: 0.12,
        duration: 1.5
      }
    );

    gsap.from(
      ".appointments-section",
      {
        duration: 1,
        scrollTrigger: {
          trigger: ".appointments-section",
          start: "top 80%"
        }
      }
    );

  }, []);  

  return (
    <motion.div 
      
      style={{ backgroundColor: colors.background }} 

      initial={{
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

      <div
        className="
          min-h-screen
        "
      >

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

          <section
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              2xl:grid-cols-4
              gap-6
            "
          >

            <div className="kpi-card">

            <KPICard
              aria-label="Patients"
              title="Patients"
              value={patients.length}
              icon={<FaBed />}
              change="12%"
              positive={true}
              color="bg-green-600"
            />

            </div>
            <div className="kpi-card">

            <KPICard
              aria-label="Doctors"
              title="Doctors"
              value={doctors.length}
              icon={<FaStethoscope />}
              change="0%"
              positive={true}
              color="bg-indigo-600"
            />

            </div>
            <div className="kpi-card">

            <KPICard
              aria-label="Appointments"
              title="Appointments"
              value={appointments.length}
              icon={<FaClipboardList />}
              change="9%"
              positive={true}
              color="bg-orange-500"
            />

            </div>
            <div className="kpi-card">

            <KPICard
              aria-label="Revenue"
              title="Revenue"
              value="₹ 68,400"
              icon={<FaChartLine />}
              change="18%"
              positive={true}
              color="bg-pink-600"
            />

            </div>

          </section>

          <section className="mt-8">
          
            <RevenueChart />
          
          </section>

          <section className="mt-8 appointments-section">
            
            <LatestAppointments />

          </section>

        </main>

      </div>

    </motion.div>
  );
}

export default Dashboard;
