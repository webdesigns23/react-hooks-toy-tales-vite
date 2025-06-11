import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys}) {
  return (
    <div id="toy-collection">{/* Render the collection of ToyCards */}
    {toys.map(toy => 
      <ToyCard 
      key={toys.id}
      toy={toy}/>)}
    </div>
  );
}

export default ToyContainer;
