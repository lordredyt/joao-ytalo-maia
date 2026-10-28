<script>
export default {
  inject: ["loja"],
  data() {
    return { base: import.meta.env.BASE_URL };
  },
};
</script>

<template>
  <div
    class="fundo-menu"
    v-if="loja.menuAberto"
    @click.self="loja.menuAberto = false"
  >
    <aside
      class="menu-lateral"
      role="dialog"
      aria-modal="true"
      aria-label="Todas as categorias"
    >
      <a class="login-menu" href="#/login" @click="loja.menuAberto = false"
        ><span>●</span> Olá, faça seu login</a
      >
      <div v-for="grupo in loja.gruposMenu" :key="grupo.titulo">
        <h2>{{ grupo.titulo }}</h2>
        <a
          v-for="item in grupo.itens"
          :key="item"
          href="#/produto"
          @click="loja.menuAberto = false"
          >{{ item }} <span>›</span></a
        >
      </div>
    </aside>
    <button
      class="fechar-menu"
      aria-label="Fechar menu"
      @click="loja.menuAberto = false"
    >
      ×
    </button>
  </div>
  <div v-if="loja.mensagem" class="notificacao" role="status">
    {{ loja.mensagem
    }}<button aria-label="Fechar aviso" @click="loja.mensagem = ''">×</button>
  </div>
  <div
    class="fundo-modal"
    v-if="loja.modalAberto"
    @click.self="loja.fecharModais"
  >
    <section
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
      tabindex="-1"
      ref="modal"
      @keydown.tab="loja.conterFoco"
    >
      <button
        class="fechar-modal"
        aria-label="Fechar janela"
        @click="loja.fecharModais"
      >
        ×</button
      ><template v-if="loja.carrinhoAberto"
        ><h2 id="titulo-modal">Seu carrinho</h2>
        <article
          class="item-carrinho"
          v-for="(item, indice) in loja.carrinho"
          :key="indice"
        >
          <img v-bind:src="item.imagem" v-bind:alt="item.nome" />
          <div>
            <strong>{{ item.nome }}</strong>
            <p>Quantidade: {{ item.quantidade }}</p>
            <p>{{ loja.moeda(item.preco * item.quantidade) }}</p>
            <button class="link" @click="loja.carrinho.splice(indice, 1)">
              Remover
            </button>
          </div>
        </article>
        <p v-if="!loja.carrinho.length">Seu carrinho está vazio.</p>
        <p>
          Subtotal: <strong>{{ loja.moeda(loja.totalCarrinho) }}</strong>
        </p>
        <small>Compra simulada. Nenhum pagamento é realizado.</small></template
      ><template v-if="loja.imagemAberta"
        ><h2 id="titulo-modal">Nintendo Switch 2</h2>
        <img
          class="imagem-ampliada"
          v-bind:src="loja.dados.galeria[loja.miniatura].arquivo"
          v-bind:alt="loja.dados.galeria[loja.miniatura].descricao" /></template
      ><template v-if="loja.fotosAbertas"
        ><h2 id="titulo-modal">Fotos das avaliações</h2>
        <img
          class="imagem-ampliada"
          v-bind:src="loja.fotoAtual || loja.dados.fotos[0]"
          alt="Foto de cliente" />
        <div class="mini-fotos">
          <button
            v-for="foto in loja.dados.fotos"
            :key="foto"
            @click="loja.fotoAtual = foto"
          >
            <img v-bind:src="foto" alt="Selecionar foto de cliente" />
          </button></div></template
      ><template v-if="loja.localAberto"
        ><h2 id="titulo-modal">Escolha sua localização</h2>
        <form @submit.prevent="loja.salvarCep">
          <label for="cep">Digite seu CEP</label
          ><input
            id="cep"
            v-model="loja.cepDigitado"
            inputmode="numeric"
            maxlength="9"
            placeholder="00000-000"
            required
          />
          <p v-if="loja.erroCep" class="erro" role="alert">
            {{ loja.erroCep }}
          </p>
          <button class="botao amarelo">Aplicar</button>
        </form></template
      ><template v-if="loja.avaliacaoAberta"
        ><h2 id="titulo-modal">Avalie este produto</h2>
        <div class="votar">
          <button
            v-for="numero in 5"
            :key="numero"
            :aria-label="numero + ' estrelas'"
            @click="loja.nota = numero"
          >
            {{ numero <= loja.nota ? "★" : "☆" }}
          </button>
        </div>
        <label for="texto-review">Sua opinião</label
        ><textarea
          id="texto-review"
          v-model="loja.textoReview"
          rows="4"
        ></textarea
        ><button class="botao amarelo" @click="loja.salvarAvaliacao">
          Salvar avaliação demonstrativa
        </button></template
      >
    </section>
  </div>
</template>
