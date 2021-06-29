// produces a list of randomized items from a given array
// uses random picking instead of shuffling to account for large # of users
const getRandomList = (array, max) => {
    if (!array) return [];
    const randomItems = [];
    let n = array.length;

    while (n !== randomItems.length && randomItems.length < max) {
        const index = Math.floor(Math.random() * n);
        const selectedUser = array[index];
        const isChosen = randomItems.some((u) => (u.username === selectedUser.username));
        if (!isChosen) {
            randomItems.push(selectedUser);
        }
    }

    return randomItems;
}
export default getRandomList;