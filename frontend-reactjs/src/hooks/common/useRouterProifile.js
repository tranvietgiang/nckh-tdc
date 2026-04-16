import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLE } from "../../utils/constants";

export const useRouterProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const goToProfile = () => {
    if (!user) return;

    let url = "/profile";

    if (user.role === ROLE.TEACHER) {
      url = "/nckh-profile";
    } else if (user.role === ROLE.STUDENT) {
      url = "/nckh-profile";
    }

    navigate(url);
  };

  return { goToProfile };
};
