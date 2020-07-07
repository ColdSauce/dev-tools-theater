async function getTotalChunks() {
    const response = await fetch('http://localhost:7738/totalChunks')
    const text = await response.text()
    return parseInt(text)
}

function printImage(baseUrl) {
    console.log('%c ', 'font-size:350px; background: url(data:image/bmp;base64,' + baseUrl + ' ) no-repeat;');
}
const myWorker = new Worker('worker.js')

async function displayVideosInConsole() {
    var videoQueue = []
    var chunksViewed = 0

    myWorker.postMessage(chunksViewed)
    myWorker.onmessage = (e) => {
        videoQueue.push(e.data)
    }
    const amountChunks = await getTotalChunks()
    var indexInChunk = 0

    var intervalLoop = setInterval(() => {
        if (videoQueue.length == 0) {
            return
        }
        if (indexInChunk == 250) {
            if (chunksViewed == amountChunks - 1) {
                clearInterval(intervalLoop)
                console.log('The end. Thanks for watching!')
                return
            }
            myWorker.postMessage(chunksViewed + 1)
            myWorker.onmessage = (e) => {
                videoQueue.push(e.data)
            }
        }
        if (indexInChunk == 499) {
            videoQueue.shift()
            indexInChunk = 0
            chunksViewed++
        }
        indexInChunk++
        printImage(videoQueue[0][indexInChunk])
    }, 33) 
}

displayVideosInConsole()