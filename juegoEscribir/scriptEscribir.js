const exercises = [
    { word: "GATO", image: "/img/img-Juegos/gatocomuneuropeo-97.jpeg" },
    { word: "GALLO", image: "/img/img-Juegos/fallo.jpg" },
    { word: "ELEFANTE", image: "/img/img-Juegos/elefante.jpg" }
];

let currentExercise = 0;

const questionImage = document.getElementById("questionImage");
const syllablesContainer = document.getElementById("syllables-container");
const wordBox = document.getElementById("word-box");
const nextButton = document.getElementById("nextButton");
const retryButton = document.getElementById("retryButton");
const incorrectMessage = document.getElementById("incorrectMessage");

function setupExercise() {
    const { word, image } = exercises[currentExercise];
    const syllables = word.split("");
    syllablesContainer.innerHTML = "";
    wordBox.innerHTML = "";

    questionImage.src = image;

    syllables.forEach(() => {
        const syllableBox = document.createElement("div");
        syllableBox.classList.add("syllable-box");
        wordBox.appendChild(syllableBox);
    });

    syllables
        .map((syllable) => ({
            text: syllable,
            order: Math.random()
        }))
        .sort((a, b) => a.order - b.order)
        .forEach(({ text }) => {
            const syllableDiv = document.createElement("div");
            syllableDiv.classList.add("syllable");
            syllableDiv.textContent = text;

            syllableDiv.addEventListener("click", () => moveSyllable(syllableDiv, text));
            syllablesContainer.appendChild(syllableDiv);
        });

    nextButton.disabled = true;
    retryButton.style.display = "none";
    incorrectMessage.style.display = "none";
}

function moveSyllable(syllableDiv, text) {
    const targetBox = Array.from(wordBox.children).find(
        (box) => !box.textContent
    );

    if (targetBox) {
        const newSyllableDiv = document.createElement("div");
        newSyllableDiv.classList.add("syllable");
        newSyllableDiv.textContent = text;

        targetBox.appendChild(newSyllableDiv);
        syllableDiv.style.visibility = 'hidden'; // Hacer la letra original invisible

        if (Array.from(wordBox.children).every((box) => box.textContent.trim())) {
            const formedWord = Array.from(wordBox.children)
                .map((box) => box.textContent.trim())
                .join("");

            if (formedWord === exercises[currentExercise].word) {
                nextButton.disabled = false;
            } else {
                incorrectMessage.style.display = "block";
                retryButton.style.display = "inline-block";
            }
        }
    }
}

nextButton.addEventListener("click", () => {
    currentExercise++;

    if (currentExercise < exercises.length) {
        setupExercise();
    } else {
        alert("¡Has completado todos los ejercicios!");
        nextButton.disabled = true;
    }
});

retryButton.addEventListener("click", () => {
    setupExercise();
});

setupExercise();
