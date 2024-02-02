const displayElement = document.getElementById("textDisplay");
const inputElement = document.getElementById("textInput");
const timeNameElement = document.getElementById("timeName");
const timeElement = document.getElementById("time");
const cwNameElement = document.getElementById("cwName");
const cwElement = document.getElementById("cw");
const restartButtonElement = document.getElementById("restartBtn");
const thirtyButton = document.getElementById("thirty");
const sixtyButton = document.getElementById("sixty");
const beginnerButton = document.getElementById("beg");
const proButton = document.getElementById("pro");
let currentWordNo = 1;
let wordsSubmittedCount = 0;
let wordsCorrectCount = 0;
let countdownTimer = 30;
let timerFlag = 0;
let timerInterval;
let difficultyLevel = 1;

displayTest(difficultyLevel);

inputElement.addEventListener('input', handleInput);
thirtyButton.addEventListener("click", () => setTimer(30, 2, thirtyButton, sixtyButton));
sixtyButton.addEventListener("click", () => setTimer(60, 1, sixtyButton, thirtyButton));
beginnerButton.addEventListener("click", () => setDifficulty(1, beginnerButton, proButton));
proButton.addEventListener("click", () => setDifficulty(2, proButton, beginnerButton));
restartButtonElement.addEventListener("click", restartTest);

function handleInput(event) {
  if (timerFlag === 0) {
    timerFlag = 1;
    startTimer();
  }

  const enteredChar = event.data;
  /\s/g.test(enteredChar) ? checkWord() : currentWord();
}

function setTimer(newTimer, newFactor, selectedButton, unselectedButton) {
  countdownTimer = newTimer;
  timerInterval = newFactor;
  toggleButtonColor(selectedButton, unselectedButton);
  timeElement.innerText = countdownTimer;
}

function setDifficulty(newDifficulty, selectedButton, unselectedButton) {
  difficultyLevel = newDifficulty;
  displayTest(difficultyLevel);
  toggleButtonColor(selectedButton, unselectedButton);
}

function toggleButtonColor(selectedButton, unselectedButton) {
  selectedButton.classList.add('green');
  unselectedButton.classList.remove('green');
}

function restartTest() {
  wordsSubmittedCount = 0;
  wordsCorrectCount = 0;
  timerFlag = 0;

  timeElement.classList.remove("current");
  cwElement.classList.remove("current");
  timeElement.innerText = countdownTimer;
  timeNameElement.innerText = "Time";
  cwElement.innerText = wordsCorrectCount;
  cwNameElement.innerText = "CW";
  inputElement.disabled = false;
  inputElement.value = '';
  inputElement.focus();

  displayTest(difficultyLevel);
  clearInterval(timerInterval);
  showButtons();
}

function startTimer() {
  hideButtons();
  timerInterval = setInterval(() => {
    timeElement.innerText--;
    if (timeElement.innerText == "-1") {
      timeIsOver();
      clearInterval(timerInterval);
    }
  }, 1000);
}

function timeIsOver() {
  inputElement.disabled = true;
  restartButtonElement.focus();
  displayScore();
}

function hideButtons() {
  [thirtyButton, sixtyButton, beginnerButton, proButton].forEach(button => button.style.visibility = 'hidden');
}

function showButtons() {
  [thirtyButton, sixtyButton, beginnerButton, proButton].forEach(button => button.style.visibility = 'visible');
}

function displayScore() {
  const accuracyPercentage = wordsSubmittedCount !== 0 ? Math.floor((wordsCorrectCount / wordsSubmittedCount) * 100) : 0;

  timeElement.classList.add("current");
  cwElement.classList.add("current");

  timeElement.innerText = accuracyPercentage + "%";
  timeNameElement.innerText = "PA";

  cwElement.innerText = (timerInterval * wordsCorrectCount) * 3;
  cwNameElement.innerText = "WPM";
}

function currentWord() {
  const enteredWord = inputElement.value;
  const currentWordID = "word " + currentWordNo;
  const currentWordSpan = document.getElementById(currentWordID);
  const currentSpanWord = currentWordSpan.innerText;

  if (enteredWord == currentSpanWord.substring(0, enteredWord.length)) {
    colorWordSpan(currentWordID, 2);
  } else {
    colorWordSpan(currentWordID, 3);
  }
}

function checkWord() {
  const enteredWord = inputElement.value;
  inputElement.value = '';

  const wordID = "word " + currentWordNo;
  const checkWordSpan = document.getElementById(wordID);
  currentWordNo++;
  wordsSubmittedCount++;

  if (checkWordSpan.innerText === enteredWord) {
    colorWordSpan(wordID, 1);
    wordsCorrectCount++;
    cwElement.innerText = wordsCorrectCount;
  } else {
    colorWordSpan(wordID, 3);
  }

  if (currentWordNo > 40) {
    displayTest(difficultyLevel);
  } else {
    const nextWordID = "word " + currentWordNo;
    colorWordSpan(nextWordID, 2);
  }
}

function colorWordSpan(id, color) {
  const spanElement = document.getElementById(id);
  if (color === 1) {
    spanElement.classList.remove('wrong', 'current');
    spanElement.classList.add('correct');
  } else if (color === 2) {
    spanElement.classList.remove('correct', 'wrong');
    spanElement.classList.add('current');
  } else {
    spanElement.classList.remove('correct', 'current');
    spanElement.classList.add('wrong');
  }
}

