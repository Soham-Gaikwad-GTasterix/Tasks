import styled from "styled-components";

const Card = styled.div`

  background: ${props => props.theme.card};

  color: ${props => props.theme.text};

  padding: 2rem;

  border-radius: 1rem;

  box-shadow:
    0 10px 25px
    rgba(0,0,0,0.15);

`;

function StyledCard() {

  return (

    <Card>

      <h2>
        Styled Components
      </h2>

      <p>
        CSS-in-JS Example
      </p>

    </Card>

  );

}

export default StyledCard;