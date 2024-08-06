import { useState } from 'react';

const useNavigation = (initialPage = 'profile') => {
  const [selectedPage, setSelectedPage] = useState(initialPage);

  const navigateTo = (page) => {
    setSelectedPage(page);
  };

  return {
    selectedPage,
    navigateTo,
  };
};

export default useNavigation;
