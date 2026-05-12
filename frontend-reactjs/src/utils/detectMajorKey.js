export const detectMajorKey = (majorName) => {
  const value = String(majorName).trim().toLowerCase();

  // AI
  if (
    value === "ai" ||
    value.includes("artificial intelligence") ||
    value.includes("trí tuệ nhân tạo")
  ) {
    return "ai";
  }

  // CNTT
  if (
    value === "cntt" ||
    value === "it" ||
    value.includes("công nghệ thông tin") ||
    value.includes("information technology")
  ) {
    return "cntt";
  }

  // MMT
  if (
    value === "mmt" ||
    value.includes("mạng máy tính") ||
    value.includes("computer network") ||
    value.includes("network")
  ) {
    return "mmt";
  }

  // TKĐH
  if (
    value === "tkdh" ||
    value.includes("thiết kế đồ họa") ||
    value.includes("graphic design") ||
    value.includes("design")
  ) {
    return "tkdh";
  }

  return null;
};
