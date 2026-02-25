// ================= QUESTION BANK =================

const allQuestions = {

easy: [
{question:"HTML stands for?", options:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language","Hyperlinks Text Mark"], correct:"Hyper Text Markup Language"},
{question:"CSS stands for?", options:["Cascading Style Sheets","Computer Style Sheets","Creative Style","Colorful Style"], correct:"Cascading Style Sheets"},
{question:"Which tag creates link?", options:["<a>","<link>","<href>","<url>"], correct:"<a>"},
{question:"JavaScript comment symbol?", options:["//","##","<!-- -->","**"], correct:"//"},
{question:"Which is JS variable keyword?", options:["let","int","define","varr"], correct:"let"},
{question:"Which company created Java?", options:["Sun Microsystems","Google","Microsoft","IBM"], correct:"Sun Microsystems"},
{question:"Which tag for image?", options:["<img>","<image>","<pic>","<src>"], correct:"<img>"},
{question:"Which CSS property changes text color?", options:["color","font-color","text-color","background"], correct:"color"},
{question:"Which symbol ends JS statement?", options:[";",";",":","."], correct:";"},
{question:"Which is frontend language?", options:["HTML","Python","Java","C++"], correct:"HTML"}
],

medium: [
{question:"Which operator checks value and type?", options:["===","==","=","!="], correct:"==="},
{question:"Which SQL retrieves data?", options:["SELECT","GET","OPEN","FETCH"], correct:"SELECT"},
{question:"HTTP 404 means?", options:["Not Found","Success","Error","Redirect"], correct:"Not Found"},
{question:"Which loop runs at least once?", options:["do-while","for","while","foreach"], correct:"do-while"},
{question:"React developed by?", options:["Facebook","Google","Amazon","Microsoft"], correct:"Facebook"},
{question:"Which CSS for flex layout?", options:["display:flex","position:flex","float:flex","align:flex"], correct:"display:flex"},
{question:"JSON convert to object?", options:["JSON.parse()","JSON.stringify()","JSON.convert()","JSON.object()"], correct:"JSON.parse()"},
{question:"Which method selects ID?", options:["getElementById()","getElementByClass()","queryAll()","selectId()"], correct:"getElementById()"},
{question:"Which status is success?", options:["200","404","500","301"], correct:"200"},
{question:"Which language for Android?", options:["Kotlin","Swift","Ruby","PHP"], correct:"Kotlin"}
],

hard: [
{question:"Binary Search complexity?", options:["O(log n)","O(n)","O(n2)","O(1)"], correct:"O(log n)"},
{question:"FIFO structure?", options:["Queue","Stack","Tree","Graph"], correct:"Queue"},
{question:"Shortest path algorithm?", options:["Dijkstra","Bubble","Linear","Binary"], correct:"Dijkstra"},
{question:"React state hook?", options:["useState","useEffect","useRef","useMemo"], correct:"useState"},
{question:"NoSQL database?", options:["MongoDB","MySQL","Oracle","PostgreSQL"], correct:"MongoDB"},
{question:"Secure HTTP?", options:["HTTPS","FTP","TCP","SMTP"], correct:"HTTPS"},
{question:"Which normal form removes transitive dependency?", options:["3NF","1NF","2NF","BCNF"], correct:"3NF"},
{question:"Traversal using recursion?", options:["DFS","BFS","Linear","Binary"], correct:"DFS"},
{question:"Which data structure LIFO?", options:["Stack","Queue","Tree","Graph"], correct:"Stack"},
{question:"Time complexity of Merge Sort?", options:["O(n log n)","O(n)","O(n2)","O(log n)"], correct:"O(n log n)"}
]

};

// ================= VARIABLES =================

let questions = [];
let currentIndex = 0;
let score = 0;
let levelChosen = "";
let timer;
let timeLeft = 15;
let negativeMark = 0.25;

// ================= SHUFFLE =================

function shuffle(array){
  return array.sort(()=>Math.random()-0.5);
}

// ================= START QUIZ =================

function startQuiz(level){
  levelChosen = level;
  questions = shuffle(allQuestions[level]);

  document.getElementById("difficulty-container").style.display="none";
  document.querySelector(".quiz-container").style.display="block";

  currentIndex = 0;
  score = 0;
  document.getElementById("score").innerText = score;

  loadQuestion();
}

// ================= LOAD QUESTION =================

function loadQuestion(){
  const q = questions[currentIndex];
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML="";

  shuffle(q.options).forEach(option=>{
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = ()=>checkAnswer(option);
    answersDiv.appendChild(btn);
  });

  startTimer();
}

// ================= CHECK ANSWER =================

function checkAnswer(selected){
  clearInterval(timer);

  if(selected === questions[currentIndex].correct){
    score++;
  } else {
    score -= negativeMark;
  }

  document.getElementById("score").innerText = score.toFixed(2);
  disableButtons();
}

// ================= TIMER =================

function startTimer(){
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;

  clearInterval(timer);
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if(timeLeft <= 0){
      clearInterval(timer);
      score -= negativeMark;
      document.getElementById("score").innerText = score.toFixed(2);
      disableButtons();
    }
  },1000);
}

// ================= DISABLE =================

function disableButtons(){
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach(btn=>btn.disabled=true);
}

// ================= NEXT =================

document.getElementById("nextBtn").onclick = function(){
  currentIndex++;

  if(currentIndex < questions.length){
    loadQuestion();
  } else {
    showResult();
  }
};

// ================= RESULT =================

function showResult(){
  document.querySelector(".quiz-container").style.display="none";
  document.getElementById("result-container").style.display="block";

  document.getElementById("final-score").innerText =
    "Score: " + score.toFixed(2) + " / " + questions.length;

  generateCertificate();
}

// ================= CERTIFICATE =================

function generateCertificate(){
  const name = prompt("Enter Your Name for Certificate:");

  document.getElementById("result-container").innerHTML = `
    <h2>🎓 Quiz Completion Certificate</h2>
    <h3>This Certificate is Awarded To</h3>
    <h1>${name}</h1>
    <p>For successfully completing ${levelChosen.toUpperCase()} Level Quiz</p>
    <h2>Score: ${score.toFixed(2)} / ${questions.length}</h2>
    <br>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}