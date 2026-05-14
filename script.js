/*Carousel*/
const track = document.getElementById('track');
const cards = document.querySelectorAll('.project-card');
const totalCards = cards.length;
const visibleCards = 4;

function updateCarousel() {
    if (!track) return;
    const offset = -(currentIndex * (100 / visibleCards));
    track.style.transform = `translateX(${offset}%)`;
}

let currentIndex = 0;

function moveSlide(direction) {
    if (!track) return;
    currentIndex += direction;
    if (currentIndex > totalCards - visibleCards) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalCards - visibleCards;
    }
    updateCarousel();
}

let autoSlide;
if (track) {
    autoSlide = setInterval(() => moveSlide(-1), 4000);
}

function handleManualControl(direction) {
    if (!track) return;
    clearInterval(autoSlide);
    moveSlide(direction);
    autoSlide = setInterval(() => moveSlide(-1), 4000);
}

/*Scroll to top*/
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function () {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (!scrollBtn) return;
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtn.classList.add("show-scroll");
    } else {
        scrollBtn.classList.remove("show-scroll");
    }
};

/*Chatbot*/
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) chatWindow.classList.toggle('hidden');
}

const irisKnowledge = {
    "hello": "Hello there! Welcome to Iris & Ink. How can I help you today?",
    "hi": "Hi! Welcome to Iris & Ink. How can I help you today?",
    "services": "We specialize in brand identity designing, logo designing, and website designing and other graphic designing services. You can view our work and expertise in our website.",
    "pric": "Every project is unique and pricing can be different. Contact us for more details about pricing. Visit our contact us page.",
    "contact": "You can contact us through email, telephone and social media. Visit the contact us page for more details",
    "address": "Our headoffice is located at  No.36 , De Kretser Place, Colombo 00400. For more info about address, you can explore the map in contact us page",
    "works": "We have completed many unique works. You can see them in our featured works section",
    "projects": "We have completed many unique projects. You can see them in our featured works section",
    "how are you": "I'm fine, Thank you. How can I help you today?",
    "default": "You can visit our website for more information or contact us via email, telephone and social media."
};

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    if (!input || !chatBody) return;

    const message = input.value.trim().toLowerCase();
    if (message === "") return;

    chatBody.innerHTML += `<div class="user-msg-container"><p class="user-msg">${input.value}</p></div>`;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    let response = irisKnowledge["default"];
    for (let key in irisKnowledge) {
        if (message.includes(key)) {
            response = irisKnowledge[key];
            break;
        }
    }

    setTimeout(() => {
        chatBody.innerHTML += `<div class="bot-msg-container"><p class="bot-msg"><b>Iris:</b> ${response}</p></div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

const userInput = document.getElementById('user-input');
if (userInput) {
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
}

/* Dark Mode (all pages) */
function applyDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    const icon = document.getElementById('dark-mode-icon');
    if (icon) icon.textContent = enabled ? '☀️' : '🌙';
}

function toggleDarkMode() {
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', !isDark);
    applyDarkMode(!isDark);
}


(function () {
    const saved = localStorage.getItem('darkMode') === 'true';
    applyDarkMode(saved);
})();

/*Search bar (home page)*/
function highlightText() {
    const searchInput = document.getElementById('page-search');
    if (!searchInput) return;

    const input = searchInput.value.toLowerCase();
    const mainContent = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    const searchAreas = [mainContent, ...sections];

    searchAreas.forEach(area => {
        if (!area) return;

        const existingHighlights = area.querySelectorAll('.highlight');
        existingHighlights.forEach(el => {
            el.outerHTML = el.innerText;
        });

        if (input.trim() === "") return;

        const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodesToReplace = [];

        while (node = walker.nextNode()) {
            if (node.nodeValue.toLowerCase().includes(input)) {
                nodesToReplace.push(node);
            }
        }

        nodesToReplace.forEach(node => {
            const parent = node.parentNode;
            const text = node.nodeValue;
            const regex = new RegExp(`(${input})`, 'gi');
            const newHTML = text.replace(regex, '<span class="highlight">$1</span>');

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHTML;

            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, node);
            }
            parent.removeChild(node);
        });
    });
}

