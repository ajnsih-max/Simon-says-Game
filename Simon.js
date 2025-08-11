let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btnFlash) {
    btnFlash.classList.add("flash");
    setTimeout(function() {
        btnFlash.classList.remove("flash");
    }, 250);
}

function userFlash(btnFlash) {
    btnFlash.classList.add("userflash");
    setTimeout(function() {
        btnFlash.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length); // Changed from 3 to btns.length
    let randColor = btns[randomIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was ${level} <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red"; // Corrected casing
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"; // Corrected casing
        }, 150);
        reset();
    }
}

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn); // Call userFlash with the clicked button

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
