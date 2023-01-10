import { useState } from "react";
import Display from "./Display.js";
import FavoriteAnimal from "./FavoriteAnimal.js";
import Name from "./Name.js";

function App() {
  const [animal, setAnimal] = useState('')

  function onAnimalChange(e) {
    setAnimal(e.target.value);
  }

  return (
    <form>
      <Name />
      <FavoriteAnimal
        name={animal}
        onAnimalChange={onAnimalChange}
      />
      <Display
        animal={animal}
      />
    </form>
  )
}

export default App;