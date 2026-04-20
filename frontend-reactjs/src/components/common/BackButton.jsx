import { useBackToPage } from "../../hooks/common/useRouters";

const BackButton = ({ loading, label = "Quay lại" }) => {
  const goBack = useBackToPage();

  return (
    <div className="mb-6">
      <button
        onClick={() => {
          if (loading) return;
          goBack();
        }}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 font-medium text-sm px-4 py-2 rounded-full transition-all hover:bg-blue-100 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {label}
      </button>
    </div>
  );
};

export default BackButton;
