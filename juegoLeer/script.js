let syllableIndex = 0;
let isMoving = false;

let words = [
    { word: 'GATO', syllables: ['GA', 'TO'], image: '/img/img-Juegos/gatocomuneuropeo-97.jpeg' },
    { word: 'OSO', syllables: ['O', 'SO'], image: '/img/img-Juegos/OSO.jpg' },
    { word: 'EXAMEN', syllables: ['E', 'XA', 'MEN'], image: '/path/to/examen.jpg' },
    { word: 'FELICIDAD', syllables: ['FE', 'LI', 'CI', 'DAD'], image: '/path/to/felicidad.jpg' }
];

let currentWordIndex = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ' && !isMoving) {
        if (syllableIndex < words[currentWordIndex].syllables.length) {
            isMoving = true;
            let syllable = document.getElementById(`syllable${syllableIndex + 1}`);
            let targetBox = document.getElementById(`box${syllableIndex + 1}`);

            let movingSyllable = syllable.cloneNode(true);
            movingSyllable.classList.add('moving');
            document.body.appendChild(movingSyllable);

            syllable.style.visibility = 'hidden';

            let targetRect = targetBox.getBoundingClientRect();
            let initialX = syllable.getBoundingClientRect().left;
            let initialY = syllable.getBoundingClientRect().top;

            movingSyllable.style.left = `${initialX}px`;
            movingSyllable.style.top = `${initialY}px`;

            // Llamamos a la función speakSyllable aquí para que lea la sílaba actual
            speakSyllable(words[currentWordIndex].syllables[syllableIndex]);

            setTimeout(() => {
                movingSyllable.style.transform = `translate(${targetRect.left - initialX}px, ${targetRect.top - initialY}px)`;
            }, 0);

            setTimeout(() => {
                targetBox.appendChild(movingSyllable);
                syllableIndex++;

                if (syllableIndex === words[currentWordIndex].syllables.length) {
                    setTimeout(() => {
                        currentWordIndex++;
                        syllableIndex = 0;
                        if (currentWordIndex < words.length) {
                            loadNewWord();
                        }
                    }, 1500);
                }

                isMoving = false;
            }, 1500);
        }
    }
});

function speakSyllable(syllable) {
    let syllableToSpeak = syllable;

    if (syllableToSpeak === 'XA') {
        syllableToSpeak = 'SA';
    }
    if (syllableToSpeak === 'GA') {
        syllableToSpeak = 'JA';
    }

    let speech = new SpeechSynthesisUtterance(syllableToSpeak);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
}

function loadNewWord() {
    const syllables = document.querySelectorAll('.syllable');
    const boxes = document.querySelectorAll('.syllable-box');

    syllables.forEach(syllable => syllable.style.visibility = 'visible');
    boxes.forEach(box => box.innerHTML = '');

    const syllableCount = words[currentWordIndex].syllables.length;
    const wordBox = document.querySelector('.word-box');

    while (wordBox.children.length < syllableCount) {
        let newBox = document.createElement('div');
        newBox.classList.add('syllable-box');
        newBox.id = `box${wordBox.children.length + 1}`;
        wordBox.appendChild(newBox);
    }

    while (wordBox.children.length > syllableCount) {
        wordBox.removeChild(wordBox.lastChild);
    }

    const syllableContainer = document.getElementById('syllables-container');

    while (syllableContainer.children.length < syllableCount) {
        let newSyllable = document.createElement('div');
        newSyllable.classList.add('syllable');
        newSyllable.id = `syllable${syllableContainer.children.length + 1}`;
        syllableContainer.appendChild(newSyllable);
    }

    while (syllableContainer.children.length > syllableCount) {
        syllableContainer.removeChild(syllableContainer.lastChild);
    }

    words[currentWordIndex].syllables.forEach((syllable, index) => {
        let syllableElement = syllableContainer.children[index];
        syllableElement.innerText = syllable;
    });

    // Cargar la imagen correspondiente a la palabra actual
    const wordImage = document.getElementById('word-image');
    wordImage.src = words[currentWordIndex].image;
}

window.onload = loadNewWord;
