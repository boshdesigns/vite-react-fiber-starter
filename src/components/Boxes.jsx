import React, { useEffect, useState } from "react";
import { Vector3 } from "three";
import Box from "./Box";

const BOX_COUNT = 100;

function Boxes({ tubeGeometry }) {
  const [boxes, setBoxes] = useState([]);

  const renderBoxes = () => {
    const newBoxes = [];
    for (let i = 0; i < BOX_COUNT; i++) {
      const p = (i / BOX_COUNT + Math.random() + 1) % 1;
      const position = tubeGeometry.parameters.path.getPointAt(p);
      position.x += (Math.round(Math.random()) * 2 - 1) * 0.1;
      position.y += (Math.round(Math.random()) * 2 - 1) * 0.1;
      position.z += (Math.round(Math.random()) * 2 - 1) * 0.1;

      const rotation = new Vector3((Math.random() - 1) * 0.4, (Math.random() - 1) * 0.4, (Math.random() - 1) * 0.4);

      newBoxes.push({ position, rotation, name: `box-${i}` });
    }
    setBoxes(newBoxes);
  };

  useEffect(() => {
    renderBoxes();
  }, []);

  const removeBox = name => {
    setBoxes(prev => prev.filter(box => box.name !== name));
  };

  return (
    <>
      {boxes.map((box, i) => {
        return <Box key={box.name} box={box} cb={removeBox} name={box.name} />;
      })}
    </>
  );
}

export default Boxes;
