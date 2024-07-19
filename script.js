let timerInterval;

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el cronómetro
    let timeRemaining = 50 * 60; // 50 minutos en segundos
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            alert("Time is up!");
            document.getElementById('quizForm').submit(); // Enviar el formulario automáticamente cuando el tiempo se agote
        }
    }

    timerInterval = setInterval(updateTimer, 1000);
});

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(`page${pageNumber}`).style.display = 'block';
}

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Detener el cronómetro
    clearInterval(timerInterval);

    const correctAnswers = {
        'q1-1': 'Paris',
        'q1-2': 'her birthday',
        'q1-3': 'dangerous',
        'q1-4': 'likes',
        'q1-5': "doesn't like",
        'q1-6': 'Maria does not like the mall',
        'q1-7': 'Does Sam like the park?',
        'q1-8': 'Daniela lives with her mother',
        'q1-9': 'Do you like apartments?',
        'q1-10': 'My parents do not like my building',
        'q1-11': 'Falso',
        'q1-12': 'Houston',
        'q1-13': 'Verdadero',
        'q1-14': "doesn't like",
        'q1-15': 'like'
    };

    const formData = new FormData(event.target);
    let score = 0;
    let totalQuestions = 15; // Número total de preguntas
    let totalScore = 100; // Ajustar según el número total de preguntas

    // Calcular el puntaje
    for (let [name, value] of formData.entries()) {
        if (correctAnswers[name] === value.trim()) {
            score += 6.666666666666667;
        }
    }

    // Mostrar resultados
    document.getElementById('result').innerText = `Your score is: ${Math.round(score)}/${totalQuestions * 6.666666666666667}`;
    document.getElementById('result').style.display = 'block';

    // Resaltar respuestas correctas e incorrectas
    const formElements = event.target.elements;
    for (let element of formElements) {
        if (element.name && correctAnswers[element.name] !== undefined) {
            if (element.tagName === 'INPUT' && element.type === 'radio') {
                if (element.checked) {
                    if (element.value === correctAnswers[element.name]) {
                        element.parentElement.style.backgroundColor = 'lightgreen';
                    } else {
                        element.parentElement.style.backgroundColor = 'lightcoral';
                    }
                }
            }
        }
    }
});


