// Add this at the top of script.js
const letterContent = `Hi Honeeey! ❤️
You wished for a letter so I thought I'll add a little twist to it. I really am so grateful for having you in my life.
You are by far my favorite human I have ever met and I am so lucky to have you by my side. With you, everything just simply
feels nice. You are so incredibly supportive, loving, and caring. You make me feel so special and loved. You are also 
doing so incredibly well in your life and I am so proud of you. I am sooooo excited to see what the future holds for us. 🥰
I love you so much and happy birthday! ❤️ 

Alex ❤️

Themed extra by GPT:

🎮 Press Start...

🌟 Player One & Player Two, from the very first level...

From the moment we pressed Start, I knew this was the greatest co-op adventure of my life. Every day with you feels like unlocking a new level, filled with surprises, laughter, and those little moments that feel like secret Easter eggs just for us.

In the game of life, you are my best power-up. With you, my health bar is always full, and even on the toughest boss fights, I know we can win—because we’ve got the best team synergy.

You’re my save point, my extra life, my infinite continues. No matter what challenges come our way, I’d play through it all again, as long as you’re my Player Two.

💖 Game Over? No.
💖 Press Continue? Always.

Happy Birthday, my love. Let's keep leveling up together.

🕹️ [Press A to Kiss]`;



// Screen management
const screens = document.querySelectorAll('.screen');
let currentScreen = 0;
let captionVisible = true;
let textboxVisible = true;
let currentTypeWriter = null;

function showScreen(index) {
    screens.forEach(screen => screen.classList.remove('active'));
    screens[index].classList.add('active');
    currentScreen = index;

    // Only start the typewriter when showing the letter page for the first time
    if (index === 1) {
        const typewriterText = document.getElementById('typewriter-text');
        if (typewriterText && !currentTypeWriter) {
            currentTypeWriter = new TypeWriter(typewriterText, letterContent, 50);
        }
    }
}

// Typewriter effect
class TypeWriter {
    constructor(txtElement, text, wait = 100) {
        this.txtElement = txtElement;
        this.text = text;
        this.txt = '';
        this.wait = parseInt(wait, 10);
        this.isComplete = false;
        this.type();
    }

    type() {
        const current = this.txt.length;
        const fullTxt = this.text;

        if (current < fullTxt.length && !this.isComplete) {
            this.txt = fullTxt.substring(0, current + 1);
            this.txtElement.innerHTML = this.txt;
            setTimeout(() => this.type(), this.wait);
        } else {
            this.isComplete = true;
        }
    }
}

// Photo gallery with captions
const photos = [
    { image: 'photos/Game Boy Camera.png', caption: 'An ancient memory..' },
    { image: 'photos/Game Boy Camera2.png', caption: 'Because I really like this one hihi' },
    { image: 'photos/Game Boy Camera3.png', caption: 'Looks kinda cool with this filter' },
    // Add more photos as needed
];

let currentPhotoIndex = 0;
const photoGallery = document.querySelector('.photo-gallery');
let captionTypewriter = null;

function updatePhoto() {
    photoGallery.innerHTML = `
        <div class="gameboy-content">
            <div class="gameboy-image">
                <img src="${photos[currentPhotoIndex].image}" alt="Memory ${currentPhotoIndex + 1}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            ${textboxVisible ? `
            <div class="gameboy-textbox">
                <div class="textbox-content" style="display: ${captionVisible ? 'block' : 'none'}">
                    <div class="caption-text"></div>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    // Start new typewriter for caption
    if (captionTypewriter) {
        captionTypewriter = null;
    }
    const captionElement = document.querySelector('.caption-text');
    if (captionVisible && textboxVisible && captionElement) {
        captionTypewriter = new TypeWriter(captionElement, photos[currentPhotoIndex].caption, 50);
    }
}

function toggleTextbox() {
    textboxVisible = !textboxVisible;
    updatePhoto();
}

function showTextbox() {
    textboxVisible = true;
    captionVisible = true;
    updatePhoto();
}


// Gift reveals
const gifts = [
    { type: 'text', content: 'Your first gift: A date to go 3D Pottery Printing!' },
    { type: 'image', content: 'photos/Split_Fiction_cover_art.jpg' },
    { type: 'text', content: 'Your final gift: A picnic date!' }
];

function revealGift(giftIndex) {
    const giftBox = document.getElementById(`gift${giftIndex + 1}`);
    const giftReveal = giftBox.querySelector('.gift-reveal');
    const gift = gifts[giftIndex];

    if (giftBox.classList.contains('open')) {
        // If already open, close it
        giftBox.classList.remove('open');
        giftBox.classList.remove('expanded');
        giftReveal.innerHTML = '';
    } else {
        // If closed, open it
        giftBox.classList.add('open');
        giftBox.classList.add('expanded');

        if (gift.type === 'text') {
            giftReveal.innerHTML = `<p style="color: white; text-align: center; padding: 10px;">${gift.content}</p>`;
        } else if (gift.type === 'image') {
            giftReveal.innerHTML = `<img src="${gift.content}" alt="Gift ${giftIndex + 1}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
    // Start button
    const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    showScreen(1);
    const bgm = document.getElementById('bgm');
    // Check if audio exists and is ready
    if (bgm) {
        bgm.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }
});

    const photosNextButton = document.getElementById('photos-next-button');
photosNextButton.addEventListener('click', () => {
    showScreen(3);
});

    // Navigation buttons
    document.getElementById('nav-start').addEventListener('click', () => showScreen(0));
    document.getElementById('nav-letter').addEventListener('click', () => showScreen(1));
    document.getElementById('nav-gallery').addEventListener('click', () => {
        showScreen(2);
        updatePhoto();
    });
    document.getElementById('nav-gifts').addEventListener('click', () => showScreen(3));

    // Gameboy controls
    document.getElementById('prev-photo').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updatePhoto();
    });

    document.getElementById('next-photo').addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updatePhoto();
    });

    // A and B buttons
    document.getElementById('toggle-textbox').addEventListener('click', toggleTextbox);
    document.getElementById('show-textbox').addEventListener('click', showTextbox);

    // Gift boxes
    document.querySelectorAll('.gift-box').forEach((giftBox, index) => {
        giftBox.addEventListener('click', () => {
            revealGift(index);
        });
    });
}); 