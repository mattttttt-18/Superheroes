// script.js
document.addEventListener('DOMContentLoaded', function() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const levelMenu = document.getElementById('level');
    const messageDisplay = document.getElementById('message');
    
    let pieces = [];
    let activePiece = null;

    function createPuzzle() {
        puzzleContainer.innerHTML = '';
        messageDisplay.textContent = ''; // Resetear el mensaje
        pieces = [];
        const level = levelMenu.value;
        
        if (level) {
            puzzleContainer.style.visibility = 'visible'; // Mostrar al seleccionar nivel
            for (let i = 1; i <= 6; i++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url('Imagenes/nivel_${level}/${i}.png')`;
                piece.dataset.position = i;
                piece.addEventListener('click', selectPiece);
                pieces.push(piece);
            }

            shuffle(pieces);
            updateDisplay();
        } else {
            puzzleContainer.style.visibility = 'hidden'; // Ocultar si no se selecciona nivel
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        updateDisplay();
    }

    function updateDisplay() {
        puzzleContainer.innerHTML = '';
        pieces.forEach(piece => {
            puzzleContainer.appendChild(piece);
        });
    }

    function selectPiece(event) {
        if (activePiece && activePiece !== event.target) {
            swapPieces(activePiece, event.target);
            activePiece.classList.remove('selected');
            activePiece = null;
            checkWin();
        } else {
            if (activePiece) {
                activePiece.classList.remove('selected');
            }
            activePiece = event.target;
            activePiece.classList.add('selected');
        }
    }

    function swapPieces(piece1, piece2) {
        const piece1Index = pieces.indexOf(piece1);
        const piece2Index = pieces.indexOf(piece2);
        [pieces[piece1Index], pieces[piece2Index]] = [pieces[piece2Index], pieces[piece1Index]];
        updateDisplay();
    }

    function checkWin() {
        if (pieces.every((piece, index) => piece.dataset.position == index + 1)) {
            messageDisplay.textContent = '¡Felicidades! Has completado el rompecabezas.';
        }
    }

    levelMenu.addEventListener('change', createPuzzle);
});
