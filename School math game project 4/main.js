const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressBar = document.querySelector(".progress")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")
const nextButton = document.querySelector(".next-button")

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateProblem() {
  state.currentProblem = generateProblem()

  if(state.score === 2){
    state.currentProblem = generateProblem2()
  }
  if(state.score>3 && state.score<8){
    state.currentProblem = generateProblem3()
  }
  if(state.score>7 && state.score<9){
    state.currentProblem = generateProblem4()
  }
  if(state.score ==10){
    state.currentProblem = generateProblem5()
  }

  problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem()

function generateNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

function generateProblem2() {
  return {
    numberOne: generateNumber(15),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

function generateProblem3() {
  return {
    numberOne: generateNumber(20),
    numberTwo: generateNumber(15),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

function generateProblem4() {
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(100),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

function generateProblem5() {
  return {
    numberOne: generateNumber(1000),
    numberTwo: generateNumber(1000),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = state.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) === correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add("animate-wrong")
    setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
  }
  checkLogic()
}

function checkLogic() {
  // if you won
  if (state.score ===10) {

    document.body.classList.add("overlay-is-open")

    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    endMessage.textContent = "Congrats! You won."
    
    setTimeout(() => resetButton.focus(), 331)
    setTimeout(() => nextButton.focus(), 331)

    
  }

  // if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry! You lost."
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus(), 331)
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}