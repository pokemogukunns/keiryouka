// 教科ごとに問題を自動生成する関数
function generateMathProblem(grade) {
    if (grade <= 6) {
        // 小学校の算数
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        return { question: `${num1} + ${num2} は？`, answer: (num1 + num2).toString() };
    } else {
        // 中学・高校の数学
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        return { question: `${num1} × ${num2} は？`, answer: (num1 * num2).toString() };
    }
}

function generateJapaneseProblem(grade) {
    if (grade <= 6) {
        // 小学校の国語（ひらがな問題）
        return { question: '「こんにちは」をひらがなで書いてください。', answer: ['こんにちは', 'こんいちは'] };
    } else {
        // 中学・高校の国語（漢字問題）
        return { question: '「愛」を漢字で書いてください。', answer: ['愛'] };
    }
}

function generateScienceProblem(grade) {
    if (grade <= 6) {
        return { question: '水は液体ですか？ (はい/いいえ)', answer: ['はい'] };
    } else {
        return { question: 'H2O は何の化学式ですか？', answer: ['水', 'みず'] };
    }
}

function generateSocialProblem(grade) {
    if (grade <= 6) {
        return { question: '日本の首都はどこですか？', answer: ['東京', 'とうきょう'] };
    } else {
        return { question: 'アメリカ合衆国の首都はどこですか？', answer: ['ワシントン', 'ワシントンD.C.', 'Washington'] };
    }
}

function generateEnglishProblem(grade) {
    if (grade <= 6) {
        return { question: '「ありがとう」を英語で言うと？', answer: ['thank you', 'thanks'] };
    } else {
        return { question: '「明日」を英語で言うと？', answer: ['tomorrow'] };
    }
}

// 出題する教科
const subjects = ["math", "japanese", "science", "social", "english"];
let currentGrade = "";
let currentSubjectIndex = 0;
let correctAnswers = 0;
let questionLog = [];

document.getElementById('startQuiz').addEventListener('click', () => {
    currentGrade = document.getElementById('grade').value;
    if (currentGrade) {
        startQuiz();
    } else {
        alert("学年を選んでください");
    }
});

function startQuiz() {
    currentSubjectIndex = 0;
    correctAnswers = 0;
    questionLog = [];
    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    loadNextQuestion();
}

function loadNextQuestion() {
    if (currentSubjectIndex < subjects.length) {
        const subject = subjects[currentSubjectIndex];
        let questionData;

        switch (subject) {
            case 'math':
                questionData = generateMathProblem(currentGrade);
                break;
            case 'japanese':
                questionData = generateJapaneseProblem(currentGrade);
                break;
            case 'science':
                questionData = generateScienceProblem(currentGrade);
                break;
            case 'social':
                questionData = generateSocialProblem(currentGrade);
                break;
            case 'english':
                questionData = generateEnglishProblem(currentGrade);
                break;
        }

        questionLog.push({
            subject,
            question: questionData.question,
            correctAnswer: questionData.answer,
            userAnswer: ''
        });

        document.getElementById('question').textContent = questionData.question;
    } else {
        displayResults();
    }
}

document.getElementById('submitAnswer').addEventListener('click', () => {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const subject = subjects[currentSubjectIndex];

    let correctAnswer;
    switch (subject) {
        case 'math':
            correctAnswer = generateMathProblem(currentGrade).answer;
            break;
        case 'japanese':
            correctAnswer = generateJapaneseProblem(currentGrade).answer;
            break;
        case 'science':
            correctAnswer = generateScienceProblem(currentGrade).answer;
            break;
        case 'social':
            correctAnswer = generateSocialProblem(currentGrade).answer;
            break;
        case 'english':
            correctAnswer = generateEnglishProblem(currentGrade).answer;
            break;
    }

    questionLog[currentSubjectIndex].userAnswer = userAnswer;

    if (Array.isArray(correctAnswer)) {
        if (correctAnswer.includes(userAnswer)) {
            correctAnswers++;
        }
    } else {
        if (userAnswer === correctAnswer.toLowerCase()) {
            correctAnswers++;
        }
    }

    currentSubjectIndex++;
    document.getElementById('answerInput').value = '';
    loadNextQuestion();
});

function displayResults() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    if (correctAnswers === subjects.length) {
        window.location.href = "./pass";
    } else {
        let resultHTML = "<h2>結果</h2><ul>";
        questionLog.forEach(log => {
            resultHTML += `<li>${log.question} あなたの答え: ${log.userAnswer} 正解: ${Array.isArray(log.correctAnswer) ? log.correctAnswer.join(', ') : log.correctAnswer}</li>`;
        });
        resultHTML += "</ul><button onclick='startQuiz()'>もう一度挑戦</button>";
        document.getElementById('result').innerHTML = resultHTML;
    }
}
