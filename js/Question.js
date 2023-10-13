import { Quiz } from "./Quiz.js";
import { questions, quiz, questionsContainer } from "./main.js";



export class Question {

    constructor(index) {
        this.index = index
        this.category = questions[index].category;
        this.questionTitle = questions[index].question;
        this.correct_answer = questions[index].correct_answer;
        this.worng_answers = questions[index].incorrect_answers;
        // lazm hna a7ot el this 2bl el getChoicesReady 3lshan y3rf anha bta3t el Question Object
        this.allAnswers = this.getChoicesReady();
        this.answered = false;
    }

    getChoicesReady() {
        return this.worng_answers.concat(this.correct_answer).sort()
    }

    displayQuestion() {
        let questionHTML =
            ` 
            <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category">${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length
            } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center text-dark">${this.questionTitle}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.allAnswers.map((answer) => `<li>${answer}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score
            } </h2>        
    </div>
            `
        questionsContainer.innerHTML = questionHTML;

        const allChoices = document.querySelectorAll('.question ul li');

        for (let i = 0; i < allChoices.length; i++) {
            allChoices[i].addEventListener('click', (eventInfo) => {
                this.checkAnswer(eventInfo)
            })
        }
    }

    checkAnswer(eventInfo) {
        // console.log(eventInfo.target.innerHTML.toLowerCase());

        if (!this.answered) {
            this.answered = true;
            if (eventInfo.target.innerHTML.toLowerCase() == this.correct_answer.toLowerCase()) {

                eventInfo.target.classList.add('correct', 'animate__animated', 'animate__flipInY');
                quiz.score += 1;
            }
            else {
                eventInfo.target.classList.add('wrong', 'animate__animated', 'animate__shakeX')
            }

            this.animateQuestion(eventInfo.target, 500);

        }


    }

    animateQuestion(element, duration) {
        setTimeout(() => {

            element.closest('.question').classList.replace("animate__bounceIn", "animate__backOutLeft");
            setTimeout(() => {
                this.nextQuestion()
            }, duration)

        }, duration)


    }
    nextQuestion() {
        this.index += 1;
        if (this.index > questions.length - 1) {

            questionsContainer.innerHTML = quiz.endQuiz();
            const tryAgain = document.querySelector(".again");
            tryAgain.addEventListener("click", function () {

                location.reload()
                // questionsContainer
                //     .querySelector(".question")
                //     .classList.replace("d-flex", "d-none");
                // categoryInput.value = "";
                // difficultyOptionsInput.value = "easy";
                // questionsNumberInput.value = "";
                // quizOptionForm.classList.replace("d-none", "d-flex");
            });
            return

        }
        else {
            const newQuestion = new Question(this.index);
            newQuestion.displayQuestion();
        }
    }

}

