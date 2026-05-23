import {
  useState
} from "react";


function Toggle({

  render

}) {

  const [isOn, setIsOn] =
    useState(false);


  function toggle() {

    setIsOn(!isOn);
  }


  return render({

    isOn,

    toggle

  });
}

export default Toggle;