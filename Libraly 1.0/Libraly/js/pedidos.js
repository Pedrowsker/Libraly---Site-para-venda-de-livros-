let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const container = document.getElementById("listaPedidos");

if (!container) {
  console.error("Elemento #listaPedidos não encontrado no HTML.");
}

if (pedidos.length === 0) {
  container.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
} else {
  pedidos.forEach(p => {
    const pedidoHTML = `
      <div class="pedido-card">
        <img src="${p.img}" alt="Capa do livro ${p.title}">
        <div class="pedido-info">
          <h2>${p.title}</h2>
          <p>Autor: ${p.author}</p>
          <p><b>Pedido:</b> ${p.numeroPedido}</p>
          <p><b>Status:</b> ${p.status}</p>
          <p><b>Entrega prevista:</b> ${p.dataEntrega}</p>
          <p><b>Endereço:</b> ${p.endereco}</p>
          <button class="track-btn" onclick="rastrear('${p.numeroPedido}')">Rastrear pedido</button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", pedidoHTML);
  });
}

function rastrear(codigo) {
  alert(`Rastreando pedido #${codigo}...`);
}

const overlay = document.getElementById("rastreamentoOverlay");
const fechar = document.getElementById("fecharRastreamento");
const statusList = document.querySelectorAll(".status-list li");

document.querySelectorAll(".track-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    overlay.style.display = "flex";

    const pedido = pedidos[index];

    const etapas = ["Pedido Confirmado", "Aguardando Envio", "A caminho", "Saiu para entrega", "Entregue"];
    const indexStatus = etapas.indexOf(pedido.status);

    statusList.forEach((li, i) => {
      li.classList.toggle("active", i <= indexStatus);
    });

    document.getElementById("rastreamentoTitulo").textContent = `Rastreio do Pedido #${pedido.numeroPedido}`;
  });
});

fechar.addEventListener("click", () => {
  overlay.style.display = "none";
});