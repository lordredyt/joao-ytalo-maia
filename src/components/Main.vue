<script>
export default {
  inject: ["loja"],
  data() {
    return { base: import.meta.env.BASE_URL };
  },
};
</script>

<template>
  <main v-if="loja.pagina === 'inicio'" class="pagina-inicial">
    <section
      class="hero hero-vitrine"
      :style="{ backgroundColor: loja.dados.banners[loja.bannerAtual].fundo }"
      aria-label="Destaques da loja"
    >
      <div class="banner-conteudo">
        <div>
          <span class="chamada-banner">Seleção de produtos</span>
          <h1>{{ loja.dados.banners[loja.bannerAtual].titulo }}</h1>
          <p>{{ loja.dados.banners[loja.bannerAtual].subtitulo }}</p>
          <a href="#/produto" class="link-banner"
            >Conheça o Nintendo Switch 2 ›</a
          >
        </div>
        <a class="foto-banner" href="#/produto"
          ><img
            v-bind:src="loja.dados.banners[loja.bannerAtual].imagem"
            v-bind:alt="loja.dados.banners[loja.bannerAtual].titulo"
        /></a>
      </div>
      <button
        class="seta anterior"
        aria-label="Banner anterior"
        @click="loja.mudarBanner(-1)"
      >
        ‹</button
      ><button
        class="seta proxima"
        aria-label="Próximo banner"
        @click="loja.mudarBanner(1)"
      >
        ›
      </button>
    </section>
    <div class="conteudo-home">
      <section class="grade-ofertas" aria-label="Ofertas em destaque">
        <article
          class="card-oferta"
          v-for="card in loja.dados.ofertas"
          :key="card.titulo"
        >
          <h2>{{ card.titulo }}</h2>
          <div class="grade-miniaturas">
            <a
              v-for="(imagem, indice) in card.imagens"
              :key="imagem"
              href="#/produto"
              ><div class="produto-miniatura">
                <img
                  v-bind:src="imagem"
                  v-bind:alt="
                    card.nomes
                      ? card.nomes[indice]
                      : card.titulo + ' — produto ' + (indice + 1)
                  "
                />
              </div>
              <div v-if="card.desconto" class="selo-oferta">
                <span>18% off</span><strong>Oferta</strong>
              </div>
              <span v-else class="legenda">{{ card.nomes[indice] }}</span></a
            >
          </div>
          <a class="ver-mais" href="#/produto">{{ card.link }}</a>
        </article>
        <div class="coluna-acesso">
          <article class="card-acesso">
            <h2>Acesse uma conta para ter a melhor experiência</h2>
            <a class="botao amarelo" href="#/login"
              >Fazer login de forma segura</a
            >
          </article>
          <article class="card-anuncio">
            <a href="#/produto"
              ><div class="anuncio-imagem">
                <img
                  v-bind:src="loja.dados.publicidade.imagem"
                  v-bind:alt="loja.dados.publicidade.nome"
                />
              </div>
              <p>{{ loja.dados.publicidade.nome }}</p></a
            >
            <div><span class="estrelas">★★★★★</span></div>
            <p class="preco-anuncio">{{ loja.dados.publicidade.preco }}</p>
            <div class="prime">✓prime</div>
            <span class="patrocinado">Seleção em destaque</span>
          </article>
        </div>
      </section>
      <section class="grade-destaques" aria-label="Mais ofertas">
        <article
          v-for="card in loja.dados.destaques"
          :key="card.titulo + card.link"
          class="card-oferta"
        >
          <h2>{{ card.titulo }}</h2>
          <div
            :class="
              card.imagens.length === 1 ? 'imagem-destaque' : 'grade-miniaturas'
            "
          >
            <a
              v-for="(imagem, indice) in card.imagens"
              :key="imagem"
              href="#/produto"
              ><img
                v-bind:src="imagem"
                v-bind:alt="card.nomes ? card.nomes[indice] : card.titulo"
              /><span v-if="card.nomes" class="legenda">{{
                card.nomes[indice]
              }}</span></a
            >
          </div>
          <a class="ver-mais" href="#/produto">{{ card.link }}</a>
        </article>
      </section>
      <section class="painel categorias">
        <h2>Confira ofertas por categoria</h2>
        <div class="faixa" id="faixa-categorias">
          <a
            v-for="(imagem, indice) in loja.dados.categorias"
            :key="imagem"
            href="#/produto"
            ><img
              v-bind:src="imagem"
              v-bind:alt="'Ofertas por categoria ' + (indice + 1)"
          /></a>
        </div>
        <button
          class="controle-faixa esquerda"
          aria-label="Categorias anteriores"
          @click="loja.rolar('faixa-categorias', -1)"
        >
          ‹</button
        ><button
          class="controle-faixa direita"
          aria-label="Próximas categorias"
          @click="loja.rolar('faixa-categorias', 1)"
        >
          ›
        </button>
      </section>
      <section class="painel cozinha">
        <div class="titulo-painel">
          <h2>{{ loja.dados.tituloFaixa }}</h2>
          <a href="#/produto">Veja mais em produtos</a>
        </div>
        <div class="faixa" id="faixa-cozinha">
          <article v-for="(item, indice) in loja.dados.cozinha" :key="indice">
            <a href="#/produto"
              ><div class="imagem-cozinha">
                <img v-bind:src="item.imagem" v-bind:alt="item.nome" />
              </div>
              <p>{{ item.nome }}</p></a
            >
            <div>
              4,6 <span class="estrelas">★★★★★</span> <small>17.738</small>
            </div>
            <strong class="preco-card">{{ item.preco }}</strong
            ><small class="valor-ilustrativo">Preço ilustrativo</small>
            <div class="prime">✓prime</div>
            <small>Entrega GRÁTIS no seu primeiro pedido.</small>
          </article>
        </div>
        <button
          class="controle-faixa esquerda"
          aria-label="Produtos anteriores"
          @click="loja.rolar('faixa-cozinha', -1)"
        >
          ‹</button
        ><button
          class="controle-faixa direita"
          aria-label="Próximos produtos"
          @click="loja.rolar('faixa-cozinha', 1)"
        >
          ›
        </button>
      </section>
      <section class="painel">
        <h2>Novidades na Amazon por categoria</h2>
        <div class="faixa novidades" id="faixa-novidades">
          <a
            v-for="(imagem, indice) in loja.dados.novidades"
            :key="imagem"
            href="#/produto"
            ><img
              v-bind:src="imagem"
              v-bind:alt="loja.nomesNovidades[indice] || 'Mais categorias'"
            /><span>{{ loja.nomesNovidades[indice] }}</span></a
          >
        </div>
        <button
          class="controle-faixa direita"
          aria-label="Mais novidades"
          @click="loja.rolar('faixa-novidades', 1)"
        >
          ›
        </button>
      </section>
      <section class="painel">
        <h2>Mais amados por categoria</h2>
        <div class="faixa novidades" id="faixa-amados">
          <a v-for="item in loja.dados.amados" :key="item.nome" href="#/produto"
            ><img v-bind:src="item.imagem" v-bind:alt="item.nome" /><span>{{
              item.nome
            }}</span></a
          >
        </div>
        <button
          class="controle-faixa direita"
          aria-label="Mais categorias favoritas"
          @click="loja.rolar('faixa-amados', 1)"
        >
          ›
        </button>
      </section>
    </div>
  </main>
  <main v-else class="pagina-produto">
    <nav class="menu-games" aria-label="Games">
      <a href="#/produto">Games</a><a href="#/produto">Ofertas</a
      ><a href="#/produto">Mais Vendidos</a><a href="#/produto">Lançamentos</a
      ><a href="#/produto">PlayStation</a><a href="#/produto">Xbox</a
      ><a href="#/produto">Nintendo Switch</a><a href="#/produto">PC</a
      ><a href="#/produto">Acessórios</a>
    </nav>
    <div class="miolo-produto">
      <nav class="breadcrumbs" aria-label="Localização">
        Games e Consoles › Nintendo Switch 2 › Consoles
      </nav>
      <div class="produto">
        <section class="galeria" aria-label="Imagens do Nintendo Switch">
          <div class="miniaturas">
            <button
              v-for="(imagem, indice) in loja.dados.galeria"
              :key="imagem.arquivo"
              :class="{ ativa: loja.miniatura === indice }"
              :aria-pressed="loja.miniatura === indice"
              @click="loja.miniatura = indice"
              :aria-label="'Selecionar foto ' + (indice + 1)"
            >
              <img v-bind:src="imagem.arquivo" v-bind:alt="imagem.descricao" />
            </button>
          </div>
          <button
            class="imagem-console"
            @click="loja.imagemAberta = true"
            aria-label="Ampliar imagem do console"
          >
            <img
              v-bind:src="loja.dados.galeria[loja.miniatura].arquivo"
              v-bind:alt="loja.dados.galeria[loja.miniatura].descricao"
            />
          </button>
          <p>Clique na imagem para ampliar</p>
        </section>
        <section class="informacoes-produto">
          <h1>
            Bundle Nintendo Switch 2 + Jogo Digital Mario Kart World – Modelo
            Nacional de Tomada
          </h1>
          <a href="#/produto">Visite a loja Nintendo</a>
          <p class="plataforma">Plataforma: <strong>Nintendo Switch</strong></p>
          <p class="nota-produto">
            4,6 <span class="estrelas">★★★★★</span>
            <a href="#avaliacoes">7.786</a>
          </p>
          <span class="escolha">Escolha da Amazon</span>
          <p class="compras-mes">Mais de 400 compras no mês passado</p>
          <hr />
          <div class="preco-principal">
            <span class="desconto">-6%</span><sup>R$</sup>4.499<sup>99</sup>
          </div>
          <p class="preco-antigo">De: <del>R$ 4.799,90</del></p>
          <div class="prime">✓prime</div>
          <p>
            Em até <strong>12x R$ 375,10 sem juros</strong>
            <button
              class="link"
              @click="loja.parcelasAbertas = !loja.parcelasAbertas"
            >
              Ver opções de pagamento
            </button>
          </p>
          <p v-if="loja.parcelasAbertas" class="quadro-parcelas">
            À vista: R$ 4.499,99<br />6x de R$ 750,00<br />12x de R$ 375,10.
            Valores ilustrativos do curso.
          </p>
          <p class="outros-precos">
            Outros preços estão disponíveis em mais opções de compra, com
            ofertas que podem não ser elegíveis para o Amazon Prime.
          </p>
          <hr />
          <div class="beneficios">
            <div>
              <span>♧</span><a href="#detalhes">Pagamentos e<br />Segurança</a>
            </div>
            <div>
              <span>▣</span><a href="#detalhes">Enviado pela<br />Amazon</a>
            </div>
            <div>
              <span>↶</span><a href="#detalhes">Política de<br />Devolução</a>
            </div>
          </div>
          <hr />
          <div class="modelos">
            <button
              v-for="modelo in loja.modelos"
              :key="modelo"
              :class="{ selecionado: loja.modeloAtual === modelo }"
              @click="loja.modeloAtual = modelo"
            >
              {{ modelo }}
            </button>
          </div>
        </section>
        <aside class="caixa-compra">
          <div class="preco-principal menor">
            <sup>R$</sup>4.499<sup>99</sup>
          </div>
          <div class="prime">✓prime</div>
          <p>
            <a href="#detalhes">Entrega grátis:</a>
            <strong>Quinta-feira, 19 de Março.</strong> Se pedir dentro de
            <span class="verde">20 mins.</span>
          </p>
          <button class="link entrega-local" @click="loja.localAberto = true">
            ⌖
            {{
              loja.cep
                ? "Enviar para o CEP " + loja.cep
                : "Selecionar endereço de entrega"
            }}
          </button>
          <p class="estoque">Em estoque</p>
          <label class="quantidade" for="quantidade"
            >Quantidade:
            <select id="quantidade" v-model.number="loja.quantidade">
              <option v-for="numero in 5" :key="numero">{{ numero }}</option>
            </select></label
          ><button class="botao amarelo" @click="loja.adicionarConsole">
            Adicionar ao carrinho</button
          ><button
            class="botao laranja"
            @click="
              loja.avisar(
                'Compra demonstrativa. Nenhum pedido ou pagamento foi realizado.',
              )
            "
          >
            Comprar agora
          </button>
          <dl class="envio">
            <dt>Enviado / Vendido</dt>
            <dd>Amazon.com.br</dd>
            <dt>Devolução</dt>
            <dd>
              <a href="#detalhes">Elegível para Devolução, Reembolso em...</a>
            </dd>
            <dt>Pagamento</dt>
            <dd><a href="#detalhes">Transação segura</a></dd>
          </dl>
          <strong class="titulo-garantia"
            >Adicionar plano de seguro ou garantia:</strong
          ><label class="seguro"
            ><input type="checkbox" v-model="loja.seguro" /> Seguro contra roubo
            e furto por <span>R$ 429,90</span></label
          ><label class="seguro"
            ><input type="checkbox" v-model="loja.garantia" /> Garantia
            estendida por <span>R$ 299,90</span></label
          >
          <hr />
          <label class="presente"
            ><input type="checkbox" v-model="loja.presente" /> Comprar este item
            como presente</label
          >
          <hr />
          <button
            class="botao botao-borda"
            @click="loja.naLista = !loja.naLista"
          >
            {{ loja.naLista ? "✓ Adicionado à lista" : "Adicionar à lista" }}
          </button>
        </aside>
      </div>
      <section class="secao relacionados">
        <h2>Produtos relacionados comprados pelos clientes</h2>
        <div class="faixa" id="faixa-relacionados">
          <article v-for="item in loja.dados.relacionados" :key="item.nome">
            <a href="#/produto"
              ><img v-bind:src="item.imagem" v-bind:alt="item.nome" /><span>{{
                item.nome
              }}</span></a
            >
            <p>Games e acessórios</p>
            <div><span class="estrelas">★★★★★</span></div>
            <p class="preco-card">{{ loja.moeda(item.preco) }}</p>
            <span class="prime">✓prime</span>
            <p class="entrega-jogo">Preço ilustrativo</p>
            <button class="link" @click="loja.adicionarRelacionado(item)">
              Adicionar ao carrinho
            </button>
          </article>
        </div>
        <button
          class="controle-faixa direita"
          aria-label="Próximos produtos relacionados"
          @click="loja.rolar('faixa-relacionados', 1)"
        >
          ›
        </button>
      </section>
      <section id="detalhes" class="secao detalhes">
        <h2>Detalhes do produto</h2>
        <ul>
          <li><strong>Idioma:</strong> Português</li>
          <li>
            <strong>Dimensões da embalagem:</strong> 22,2 x 21,9 x 10,9 cm; 1,61
            quilogramas
          </li>
          <li><strong>Certificação:</strong> 00556-25-04083</li>
          <li><strong>Data de lançamento:</strong> 5 junho 2025</li>
          <li><strong>ASIN:</strong> B0F67B2D45</li>
          <li><strong>País de origem:</strong> Brasil</li>
          <li>
            <strong>Ranking dos mais vendidos:</strong> Nº 10 em Games e
            Consoles<br /><a href="#/produto"
              >Nº 1 em Consoles do Nintendo Switch 2</a
            >
          </li>
        </ul>
        <h2>Descrição do produto</h2>
        <p>
          O Nintendo Switch 2 reúne os modos TV, semiportátil e portátil. Seus
          controles Joy-Con 2 possuem conexão magnética e o console oferece
          recursos para jogar com amigos. Este bundle inclui o jogo digital
          Mario Kart World.
        </p>
        <p>
          Em Mario Kart World, explore pistas conectadas e participe de corridas
          com até 24 pilotos. Conecte o console à TV ou leve a diversão com você
          no modo portátil.
        </p>
      </section>
    </div>
    <section class="fabricante">
      <h2>Do fabricante</h2>
      <img
        v-for="imagem in loja.dados.fabricante"
        :key="imagem"
        v-bind:src="imagem"
        alt="Apresentação do Nintendo Switch 2 pelo fabricante"
      />
    </section>
    <section id="avaliacoes" class="avaliacoes secao">
      <aside>
        <h2>Avaliações de clientes</h2>
        <p class="nota-geral"><span class="estrelas">★★★★★</span> 4,8 de 5</p>
        <p class="cinza">2.076 avaliações globais</p>
        <div
          class="barra-avaliacao"
          v-for="(porcentagem, indice) in [92, 4, 2, 0, 2]"
          :key="indice"
        >
          <span>{{ 5 - indice }} estrelas</span>
          <div><span :style="{ width: porcentagem + '%' }"></span></div>
          <span>{{ porcentagem }}%</span>
        </div>
        <button
          class="link texto-avaliacoes"
          @click="
            loja.avisar(
              'As notas reproduzem os valores apresentados no projeto do curso.',
            )
          "
        >
          ⌄ Como as avaliações e classificações de clientes funcionam
        </button>
        <hr />
        <h3>Avalie este produto</h3>
        <p>Compartilhe seus pensamentos com outros clientes</p>
        <button class="botao botao-borda" @click="loja.avaliacaoAberta = true">
          Escreva uma avaliação
        </button>
      </aside>
      <div class="reviews">
        <div class="titulo-painel">
          <h3>Avaliações com imagens</h3>
          <button class="link" @click="loja.fotosAbertas = true">
            Ver todas as fotos ›
          </button>
        </div>
        <div class="fotos-clientes">
          <button
            v-for="foto in loja.dados.fotos"
            :key="foto"
            @click="
              loja.fotoAtual = foto;
              loja.fotosAbertas = true;
            "
          >
            <img
              v-bind:src="foto"
              alt="Foto do produto em avaliação de cliente"
            />
          </button>
        </div>
        <hr />
        <h3>Principais avaliações do Brasil</h3>
        <article class="review">
          <div class="nome-cliente"><span class="avatar">●</span> matheus</div>
          <p>
            <span class="estrelas">★★★★★</span>
            <strong>Ótima experiência com o console</strong>
          </p>
          <small class="cinza"
            >Avaliação de exemplo baseada no layout do curso</small
          >
          <p class="compra-verificada">Edition: Bundle | Compra verificada</p>
          <p>
            Avaliação ilustrativa para demonstrar a estrutura da página, com
            estrelas, imagem do produto e botão de utilidade.
          </p>
          <img
            class="foto-review"
            v-bind:src="loja.dados.fotoReview"
            alt="Foto do console na avaliação"
          />
          <p class="cinza">
            {{ loja.util ? 10 : 9 }} pessoas acharam isso útil
          </p>
          <button class="botao-borda util" @click="loja.util = !loja.util">
            {{ loja.util ? "✓ Obrigado pelo feedback" : "Útil" }}</button
          ><button
            class="link denunciar"
            @click="loja.avisar('A denúncia é demonstrativa e não é enviada.')"
          >
            Denunciar
          </button>
        </article>
      </div>
    </section>
  </main>
</template>
