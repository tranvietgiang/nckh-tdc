import { toast } from "react-toastify";

export const confirmToast = ({ message, onConfirm }) => {
  toast.dismiss();

  toast(
    ({ closeToast }) => (
      <div className="relative">
        {/* Hiệu ứng gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-30"></div>

        <div className="relative bg-white rounded-xl p-5 min-w-[320px]">
          {/* Icon với hiệu ứng pulse */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-base mb-1">
                Xác nhận thao tác
              </h3>
              <p className="text-gray-600 text-sm">{message}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={closeToast}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Hủy bỏ
            </button>

            <button
              onClick={() => {
                onConfirm();
                closeToast();
              }}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      className: "!p-0 !bg-transparent !shadow-2xl",
      position: "top-center",
    },
  );
};
