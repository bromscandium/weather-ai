export function angleToDirection(angle) {
    const normalized = ((angle % 360) + 360) % 360;
    const index = Math.round(normalized / 45) % 8;

    switch (index) {
        case 0:
            return 'North';
        case 1:
            return 'Northeast';
        case 2:
            return 'East';
        case 3:
            return 'Southeast';
        case 4:
            return 'South';
        case 5:
            return 'Southwest';
        case 6:
            return 'West';
        case 7:
            return 'Northwest';
        default:
            return 'Unknown';
    }
}
