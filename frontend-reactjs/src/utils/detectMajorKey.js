export const detectMajorKey = (majorName) => {
  const majorMap = {
    // AI - Artificial Intelligence
    "Artificial Intelligence": "ai",
    AI: "ai",
    "Trí tuệ nhân tạo": "ai",

    // CNTT - Công nghệ thông tin
    "Công nghệ thông tin": "cntt",
    "Information Technology": "cntt",
    IT: "cntt",

    // MMT - Mạng máy tính
    "Mạng máy tính": "mmt",
    "Computer Network": "mmt",
    Network: "mmt",

    // TKĐH - Thiết kế đồ họa
    "Thiết kế đồ họa": "tkdh",
    "Graphic Design": "tkdh",
    Design: "tkdh",
  };

  return majorMap[majorName]; // Default về CNTT
};
