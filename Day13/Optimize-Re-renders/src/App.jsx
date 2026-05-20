import {
  useCallback,
  useState,
  memo
} from "react";


const Child = memo(
  function Child({ onClick }) {

    console.log(
      "Child Rendered"
    );

    return (

      <button
        onClick={onClick}
      >
        Child Button
      </button>

    );
  }
);


function App() {

  const [count, setCount] =
    useState(0);

  const handleClick =
    useCallback(() => {

      console.log("Clicked");

    }, []);


  return (

    <div className="p-10">

      <h1>{count}</h1>

      <button
        onClick={() =>
          setCount(count + 1)
        }
      >
        Increase
      </button>


      <Child
        onClick={handleClick}
      />

    </div>
  );
}

export default App;