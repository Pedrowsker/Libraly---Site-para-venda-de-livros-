document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkoutBook = JSON.parse(localStorage.getItem("checkoutBook"));

  let itemsToBuy = [];
  let totalPrice = 0;

  if (cart.length > 0) {
    itemsToBuy = cart;
  } else if (checkoutBook) {
    itemsToBuy = [checkoutBook];
  }

  if (itemsToBuy.length === 0) {
    alert("Seu carrinho está vazio!");
    window.location.href = "index.html";
    return;
  }

  itemsToBuy.forEach(item => {
    totalPrice += (item.price * item.quantity);
  });

  const frete = 10.00;
  const finalTotal = totalPrice + frete;

  document.getElementById("checkoutTitle").textContent = `Resumo do Pedido (${itemsToBuy.length} itens)`;
  
  if (itemsToBuy.length === 1) {
    document.getElementById("checkoutAuthor").textContent = itemsToBuy[0].author;
    document.getElementById("checkoutImage").src = itemsToBuy[0].img;
  } else {
    document.getElementById("checkoutAuthor").textContent = "Vários autores";
    document.getElementById("checkoutImage").src = "img/logo.png";
    document.getElementById("checkoutImage").style.objectFit = "contain";
  }

  document.getElementById("checkoutPrice").textContent = `Subtotal: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
  document.getElementById("checkoutFrete").textContent = `Frete: R$ ${frete.toFixed(2).replace('.', ',')}`;
  document.getElementById("checkoutTotal").textContent = `Total: R$ ${finalTotal.toFixed(2).replace('.', ',')}`;

  const btnFinalizar = document.querySelector(".btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", (e) => {
      e.preventDefault();

      const inputs = document.querySelectorAll(".payment-form input");
      let valid = true;
      inputs.forEach(input => {
        if(!input.value) valid = false;
      });

      if (!valid) {
        alert("Por favor, preencha todos os campos de pagamento e entrega.");
        return;
      }

      let pedidosAntigos = JSON.parse(localStorage.getItem("pedidos")) || [];
      
      const numeroPedido = "LBR" + Math.floor(Math.random() * 90000 + 10000);
      const dataEntrega = new Date();
      dataEntrega.setDate(dataEntrega.getDate() + 7);

      itemsToBuy.forEach(item => {
        pedidosAntigos.push({
          numeroPedido: numeroPedido,
          title: item.title,
          author: item.author,
          img: item.img,
          price: item.price,
          quantity: item.quantity,
          status: "Pedido Confirmado",
          dataEntrega: dataEntrega.toLocaleDateString("pt-BR"),
          endereco: document.querySelector("input[placeholder='Rua e número']").value || "Endereço Padrão"
        });
      });

      localStorage.setItem("pedidos", JSON.stringify(pedidosAntigos));

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutBook");

      alert("Compra realizada com sucesso!");
      window.location.href = "pedidos.html";
    });
  }
});