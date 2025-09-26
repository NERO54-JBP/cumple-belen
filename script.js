// Variables para controlar el estado de las velas
let candlesBlownOut = 0;
const totalCandles = 2;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    createBalloons(15); // Crear 15 globos
});

// Función para crear globos de colores que flotan
function createBalloons(numberOfBalloons) {
    const balloonsContainer = document.getElementById('balloons-container');
    const colors = ['#ff4da6', '#4da6ff', '#4dff88', '#ffd24d', '#bf4dff', '#ff6b4d'];

    for (let i = 0; i < numberOfBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Posición horizontal aleatoria
        const leftPosition = Math.random() * 100;
        balloon.style.left = leftPosition + 'vw';
        
        // Color aleatorio
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = randomColor;
        
        // Duración y delay de animación aleatorios
        const animationDuration = 6 + Math.random() * 6; // Entre 6 y 12 segundos
        const animationDelay = Math.random() * 5; // Delay hasta 5 segundos
        balloon.style.animationDuration = animationDuration + 's';
        balloon.style.animationDelay = animationDelay + 's';

        balloonsContainer.appendChild(balloon);

        // Programar el "reventado" del globo al final de su animación
        setTimeout(() => {
            balloon.classList.add('popped');
            // Crear un nuevo globo después de que este explote
            setTimeout(() => {
                balloon.remove();
                createBalloons(1);
            }, 1000);
        }, (animationDelay + animationDuration) * 1000);
    }
}

// Función para apagar una vela
function blowOutCandle(candleElement) {
    if (candleElement.classList.contains('blown-out')) return;

    candleElement.classList.add('blown-out');
    candlesBlownOut++;

    // Verificar si ambas velas están apagadas
    if (candlesBlownOut === totalCandles) {
        setTimeout(startFinalCelebration, 1000);
    }
}

// Función que se ejecuta cuando se apagan las dos velas
function startFinalCelebration() {
    // Lanzar confeti
    createConfetti();

    // Ocultar la torta con una animación de "explosión"
    const cake = document.querySelector('.cake');
    cake.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    cake.style.transform = 'scale(1.5)';
    cake.style.opacity = '0';

    // Mostrar la carta después de un breve delay
    setTimeout(() => {
        const card = document.getElementById('birthday-card');
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 1s ease-out';
    }, 1000);
}

// Función para crear el efecto de confeti
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajustar el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ff4da6', '#4da6ff', '#4dff88', '#ffd24d', '#bf4dff', '#ff6b4d'];

    // Crear 150 partículas de confeti
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            tilt: Math.random() * 10 - 5,
            tiltSpeed: Math.random() * 0.1 - 0.05
        });
    }

    // Función para animar el confeti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let piecesActive = false;

        confettiPieces.forEach(piece => {
            // Mover la partícula
            piece.y += piece.speed;
            piece.x += Math.sin(piece.tilt) * 0.5;
            piece.tilt += piece.tiltSpeed;

            // Dibujar la partícula como un rectángulo giratorio
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.tilt);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
            ctx.restore();

            // Verificar si la partícula sigue activa
            if (piece.y < canvas.height) {
                piecesActive = true;
            }
        });

        // Continuar la animación si aún hay partículas activas
        if (piecesActive) {
            requestAnimationFrame(animateConfetti);
        }
    }

    animateConfetti();
}

// Redimensionar el canvas si se cambia el tamaño de la ventana
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});