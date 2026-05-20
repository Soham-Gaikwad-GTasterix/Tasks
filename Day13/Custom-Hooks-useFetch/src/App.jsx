import {
  useEffect,
  useState
} from "react";


function useFetch(url) {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function fetchData() {

      try {

        const response =
          await fetch(url);

        const json =
          await response.json();

        setData(json);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchData();

  }, [url]);


  return {
    data,
    loading
  };
}


function App() {

  const {
    data,
    loading
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className="p-10">

      {
        data.map(user => (

          <p key={user.id}>
            {user.name}
          </p>

        ))
      }

    </div>
  );
}

export default App;