function displayTest(diff) {
  currentWordNo = 1;
  displayElement.innerHTML = '';

  const newTest = randomWords(diff);
  newTest.forEach((word, i) => {
    const wordSpanElement = document.createElement('span');
    wordSpanElement.innerText = word;
    wordSpanElement.setAttribute("id", "word " + (i + 1));
    displayElement.appendChild(wordSpanElement);
  });

  const nextWordID = "word " + currentWordNo;
  colorWordSpan(nextWordID, 2);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomWords(diff) {
  var topWords = [
    "abstraction", "accessibility", "accumulator", "aggregation", "agile", "algorithm", "allocation", "ambiguity", "analytics", "android", 
    "animation", "annotation", "antivirus", "API", "applet", "architecture", "argument", "arithmetic", "artificialintelligence", "assembly", 
    "asynchronous", "authentication", "authorization", "autoencoder", "backend", "bandwidth", "basecase", "bigdata", "binder", "biometrics", 
    "bipartitegraph", "bitwise", "blackbox", "blockchain", "boolean", "botnet", "bottomup", "breadcrumb", "buffer", "bus", "bytecode", 
    "cache", "cascading", "chaosengineering", "checkpointing", "ciphertext", "circuit", "class", "cloudbursting", "cohesion", "compiler", 
    "complexity", "compression", "concurrency", "configuration", "consistency", "container", "contextual", "cryptography", "csharp", 
    "cybersecurity", "cyphertext", "dataflow", "deadlock", "debugging", "decryption", "deepdive", "dependency", "designpattern", "destructuring", 
    "deterministic", "devops", "distributed", "divergence", "docker", "domain", "doublespending", "downtime", "dynamic", "efficiency", 
    "elasticity", "encryption", "endian", "endpoint", "entropy", "epsilon", "eventdriven", "exabyte", "exploit", "factorial", "fallback", 
    "faulttolerance", "federated", "fiber", "firewall", "firmware", "forkjoin", "front-end", "frontend", "functional", "garbagecollection", 
    "gateway", "gigabyte", "granularity", "graphtheory", "gridcomputing", "groupthink", "hashfunction", "heuristic", "homomorphic", 
    "horizontal", "hypothesis", "immutable", "incremental", "indirection", "inference", "informationtheory", "inheritance", "initialization", 
    "innovation", "input", "interface", "interpolation", "iterator", "json", "kernel", "keypair", "latency", "leakage", "loadbalancing", 
    "localization", "logical", "logistics", "machinelearning", "malware", "manifest", "mapreduce", "metadata", "middleware", "migration", 
    "middleware", "minification", "mobprogramming", "mocking", "modularity", "multithreading", "mutation", "nanotechnology", 
    "naturalanguage", "network", "neuralnetwork", "nonvolatile", "normalization", "nullpointer", "obfuscation", "offline", 
    "optimization", "overfitting", "overhead", "pagemap", "parallel", "paradigm", "parameterization", "parser", "passive", 
    "pathfinding", "patternmatching", "penetration", "performance", "permutation", "persistence", "phishing", "plaintext", "pointer", 
    "polymorphism", "postmortem", "preprocessing", "proactive", "protocol", "prototype", "pseudocode", "quantum", "query", "racecondition", 
    "rack", "radix", "reactive", "reboot", "recursion", "refactoring", "reflection", "regression", "rehashing", "reification", 
    "reliability", "replication", "resolution", "responsive", "restore", "rollback", "routing", "sandboxing", "scalability", "schema", 
    "scripting", "scrum", "search", "semantic", "serialization", "serverless", "singleton", "smartcontract", "snapshot", "softskills", 
    "software", "sourcemap", "spam", "specification", "speculative", "spider", "stateless", "statistical", "steganography", "storage", 
    "streaming", "subroutine", "synchronization", "syntactic", "system", "taxonomy", "testing", "throttle", "topology", "transaction", 
    "transformation", "transpiler", "troubleshooting", "turing", "unzip", "usability", "vaccine", "validation", "vector", "verification", 
    "versioncontrol", "virtualization", "visualization", "volatile", "vulnerability", "waterfall", "webassembly", "webhook", "whitelist", 
    "workflow", "xss", "yaml", "zero-day", "zip"];

    var basicWords = [
      "array", "class", "stack", "queue", "float", "input", "const", "while", "break", "print",
      "false", "true", "null", "void", "char", "byte", "data", "else", "event", "final",
      "goto", "short", "throw", "super", "table", "throws", "catch", "close", "clone", "check",
      "force", "group", "index", "found", "frame", "parse", "pivot", "round", "scope",
      "slice", "solid", "tried", "truly", "arise", "audio", "basic", "boost", "chief", "count",
      "crawl", "demon", "drift", "enjoy", "field", "fiber", "front", "graph", "haste", "intro",
      "jumbo", "known", "label", "limit", "match", "noise", "option", "panel", "pitch", "quiet",
      "raise", "reset", "setup", "shine", "since", "sweep", "trace", "track", "unity", "valid",
      "vivid", "voice", "where", "yield", "zero", "allow", "begin", "color", "debug", "exact",
      "fetch", "gamma", "house", "mango", "novel", "occur", "pixel", "query", "scale", "zoom",
      "amaze", "bison", "blend", "cloud", "cycle", "enter", "fault", "grand",
    ];
    

  const wordArray = diff === 1 ? basicWords : topWords;
  shuffle(wordArray);

  const selectedWords = wordArray.slice(0, 40).map(word => word + " ");
  return selectedWords;
}
