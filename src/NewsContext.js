import React, { createContext, useContext, useState } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [savedNews, setSavedNews] = useState([]);

  const addSavedNews = (article) => {
    setSavedNews((prevSavedNews) => [...prevSavedNews, article]);
  };

  return (
    <NewsContext.Provider value={{ savedNews, addSavedNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
