async function getSectionOfFrames(chunk) {
    const response = await fetch('http://localhost:7738/getFrames?chunk=' + chunk)
    const jsonData  = await response.json()
    postMessage(jsonData)
}

onmessage = function(e) {
    const chunk = e.data
    getSectionOfFrames(chunk)
  }