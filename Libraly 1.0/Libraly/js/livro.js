const suggestedBooks = [
    { title: "1984", author: "George Orwell", price: 59.90, img: "img/1984.jpg" },
    { title: "A Metamorfose", author: "Franz Kafka", price: 119.90, img: "img/A metamorfose.jpg" },
    { title: "O Segredo", author: "Rhonda Byrne", price: 45.90, img: "img/Secret.jpg" },
    { title: "Dom Casmurro", author: "Machado de Assis", price: 34.90, img: "img/Dom Cas.jpg" },
    { title: "Os Crimes ABC", author: "Agatha Christie", price: 39.90, img: "img/ABC.jpg" },
    { title: "Battle Royale", author: "Koushun Takami", price: 69.90, img: "img/battle.jpg" }
];

function formatPrice(value) {
  if (!value) return "R$ --,--";
  let num = parseFloat(value.toString().replace(",", "."));
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

document.addEventListener("DOMContentLoaded", () => {
  const bookTitle = document.getElementById("bookTitle");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookImage = document.getElementById("bookImage");
  const bookPrice = document.getElementById("bookPrice");
  const bookDescription = document.getElementById("bookDescription");
  
  const savedBook = JSON.parse(localStorage.getItem("selectedBook"));

  if (savedBook) {
    bookTitle.textContent = savedBook.title || "Título Indisponível";
    bookAuthor.innerHTML = `<strong>Autor:</strong> ${savedBook.author || "Desconhecido"}`;
    bookPrice.textContent = formatPrice(savedBook.price);
    bookImage.src = savedBook.img || "img/default.jpg";
    
    bookDescription.textContent = `Mergulhe nesta incrível história de ${savedBook.author}. "${savedBook.title}" é uma obra aclamada que prende o leitor do início ao fim com sua narrativa envolvente e personagens marcantes. Edição especial com acabamento de alta qualidade.`;
  }

  const relatedContainer = document.querySelector('.related-grid');
  
  const shuffled = suggestedBooks.sort(() => 0.5 - Math.random());
  const selectedRelated = shuffled.filter(b => b.title !== (savedBook ? savedBook.title : "")).slice(0, 3);

  relatedContainer.innerHTML = "";

  selectedRelated.forEach(book => {
    const card = document.createElement('div');
    card.className = 'related-box';
    card.innerHTML = `
        <div class="related-img">
            <img src="${book.img}" alt="${book.title}">
        </div>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <span>${formatPrice(book.price)}</span>
    `;

    card.addEventListener('click', () => {
        localStorage.setItem("selectedBook", JSON.stringify(book));
        window.scrollTo(0, 0);
        location.reload(); 
    });

    relatedContainer.appendChild(card);
  });

  const btnAdicionar = document.querySelector(".add-btn");
  const btnComprar = document.getElementById("buyButton");

  if (btnAdicionar && savedBook) {
    btnAdicionar.addEventListener("click", () => {
      adicionarAoCarrinho(savedBook);
      alert(`"${savedBook.title}" foi adicionado ao carrinho!`);
    });
  }

  if (btnComprar && savedBook) {
    btnComprar.addEventListener("click", () => {
      adicionarAoCarrinho(savedBook);
      localStorage.setItem("checkoutBook", JSON.stringify(savedBook)); 
      window.location.href = "carrinho.html";
    });
  }
});

function adicionarAoCarrinho(livro) {
  let carrinho = JSON.parse(localStorage.getItem("cart")) || [];
  const itemExistente = carrinho.find(item => item.title === livro.title);

  if (itemExistente) {
    itemExistente.quantity += 1;
  } else {
    carrinho.push({
      title: livro.title,
      author: livro.author,
      price: livro.price,
      img: livro.img,
      quantity: 1
    });
  }
  localStorage.setItem("cart", JSON.stringify(carrinho));
}