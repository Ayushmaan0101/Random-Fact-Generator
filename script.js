// Generating Facts
let generatefact = document.getElementById("generatefact");

generatefact.onclick = function () {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    .then(response => response.json())
    .then(data => document.getElementById("fact").textContent = data.text)
    .catch(error => {
        console.log(`Unable to generate: ${error.message}`);
    });
}


// Copy Button
const copyButton = document.getElementById("copybtn");

copyButton.addEventListener('click', function () {
    copyToClipboard();
});

// Function to copy text to the clipboard
async function copyToClipboard() {
    const factText = document.getElementById("fact").textContent;

    try {
        await navigator.clipboard.writeText(factText);
        alert("Fact copied to clipboard!");
    } catch (err) {
        console.error('Unable to copy text:', err);
    }
}


// Tweet Button
const tweetButton = document.getElementById("tweetbtn");

tweetButton.addEventListener('click', function () {
    const factText = document.getElementById("fact").textContent;
    const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(factText)}`;
    window.open(tweetIntentUrl, '_blank');
});


// Speak Button
const speakButton = document.getElementById("speakbtn");

speakButton.addEventListener('click', function () {
    speakFact();
});

// Function to speak the text using the Web Speech API
function speakFact() {
    const factText = document.getElementById("fact").textContent;

    // Check if the SpeechSynthesis API is available in the browser
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(factText);

        
        utterance.volume = 1; 
        utterance.rate = 1; 
        utterance.pitch = 1.2; 

        // Speak the fact
        speechSynthesis.speak(utterance);
    } else {
        console.error('SpeechSynthesis API is not supported in this browser.');
    }
}
