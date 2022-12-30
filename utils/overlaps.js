export default overlaps = (() => {
    function getPositions(elem) {
        const { top, left, width, height } = elem.getBoundingClientRect();

        return [[left, left + width], [top, top + height]];
    }

    function comparePositions(p1, p2) {
        let r1
        let r2;

        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;

        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return (a, b) => {
        let pos1 = getPositions(a);
        let pos2 = getPositions(b);

        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
})();