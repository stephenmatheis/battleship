import isShipOnSquare from './utils/isShipOnSquare.js';

// Get Game Board and Ships nodes
const gameBoard = document.querySelector('#game-board');
const shipsContainer = document.querySelector('#ships');

// Main Data Structure
const data = [
    {
        row: 0,
        squares: [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    },
    {
        row: 1,
        squares: [1, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 2,
        squares: [2, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 3,
        squares: [3, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 4,
        squares: [4, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 5,
        squares: [5, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 6,
        squares: [6, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 7,
        squares: [7, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 8,
        squares: [8, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 9,
        squares: [9, '', '', '', '', '', '', '', '', '', ''],
    },
    {
        row: 10,
        squares: [10, '', '', '', '', '', '', '', '', '', ''],
    },
];

// Legend
const legend = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// Ships
const ships = [
    {
        name: 'Carrier',
        hits: 5,
    },
    {
        name: 'Battleship',
        hits: 4,
    },
    {
        name: 'Destroyer',
        hits: 3,
    },
    {
        name: 'Submarine',
        hits: 3,
    },
    {
        name: 'Patrol Boat',
        hits: 2,
    },
];

// Set up squares
data.forEach(({ row, squares }) => {
    squares.forEach((square, index) => {
        let className =
            row === 0 || typeof square === 'number'
                ? ' legend'
                : '';

        className += square === 0 ? ' corner' : '';

        gameBoard.insertAdjacentHTML(
            'beforeend',
            /*html*/ `
                <div class='square${className}' data-square='${legend[index]}${row}'>${square}</div>
            `
        );
    });
});

// Set up ships
ships.forEach(({ name, hits }) => {
    const pips = [...Array(hits).keys()]
        .map((hit) => {
            return /*html*/ `
                <div class='pip-ctr'>
                    <div class='pip'></div>
                </div>
            `;
        })
        .join('\n');

    shipsContainer.insertAdjacentHTML(
        'beforeend',
        /*html*/ `
            <div class='ship' data-name='${name}'>
                <div class='hits'>
                    ${pips}
                </div>
                <div class='name'>${name}</div>
            </div>
        `
    );
});

// // DEV: Mouse Flag
// let isDragging = false;
// // DEV:

// Drag and Drop
let offsetX = 10;
let offsetY = 10;
let sourceElement;
let targetElement;
let shipName;
let overlapped;
let nextSquares = [];

const items = document.querySelectorAll('.ship');
const gameSquares = document.querySelectorAll('.square:not(.legend)');

items.forEach(item => {
    item.addEventListener('mousedown', mousedown);
    item.addEventListener('mouseup', mouseup);
});

function mousedown(event) {
    // // 
    // isDragging = true;
    // //

    sourceElement = this;

    // Clone element
    targetElement = sourceElement.cloneNode(true);
    targetElement.classList.add('is-dragged');

    // Set name
    shipName = targetElement.dataset.name;

    // Style entire document
    document.body.classList.add('grabbing');

    // Insert cloned element
    document.body.insertAdjacentElement('beforeend', targetElement);

    // Set position
    const { top, left, width } = sourceElement.getBoundingClientRect();

    targetElement.style.width = `${width}px`;
    targetElement.style.top = `${top - offsetY}px`;
    targetElement.style.left = `${left - offsetX}px`;

    // Add event listeners
    document.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
}

function mouseup(event) {
    // // DEV:
    // if (!isDragging) {
    //     isDragging = false;

    //     return;
    // }
    // // DEV:

    // return;

    // Remove selected squares
    for (let square of [...gameSquares]) {
        square.classList.remove('is-overlapped');
    }

    // Remove next square class
    if (nextSquares.length) {
        nextSquares.forEach(square => square.classList.remove('is-next-square'));
        nextSquares = [];
    }

    // Remove event listeners
    document.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);

    if (targetElement) {
        // Remove scale class from target element
        targetElement.classList.remove('scale');

        // Add return class to target element
        targetElement.classList.add('return');

        // Return target element to source element's position
        const { top, left } = sourceElement.getBoundingClientRect();

        targetElement.style.top = `${top - offsetY}px`;
        targetElement.style.left = `${left - offsetX}px`;
    }

    // Wait until the return animation has completed
    setTimeout(() => {
        // Remove the target element from the DOM
        targetElement.remove();

        // Remove classes
        sourceElement.classList.remove('is-dragging');
        document.body.classList.remove('grabbing');

        // Reset data
        sourceElement = undefined;
        targetElement = undefined;
        shipName = undefined;
    }, 200);

    // TODO: Add ship to Game Board
}

function mousemove(event) {
    // Set is-dragging class on source element
    if (!sourceElement.classList.contains('is-dragging')) {
        sourceElement.classList.add('is-dragging');
    }

    // Set scale class on target element
    if (!targetElement.classList.contains('scale')) {
        targetElement.classList.add('scale');
    }

    // Set new target top and left position based on mouse x y position
    targetElement.style.top = `${targetElement.getBoundingClientRect().top + event.movementY - offsetY}px`;
    targetElement.style.left = `${targetElement.getBoundingClientRect().left + event.movementX - offsetX}px`;

    // if (!overlapped) {
    //     checkWhichSquaresShipIsOn();
    // }

    checkWhichSquaresShipIsOn();
}

function checkWhichSquaresShipIsOn() {
    for (let square of [...gameSquares]) {
        const overlaps = isShipOnSquare(targetElement, square);

        if (overlaps) {
            if (!square.classList.contains('is-overlapped')) {
                if (!overlapped) {
                    console.log(square.dataset.square, 'is overlapped');
                    square.classList.add('is-overlapped');
                    overlapped = square.dataset.square;

                    // Overlap the next n number of squares to the right
                    // where n is the number of hits the boat can take minus one
                    const { hits } = ships.find(ship => ship.name === shipName);
                    const [col, row] = overlapped.match(/[A-Z]+|[0-9]+/g);
                    const isNextSquares = [];

                    for (let i = 0; i < hits - 1; i++) {
                        const nextCol = legend[legend.indexOf(col) + 1 + i];
                        const nextSquare = document.querySelector(`.square[data-square='${nextCol}${row}']`);

                        if (nextSquare) {
                            isNextSquares.push(nextSquare);
                        }
                    }

                    if (isNextSquares.length === (hits - 1)) {
                        isNextSquares.forEach(square => square.classList.add('is-next-square'));
                        nextSquares = isNextSquares;
                    } else {
                        alert('Illegal moves. Not enough squares.');
                    }
                }
            }
        } else {
            square.classList.remove('is-overlapped');

            if (overlapped === square.dataset.square) {
                console.log(overlapped, 'is no longer overlapped');
                overlapped = undefined;

                if (nextSquares.length) {
                    nextSquares.forEach(square => square.classList.remove('is-next-square'));

                    nextSquares = [];
                }
            }
        }
    }
}

async function onDrop(event) {
    console.log(event);
}