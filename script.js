const lojaJoao = Vue.createApp({
  data() {
    return {
      dados: dadosProjeto,
      pagina: 'inicio',
      bannerAtual: 0,
      busca: '',
      quantidade: 1,
      miniatura: 0,
      modeloAtual: 'Mario Kart World [CÓDIGO DOWNLOAD]',
      modelos: ['Mario Kart World [CÓDIGO DOWNLOAD]', 'Mario Kart World [JOGO INTEGRADO]', 'Pokémon Legends: Z-A [JOGO INTEGRADO]', 'Standard'],
      nomesNovidades: ['Darth Vader', 'O Senhor dos Anéis', 'Millennium Falcon', 'R2-D2', 'O Hobbit edição de luxo', 'Yoda'],
      menuAberto: false,
      carrinhoAberto: false,
      imagemAberta: false,
      fotosAbertas: false,
      localAberto: false,
      avaliacaoAberta: false,
      parcelasAbertas: false,
      fotoAtual: '',
      carrinho: [],
      mensagem: '',
      identificador: '',
      cep: '',
      cepDigitado: '',
      erroCep: '',
      naLista: false,
      seguro: false,
      garantia: false,
      presente: false,
      util: false,
      nota: 0,
      textoReview: '',
      elementoAnterior: null,
      gruposMenu: [
        { titulo: 'Destaques', itens: ['Mais Vendidos', 'Novidades na Amazon', 'Produtos em alta'] },
        { titulo: 'Conteúdo digital e dispositivos', itens: ['Amazon Fire TV', 'Amazon Music', 'Prime Video', 'Aplicativos Amazon', 'Dispositivos Kindle e eBooks', 'Echo e Alexa', 'Audiolivros Audible'] },
        { titulo: 'Comprar por categoria', itens: ['Alimentos e Bebidas', 'Automotivo', 'Bebês', 'Beleza e Cuidados Pessoais'] }
      ],
      rodape: [
  {
    "titulo": "Conheça-nos",
    "links": [
      {
        "nome": "Sobre a Amazon",
        "url": "https://www.aboutamazon.com.br/"
      },
      {
        "nome": "Informações corporativas",
        "url": "https://www.amazon.com.br/gp/browse.html?node=23490129011"
      },
      {
        "nome": "Carreiras",
        "url": "https://www.amazon.jobs/"
      },
      {
        "nome": "Comunicados à imprensa",
        "url": "https://www.amazon.com.br/gp/browse.html?node=15155858011"
      },
      {
        "nome": "Comunidade",
        "url": "https://www.amazon.com.br/gp/browse.html?node=16593314011"
      },
      {
        "nome": "Acessibilidade",
        "url": "https://www.amazon.com.br/gp/browse.html?node=23454858011"
      },
      {
        "nome": "Amazon Science",
        "url": "https://www.amazon.science/"
      }
    ]
  },
  {
    "titulo": "Ganhe dinheiro conosco",
    "links": [
      {
        "nome": "Venda na Amazon",
        "url": "https://venda.amazon.com.br/"
      },
      {
        "nome": "Proteja e construa a sua marca",
        "url": "https://brandservices.amazon.com.br/"
      },
      {
        "nome": "Forneça para a Amazon",
        "url": "https://supply.amazon.com/"
      },
      {
        "nome": "Publique seus livros",
        "url": "https://kdp.amazon.com/?language=pt_BR"
      },
      {
        "nome": "Seja um associado",
        "url": "https://associados.amazon.com.br/"
      },
      {
        "nome": "Anuncie seus produtos",
        "url": "https://advertising.amazon.com/pt-br"
      }
    ]
  },
  {
    "titulo": "Pagamento",
    "links": [
      {
        "nome": "Meios de Pagamento",
        "url": "https://www.amazon.com.br/gp/browse.html?node=16568920011"
      },
      {
        "nome": "Compre com Pontos",
        "url": "https://www.amazon.com.br/gp/browse.html?node=24028636011"
      },
      {
        "nome": "Cartão de crédito Amazon",
        "url": "https://www.amazon.com.br/credit/application/landing"
      }
    ]
  },
  {
    "titulo": "Deixe-nos ajudar você",
    "links": [
      {
        "nome": "Sua conta",
        "url": "https://www.amazon.com.br/gp/css/homepage.html"
      },
      {
        "nome": "Frete e prazo de entrega",
        "url": "https://www.amazon.com.br/gp/help/customer/display.html?nodeId=201365500"
      },
      {
        "nome": "Devoluções e reembolsos",
        "url": "https://www.amazon.com.br/gp/help/customer/display.html?nodeId=GNW5VKFXMF72FFMR"
      },
      {
        "nome": "Gerencie seu conteúdo e dispositivos",
        "url": "https://www.amazon.com.br/hz/mycd/myx"
      },
      {
        "nome": "Recalls e alertas de segurança do produto",
        "url": "https://www.amazon.com.br/your-product-safety-alerts"
      },
      {
        "nome": "Ajuda",
        "url": "https://www.amazon.com.br/gp/help/customer/display.html?nodeId=508510"
      }
    ]
  }
]
    };
  },
  computed: {
    totalItens() {
      let quantidadeTotal = 0;
      this.carrinho.forEach(produto => {
        quantidadeTotal += produto.quantidade;
      });
      return quantidadeTotal;
    },
    totalCarrinho() {
      let valorTotal = 0;
      this.carrinho.forEach(produto => {
        valorTotal = valorTotal + produto.preco * produto.quantidade;
      });
      return valorTotal;
    },
    modalAberto() {
      return this.carrinhoAberto || this.imagemAberta || this.fotosAbertas || this.localAberto || this.avaliacaoAberta;
    }
  },
  watch: {
    modalAberto(aberto) {
      if (aberto) {
        this.elementoAnterior = document.activeElement;
        this.$nextTick(() => this.$refs.modal.focus());
      } else if (this.elementoAnterior) {
        this.elementoAnterior.focus();
      }
    }
  },
  methods: {
    moeda(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    atualizarPagina() {
      const destino = location.hash.replace('#/', '');
      if (['inicio', 'produto', 'login'].includes(destino)) {
        this.pagina = destino;
        this.menuAberto = false;
        this.fecharModais();
        window.scrollTo(0, 0);
      }
    },
    avisar(texto) {
      this.mensagem = texto;
    },
    pesquisar() {
      const termo = this.busca.trim();
      if (!termo) {
        this.avisar('Digite o nome do produto que deseja pesquisar.');
        return;
      }
      if (/nintendo|switch|mario|console|game|donkey/i.test(termo)) {
        location.hash = '/produto';
        this.avisar('Resultado encontrado: Nintendo Switch 2.');
      } else {
        this.avisar('Esta demonstração contém a página de produto do Nintendo Switch 2. Pesquise por Nintendo ou Switch.');
      }
    },
    adicionar(nome, preco, imagem, quantidade) {
      const item = this.carrinho.find(item => item.nome === nome && item.preco === preco);
      if (item) {
        item.quantidade += quantidade;
      } else {
        this.carrinho.push({ nome, preco, imagem, quantidade });
      }
      this.avisar('Produto adicionado ao carrinho.');
    },
    adicionarConsole() {
      const preco = 4499.99 + (this.seguro ? 429.90 : 0) + (this.garantia ? 299.90 : 0);
      const nome = 'Nintendo Switch 2 — ' + this.modeloAtual + (this.seguro ? ' + seguro' : '') + (this.garantia ? ' + garantia' : '');
      this.adicionar(nome, preco, this.dados.switch, Number(this.quantidade));
    },
    mudarBanner(direcao) {
      const quantidadeBanners = this.dados.banners.length;
      const proximoIndice = this.bannerAtual + direcao;
      this.bannerAtual = (proximoIndice + quantidadeBanners) % quantidadeBanners;
    },
    adicionarRelacionado(item) {
      this.adicionar(item.nome, item.preco, item.imagem, 1);
    },
    adicionarJogo() {
      this.adicionar('Donkey Kong Bananza', 439.90, this.dados.jogo, 1);
    },
    rolar(id, direcao) {
      document.getElementById(id).scrollBy({ left: direcao * 500, behavior: 'smooth' });
    },
    continuarLogin() {
      this.identificador = '';
      this.avisar('Formulário de demonstração. Nenhum dado foi enviado ou armazenado.');
    },
    salvarCep() {
      if (!/^\d{5}-?\d{3}$/.test(this.cepDigitado)) {
        this.erroCep = 'Digite um CEP válido com 8 números.';
        return;
      }
      const numeros = this.cepDigitado.replace('-', '');
      this.cep = numeros.slice(0, 5) + '-' + numeros.slice(5);
      this.erroCep = '';
      this.localAberto = false;
      this.avisar('CEP atualizado nesta demonstração.');
    },
    salvarAvaliacao() {
      if (!this.nota) {
        this.avisar('Selecione uma nota de 1 a 5 estrelas.');
        return;
      }
      this.avaliacaoAberta = false;
      this.avisar('Avaliação demonstrativa salva nesta sessão: ' + this.nota + ' de 5 estrelas.');
    },
    fecharModais() {
      this.carrinhoAberto = false;
      this.imagemAberta = false;
      this.fotosAbertas = false;
      this.localAberto = false;
      this.avaliacaoAberta = false;
    },
    conterFoco(evento) {
      const elementos = this.$refs.modal.querySelectorAll('button, input, textarea, a[href]');
      const primeiro = elementos[0];
      const ultimo = elementos[elementos.length - 1];
      if (evento.shiftKey && (document.activeElement === primeiro || document.activeElement === this.$refs.modal)) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    },
    fecharComEscape(evento) {
      if (evento.key === 'Escape') {
        this.menuAberto = false;
        this.fecharModais();
      }
    }
  },
  mounted: function() {
    this.atualizarPagina();
    window.addEventListener('hashchange', this.atualizarPagina);
    window.addEventListener('keydown', this.fecharComEscape);
  }
});

lojaJoao.mount('#app');
