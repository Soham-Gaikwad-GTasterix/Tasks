function Layout({ children }) {

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1>Hospital Dashboard</h1>

      {children}

    </div>
  );
}

export default Layout;