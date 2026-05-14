import { useState } from "react";
import { aiApi } from "../../api";
export default function useChatBoxAi() {
  const [loadingAi, setLoadingAi] = useState(false);
  const [replyAi, setReplyAi] = useState("");

  const sendMessage = async (message) => {
    setLoadingAi(true);
    try {
      const res = await aiApi.sendMessage({ message });
      setReplyAi(res.reply);
      return res;
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn đến AI:", err);
      setReplyAi("Lỗi server");
      return null;
    } finally {
      setLoadingAi(false);
    }
  };

  return {
    sendMessage,
    replyAi,
    loadingAi,
  };
}
