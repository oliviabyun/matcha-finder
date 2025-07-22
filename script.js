const questions = [
    {
      question: "How long have you been drinking matcha?",
      answers: [
        "I’m completely new to matcha!",
        "I enjoy matcha or matcha flavored things, but haven’t really made it at home",
        "I occasionally make matcha at home",
        "Matcha is part of my daily routine :)"
      ]
    },
    {
      question: "How do you plan to drink your matcha?",
      answers: [
        "I prefer sweet matcha drinks (e.g. strawberry matcha, matcha einspanner)",
        "I prefer matcha lattes",
        "I prefer usucha/koicha (thin/thick tea with no milk)"
      ]
    },
    {
      question: "What is your preferred price range?",
      answers: [
        "Less than $0.50/g (in USD)",
        "Less than $1.00/g (in USD)",
        "No strong preference"
      ]
    },
    {
      question: "What continent are you based in?",
      answers: [
        "Asia", "Oceania", "North America",
        "South America", "Africa", "Europe"
      ]
    },
    {
      question: "What are your favorite tasting notes and properties? (Pick one for now, for simplicity)",
      answers: [
        "Creaminess🥛", "Sweetness🍬", "Bitterness💥",
        "Astringency", "Steamed vegetables🫛🥬",
        "Chocolate🍫", "Nuts🥜", "Seaweed🌊"
      ]
    },
    {
      question: "How did you hear about this little quiz?",
      answers: ["TikTok", "Instagram", "Word of Mouth", "Friend", "Other"]
    }
  ];
  
  let currentQ = 0;
  let answers = [];
  
  const questionDiv = document.getElementById("question");
  const answersDiv = document.getElementById("answers");
  const nextBtn = document.getElementById("next");
  const resultDiv = document.getElementById("result");
  
  function showQuestion() {
    const q = questions[currentQ];
    questionDiv.innerText = q.question;
    answersDiv.innerHTML = "";
    q.answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.innerText = ans;
      btn.onclick = () => {
        answers[currentQ] = ans;
        nextBtn.style.display = "inline";
      };
      answersDiv.appendChild(btn);
    });
  }
  
  nextBtn.onclick = () => {
    currentQ++;
    if (currentQ < questions.length) {
      showQuestion();
      nextBtn.style.display = "none";
    } else {
      submitToGoogleForm();
      showResults();
    }
  };
  
  function showResults() {
    document.getElementById("quiz").style.display = "none";
    resultDiv.style.display = "block";
  
    let priceLimit = answers[2].includes("$0.50") ? 0.5 :
                     answers[2].includes("$1.00") ? 1.0 : Infinity;
  
    const drinkType = answers[1];
    const continent = answers[3];
    const tastingNote = answers[4].split(" ")[0]; // crude for emoji
  
    let matches = matchaOptions.filter(opt => {
      if (!opt.shipsTo.includes(continent)) return false;
      if (opt.pricePerGram > priceLimit) return false;
  
      if (drinkType.includes("sweet")) {
        if (!opt.recommended.includes("Culinary")) return false;
      } else if (drinkType.includes("lattes")) {
        if (!opt.recommended.includes("Usucha") && !opt.recommended.includes("Koicha")) return false;
      }
  
      return true;
    });
  
    // Sort by overlap with tasting note
    matches.sort((a, b) => {
      const aMatch = a.tastingNotes.includes(tastingNote) ? 1 : 0;
      const bMatch = b.tastingNotes.includes(tastingNote) ? 1 : 0;
      return bMatch - aMatch;
    });
  
    const topPicks = matches.slice(0, 3);
  
    if (topPicks.length > 0) {
      resultDiv.innerHTML = `<h2>Your Top Matcha Picks 🍵</h2>`;
      topPicks.forEach(opt => {
        resultDiv.innerHTML += `
          <div class="result-card">
            <h3>${opt.name} — ${opt.brand}</h3>
            <p><strong>Price/g:</strong> $${opt.pricePerGram}</p>
            <p><strong>Recommended:</strong> ${opt.recommended.join(", ")}</p>
            <p><strong>Tasting Notes:</strong> ${opt.tastingNotes.join(", ")}</p>
            <p><strong>Region:</strong> ${opt.region}</p>
          </div>
        `;
      });
    } else {
      resultDiv.innerHTML = `<p>No perfect match, but try exploring top ceremonial or culinary options! 🍃</p>`;
    }
  }
  
  function submitToGoogleForm() {
    const q1 = answers[0];
    const q5 = answers[4];
  
    const formData = new FormData();
    formData.append("entry.YOUR_ENTRY_ID_FOR_Q1", q1);
    formData.append("entry.YOUR_ENTRY_ID_FOR_Q5", q5);
  
    fetch("YOUR_GOOGLE_FORM_POST_URL", {
      method: "POST",
      mode: "no-cors",
      body: formData
    });
  }
  
  showQuestion();
  