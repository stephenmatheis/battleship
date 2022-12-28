// Set up game board
const gameBoard = document.querySelector("#game-board");
const squares = [
    {
        row: 0,
        squares: [0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
    {
        row: "A",
        squares: [1, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "B",
        squares: [2, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "C",
        squares: [3, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "D",
        squares: [4, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "E",
        squares: [5, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "F",
        squares: [6, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "G",
        squares: [7, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "H",
        squares: [8, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "I",
        squares: [9, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
    {
        row: "J",
        squares: [10, "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    },
];

squares.forEach(({ row, squares }) => {
    squares.forEach((square) => {
        let className =
            typeof row === "number" || typeof square === "number"
                ? " legend"
                : "";

        className += square === 0 ? " corner" : "";

        gameBoard.insertAdjacentHTML(
            "beforeend",
            /*html*/ `
                <div class="square${className}">${square}</div>
            `
        );
    });
});
