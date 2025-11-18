document.querySelector('.search-bar button').addEventListener('click', () => {
  const query = document.querySelector('.search-bar input').value.trim();
  if (query) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "pesquisa.html";
  }
});

document.querySelector('.search-bar input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.querySelector('.search-bar button').click();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll("#bannerCarousel .carousel-item");
  const dots = document.querySelectorAll(".dot");
  
  if (slides.length > 0) {
    let currentIndex = 0;
    let interval = setInterval(nextSlide, 5000);

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if(dots[i]) dots[i].classList.remove("active");
      });
      slides[index].classList.add("active");
      if(dots[index]) dots[index].classList.add("active");
      currentIndex = index;
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }

    showSlide(currentIndex);

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        clearInterval(interval);
        showSlide(parseInt(dot.dataset.index));
        interval = setInterval(nextSlide, 5000);
      });
    });

    const btnLeftBanner = document.getElementById('bannerPrev');
    const btnRightBanner = document.getElementById('bannerNext');
    if (btnLeftBanner && btnRightBanner) {
      btnLeftBanner.addEventListener('click', () => {
        clearInterval(interval);
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        showSlide(currentIndex);
        interval = setInterval(nextSlide, 5000);
      });
      btnRightBanner.addEventListener('click', () => {
        clearInterval(interval);
        nextSlide();
        interval = setInterval(nextSlide, 5000);
      });
    }
  }
});

function setupAlignedCarousel(carouselId, btnLeftId, btnRightId, visibleBoxes = 6) {
  const carousel = document.getElementById(carouselId);
  const btnLeft = document.getElementById(btnLeftId);
  const btnRight = document.getElementById(btnRightId);

  if (!carousel || !btnLeft || !btnRight) return;

  const boxes = carousel.querySelectorAll('.author-box, .book-box, .genre-box');
  if (!boxes.length) return;

  const gap = parseInt(getComputedStyle(carousel).gap) || 0;
  const box = boxes[0];
  
  btnLeft.disabled = true;
  btnLeft.style.opacity = "0.4";

  function updateButtons() {
    const scrollLeft = Math.ceil(carousel.scrollLeft);
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    btnLeft.disabled = scrollLeft <= 0;
    btnRight.disabled = scrollLeft >= maxScroll - 1; 

    btnLeft.style.opacity = btnLeft.disabled ? "0.4" : "1";
    btnRight.style.opacity = btnRight.disabled ? "0.4" : "1";
  }

  function scrollToIndex(direction) {
    const boxWidth = box.offsetWidth + gap;
    const scrollAmount = boxWidth * 2; 

    if (direction === 'next') {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }

  btnRight.addEventListener("click", () => {
    scrollToIndex('next');
  });

  btnLeft.addEventListener("click", () => {
    scrollToIndex('prev');
  });

  carousel.addEventListener('scroll', () => {
      clearTimeout(carousel.scrollTimeout);
      carousel.scrollTimeout = setTimeout(updateButtons, 50);
  });

  updateButtons();
}

setupAlignedCarousel('authorsCarousel', 'authorsPrev', 'authorsNext', 6);
setupAlignedCarousel('highlightsCarousel', 'highlightsPrev', 'highlightsNext', 6);
setupAlignedCarousel('genresCarousel', 'genresPrev', 'genresNext', 6);

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('main-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      menuBtn.classList.toggle('active');
    });
  }
});

document.querySelectorAll(".book-box").forEach(book => {
    book.addEventListener("click", () => {

        const data = {
            title: book.dataset.title,
            author: book.dataset.author,
            description: book.dataset.description,
            price: book.dataset.price,
            img: book.dataset.img
        };

        localStorage.setItem("selectedBook", JSON.stringify(data));
        window.location.href = "livro.html";
    });
});