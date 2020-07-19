/*
let mathProblems = [];

for (let i = 0; i < 9; i++){
    mathProblems.push(getRandomNumber('*'));
}
*/
let startOver = false;
const maxProblems = 10;
let answer;
let problem;
let operands = [];

/**
 * Function to get a random number for math problems
 * 
 * @param max max number you would like to have non-inclusive
 * @return returns a random number between 0 and the max number
 */
function getRandomNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
}


/**
 * Function to get a math number with two random operands
 * 
 * @param operator the operator for the math problem
 * @return returns a string representation of the math problem to be solved
 */
function getRandomMathProblem(operator){
    let leftOperand = getRandomNumber(10);
    let rightOperand = getRandomNumber(10);
    let remainder = leftOperand % rightOperand;
    while(leftOperand == 0 || rightOperand == 0)
    {
        leftOperand = getRandomNumber(10);
        rightOperand = getRandomNumber(10);
    }
    if(operator === '/')
    {
        while(remainder != 0 || leftOperand < rightOperand)
        {
            leftOperand = getRandomNumber(10);
            remainder = leftOperand % rightOperand;
        }
    }

    let mathProblemString = `${leftOperand} ${operator} ${rightOperand}`
    
    return mathProblemString
}

/**
 * 
 */
function shuffleArray(array){
    return array.sort(function(a, b) {return Math.random() - 0.5})
}


/**
 * Function to display math problem to the screen.
 * 
 */
function displayMathProblem(arrayOfOperands){
    shuffleArray(arrayOfOperands);
    const container = document.querySelector('.expression');
    let mathProblem = getRandomMathProblem(arrayOfOperands[0]);
    container.innerText = mathProblem;
    return mathProblem;
}

/**
 * Function to display the answers to the screen
 * 
 */
function displayProblemAnswers(mathProblem){
    const operator = mathProblem[2];
    let correctAnswer;
    const leftOperand = parseInt(mathProblem[0]);
    const rightOperand = parseInt(mathProblem[4]);
    if(operator === '+')
    {
     correctAnswer = leftOperand + rightOperand;
    }
    else if(operator === '-')
    {
        correctAnswer = leftOperand - rightOperand;
    }
    else if(operator === '*')
    {
        correctAnswer = leftOperand * rightOperand;
    }
    else if(operator === '/')
    {
        correctAnswer = leftOperand / rightOperand;
    }

    let answerList = [correctAnswer];
    while(answerList.length < 4){
        let newAnswer = getRandomNumber(10) * getRandomNumber(10);
        if (!answerList.includes(newAnswer)){
        answerList.push(newAnswer);
        }        
    }
    shuffleArray(answerList);

    const sectionContainer = document.getElementById('answers');
    let answersListEls = sectionContainer.querySelectorAll('ul li');
    for (let i = 0; i < answersListEls.length; i++){
        answersListEls[i].innerText = answerList[i];
    }
    return correctAnswer;
}

function setScore(isStartOver){
    const score = document.querySelector('.currentScore');
    let newScore = 0
    if (!isStartOver){
        newScore = parseInt(score.innerText) + 1;        
    }
    score.innerText = newScore;    
}


function setProblemNumber(isStartOver = true){
    let currentProblemNumber = document.querySelector('.currentProblem');
    let newProblemNumber = 1;
    if(!isStartOver){
        newProblemNumber = parseInt(currentProblemNumber.innerText) + 1;
    }
    currentProblemNumber.innerText = newProblemNumber;
}

function createStartPage(textBox, button){
    let needToHide = document.querySelector('section p');
    needToHide.classList.add('hidden');
    textBox.classList.remove('hidden');
    const container = document.querySelector('.expression');
    textBox.innerText = 'Please choose the math operations you would like to practice and click start';
    container.classList.add('hidden');
    button.innerText = 'Start';
    let operandListEls = document.querySelectorAll('section ul li');
    operandListEls[0].innerText = '+';
    operandListEls[1].innerText = '-';
    operandListEls[2].innerText = '*';
    operandListEls[3].innerText = '/';
}

function restartStartOver(operands, textDisplay, problemAnswerList, needToHide){
    startOver = true;
    problemAnswerList.forEach((item) =>{
        item.style.backgroundColor = '#eeeeee';
    });
    problem = displayMathProblem(operands);
    answer = displayProblemAnswers(problem);
    textDisplay.innerText = 'Please select an answer below the problem by clicking on the box';
    needToHide.classList.remove('hidden');
}



document.addEventListener('DOMContentLoaded', ()=>{
    const startOverButton = document.getElementById('btnStartOver');    
    const displayItems = document.querySelectorAll('.show-hide');
    const textDisplay = document.querySelector('header p');
    createStartPage(textDisplay, startOverButton);
    const problemAnswerList = document.querySelectorAll('ul li');
    const currentProblemIterator = document.querySelector('.currentProblem');
    let needToHide = document.querySelector('section p');
    let answersContainer = document.getElementById('answers');

    if(!startOver){
        problemAnswerList.forEach((item) =>{
            item.addEventListener('click', (event) =>{
                let newOperand = item.innerText;
                if(newOperand === '+' || newOperand === '-' || newOperand === '*' || newOperand === '/')
                {
                    item.style.backgroundColor = 'cornflowerblue';
                    operands.push(newOperand);
                }
            })

        });
    }

    startOverButton.addEventListener('click', (event) =>{
        if(!startOver && operands != 0)
        {
        setScore(true);
        setProblemNumber();
        
        displayItems.forEach((item) => {
            item.classList.remove('hidden');
        });

        problem = displayMathProblem(operands);
        answer = displayProblemAnswers(problem);
        startOverButton.innerText = 'Start Over';
        restartStartOver(operands, textDisplay, problemAnswerList, needToHide);
    }
    else
    {
        startOver = false;
        createStartPage(textDisplay, startOverButton);
        operands = [];
        needToHide.classList.add('hidden');
        answersContainer.classList.remove('hidden');
        problemAnswerList.forEach((item) => {
            item.classList.remove('hidden');
        });
    }

    });

    problemAnswerList.forEach((item) =>{
        item.addEventListener('click', (event) =>{
            if(startOver)
            {
                console.log(item.innerText, answer)
                if(item.innerText == answer){
                    setScore(false);
                }
                if(currentProblemIterator.innerText != maxProblems){
                problem = displayMathProblem(operands);
                answer = displayProblemAnswers(problem);
                setProblemNumber(false);
                }
                else{
                    displayItems.forEach((item) => {
                        item.classList.add('hidden');
                    })
                }  
            }          
        });
    });
})