document.addEventListener('DOMContentLoaded', () => {

    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const bookItems = document.querySelectorAll('.book-card');
    const resultsTitle = document.querySelector(".results h1");
    
    const searchInput = document.getElementById("searchInput"); 
    
    const query = (localStorage.getItem("searchQuery") || "").toLowerCase();

    if (searchInput) {
        searchInput.value = query;
    }

    resultsTitle.textContent = query
        ? `Resultados da pesquisa por: “${query}”`
        : "Livros populares";

    bookItems.forEach((card) => {
        const imgDiv = card.querySelector(".book-img");
        const imgSrc = card.getAttribute("data-img");
        if (imgDiv && imgSrc) {
            imgDiv.style.backgroundImage = `url(${imgSrc})`;
            imgDiv.style.backgroundSize = "cover";
            imgDiv.style.backgroundPosition = "center";
            imgDiv.style.backgroundRepeat = "no-repeat";
        }

        card.addEventListener("click", () => {
            const title = card.querySelector("h3").textContent;
            const author = card.querySelector("p").textContent; 
            const priceText = card.querySelector("span").textContent.replace("R$ ", "");
            const price = parseFloat(priceText.replace(",", "."));
            const img = card.getAttribute("data-img");

            localStorage.setItem(
                "selectedBook",
                JSON.stringify({ title, price, img, author })
            );
            window.location.href = "livro.html";
        });
    });

    function applyFilters() {
        
        const selectedFilters = {
            price: getCheckedValues('price'),
            category: getCheckedValues('category'),
            rating: getCheckedValues('rating')
        };
        
        let visibleBookCount = 0; 

        bookItems.forEach(function(book) {
            
            const bookPrice = parseFloat(book.getAttribute('data-price'));
            const bookCategory = book.getAttribute('data-category');
            const bookRating = parseInt(book.getAttribute('data-rating'));
            const bookTitle = book.querySelector("h3").textContent.toLowerCase();
            const bookAuthor = book.querySelector("p").textContent.toLowerCase();

            const showSearch = checkSearch(bookTitle, bookAuthor, query);
            const showPrice = checkPrice(bookPrice, selectedFilters.price);
            const showCategory = checkCategory(bookCategory, selectedFilters.category);
            const showRating = checkRating(bookRating, selectedFilters.rating);

            if (showSearch && showPrice && showCategory && showRating) {
                book.classList.remove('hidden'); 
                visibleBookCount++; 
            } else {
                book.classList.add('hidden'); 
            }
        });

        if (visibleBookCount === 0) {
            if (query) {
                resultsTitle.textContent = `Nenhum resultado encontrado para: “${query}”`;
            } else {
                resultsTitle.textContent = "Nenhum livro corresponde aos filtros selecionados.";
            }
        } else if (visibleBookCount > 0 && !query) { 
             resultsTitle.textContent = "Livros populares";
        }
    }

    function checkSearch(title, author, query) {
        if (!query) { 
            return true; 
        }
        return title.includes(query) || author.includes(query);
    }

    function getCheckedValues(name) {
        const checkedValues = [];
        const checkedInputs = document.querySelectorAll(`.filters input[name="${name}"]:checked`);
        checkedInputs.forEach(function(input) {
            checkedValues.push(input.value);
        });
        return checkedValues;
    }

    function checkPrice(bookPrice, selectedPrices) {
        if (selectedPrices.length === 0) return true; 
        return selectedPrices.some(range => {
            const [min, max] = range.split('-').map(parseFloat);
            return bookPrice >= min && bookPrice <= max;
        });
    }

    function checkCategory(bookCategory, selectedCategories) {
        if (selectedCategories.length === 0) return true;
        return selectedCategories.includes(bookCategory);
    }

    function checkRating(bookRating, selectedRatings) {
        if (selectedRatings.length === 0) return true; 
        return selectedRatings.includes(String(bookRating));
    }

    filterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', applyFilters);
    });

    applyFilters();

});

const filterBtn = document.getElementById('mobileFilterBtn');
const filterWrapper = document.querySelector('.filter-sections-wrapper');

if (filterBtn && filterWrapper) {
    filterBtn.addEventListener('click', () => {
        filterWrapper.classList.toggle('active');
        
        if (filterWrapper.classList.contains('active')) {
            filterBtn.textContent = "📂 Ocultar Filtros";
            filterBtn.style.backgroundColor = "#e0b100"; 
        } else {
            filterBtn.textContent = "📂 Mostrar Filtros";
            filterBtn.style.backgroundColor = "#ffc800";
        }
    });
}