import { useState } from "react";

export default function useReviewToggle(initial = 3) {
  const [limit, setLimit] = useState(initial);

  const getDisplayed = (reviews = []) => {
    return reviews.slice(0, limit);
  };

  const canShowMore = (reviews = []) => limit < reviews.length;
  const canCollapse = () => limit > initial;

  const showMore = () => setLimit((prev) => prev + initial);
  const collapse = () => setLimit(initial);

  return {
    limit,
    getDisplayed,
    canShowMore,
    canCollapse,
    showMore,
    collapse,
  };
}
