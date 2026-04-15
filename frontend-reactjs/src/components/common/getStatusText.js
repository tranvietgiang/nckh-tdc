import { STATUS } from "../../utils/constants";
export const getStatusText = (status) => {
  switch (status) {
    case STATUS.PENDING:
      return "Chờ duyệt";
    case STATUS.APPROVED:
      return "Đã duyệt";
    case STATUS.REJECTED:
      return "Từ chối";
    default:
      return status;
  }
};
