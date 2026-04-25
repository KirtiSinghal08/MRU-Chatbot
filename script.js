const messages = document.getElementById("messages");

/* Enable audio after click */
document.body.addEventListener("click", () => {
  speechSynthesis.resume();
});

/* Speak function */
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-IN";
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

/* Typing effect */
function typeText(element, text) {
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 15);
    } else {
      speakText(text); // SPEAK AFTER COMPLETE
    }
  }
  typing();
}

/* Add message */
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;

  if (sender === "bot") {
    typeText(div, text);
  } else {
    div.innerText = text;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function getBotReply(msg) {
  msg = msg.toLowerCase();

  // ===== GREETINGS =====
if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {

  const greetings = [
    "Hello! 👋 Welcome to MRU AI Assistant. How can I help you today?",
    "Hey there! 😊 Ask me anything about admissions, courses or placements.",
    "Hi! I'm your MRU assistant. Need help with fees, campus or programs?",
    "Welcome to Manav Rachna University! 🎓 What would you like to know?"
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}
  // ===== ADMISSIONS =====
  if (msg.includes("admission") || msg.includes("apply") || msg.includes("eligibility")) {
    return "📌 Admissions at MRU:\n\n• Based on MRNAT / JEE / CAT / CLAT (course dependent)\n• Minimum 50% in 12th for UG courses\n• Apply online via official website\n• Direct admission also available for some courses\n\n👉 Tip: Apply early for better chances.";
  }

  // ===== COURSES ===== 
  /* Too much emojis need to improve this*/
  if (msg.includes("course") || msg.includes("branch") || msg.includes("program")) {
    return "🎓 Courses at MRU:\n\n• B.Tech (CSE, AI/ML, Cyber Security, ECE, Mechanical)\n• BBA, BCA, B.Sc\n• MBA, MCA, M.Sc\n• Law (BA LLB, LLM)\n• PhD programs\n\n👉 60+ programs across multiple streams.";
  }

  // ===== BTECH SPECIFIC =====
  if (msg.includes("btech") || msg.includes("engineering")) {
    return "💻 B.Tech at MRU:\n\nPopular branches:\n• Computer Science\n• AI & ML\n• Cyber Security\n• Mechanical\n• Electronics\n\n💰 Fees: ~2–3 Lakhs/year\n\n📌 Admission via JEE / MRNAT.";
  }

  // ===== MBA =====
  if (msg.includes("mba")) {
    return "📊 MBA at MRU:\n\n• Duration: 2 years\n• Specializations: Finance, Marketing, HR, Business Analytics\n• Fees: ~3.7 Lakhs/year\n\n📌 Admission via CAT / MAT / MRNAT.";
  }

  // ===== FEES =====
  if (msg.includes("fee") || msg.includes("cost") || msg.includes("price")) {
    return "💰 Fee Structure (Approx):\n\n• B.Tech: ₹2–3 Lakh/year\n• MBA: ₹3–4 Lakh/year\n• BBA: ₹1–1.5 Lakh/year\n\n👉 Total fees vary depending on course.";
  }

  // ===== PLACEMENTS =====
  if (msg.includes("placement") || msg.includes("job") || msg.includes("package")) {
    return "📈 Placements at MRU:\n\n• 500+ recruiters visit campus\n• 5000+ placements in recent years\n• Top companies: TCS, Infosys, Deloitte\n• Highest package up to ₹60 LPA\n\n👉 Dedicated placement cell (CRC) supports students.";
  }

  // ===== CAMPUS =====
  if (msg.includes("campus") || msg.includes("hostel") || msg.includes("facility")) {
    return "🏫 Campus Life:\n\n• 185+ acre green campus\n• Hostels available\n• Sports complex (cricket, football, squash)\n• Wi-Fi enabled campus\n• Libraries & labs\n\n👉 Modern infrastructure + student activities.";
  }

  // ===== LOCATION =====
  if (msg.includes("location") || msg.includes("where")) {
    return "📍 Location:\n\nManav Rachna University\nFaridabad, Haryana (Delhi NCR)\n\n👉 Easily accessible from Delhi.";
  }

  // ===== CONTACT =====
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
    return "📞 Contact MRU:\n\n• Phone: +91-129-4268500\n• Email: admissions@manavrachna.edu.in\n\n👉 Visit official website for latest updates.";
  }

  // ===== SCHOLARSHIP =====
  if (msg.includes("scholarship")) {
    return "🎓 Scholarships:\n\n• Merit-based scholarships\n• Based on entrance exam scores\n• Sports & special category benefits\n\n👉 Check eligibility during admission.";
  }

  // ===== PLACEMENT REALITY (SMART ANSWER) =====
  if (msg.includes("is placement good") || msg.includes("placement reality")) {
    return "📊 Placement Reality:\n\n• Good opportunities if you maintain strong skills\n• Top students get high packages\n• Average depends on branch & performance\n\n👉 Skills matter more than college.";
  }

  // ===== DEFAULT SMART AI RESPONSE =====
  return "🤖 I’m your MRU AI Assistant.\n\nYou can ask me about:\n• Admissions\n• Courses\n• Fees\n• Placements\n• Campus\n\nTry something like: 'B.Tech fees' or 'placement details'";
}
/* Send */
function handleSend(text) {
  const input = document.getElementById("user-input");
  const msg = text || input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  setTimeout(() => {
    const reply = getBotReply(msg);
    addMessage(reply, "bot");
  }, 500);
}

/* Voice input */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  document.getElementById("mic-btn").onclick = () => {
    recognition.start();
  };

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    handleSend(text);
  };
}

/* Buttons */
document.getElementById("send-btn").onclick = () => handleSend();

document.getElementById("user-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSend();
  }
});

/* Welcome */
window.onload = () => {
  addMessage("Welcome to MRU AI Assistant. How can I help you?", "bot");
};