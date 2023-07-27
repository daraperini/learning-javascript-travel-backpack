const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find((elemento) => elemento.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual);
    itens[itens.findIndex((elemento) => elemento.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criaElemento(itemAtual);
    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;

  novoItem.appendChild(numeroItem);
  novoItem.innerHTML += item.nome;

  const botaoExcluir = document.createElement("button");
  botaoExcluir.innerText = "x";
  novoItem.appendChild(botaoExcluir);
  botaoExcluir.addEventListener("click", () => excluiItem(item, novoItem));

  lista.appendChild(novoItem);
}

function excluiItem(item, novoItem) {
  const index = itens.findIndex((valor) => item.id === valor.id);

  if (index !== -1) {
    lista.removeChild(novoItem);
    itens.splice(index, 1);
    localStorage.setItem("itens", JSON.stringify(itens));
  }
}

function atualizaElemento(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}
