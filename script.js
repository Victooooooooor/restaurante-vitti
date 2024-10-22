const footerbotao = document.getElementById("footer-botao")
const menu = document.getElementById("menu")
const itensCarrinho = document.getElementById("itens-carrinho")
const totalCarrinho = document.getElementById("valor-total")
const telapedido = document.getElementById("tela-pedido")
const finalizar = document.getElementById("finalizar-pedido")
const fechar = document.getElementById("fechar-pedido")
const contador = document.getElementById("contador")
const telapedido2 = document.getElementById("tela-pedido2")

let carrinho = [];

//Abrir tela de pedido
footerbotao.addEventListener("click", function() {
    atualizarCarrinho();
    telapedido.style.display = "flex"
})

//Botao de fechar tela de pedido
fechar.addEventListener("click", function() {
    telapedido.style.display = "none"
})

//Fechar tela de pedido ao clicar fora da tela
telapedido.addEventListener("click", function(event){
    if(event.target === telapedido){
        telapedido.style.display = "none"
    }
})

menu.addEventListener("click", function(event){
    let botaoParente = event.target.closest(".Botão")
    if (botaoParente){
        const nome = botaoParente.getAttribute("data-nome")
        const preço = parseFloat(botaoParente.getAttribute("data-preço"))
        adicionarNoCarrinho(nome, preço)
    }
})

//Função para adicionar item no carrinho
function adicionarNoCarrinho(nome, preço){
    const itemExistente = carrinho.find(item => item.nome === nome)

    if (itemExistente){
        itemExistente.quantidade += 1;
    } else{
        carrinho.push({
            nome,
            preço,
            quantidade: 1,
     })

    }
    atualizarCarrinho()
}

//Atualizar carrinho
function atualizarCarrinho(){
    itensCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const itemElemento = document.createElement("div");


        itemElemento.innerHTML = `
        <div class="lista">
            <div>
                <p>${item.nome}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>${item.preço.toFixed(2)}</p>
            </div>

                <button class="botaoLista" data-name="${item.nome}">
                    Remover
                </button>

        </div>
        `
        
        total += item.preço * item.quantidade;

        itensCarrinho.appendChild(itemElemento)

    })

    totalCarrinho.textContent = total.toFixed(2);

    contador.innerHTML = carrinho.length;

}

//Função para remover item da lista
itensCarrinho.addEventListener("click", function (event){
    if(event.target.classList.contains("botaoLista")){
        const nome = event.target.getAttribute("data-name")

        removerItem(nome);
    }

})

function removerItem(nome){
    const index = carrinho.findIndex(item => item.nome === nome);

    if(index !== -1){
        const item = carrinho[index];

        if (item.quantidade > 1){
            item.quantidade -= 1;
            atualizarCarrinho();
            return;
        }
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
}

