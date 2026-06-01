import {

  useState

} from "react";

import {

  ThemeProvider

} from "styled-components";

import {

  lightTheme,

  darkTheme

} from "./styles/theme";

import Navbar
from "./components/Navbar";

import ThemeToggle
from "./components/ThemeToggle";

import StyledCard
from "./components/StyledCard";

import BEMCard
from "./components/BEMCard";

import ModuleCard
from "./components/ModuleCard";

import AtomicCard
from "./components/AtomicCard";

function App() {

  const [

    darkMode,

    setDarkMode

  ] = useState(false);

  return (

    <ThemeProvider

      theme={

        darkMode

          ? darkTheme

          : lightTheme

      }

    >

      <div

        style={{

          minHeight:
            "100vh",

          background:

            darkMode

              ? "#020617"

              : "#f8fafc"

        }}

      >

        <Navbar>

          <ThemeToggle

            darkMode={
              darkMode
            }

            setDarkMode={
              setDarkMode
            }

          />

        </Navbar>

        <div
          className="
            p-10
            grid
            md:grid-cols-2
            gap-8
          "
        >

          <StyledCard />

          <BEMCard />

          <ModuleCard />

          <AtomicCard />

        </div>

      </div>

    </ThemeProvider>

  );

}

export default App;