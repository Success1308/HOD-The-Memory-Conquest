//useDragon hook

import { useState, useEffect } from "react";
import uniqid from "uniqid";

export default function useDragons(initialAmount = 0) {
  const [dragons, setDragons] = useState([]);
  const POSSIBLE_DRAGONS = 40;

  const getDragon = async ({ id }) => {
    try {
      const res = await fetch(
        `https://house-of-the-dragon-api.vercel.app/characters/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch character data");
      }
      const { name, house, title, img } = await res.json();
      return { name, image: img, id, house, title };
    } catch (error) {
      console.error("Error fetching character:", error);
      return null;
    }
  };

  const getRandomDragons = async (amount) => {
    const dragonsToShow = [];
    let tries = 0;
    const isFirstVisit = localStorage.getItem("visited") === null;
    if (isFirstVisit) localStorage.setItem("visited", true);

    while (dragonsToShow.length < amount && tries < 100) {
      const randomId = Math.floor(Math.random() * POSSIBLE_DRAGONS) + 1;
      const dragon = await getDragon({ id: randomId });
      if (dragon && !dragonsToShow.some(({ id }) => id === dragon.id)) {
        dragonsToShow.push(dragon);
      } else {
        tries++;
      }
    }
    return dragonsToShow;
  };

  function shuffleDragons() {
    const availableDragons = [...dragons];
    const shuffledDragons = [];

    while (availableDragons.length) {
      const index = Math.floor(Math.random() * availableDragons.length);
      const dragon = availableDragons[index];
      dragon.id = uniqid();
      shuffledDragons.push(dragon);
      availableDragons.splice(index, 1);
    }

    setDragons(shuffledDragons);
  }

  useEffect(() => {
    if (initialAmount > 0) {
      (async () => {
        const initialDragons = await getRandomDragons(initialAmount);
        setDragons(initialDragons);
      })();
    }
  }, [initialAmount]);

  return { dragons, getRandomDragons, shuffleDragons, setDragons };
}
