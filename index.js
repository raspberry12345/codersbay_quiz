const start = document.getElementById("start")
const inputQuestion = document.querySelector(".spielfeld")
const inputAnswer = document.querySelector(".questionContainer")

// Frage und 3 antwortmöglichkeiten
const question = document.querySelector(".question")
const answer1 = document.querySelector(".answer1")
const answer2 = document.querySelector(".answer2")
const answer3 = document.querySelector(".answer3")
const check = document.querySelector(".check")

let currentQuestionIndex = 0

let access = true
let rightAnswer = false



const questions = [
    {
        id: 1,
        richtigBeantwortet: false,
        Frage: "Was ist HTML?",
        richtigeAntwort: "Hypertext Markup Language",
        falscheAntwort: ["Hyperlink and Text Markup Language", "HighText Machine Language"]
    },
    {
        id: 2,
        richtigBeantwortet: false,
        Frage: "Was bedeutet CSS?",
        richtigeAntwort: "Cascading Style Sheets",
        falscheAntwort: ["Counter Strike: Source", "Computer Style Sheets"]
    },
    {
        id: 3,
        richtigBeantwortet: false,
        Frage: "Welche Funktion hat JavaScript?",
        richtigeAntwort: "Client-seitiges Scripting",
        falscheAntwort: ["Server-seitiges Scripting", "Datenspeicherung"]
    },
    {
        id: 4,
        richtigBeantwortet: false,
        Frage: "Was ist eine Variable?",
        richtigeAntwort: "Ein Speicherplatz für Daten",
        falscheAntwort: ["Ein Programmfehler", "Ein Hardware-Bauteil"]
    },
    {
        id: 5,
        richtigBeantwortet: false,
        Frage: "Was ist ein Array?",
        richtigeAntwort: "Eine geordnete Liste von Werten",
        falscheAntwort: ["Ein spezieller Datentyp", "Ein Schleifenkonzept"]
    },
    {
        id: 6,
        richtigBeantwortet: false,
        Frage: "Was ist eine Funktion in der Programmierung?",
        richtigeAntwort: "Ein wieder-verwendbares Code-Block",
        falscheAntwort: ["Ein grafisches Element", "Ein Hardware-Bauteil"]
    },
    {
        id: 7,
        richtigBeantwortet: false,
        Frage: "Was ist Git?",
        richtigeAntwort: "Ein Versionskontrollsystem",
        falscheAntwort: ["Ein Programmiersprachen-Interpreter", "Ein Netzwerkprotokoll"]
    },
    {
        id: 8,
        richtigBeantwortet: false,
        Frage: "Was bedeutet API?",
        richtigeAntwort: "Application Programming Interface",
        falscheAntwort: ["Automated Programming Instruction", "Advanced Programming Interface"]
    },
    {
        id: 9,
        richtigBeantwortet: false,
        Frage: "Was ist Responsive Webdesign?",
        richtigeAntwort: "Eine Gestaltung für verschiedene Bildschirmgrößen",
        falscheAntwort: ["Ein neuer Webbrowser", "Ein Sicherheitsprotokoll"]
    }
]

// questions[0].falscheAntwort[0]

// shuffleAnswers([...questions[1].falscheAntwort, questions[1].richtigeAntwort])
// function shuffleAnswers(arr){
//  console.log(arr)
// }

function showCurrentQuestion(currentQuestionIndex){
    question.innerHTML = questions[currentQuestionIndex].Frage
    answer1.innerHTML = questions[currentQuestionIndex].falscheAntwort[0]
    answer2.innerHTML = questions[currentQuestionIndex].falscheAntwort[1]
    answer3.innerHTML = questions[currentQuestionIndex].falscheAntwort[2]
}


mischeAntwort(questions)
function mischeAntwort(questions) {
    // falscheAntwort array fügt richtige Antwort hinzu
    for (let index = 0; index < questions.length; index++) {
        questions[index].falscheAntwort = [...questions[index].falscheAntwort, questions[index].richtigeAntwort]

        //mischen mit Durstenfeld shuffle algo
        for (let i = questions[index].falscheAntwort.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = questions[index].falscheAntwort[i];
            questions[index].falscheAntwort[i] = questions[index].falscheAntwort[j];
            questions[index].falscheAntwort[j] = temp;
        }

        
    }


}

start.addEventListener("click", () => {
    start.style.display = "none"
    inputAnswer.style.display = "block"
    inputQuestion.style.display = "flex"
    showCurrentQuestion(currentQuestionIndex)
    inputQuestion.firstElementChild.style.background = "white";
})

// inputQuestion.addEventListener("click", function getPlayerInput(event) {
//     if (event.target.tagName == 'DIV' || event.target.tagName == 'H3') {
        
//         if (questions[event.target.className].richtigBeantwortet) {
            
//         }
        
//     }
// })

inputAnswer.addEventListener("click", (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.id != "styleCheck") {
            // antworten
            if (access) {
                event.target.style.background = "white"
                access = false
                if (questions[currentQuestionIndex].richtigeAntwort == questions[currentQuestionIndex].falscheAntwort[event.target.id]) {
                    //richtige Antwort
                    questions[currentQuestionIndex].richtigBeantwortet = true
                    setTimeout(()=>{
                        event.target.style.background = "rgb(155, 149, 149)"
                    }, 1500)
                }
                else{
                    //falsche Antwort
                    setTimeout(()=>{
                        event.target.style.background = "rgb(155, 149, 149)"
                    }, 1500)
                }
            }
            
        }else{
            // check method
            access = true
            if (questions[currentQuestionIndex].richtigBeantwortet) {
                inputQuestion.children[currentQuestionIndex].style.background = "green"
                
                currentQuestionIndex++
                if (currentQuestionIndex < questions.length) {
                    showCurrentQuestion(currentQuestionIndex)
                    inputQuestion.children[currentQuestionIndex].style.background = "white"
                }else{
                    start.innerText = "Du hast das Spiel erfolgreich beendet"
                    start.style.display = "block"
                    inputQuestion.style.display = "none"
                    inputAnswer.style.display = "none"
                    setTimeout(()=>{
                        location.reload()
                    }, 2500)
                }
                
                
            }else{
                inputQuestion.children[currentQuestionIndex].style.background = "red"
            }
            
            
        }
    }
})