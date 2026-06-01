import styles
from "../styles/ModuleCard.module.css";

function ModuleCard() {

  return (

    <div
      className={
        styles.card
      }
    >

      <h2
        className={
          styles.title
        }
      >
        CSS Modules
      </h2>

      <p>
        Scoped CSS
      </p>

    </div>

  );

}

export default ModuleCard;