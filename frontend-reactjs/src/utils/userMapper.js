export const mapCurrentStudent = (user, majorName) => {
  return {
    id: user?.user_id ?? "",
    name: user?.name ?? "",
    email: user?.email ?? "",
    major: majorName ?? "",
    avatar: user?.avatar ?? null,
    class: user?.class ?? null,
  };
};
