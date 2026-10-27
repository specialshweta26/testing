"use client";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <main>
      <header><div className="logo">c</div><div><h1>Chitchat</h1><p className="subtitle">Your AI conversation space</p></div></header>
      <section className="chat" aria-live="polite">
        {messages.length === 0 ? <div className="welcome"><h2>What’s on your mind?</h2><p>Ask a question, brainstorm an idea, or just say hello.</p></div> : messages.map((message) => (
          <article className={`message ${message.role}`} key={message.id}>{message.content}</article>
        ))}
      </section>
      <div>
        <form className="composer" onSubmit={handleSubmit}>
          <textarea value={input} onChange={handleInputChange} placeholder="Message Chitchat…" aria-label="Message Chitchat" rows={1} />
          <button type="submit" disabled={isLoading || !input.trim()}>{isLoading ? "…" : "Send"}</button>
        </form>
        <p className="hint">Chitchat can make mistakes. Check important information.</p>
      </div>
    </main>
  );
}
