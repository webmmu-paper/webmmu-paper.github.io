// Simple tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding content
      const targetId = this.dataset.tab + '-content';
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Dataset exploration tabs
  const exploreTabs = document.querySelectorAll('.explore-tab');
  const exploreContents = document.querySelectorAll('.explore-content');
  
  exploreTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all explore tabs and contents
      exploreTabs.forEach(t => t.classList.remove('active'));
      exploreContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding content
      const targetId = this.dataset.task + '-samples';
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
        carouselState[this.dataset.task] = 0;
        loadSamples(this.dataset.task).catch(console.error);
      }
    });
  });
  
  // Carousel navigation
  const carouselBtns = document.querySelectorAll('.carousel-btn');
  carouselBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const task = this.dataset.task;
      const track = document.querySelector(`.carousel-track[data-task="${task}"]`);
      const isNext = this.classList.contains('next');
      
      if (track) {
        const scrollAmount = 320; // card width + gap
        const currentScroll = track.scrollLeft;
        const newScroll = isNext ? currentScroll + scrollAmount : currentScroll - scrollAmount;
        
        track.scrollTo({
          left: newScroll,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Load initial samples
  loadSamples('webqa').catch(console.error);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Simple mobile menu toggle (if needed)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (mobileMenuToggle && navbarMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
});

// Carousel state per task
const carouselState = {
  webqa: 0,
  mockup2code: 0,
  codeedit: 0
};

// Load samples for a specific task (show only one at a time)
async function loadSamples(task) {
  const track = document.querySelector(`.carousel-track[data-task="${task}"]`);
  if (!track) return;

  // Sample data based on available files
  const samples = {
    webqa: [
      {
        id: 1,
        image: 'tables/webqa/1.jpeg',
        qa: `
          <div class="qa-pair">
            <div class="question">¿En qué área puede el usuario hacer clic para ver publicaciones anteriores?<br>A) Categorías<br>B) Lo más visto<br>C) Archivo del blog</div>
            <div class="answer">C) Archivo del blog</div>
            </div>
          <div class="qa-pair">
            <div class="question">¿A qué tipo de público está dirigido este blog de recetas?</div>
            <div class="answer">Personas interesadas en repostería y cocina casera</div>
            </div>
          <div class="qa-pair">
            <div class="question">¿Cuál sería el efecto en la navegación si la sección "Lo más visto recientemente" estuviera al inicio?</div>
            <div class="answer">Aumentaría la accesibilidad de los artículos populares</div>
          </div>
        `,
        meta: 'Spanish • WebQA'
      },
      {
        id: 2,
        image: 'tables/webqa/2.png',
        qa: `
          <div class="qa-pair">
            <div class="question">Je cherche un soin pour le visage. Où dois-je aller ?</div>
            <div class="answer">Dans la barre latérale sous "Soins visage par type de peau"</div>
            </div>
          <div class="qa-pair">
            <div class="question">Quel est le prix total des articles si l'on exclut celui avec 5 étoiles ?<br>A) 58,70 €<br>B) 62,85 €<br>C) 45,50 €<br>D) 51,90 €</div>
            <div class="answer">B) 62,85 €</div>
              </div>
          <div class="qa-pair">
            <div class="question">Avec un budget de 15 €, quels produits puis-je acheter ?</div>
            <div class="answer">- Masque Argile verte et menthe poivrée bio (5,90 €)<br>- Masque Argile rose bio - Peaux sensibles (5,90 €)</div>
              </div>
        `,
        meta: 'French • WebQA'
      },
      {
        id: 3,
        image: 'tables/webqa/3.png',
        qa: `
          <div class="qa-pair">
            <div class="question">Comment filtrer les hôtels qui acceptent les animaux ?</div>
            <div class="answer">Dans la section "Ausstattung", cliquez sur "Haustiere erlaubt"</div>
            </div>
          <div class="qa-pair">
            <div class="question">Combien de chaises sont visibles dans l'image de "Sunflower Santa Maria Novella" ?</div>
            <div class="answer">4 chaises</div>
          </div>
          <div class="qa-pair">
            <div class="question">Quelles sont les meilleures options d'hébergement près de Via Faenza ?</div>
            <div class="answer">"Sunflower Santa Maria Novella" avec une note de 8.9</div>
            </div>
        `,
        meta: 'French/German • WebQA'
      },
      {
        id: 4,
        image: 'tables/webqa/4.png',
        qa: `
          <div class="qa-pair">
            <div class="question">How can I find more information about the player A.J. Dybantsa?</div>
            <div class="answer">Click on the "RIVALS150 ranking" at the lower left and select "A.J. Dybantsa" at (x1:230.34, x2:297.32, y1:1049.92, y2:1083.07)</div>
              </div>
          <div class="qa-pair">
            <div class="question">How many players are visible in the 4th image on the left side?<br>A) 2<br>B) 1<br>C) 4<br>D) 3</div>
            <div class="answer">D) 3</div>
              </div>
          <div class="qa-pair">
            <div class="question">Which user pays less when subscribing annually vs. monthly?</div>
            <div class="answer">- Yearly: $99.95<br>- Monthly: $9.95 × 12 = $119.40<br>- Savings: $19.45</div>
          </div>
        `,
        meta: 'English • WebQA'
      }
    ],
    mockup2code: [
      { id: 1, sketch: 'tables/mockup2code/1-c.png', result: 'tables/mockup2code/1.png', content: 'Convert this hand-drawn mockup into HTML/CSS code', meta: 'English • Mockup2Code' },
      { id: 2, sketch: 'tables/mockup2code/2-c.jpeg', result: 'tables/mockup2code/2.png', content: 'Generate responsive layout from this design sketch', meta: 'English • Mockup2Code' },
      { id: 3, sketch: 'tables/mockup2code/3-c.png', result: 'tables/mockup2code/3.png', content: 'Create functional web interface from mockup', meta: 'English • Mockup2Code' }
    ],
    codeedit: [
      {
        id: 1,
        before: 'tables/codeedits/1/img_before.png',
        after: 'tables/codeedits/1/img_after.png',
        prompt: `Organize navigation links in the footer in order to help users easily find content by separating 'About Us,' 'Contact Us,' and the copyright section for better visibility`,
        meta: 'English • Code Editing'
      },
      {
        id: 2,
        before: 'tables/codeedits/2/img_before.png',
        after: 'tables/codeedits/2/img_after.png',
        prompt: `Which changes should be made in the HTML code to improve the UI of the login Form and Navbar?`,
        meta: 'English • Code Editing'
      },
      {
        id: 3,
        before: 'tables/codeedits/3/img_before.png',
        after: 'tables/codeedits/3/img_after.png',
        prompt: `How can I fix the header element by adding a black overlay over the image, changing the font color to white, and setting the font family to \"Lucida Sans\"?`,
        meta: 'English • Code Editing'
      }
    ]
  };
  
  const taskSamples = samples[task] || [];
  // Clamp index
  if (carouselState[task] < 0) carouselState[task] = 0;
  if (carouselState[task] >= taskSamples.length) carouselState[task] = taskSamples.length - 1;
  const currentIndex = carouselState[task];
  const sample = taskSamples[currentIndex];

  // Clear existing content
  track.innerHTML = '';

  if (!sample) return;
  const sampleCard = document.createElement('div');
  sampleCard.className = 'sample-card';
  let content = sample.content || '';
  if (task === 'webqa') {
    sampleCard.innerHTML = `
      <img src="${sample.image}" alt="Sample ${sample.id}" class="sample-image" onerror="this.style.display='none'">
      <div class="sample-content">${sample.qa}</div>
      <div class="sample-meta">${sample.meta}</div>
    `;
  } else if (task === 'codeedit') {
    sampleCard.innerHTML = `
      <div class="codeedit-images">
        <div class="codeedit-image-col">
          <div class="codeedit-label">Before</div>
          <img src="${sample.before}" alt="Before Edit ${sample.id}" class="sample-image codeedit-image" onerror="this.style.display='none'">
        </div>
        <div class="codeedit-image-col">
          <div class="codeedit-label">After</div>
          <img src="${sample.after}" alt="After Edit ${sample.id}" class="sample-image codeedit-image" onerror="this.style.display='none'">
        </div>
      </div>
      <div class="sample-content"><div class='codeedit-prompt'><strong>Prompt:</strong> ${sample.prompt}</div></div>
      <div class="sample-meta">${sample.meta}</div>
    `;
  } else if (task === 'mockup2code') {
    sampleCard.innerHTML = `
      <div class="codeedit-images">
        <div class="codeedit-image-col">
          <div class="codeedit-label">Sketch</div>
          <img src="${sample.sketch}" alt="Sketch ${sample.id}" class="sample-image codeedit-image" onerror="this.style.display='none'">
        </div>
        <div class="codeedit-image-col">
          <div class="codeedit-label">Generated</div>
          <img src="${sample.result}" alt="Generated ${sample.id}" class="sample-image codeedit-image" onerror="this.style.display='none'">
        </div>
      </div>
      <div class="sample-content"><div class='codeedit-prompt'><strong>Prompt:</strong> ${sample.content}</div></div>
      <div class="sample-meta">${sample.meta}</div>
    `;
  } else {
    sampleCard.innerHTML = `
      <img src="${sample.image}" alt="Sample ${sample.id}" class="sample-image" onerror="this.style.display='none'">
      <div class="sample-content">${content}</div>
      <div class="sample-meta">${sample.meta}</div>
    `;
  }
  track.appendChild(sampleCard);

  // Update button states
  const prevBtn = document.querySelector(`.carousel-btn.prev[data-task="${task}"]`);
  const nextBtn = document.querySelector(`.carousel-btn.next[data-task="${task}"]`);
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === taskSamples.length - 1;
}

// Carousel navigation (one sample at a time)
document.querySelectorAll('.carousel-btn').forEach(btn => {
  btn.onclick = function() {
    const task = this.dataset.task;
    const isNext = this.classList.contains('next');
    const samplesLen = {
      webqa: 4,
      mockup2code: 3,
      codeedit: 3
    };
    if (isNext) carouselState[task] = Math.min(carouselState[task] + 1, samplesLen[task] - 1);
    else carouselState[task] = Math.max(carouselState[task] - 1, 0);
    loadSamples(task);
  };
});

// Format Q&A content for display
function formatQAContent(content) {
  const lines = content.split('\n');
  let formattedContent = '';
  let currentQuestion = '';
  let currentAnswer = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('Question')) {
      // Save previous Q&A if exists
      if (currentQuestion && currentAnswer) {
        formattedContent += `<div class="qa-pair">
          <div class="question">${currentQuestion}</div>
          <div class="answer">${currentAnswer}</div>
        </div>`;
      }
      
      // Start new question
      currentQuestion = trimmedLine.replace(/^Question \d+: /, '');
      currentAnswer = '';
    } else if (trimmedLine.startsWith('Answer:')) {
      currentAnswer = trimmedLine.replace('Answer:', '').trim();
    } else if (trimmedLine && !trimmedLine.startsWith('A)') && !trimmedLine.startsWith('B)') && !trimmedLine.startsWith('C)') && !trimmedLine.startsWith('D)')) {
      // Add to current answer if it's not a multiple choice option
      if (currentAnswer) {
        currentAnswer += ' ' + trimmedLine;
      }
    } else if (trimmedLine.startsWith('A)') || trimmedLine.startsWith('B)') || trimmedLine.startsWith('C)') || trimmedLine.startsWith('D)')) {
      // Add multiple choice options to question
      currentQuestion += '<br>' + trimmedLine;
    }
  }
  
  // Add the last Q&A pair
  if (currentQuestion && currentAnswer) {
    formattedContent += `<div class="qa-pair">
      <div class="question">${currentQuestion}</div>
      <div class="answer">${currentAnswer}</div>
    </div>`;
  }
  
  return formattedContent || content;
} 