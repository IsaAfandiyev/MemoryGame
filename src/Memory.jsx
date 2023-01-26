import { useEffect, useState } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

const leftData = shuffle([
  {
    color: TILE_COLORS[0],
    id: 1,
  },
  {
    color: TILE_COLORS[1],
    id: 2,
  },
  {
    color: TILE_COLORS[2],
    id: 3,
  },
  {
    color: TILE_COLORS[3],
    id: 4,
  },
]);

const rightData = shuffle([
  {
    color: TILE_COLORS[0],
    id: 5,
  },
  {
    color: TILE_COLORS[1],
    id: 6,
  },
  {
    color: TILE_COLORS[2],
    id: 7,
  },
  {
    color: TILE_COLORS[3],
    id: 8,
  },
]);

export default function Memory() {
  const [leftCards] = useState(leftData);
  const [rightCards] = useState(rightData);
  const [selectedCards, setSelectedCards] = useState({
    firstCard: null,
    secondCard: null,
  });
  const [foundCards, setFoundCards] = useState([]);

  useEffect(() => {
    if (foundCards.length >= leftCards.length + rightCards.length) {
      alert("You win");
      window.location.reload();
    }
  }, [foundCards]);

  function handleColor(type, card) {
    if (type === "first" && !selectedCards.firstCard)
      setSelectedCards({ ...selectedCards, firstCard: card });
    if (type === "second" && !selectedCards.secondCard)
      setSelectedCards({ ...selectedCards, secondCard: card });
  }

  useEffect(() => {
    if (selectedCards.firstCard && selectedCards.secondCard) {
      if (selectedCards.firstCard?.color === selectedCards.secondCard?.color) {
        setFoundCards([
          ...foundCards,
          selectedCards.firstCard,
          selectedCards.secondCard,
        ]);
        setSelectedCards({ firstCard: null, secondCard: null });
      } else {
        setTimeout(() => {
          setSelectedCards({ firstCard: null, secondCard: null });
        }, 500);
      }
    }
  }, [selectedCards]);

  console.log(selectedCards);

  return (
    <>
      <h1>Memory</h1>
      <div className="board">
        <div className="left block">
          {leftCards.map((card) => (
            <div
              key={card.id}
              className="tile"
              style={
                selectedCards.firstCard?.color === card.color ||
                foundCards.filter((fc) => fc.id === card.id)[0]
                  ? { backgroundColor: card.color }
                  : {}
              }
              onClick={() => handleColor("first", card)}
            ></div>
          ))}
        </div>
        <div className="right block">
          {rightCards.map((card) => (
            <div
              key={card.id}
              className="tile"
              style={
                selectedCards.secondCard?.color === card.color ||
                foundCards.filter((fc) => fc.id === card.id)[0]
                  ? { backgroundColor: card.color }
                  : {}
              }
              onClick={() => handleColor("second", card)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
