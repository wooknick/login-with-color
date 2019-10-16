import Typed from "typed.js";

const keys = {
    KeyA: 0,
    KeyS: 1,
    KeyD: 2,
    KeyF: 3,
    KeyJ: 4,
    KeyK: 5,
    KeyL: 6,
    Semicolon: 7
};

const colors = [
    "#845EC2",
    "#C34A36",
    "#FF6F91",
    "#008F7A",
    "#0081CF",
    "#FF9671",
    "#FFC75F",
    "#F9F871"
];

const PASSWORD = "PASSWORD";

let target = 0;
let userColor = [];

document.addEventListener("keyup", e => {
    const i = keys[e.code];
    if (i !== undefined) {
        changeBgColor(i);
        if (checkTarget(i)) {
            moveTarget();
        } else {
            clean();
        }
        changeBtnColor();
    } else {
        clean();
    }
    if (checkCorrectPassword()) {
        login();
    }
});

const clickedColor = i => document.getElementsByClassName("color")[i].style.backgroundColor;

const changeBgColor = i => {
    document.getElementById("root").style.backgroundColor = clickedColor(i);
};

const changeBtnColor = () => {
    colors
        .sort(() => {
            return 0.5 - Math.random();
        })
        .map((color, i) => {
            document.getElementsByClassName("color")[i].style.backgroundColor = color;
        });
};

const initPassword = () => {
    colors
        .sort(() => {
            return 0.5 - Math.random();
        })
        .map((color, i) => {
            document.getElementsByClassName("password")[i].style.color = color;
        });
    document.getElementsByClassName("password")[target].classList.add("target");
};

const checkTarget = i => {
    const targetColor = document.getElementsByClassName("target")[0].style.color;
    if (targetColor === clickedColor(i)) {
        return true;
    } else {
        return false;
    }
};

const moveTarget = () => {
    const currentTarget = document.getElementsByClassName("target")[0];
    userColor.push(currentTarget.style.color);
    currentTarget.innerHTML = " ";
    currentTarget.classList.remove("target");
    target = target + 1;
    if (target < PASSWORD.length) {
        document.getElementsByClassName("password")[target].classList.add("target");
    }
};

const clean = () => {
    PASSWORD.split("").map((t, i) => {
        document.getElementsByClassName("password")[i].innerHTML = `<p>${t}</p>`;
        document.getElementsByClassName("password")[i].classList.remove("target");
    });
    target = 0;
    document.getElementsByClassName("password")[target].classList.add("target");
};

const checkCorrectPassword = () => {
    return target === PASSWORD.length;
};

const login = () => {
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.style.backgroundColor = "white";
    root.innerHTML = "<div id='loginCompleted'><span id='loginCompletedText'></span></div>";
    printHello();
};

const printHello = () => {
    let typed = new Typed("#loginCompletedText", {
        strings: ["Congraturation.", "Your codename is.."],
        typeSpeed: 40
    });
    setTimeout(printCodename, 5000);
};

const printCodename = () => {
    document.getElementById("loginCompleted").innerHTML = "";
    userColor.map(color => {
        document.getElementById("loginCompleted").innerHTML += printColorBox(color);
    });
};

const printColorBox = color => {
    return `<div class="colorBox" style="background-color:${color}"></div>`;
};

initPassword();
changeBtnColor();
