import styled
from "styled-components";

const Nav = styled.div`

  background:
    ${props =>
      props.theme.card};

  color:
    ${props =>
      props.theme.text};

  padding: 1rem 2rem;

  display: flex;

  justify-content:
    space-between;

`;

function Navbar({

  children

}) {

  return (

    <Nav>

      <h1>
        Day 23 Styling Lab
      </h1>

      {children}

    </Nav>

  );

}

export default Navbar;