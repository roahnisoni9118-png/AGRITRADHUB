import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I am Agri Assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [lastIntent, setLastIntent] = useState("");
  const chatEndRef=useRef(null);
  useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  const navigate = useNavigate();

  // 🌐 Detect Language
  const detectLanguage = (text) => {
    const hindiWords = ["kya", "kaise", "hai", "kharid", "bech", "daam", "fasal"];
    for (let word of hindiWords) {
      if (text.includes(word)) return "hindi";
    }
    return "english";
  };

  // 🔊 Voice Output
  const speak = (text, lang) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === "hindi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(speech);
  };

  // 🎤 Voice Input
  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = (event) => {
    const speechText = event.results[0][0].transcript;
    setInput(speechText);
  };

  recognition.start();
};

  // 🤖 Smart Reply
  const getBotReply = (msg) => {
    const text = msg.toLowerCase();
    const lang = detectLanguage(text);

    // Greeting
    if (text.includes("hi") || text.includes("hello") || text.includes("namaste")) {
      return {
        reply:
          lang === "hindi"
            ? "Namaste 🙏 kaise help kar sakta hoon?"
            : "Hello 👋 How can I help you?"
      };
    }

    // BUY
    if (text.includes("buy") || text.includes("kharid") || text.includes("market")) {
      setLastIntent("buy");
      return {
        reply:
          lang === "hindi"
            ? "Kaunsi fasal kharidni hai? 🌾"
            : "Which crop do you want to buy? 🌾"
      };
    }

    // CONTEXT BUY
    if (lastIntent === "buy") {
      if (text.includes("potato") || text.includes("aloo")) {
        return {
          reply:
            lang === "hindi"
              ? "Aloo listings dikha raha hoon 🥔"
              : "Showing potato listings 🥔",
          action: () => navigate("/posts")
        };
      }
      if (text.includes("wheat")) {
        return {
          reply:
            lang === "hindi"
              ? "Gehu listings dikha raha hoon 🌾"
              : "Showing wheat listings 🌾",
          action: () => navigate("/posts")
        };
      }
    }

    // SELL
    if (text.includes("sell") || text.includes("bech")) {
      setLastIntent("");
      return {
        reply:
          lang === "hindi"
            ? "Fasal bechne ke liye redirect kar raha hoon 🧺"
            : "Redirecting you to sell crops 🧺",
        action: () => navigate("/create")
      };
    }

    // ORDERS
    if (text.includes("order")) {
      return {
        reply:
          lang === "hindi"
            ? "Aapke orders open kar raha hoon 📦"
            : "Opening your orders 📦",
        action: () => navigate("/orders")
      };
    }

    // PRICE
    if (text.includes("price") || text.includes("daam") || text.includes("rate")) {
      return {
        reply:
          lang === "hindi"
            ? "Latest daam marketplace me hain 📊"
            : "Latest prices are in marketplace 📊",
        action: () => navigate("/posts")
      };
    }

    // WATER
    if (text.includes("paani") || text.includes("water")) {
      return {
        reply:
          lang === "hindi"
            ? "Regular paani dena zaroori hai 💧"
            : "Regular watering is important 💧"
      };
    }

    // PEST
    if (text.includes("pest") || text.includes("keeda")) {
      return {
        reply:
          lang === "hindi"
            ? "Neem oil spray use karo 🐛"
            : "Use neem oil spray 🐛"
      };
    }

    // WEATHER
    if (text.includes("weather") || text.includes("rain")) {
      return {
        reply:
          lang === "hindi"
            ? "Halka barish acchi hoti hai 🌧️"
            : "Light rain is good 🌧️"
      };
    }

    // DEFAULT
    return {
      reply:
        lang === "hindi"
          ? "Main help kar sakta hoon:\n• Fasal kharidna 🌾\n• Fasal bechna 🧺\n• Orders 📦\n• Daam check karna 📊"
          : "I can help with:\n• Buy crops 🌾\n• Sell crops 🧺\n• Orders 📦\n• Check prices 📊"
    };
  };

  // 📤 Send Message
  const sendMessage = () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const botData = getBotReply(input);

    const botMsg = { sender: "bot", text: botData.reply };
    setMessages((prev) => [...prev, botMsg]);

    const lang = detectLanguage(input);
    speak(botData.reply, lang);

    if (botData.action) {
      setTimeout(() => {
        botData.action();
      }, 1000);
    }

    setInput("");
  };

  return (
    <>
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {open && (
        <div className="chat-window">
          <div className="chat-header">Agri Assistant 🌾</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />

            <button onClick={startListening}>🎤</button>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}