import { STATUS } from "../../utils/constants";
export const getStatusColor = (status) => {
  switch (status) {
    case STATUS.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case STATUS.APPROVED:
      return "bg-green-100 text-green-800";
    case STATUS.REJECTED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
