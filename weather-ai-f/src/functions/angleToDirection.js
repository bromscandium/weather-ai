export function angleToDirection(angle) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((angle % 360) / 45)) % 8;

    switch (index) {
        case 0:
            return 'N';
        case 1:
            return 'NE';
        case 2:
            return 'E';
        case 3:
            return 'SE';
        case 4:
            return 'S';
        case 5:
            return 'SW';
        case 6:
            return 'W';
        case 7:
            return 'NW';
        default:
            return 'Unknown';
    }
}
