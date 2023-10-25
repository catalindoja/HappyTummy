import React from 'react';
import Gluten from "../img/gluten.png";

function Allergies() {
  return (
    <div className="allergies-intro">
      <h1>Allergens</h1>
      <p>The main objective of Happy Tummy is to make the list of allergens in supermarket products easily accessible to everyone. These are the allergens that are identified in this service. ❤</p>
      <div className="allergies-container">
        <div className="allergies-icon">
          <img src={Gluten} alt="Icono de alergia" />
        </div>
        <div className="allergies-content">
          <h2>Gluten</h2>
          <p>
Gluten is a composite protein naturally present in certain cereal grains, such as wheat, barley, and rye. It plays a crucial role in food processing, particularly in the context of baking, as it provides elasticity and helps dough maintain its shape. Gluten consists of two main proteins, glutenin and gliadin, which, when combined with water, create a sticky, stretchy network. While it's responsible for the texture and structure of bread and other baked goods, it can also be problematic for individuals with gluten-related disorders, such as celiac disease or non-celiac gluten sensitivity, as it triggers adverse reactions in their bodies when consumed.</p>
        </div>
      </div>
    </div>

  );
}

export default Allergies;