<script>
export default {
  inject: ["loja"],
  data() {
    return { base: import.meta.env.BASE_URL };
  },
};
</script>

<template>
  <main class="pagina-login">
    <a href="#/inicio" class="marca marca-login"
      ><img :src="base + 'assets/logo-escuro.svg'" alt="Amazon" /><span
        >.com.br</span
      ></a
    >
    <section class="caixa-login">
      <h1>Faça login ou crie uma conta</h1>
      <form @submit.prevent="loja.continuarLogin">
        <label for="identificador">Digite um número de celular ou e-mail</label
        ><input
          id="identificador"
          v-model="loja.identificador"
          type="text"
          required
        /><button class="botao amarelo" type="submit">Continuar</button>
      </form>
      <p>
        Ao continuar, você concorda com as
        <a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201283910"
          target="_blank"
          rel="noopener noreferrer"
          >Condições de Uso</a
        >
        e a
        <a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201283950"
          target="_blank"
          rel="noopener noreferrer"
          >Notificação de privacidade da Amazon.</a
        >
      </p>
      <button
        class="link"
        @click="
          loja.avisar(
            'Formulário demonstrativo: nenhum dado é enviado ou armazenado.',
          )
        "
      >
        Precisa de ajuda?
      </button>
    </section>
    <div class="rodape-login">
      <nav>
        <a href="#/inicio">Condições de uso</a
        ><a href="#/inicio">Notificação de privacidade</a
        ><a href="#/inicio">Ajuda</a><a href="#/inicio">Aviso de cookies</a
        ><a href="#/inicio">Anúncios baseados em interesses</a>
      </nav>
      <p>© 1996-2026, Amazon.com, Inc. ou suas afiliadas</p>
      <small
        >Projeto acadêmico • João Ytalo Maia. Nenhum dado de login é
        enviado.</small
      >
    </div>
  </main>
</template>
