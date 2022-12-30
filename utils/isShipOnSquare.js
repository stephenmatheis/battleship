export default function isShipOnSquare(ship, square) {
    const ship_offsetBottom = ship.offsetTop + ship.offsetHeight;
    const ship_offsetRight = ship.offsetLeft + ship.offsetWidth;
    const square_offsetBottom = square.offsetTop + square.offsetHeight;
    const square_offsetRight = square.offsetLeft + square.offsetWidth;

    return !(
        (ship_offsetBottom < square.offsetTop) || // 
        (ship.offsetTop > square_offsetBottom) || // 
        (ship_offsetRight < square.offsetLeft) || //
        (ship.offsetLeft > square_offsetRight)    // 
    );
};