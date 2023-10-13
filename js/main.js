import { Question } from "./Question.js";
import { Quiz } from "./Quiz.js";






const categoryMenu = document.getElementById('categoryMenu')
const difficultyOptions = document.getElementById('difficultyOptions')
const questionsNumber = document.getElementById('questionsNumber')

const startQuizBtn = document.getElementById('startQuiz');

const quizOptions = document.getElementById('quizOptions')
export const questionsContainer = document.querySelector('.questions-container')





export let questions;
export let quiz;
startQuizBtn.addEventListener('click', async function () {

    // Hna Bb3t El Quiz Hetkon Mn eh?
    quiz = new Quiz(categoryMenu.value, `${difficultyOptions.value}`, questionsNumber.value);
    // 3n trek el 7agat el d5lt fe el Quiz Hatly El Quistions Bta3tha kolha
    questions = await quiz.getQuestions();
    // a3mle awl quistion mn el Quistions ely ana gbtha f el satr elly 2bl dh --tb3n el 0 dh how index 0 3lshan ageb awl so2al f el Questions ely ana gbtha
    let question1 = new Question(0);
    // a5fy el form bta3t el Quiz
    document.getElementById('quizOptions').classList.replace('d-flex','d-none');
    // a3rdly awl quistion 
    question1.displayQuestion();


})






