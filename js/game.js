const keys = ["w", "a", "s", "d"];
const keyDisplay = document.getElementById("keyDisplay");
const danceImage = document.getElementById("danceImage");
const keyBox = document.getElementById("KeyBox");
const comboCount = document.getElementById("comboCount");
const maxComboDisplay = document.getElementById("maxCombo");
const comboBar = document.getElementById("comboBar");

let combo = 0;
let maxCombo = 0;

let comboTimer = null;
const comboLimit = 1000;
let gaugeInterval = null;

const images = [
    "img/gameImage_1.png",
    "img/gameImage_2.png",
    "img/gameImage_3.png",
    "img/gameImage_4.png"
];

let imageIndex = 0;


let frame = 0;
const totalFrames = 8;

let currentKey = getRandomKey();
keyDisplay.textContent = currentKey.toUpperCase();

function getRandomKey() {
    return keys[Math.floor(Math.random() * keys.length)];
}

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === currentKey) {

        combo++;
        if (combo > maxCombo) {
            maxCombo = combo;
            maxComboDisplay.textContent = "Max: " + maxCombo;
        }

        // --- 押下エフェクト ---
        keyBox.style.transform = "translate(6px, 6px)";
        keyBox.style.boxShadow = "none";
        keyBox.style.filter = "brightness(0.9)";

        // 少し後に戻す
        setTimeout(() => {
            keyBox.style.transform = "translate(0, 0)";
            keyBox.style.boxShadow =
                "6px 6px 0 #c9d65c, 10px 10px 20px rgba(0,0,0,0.35)";
            keyBox.style.filter = "brightness(1)";
        }, 80);

        // --- ゲーム処理 ---

        frame = (frame + 1) % totalFrames;

        // 画像変更
        imageIndex = (imageIndex + 1) % images.length;
        danceImage.src = images[imageIndex];

        currentKey = getRandomKey();
        keyDisplay.textContent = currentKey.toUpperCase();

        startComboTimer();
        startComboGauge();

    } else {
        combo = 0;
        comboBar.style.width = "0%";
        clearInterval(gaugeInterval);
        clearTimeout(comboTimer);
    }
    comboCount.textContent = `Combo: ${combo}`;
});

function startComboTimer() {

    // 既に動いているタイマーを止める
    clearTimeout(comboTimer);

    comboTimer = setTimeout(() => {
        combo = 0;
        comboCount.textContent = "Combo: " + combo;
    }, comboLimit);
}

function startComboGauge() {

    clearInterval(gaugeInterval);

    let startTime = Date.now();

    gaugeInterval = setInterval(() => {

        let elapsed = Date.now() - startTime;
        let remaining = comboLimit - elapsed;

        if (remaining <= 0) {
            clearInterval(gaugeInterval);
            combo = 0;
            comboCount.textContent = "Combo: " + combo;
            comboBar.style.width = "0%";
            return;
        }

        let percent = (remaining / comboLimit) * 100;
        comboBar.style.width = percent + "%";

    }, 16); // 約60fps
}