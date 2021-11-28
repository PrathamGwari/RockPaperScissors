const paperUrl = "https://i.im.ge/2021/10/08/TnS2sy.png";
const rockUrl = "https://i.im.ge/2021/10/08/TnSO4J.png";
const scissorUrl = "https://i.im.ge/2021/10/08/TnSFYa.png";

// enable rock paper scissor button when play btn is clicked
const gamePanel = document.querySelector('#gameBtnPanel');
const playBtn = document.querySelector('#playBtn');
const playBtnPanel = document.querySelector('#playBtnPanel');

const userPanel = document.querySelector('#leftPanel');
const cpuPanel = document.querySelector('#rightPanel');

playBtn.addEventListener("click", function (e) {
    gamePanel.classList.remove('d-none');
    playBtnPanel.classList.add('d-none');
});

var userChoice = 0, cpuChoice = 0;

// 0 -> rock , 1 -> paper , 2 -> scissor

const rockBtn = document.querySelector('#rockBtn');
const paperBtn = document.querySelector('#paperBtn');
const scissorBtn = document.querySelector('#scissorBtn');

const userChoiceImage = document.querySelector('#userMove');
const cpuChoiceImage = document.querySelector('#cpuMove');

const bestOfCounter = document.querySelector('#bestOfCounter');
var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const userScoreContainer = document.querySelectorAll('.score')[0];
const cpuScoreContainer = document.querySelectorAll('.score')[1];
var bestOf = 5;

var userScore = 0;
var cpuScore = 0;
var dict = {
    0: rockUrl,
    1: paperUrl,
    2: scissorUrl
}

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    wrapper.addEventListener('click', function (e) {
        location.reload();
    })
    alertPlaceholder.append(wrapper)
}

function changeImage(userCh, cpuCh) {
    userChoiceImage.src = dict[userCh];
    cpuChoiceImage.src = dict[cpuCh];
}

function UpdateScores() {
    userScoreContainer.innerText = userScore;
    cpuScoreContainer.innerText = cpuScore;
}

function checkWin(userch, cpuCh) {
    var isTie = false;
    switch (userch) {
        case 0:
            cpuCh == 0 ? isTie = true : (cpuCh == 1 ? cpuScore++ : (cpuCh == 2 ? userScore++ : alert("something wrong")));
            break;
        case 1:
            cpuCh == 0 ? userScore++ : (cpuCh == 1 ? isTie = true : (cpuCh == 2 ? cpuScore++ : alert("something wrong")));
            break;
        case 2:
            cpuCh == 0 ? cpuScore++ : (cpuCh == 1 ? userScore++ : (cpuCh == 2 ? isTie = true : alert("something wrong")));
            break;
        default: break;
    }
    UpdateScores();
    if (!isTie) {
        if (userScore == bestOf) {
            cpuPanel.style.backgroundColor = 'rgb(' + 248 + ',' + 88 + ',' + 88 + ')';
            userPanel.style.backgroundColor = 'rgb(' + 30 + ',' + 201 + ',' + 30 + ')';
            alert("USER won! 🎉🎉🎉🎉🎉🎉🎉🎉🎉", "success");
            var audio = new Audio('SoundEffects/success.mp3');
            audio.play();
        }
        else if (cpuScore == bestOf) {
            userPanel.style.backgroundColor = 'rgb(' + 248 + ',' + 88 + ',' + 88 + ')';
            cpuPanel.style.backgroundColor = 'rgb(' + 30 + ',' + 201 + ',' + 30 + ')';
            alert("You Lost. Better Luck next time. 😔😔😔😔", "warning");
            var audio = new Audio('SoundEffects/fail.mp3');
            audio.play();
        }
    }
}

bestOfCounter.addEventListener('change', function (e) {
    bestOf = bestOfCounter.value;
})

rockBtn.addEventListener('click', function (e) {
    userChoice = 0;
    cpuChoice = Math.floor(Math.random() * 3);
    changeImage(userChoice, cpuChoice);
    checkWin(userChoice, cpuChoice);
})
paperBtn.addEventListener('click', function (e) {
    userChoice = 1;
    cpuChoice = Math.floor(Math.random() * 3);
    changeImage(userChoice, cpuChoice);
    checkWin(userChoice, cpuChoice);
})
scissorBtn.addEventListener('click', function (e) {
    userChoice = 2;
    cpuChoice = Math.floor(Math.random() * 3);
    changeImage(userChoice, cpuChoice);
    checkWin(userChoice, cpuChoice);
})
