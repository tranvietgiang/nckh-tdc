import { useState, useMemo, useEffect } from "react";
import { STATUS } from "../../utils/constants";

export default function useStudentScreen(products) {
  const [activeTab, setActiveTab] = useState("all");
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const myProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case STATUS.PENDING:
        return myProducts.filter((p) => p.status === STATUS.PENDING);
      case STATUS.APPROVED:
        return myProducts.filter((p) => p.status === STATUS.APPROVED);
      case STATUS.REJECTED:
        return myProducts.filter((p) => p.status === STATUS.REJECTED);
      default:
        return myProducts;
    }
  }, [myProducts, activeTab]);

  const stats = useMemo(() => {
    return {
      total: myProducts.length,
      approved: myProducts.filter((p) => p.status === STATUS.APPROVED).length,
      pending: myProducts.filter((p) => p.status === STATUS.PENDING).length,
      rejected: myProducts.filter((p) => p.status === STATUS.REJECTED).length,
    };
  }, [myProducts]);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(1, step / 40);

      setAnimatedStats({
        total: Math.floor(stats.total * progress),
        approved: Math.floor(stats.approved * progress),
        pending: Math.floor(stats.pending * progress),
        rejected: Math.floor(stats.rejected * progress),
      });

      if (progress === 1) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [stats]);

  return {
    activeTab,
    setActiveTab,
    filteredProducts,
    animatedStats,
    stats,
  };
}
