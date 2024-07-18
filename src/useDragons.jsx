// useDragons.jsx

import { useState } from "react";
import uniqid from "uniqid";

export default function useDragons() {
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
    // Loop until desired amount of unique dragon characters are selected or max tries reached
    while (dragonsToShow.length < amount && tries < 100) {
      const randomId = Math.floor(Math.random() * POSSIBLE_DRAGONS) + 1;

      const dragon = await getDragon({ id: randomId });
      // Check if the fetch was successful and the ID isn't already in the list
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
      // Ensure each dragon has a unique key/id for React's rendering
      dragon.id = uniqid();
      shuffledDragons.push(dragon);
      availableDragons.splice(index, 1);
    }

    setDragons(shuffledDragons);
  }

  return { dragons, getRandomDragons, shuffleDragons, setDragons };
}
