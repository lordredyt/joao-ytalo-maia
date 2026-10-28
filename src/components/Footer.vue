<script>
export default {
  inject: ["loja"],
  data() {
    return { base: import.meta.env.BASE_URL };
  },
};
</script>

<template>
  <section class="recomendacao-login">
    <h2>Veja recomendações personalizadas</h2>
    <a class="botao amarelo" href="#/login">Faça seu login</a>
    <p>Cliente novo? <a href="#/login">Comece aqui.</a></p>
  </section>
  <footer id="rodape">
    <div class="assinatura-projeto">Projeto acadêmico • João Ytalo Maia</div>
    <a class="voltar" href="#topo">Voltar ao início</a>
    <div class="colunas-rodape">
      <div v-for="coluna in loja.rodape" :key="coluna.titulo">
        <h3>{{ coluna.titulo }}</h3>
        <ul>
          <li v-for="item in coluna.links" :key="item.nome">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
              item.nome
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="pais-rodape">
      <a class="logo-footer" href="#/inicio" aria-label="Amazon início"
        ><img :src="base + 'assets/logo-claro.svg'" alt="Amazon" /></a
      ><a
        class="pais"
        href="https://www.amazon.com.br/customer-preferences/country"
        target="_blank"
        rel="noopener noreferrer"
        ><span class="bandeira-brasil" aria-hidden="true"></span> Brasil</a
      >
    </div>
    <div class="rodape-legal">
      <nav aria-label="Informações legais">
        <a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201283910"
          target="_blank"
          rel="noopener noreferrer"
          >Condições de Uso</a
        ><a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201283950"
          target="_blank"
          rel="noopener noreferrer"
          >Notificação de Privacidade</a
        ><a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201890250"
          target="_blank"
          rel="noopener noreferrer"
          >Cookies</a
        ><a
          href="https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201283970"
          target="_blank"
          rel="noopener noreferrer"
          >Anúncios Baseados em Interesses</a
        >
      </nav>
      <p class="copyright">© 2021-2026 Amazon.com, Inc. ou suas afiliadas</p>
      <p>Amazon Serviços de Varejo do Brasil Ltda. | CNPJ 15.436.940/0001-03</p>
      <p>
        Av. Juscelino Kubitschek, 2041, Torre E, 18° andar - São Paulo CEP:
        04543-011 |
        <a
          href="https://www.amazon.com.br/gp/help/customer/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          >Fale conosco</a
        >
        | ajuda-amazon@amazon.com.br
      </p>
      <p>
        Formas de pagamento aceitas: cartões de crédito (Visa, Mastercard, Elo e
        Amex), Pix, Nupay, pontos Livelo e parcelamento sem cartão.
      </p>
      <p class="aviso-projeto">
        Projeto acadêmico sem vínculo com a Amazon. Compras simuladas. Marca e
        imagens pertencem aos seus respectivos titulares.
      </p>
    </div>
  </footer>
</template>
