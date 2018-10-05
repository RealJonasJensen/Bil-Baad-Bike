export default function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.genre.toUpperCase();
    const genreB = b.genre.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}