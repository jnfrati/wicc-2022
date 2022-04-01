import { useCallback, useState } from "react";

type useFilterType = <T>(
  initialArray: Array<T>,
  paths: Array<string>
) => [Array<T>, (word: string) => void];

const useFilter: useFilterType = (initialArray, paths) => {
  const [filteredArray, setFilteredArray] = useState(initialArray);

  const filter = useCallback(
    (word: string): void => {
      if (!word) {
        setFilteredArray(initialArray);
      }

      const newFilteredArray = initialArray.filter((val) =>
        paths.reduce((wordMatch, path) => {
          const splittedPath = path.split(".");
          const matchedPath: string | undefined = splittedPath.reduce(
            (previousObject, currentPath) => previousObject[currentPath],
            val
          );

          const hasCurrentValueMatched = matchedPath
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .match(word.toLowerCase());
          return wordMatch || !!hasCurrentValueMatched;
        }, false)
      );
      setFilteredArray(newFilteredArray);
    },
    [initialArray, setFilteredArray, paths]
  );

  return [filteredArray, filter];
};

export default useFilter;
