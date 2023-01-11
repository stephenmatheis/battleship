export default function isShipOnSquare(ship, square) {


    // This one's really tricky. Normally, we'd want to track if the
    // node is entirely on top of another node (in this case, if the
    // ship is fully on top of a square). But that's not what we want
    // when trying to place a battehship on the board. Instead, we want
    // to detect when just the left quarter or so of the ship is in a square.
    // In other words, we don't care if the whole ship is on a square. Because
    // the rules will tell us how may squares a ship takes up.
    // Line 13 says to only check if the first ten pixels of the ship are within
    // the square.
    //
    // const ship_offsetBottom = ship.offsetTop + 10;
    const ship_offsetBottom = ship.offsetTop + ship.offsetHeight;
    const ship_offsetRight = ship.offsetLeft + 10;
    // const ship_offsetRight = ship.offsetLeft + ship.offsetWidth;

    // Square
    const square_offsetBottom = square.offsetTop + square.offsetHeight;
    const square_offsetRight = square.offsetLeft + square.offsetWidth;

    return !(
        (ship_offsetBottom < square.offsetTop) || // 
        (ship.offsetTop > square_offsetBottom) || // 
        (ship_offsetRight < square.offsetLeft) || //
        (ship.offsetLeft > square_offsetRight)    // 
    );
};