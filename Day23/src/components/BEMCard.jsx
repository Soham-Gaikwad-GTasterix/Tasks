import "../styles/BEMCard.css";

function BEMCard() {

  return (

    <div
      className="
        bem-card
        bem-card--primary
      "
    >

      <h2
        className="
          bem-card__title
        "
      >
        BEM Methodology
      </h2>

      <p
        className="
          bem-card__description
        "
      >
        Block Element Modifier
      </p>

    </div>

  );

}

export default BEMCard;