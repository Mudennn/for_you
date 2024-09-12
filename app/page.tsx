"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { main } from "framer-motion/client";
import { useState } from "react";
import Image from 'next/image';

const quotes = [
  "I made this for you",
  "Haiiii Wawa! 👋🏻",
  "Are you doing okay?",
  "I know life can be tough",
  "But do I know you try really hard even when life is tough",
  "and you are absolutely amazing 💕",
  "Im sooooo proud of you!",
  "You deserve to be happy :)",
  "Bye!",
  "But wait!",
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

  return (
    <main className="h-screen  w-full  bg-white">
      <nav className="flex justify-center items-center p-4 bg-custom-beige">
        <h1 className="text-black text-2xl font-bold">For You</h1>
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
              className="absolute top-0 left-0 p-4 bg-custom-beige shadow-lg rounded-lg border-2 border-black w-full h-full flex items-center justify-center text-center cursor-grab active:cursor-grabbing"
              style={{
                zIndex: cards.length - index,
                boxShadow:
                  "0 4px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <p className="text-black text-lg font-semibold px-4">{quote}</p>
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
    // <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-green-800">
    //   <div className="relative w-64 h-96 mb-8">
    //     <AnimatePresence>
    //       {cards.map((quote, index) => (
    //         <motion.div
    //           key={quote}
    //           initial={{
    //             scale: 1 - index * 0.05,
    //             y: index * 10,
    //             rotate: index % 2 === 0 ? 5 : -5,
    //             opacity: 1 - index * 0.2
    //           }}
    //           animate={{
    //             scale: 1 - index * 0.05,
    //             y: index * 10,
    //             rotate: index % 2 === 0 ? 5 : -5,
    //             opacity: 1 - index * 0.2
    //           }}
    //           exit={{ x: 300, opacity: 0, rotate: 45 }}
    //           transition={{ duration: 0.3 }}
    //           drag={index === 0 ? "x" : false}
    //           dragConstraints={{ left: 0, right: 0 }}
    //           onDragEnd={index === 0 ? handleDragEnd : undefined}
    //           className="absolute top-0 left-0 bg-white shadow-lg rounded-lg border-2 border-black w-full h-full flex items-center justify-center text-center cursor-grab active:cursor-grabbing"
    //           style={{
    //             zIndex: cards.length - index,
    //             boxShadow: '0 4px 8px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)',
    //             backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    //           }}
    //         >
    //           <p className="text-black text-lg font-semibold px-4">{quote}</p>
    //         </motion.div>
    //       ))}
    //     </AnimatePresence>
    //   </div>
    //     <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
    //       {`${currentIndex + 1} of ${quotes.length}`}
    //     </div>
    //   <div className="flex justify-center space-x-4">
    //     <button
    //       onClick={() => cycleCards(-1)}
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Prev
    //     </button>
    //     <button
    //       onClick={() => cycleCards(1)}
    //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //     >
    //       Next
    //     </button>
    //   </div>
    // </main>
  );
}
