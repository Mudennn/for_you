"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";


const quotes = [
  "I made this for you 🫣",
  "Haiiii Wawa! 👋🏻",
  "So macam mana? Semua okay? Kerja okay? Dah berapa kali nangis minggu ni? haha",
  "I know life can be tough sometimes",
  "But I do know you try really hard, even when life is tough.",
  "One thinng for sure, Waa ni amazing orangnya! 💕",
  "Im sooooo proud of you! 👏",
  "Nah bunga 🌷🪻🌹. *Walaupun tahu yang dia tu tak suka bunga",
  "Tu je lah kot Bye!",
  "EHH jap jap jap",
  "I'm here for you, if you need me.",
  "Tapiii en en en bila kita nak pi art gallery date lagi? 😛 *tu pun kalau sudi",
  "Okayyy bye!"
];

export default function Home() {
  const [cards, setCards] = useState(quotes);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      cycleCards(info.offset.x > 0 ? 1 : -1);
    }
  };

  const cycleCards = (direction: number) => {
    setCards((prevCards) => {
      const newCards =
        direction > 0
          ? [...prevCards.slice(1), prevCards[0]]
          : [prevCards[prevCards.length - 1], ...prevCards.slice(0, -1)];
      return newCards;
    });
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + quotes.length) % quotes.length
    );
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = "60162258736"; 
    const message = encodeURIComponent("Book a date with me! Date: Time:");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <main className="h-screen  w-full  bg-white">
      <nav className="flex justify-center items-center p-4 bg-custom-beige">
        <h1 className="text-black text-2xl font-bold">For You Wawa</h1>
      </nav>

      <div className="flex flex-col items-center justify-center p-[5%]">
      {/* Quote Counter */}
      <div className="flex justify-end items-end w-72">
        <div className="text-white bg-pink-300 px-2 py-1 rounded-full mb-4">
          {`${currentIndex + 1} of ${quotes.length}`}
        </div>
      </div>

      {/* Quote Cards */}
      <div className="relative w-64 lg:w-72 h-96">
        <AnimatePresence>
          {cards.map((quote, index) => (
            <motion.div
              key={quote}
              initial={{
                scale: 1 - index * 0.05,
                y: index * 10,
                rotate: index === 0 ? 0 : index === 1 ? -15 : -30,
                opacity: 1 - index * 0.2,
              }}
              animate={{
                scale: 1 - index * 0.05,
                y: index * 10,
                rotate: index === 0 ? 0 : index === 1 ? -15 : -30,
                opacity: 1 - index * 0.2,
              }}
              exit={{ x: 300, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3 }}
              drag={index === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={index === 0 ? handleDragEnd : undefined}
              className="absolute top-0 left-0 p-4 bg-custom-beige shadow-lg rounded-lg border-2 border-black w-full h-full flex flex-col items-center justify-center text-center cursor-grab active:cursor-grabbing"
              style={{
                zIndex: cards.length - index,
                boxShadow:
                  "0 4px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <p className="text-black text-lg font-semibold px-4">{quote}</p>
              {index === 0 && currentIndex === quotes.length - 2 && (
                <button
                  onClick={redirectToWhatsApp}
                  className="mt-4 hover:bg-green-500 bg-green-400 text-white font-bold py-2 px-4 rounded-full border-2 border-black"
                >
                  Book Me!
                </button>
              )}
              <img src="/images/flowers.png" alt=""  className="absolute bottom-0 right-0 left-0 object-cover" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between w-72 mt-10">
        <button
          onClick={() => cycleCards(-1)}
          className="hover:bg-custom-beige bg-pink-300 rounded-full text-white hover:text-black  font-bold py-2 px-4"
        >
          ← Prev 
        </button>
        <button
          onClick={() => cycleCards(1)}
          className="hover:bg-custom-beige bg-pink-300 text-white hover:text-black font-bold py-2 px-4 rounded-full"
        >
          Next →
        </button>
      </div>
      </div>
    </main>

  );
}
