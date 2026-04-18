import { useState, useMemo, useEffect } from "react";
import { STATUS } from "../../utils/constants";

export const useStudentStats = (products, activeTab) => {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const stats = useMemo(() => {
    return {
      total: products.length,
      approved: products.filter((p) => p.status === STATUS.APPROVED).length,
      pending: products.filter((p) => p.status === STATUS.PENDING).length,
      rejected: products.filter((p) => p.status === STATUS.REJECTED).length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter((p) => p.status === activeTab);
  }, [products, activeTab]);

  useEffect(() => {
    const duration = 800;
    const stepTime = 20;
    const steps = duration / stepTime;
    let step = 0;
    const startStats = { total: 0, approved: 0, pending: 0, rejected: 0 };
    const endStats = stats;
    
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      setAnimatedStats({
        total: Math.floor(startStats.total + (endStats.total - startStats.total) * progress),
        approved: Math.floor(startStats.approved + (endStats.approved - startStats.approved) * progress),
        pending: Math.floor(startStats.pending + (endStats.pending - startStats.pending) * progress),
        rejected: Math.floor(startStats.rejected + (endStats.rejected - startStats.rejected) * progress),
      });
      if (progress === 1) clearInterval(interval);
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [stats]);

  return { stats, animatedStats, filteredProducts };
};