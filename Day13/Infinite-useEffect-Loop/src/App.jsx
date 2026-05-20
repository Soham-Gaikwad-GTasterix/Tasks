import {
  useEffect,
  useState
} from "react";

function App() {

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    setCount(count + 1);

  }, [count]);

  return (

    <h1>{count}</h1>

  );
}

export default App;