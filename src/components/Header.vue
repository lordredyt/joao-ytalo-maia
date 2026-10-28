<script>
export default {
  inject: ["loja"],
  data() {
    return { base: import.meta.env.BASE_URL };
  },
};
</script>

<template>
  <header id="topo">
    <div class="cabecalho">
      <a class="marca" href="#/inicio" aria-label="Amazon página inicial"
        ><img :src="base + 'assets/logo-claro.svg'" alt="Amazon" /><span
          >.com.br</span
        ></a
      >
      <button class="endereco" @click="loja.localAberto = true">
        <span class="local-pin">⌖</span
        ><span
          ><small
            >A entrega será feita em
            {{ loja.cep || "Bela Vista 11300908" }}</small
          ><strong>Atualizar CEP</strong></span
        >
      </button>
      <form class="pesquisa" @submit.prevent="loja.pesquisar">
        <label class="sr-only" for="departamento">Departamento</label
        ><select id="departamento">
          <option>Todos</option>
          <option>Games</option>
          <option>Casa</option></select
        ><label class="sr-only" for="busca">Pesquisar Amazon.com.br</label
        ><input
          id="busca"
          v-model="loja.busca"
          placeholder="Pesquisar Amazon.com.br"
        /><button type="submit" aria-label="Pesquisar">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10" cy="10" r="7" />
            <path d="m15 15 6 6" />
          </svg>
        </button>
      </form>
      <a class="conta" href="#/login"
        ><small>Olá, faça seu login</small><strong>Contas e Listas ▾</strong></a
      >
      <button
        class="pedidos"
        @click="
          loja.avisar('Os pedidos não estão disponíveis nesta demonstração.')
        "
      >
        <small>Devoluções</small><strong>e Pedidos</strong>
      </button>
      <button
        class="carrinho"
        @click="loja.carrinhoAberto = true"
        aria-label="Abrir carrinho"
      >
        <span
          ><b>{{ loja.totalItens }}</b
          ><svg viewBox="0 0 44 34" aria-hidden="true">
            <path
              d="M1 2h6l5 22h24l5-17H9M14 28a2 2 0 1 0 0 4 2 2 0 0 0 0-4m19 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
            /></svg></span
        ><strong>Carrinho</strong>
      </button>
    </div>
    <nav class="menu-principal" aria-label="Menu principal">
      <button @click="loja.menuAberto = true">☰ Todos</button
      ><a href="#/inicio">Venda na Amazon</a><a href="#/inicio">Mais Vendidos</a
      ><a href="#/inicio">Ofertas do Dia</a><a href="#/produto">Prime ▾</a
      ><a href="#/inicio">Música</a><a href="#/inicio">Eletrônicos</a
      ><a href="#/inicio">Casa</a><a href="#/inicio">Brinquedos e Jogos</a
      ><a href="#/inicio">Mercado</a><a href="#/inicio">Novidades na Amazon</a
      ><a href="#/inicio">Computadores</a><a href="#/inicio">Beleza</a
      ><a href="#/inicio">Livros</a>
    </nav>
  </header>
</template>
