const sortWorker = (type, direction, array) => {
    let sortedArr = array, compareFunc;
    switch (type) {
        case 'name':
            compareFunc = (a, b) => {
                if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            }
            break;
        case 'date':
            compareFunc = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);
            break;
        case 'wordCount':
            compareFunc = (a,b) => {
                if(a.wordcount > b.wordcount) return -1;
                if(a.wordcount < b.wordcount) return 1;
                return 0;
            }
            break;
        default:
            break;
    }
    if(type !== 'relevance')
        sortedArr = sortedArr.sort(compareFunc);
    if(direction === 'ascending')
        sortedArr = sortedArr.reverse();
    let pageArray = [];
    let totalPages = Math.floor(sortedArr.length/10) === sortedArr.length/10 ? 
    sortedArr.length/10 : Math.floor(sortedArr.length/10) + 1;
    for (let i = 0; i < totalPages; i++) {
        pageArray.push(sortedArr.slice(i*10, (i+1)*10));
    }
    return pageArray;
}
module.exports = {
    sortWorker
}
