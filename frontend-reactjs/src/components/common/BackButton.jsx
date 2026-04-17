import { useBackToPage } from "../../hooks/common/useRouters";

const BackButton = ({ loading }) => {
  const goBack = useBackToPage();
  return (
    <div className="mb-6">
      <button
        onClick={() => {
          if (loading) return;
          goBack();
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Quay lại
      </button>
    </div>
  );
};

export default BackButton;
