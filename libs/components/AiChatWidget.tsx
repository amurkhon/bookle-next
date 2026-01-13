import React, { useState } from "react";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import AiChat from "./AiChat";

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Assistant Button */}
      <button className="ai-chat-float-btn" onClick={() => setOpen(!open)}>
        {open ? <CloseFullscreenIcon /> : '🤖'}
      </button>

      {/* Chat Box */}
      {open && (
        <div className="ai-chat-popup">
          <AiChat />
        </div>
      )}
    </>
  );
}