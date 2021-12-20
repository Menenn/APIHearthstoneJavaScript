var conteudodiv = document.getElementById("conteudo");
var foundquantiy = document.getElementById("achouX");
var globaldata;
var pesquisando = false;
var itenspesquisados;

async function cardSearch() {
    itenspesquisados = 0;
    if (pesquisando == false) {
        var botaopesquisar = document.getElementById("botaopesquisar");
        botaopesquisar.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
        `;

        var botoes = document.querySelector(".btn-group");
        botoes.innerHTML = ``;
        for (var i = 0; i < 11; i++) {
            if (i == 10) {
                botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})" disabled>${i}+ Custo</button>`
            } else {
                botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})" disabled>${i} Custo</button>`
            }
        }

        foundquantiy.innerHTML = ``
        var pesquisa = document.getElementById("searchbar").value;
        pesquisando = true;

        conteudodiv.innerHTML = ``;

        let response = await fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${pesquisa}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                "x-rapidapi-key": "d485dd4608msh039667f8f365b2bp1d5100jsnb9c4ae89910f"
            }
        })

        console.log("Chegou aqui");
        let json_response = response.json();
        json_response.then(data => {
            globaldata = data;
            if (data.error) {
                console.log(data.error);
                pesquisando = false;
                conteudodiv.innerHTML = `<h1 style="margin-top: 10%; color: white;">Não foi encontrado Resultado para sua pesquisa</h1>`;
                botaopesquisar.innerHTML = `Pesquisar`;
                return;
            }
            for (let conteudo of data) {
                if (conteudo.img || conteudo.imgGold) {
                    console.log(conteudo);
                    itenspesquisados++;

                    let infocard = new InfoCard();
                    infocard.nome = conteudo.name;
                    infocard.imagem = conteudo.img;
                    infocard.expansao = conteudo.cardSet;
                    infocard.custo = conteudo.cost;
                    infocard.classe = conteudo.playerClass;
                    infocard.desc = conteudo.text;
                    infocard.raca = conteudo.race;
                    infocard.mecanicas = conteudo.mechanics;
                    infocard.ataque = conteudo.attack;
                    infocard.vida = conteudo.health;
                    infocard.tipo = conteudo.type;
                    infocard.imgGold = conteudo.imgGold;
                    infocard.raridade = conteudo.rarity;
                    infocard.flavor = conteudo.flavor;
                    infocard.artista = conteudo.artist;

                    const cardinfo = document.createElement('div');
                    cardinfo.className = "CardInfo";
                    conteudodiv.append(cardinfo);

                    const divcard = document.createElement('div');
                    divcard.className = "card mb-3";
                    divcard.id = "card-mb-3";
                    cardinfo.append(divcard);

                    const divcardrow = document.createElement('div');
                    divcardrow.id = "divrow";
                    divcard.append(divcardrow);

                    const divcardimg = document.createElement('div');
                    divcardimg.id = "imgdiv";
                    divcardrow.append(divcardimg);

                    if (conteudo.imgGold) {
                        const imagemcard = document.createElement('p');
                        imagemcard.textContent = `{{ imagem }}`
                        rendered = Mustache.render(imagemcard.innerHTML, { imagem: `${infocard.imgGold}` });
                        divcardimg.innerHTML += `<img src="${rendered}" class="img-fluid rounded-start">`;
                    } else {
                        const imagemcard = document.createElement('p');
                        imagemcard.textContent = `{{ imagem }}`
                        rendered = Mustache.render(imagemcard.innerHTML, { imagem: `${infocard.imagem}` });
                        divcardimg.innerHTML += `<img src="${rendered}" class="img-fluid rounded-start">`;
                    }

                    const divcardcontent = document.createElement('div');
                    divcardcontent.className = "col-md-8";
                    divcardrow.append(divcardcontent);

                    const divcardcontentleft = document.createElement('div');
                    divcardcontentleft.className = "card-body";
                    divcardcontent.append(divcardcontentleft);

                    const divcardmain = document.createElement('div');
                    divcardmain.className = "cardcontent";
                    divcardcontentleft.append(divcardmain);

                    var nomeCarta = document.createElement('h5');
                    nomeCarta.textContent = `{{ name }}`
                    rendered = Mustache.render(nomeCarta.innerHTML, { name: `${infocard.nome}` });
                    divcardmain.innerHTML += `<h5 class="card-title">${rendered}</h5>`;

                    if (infocard.expansao != undefined) {
                        const ExpansaoCarta = document.createElement('p');
                        ExpansaoCarta.textContent = `{{ expansao }}`
                        rendered = Mustache.render(ExpansaoCarta.innerHTML, { expansao: `${infocard.expansao}` });
                        divcardmain.innerHTML += `<p>Expansão: ${rendered}</p>`;
                    }

                    if (infocard.custo != undefined) {
                        const CustoCarta = document.createElement('p');
                        CustoCarta.textContent = `{{ custo }}`
                        rendered = Mustache.render(CustoCarta.innerHTML, { custo: `${infocard.custo}` });
                        divcardmain.innerHTML += `<p>Custo⚗️: ${rendered}</p>`;
                    }

                    if (infocard.classe != undefined) {
                        const ClasseCarta = document.createElement('p');
                        ClasseCarta.textContent = `{{ classe }}`
                        rendered = Mustache.render(ClasseCarta.innerHTML, { classe: `${infocard.classe}` });
                        divcardmain.innerHTML += `<p>Classe: ${rendered}</p>`
                    }

                    if (infocard.raca != undefined) {
                        const RacaCarta = document.createElement('p');
                        RacaCarta.textContent = `{{ raca }}`
                        rendered = Mustache.render(RacaCarta.innerHTML, { raca: `${infocard.raca}` });
                        divcardmain.innerHTML += `<p>Raça: ${rendered}</p>`
                    }

                    if (infocard.mecanicas != undefined) {
                        //console.log(infocard);
                        const MecanicasCarta = document.createElement('p');
                        MecanicasCarta.textContent = `{{ mecanicas }}`
                        rendered = Mustache.render(MecanicasCarta.innerHTML, { mecanicas: `${infocard.mecanicas.length}` });
                        divcardmain.innerHTML += `<p>Mecânicas: ${rendered}</p>`

                        for (let mecanicas of infocard.mecanicas) {
                            const NomeMechanic = document.createElement('p');
                            NomeMechanic.textContent = `{{ mecanicasnome }}`
                            rendered = Mustache.render(NomeMechanic.innerHTML, { mecanicasnome: `${mecanicas.name}` });
                            divcardmain.innerHTML += `<p>Mecânica: ${rendered}</p>`
                        }
                    }

                    if (infocard.ataque != undefined) {
                        const AtaqueCarta = document.createElement('p');
                        AtaqueCarta.textContent = `{{ ataque }}`;
                        rendered = Mustache.render(AtaqueCarta.innerHTML, { ataque: `${infocard.ataque}` });
                        divcardmain.innerHTML += `<p>Ataque⚔️: ${rendered}</p>`
                    }

                    if (infocard.vida != undefined) {
                        const VidaCarta = document.createElement('p');
                        VidaCarta.textContent = `{{ vida }}`
                        rendered = Mustache.render(VidaCarta.innerHTML, { vida: `${infocard.vida}` });
                        divcardmain.innerHTML += `<p>Vida❤️: ${rendered}</p>`
                    }

                    if (infocard.tipo != undefined) {
                        const TipoCarta = document.createElement('p');
                        TipoCarta.textContent = `{{ tipo }}`;
                        rendered = Mustache.render(TipoCarta.innerHTML, { tipo: `${infocard.tipo}` });
                        divcardmain.innerHTML += `<p>Tipo: ${rendered}</p>`
                    }

                    divcard.style = "background-color: #e2ff8a; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');"
                    if (infocard.raridade != undefined) {
                        const Rarity = document.createElement('p');
                        Rarity.textContent = `{{ raridade }}`;
                        rendered = Mustache.render(Rarity.innerHTML, { raridade: `${infocard.raridade}` });
                        divcardmain.innerHTML += `<p>Raridade: ${rendered}</p>`
                        if (infocard.raridade == "Free") {
                            divcard.style = "background-color: #e5f7ba; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');";
                        } else if (infocard.raridade == "Common") {
                            divcard.style = "background-color: #2fff00; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');";
                        } else if (infocard.raridade == "Rare") {
                            divcard.style = "background-color: #00bbfa; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');";
                        } else if (infocard.raridade == "Epic") {
                            divcard.style = "background-color: #b700ff; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');";
                        } else if (infocard.raridade == "Legendary") {
                            divcard.style = "background-color: #e5ff00; background-image: url('https://www.transparenttextures.com/patterns/white-diamond.png');";
                        }
                    }

                    if (infocard.desc != undefined) {
                        const DescCarta = document.createElement('p');
                        DescCarta.innerHTML = `{{ desc }}`;
                        rendered = Mustache.render(DescCarta.innerHTML, { desc: `${infocard.desc}` });
                        rendered = String(rendered).split('&lt;b&gt;').join("<b>");
                        rendered = String(rendered).split('&lt;&#x2F;b&gt;').join("</b>");
                        rendered = String(rendered).split(String("\n")).join(" ");
                        divcardmain.innerHTML += `Descrição: "${rendered}"`;
                    }

                    if (infocard.flavor != undefined) {
                        const flavor = document.createElement('p');
                        flavor.textContent = `{{ flavor }}`;
                        rendered = Mustache.render(flavor.innerHTML, { flavor: `${infocard.flavor}` });
                        divcardmain.innerHTML += `História: "${rendered}"`
                    }

                    if (infocard.artista != undefined) {
                        const artista = document.createElement('p');
                        artista.textContent = `{{ artista }}`;
                        rendered = Mustache.render(artista.innerHTML, { artista: `${infocard.artista}` });
                        divcardmain.innerHTML += `<p>Artista: <a href="https://google.com.br/search?q=${rendered}" target="_blank" style="text-decoration: none">${rendered}<a></p>`
                    }
                }
            }
            foundquantiy.innerHTML = `Foram encontrados ${itenspesquisados} resultados`
            if (itenspesquisados == 0) {
                conteudodiv.innerHTML = `<h1 style="margin-top: 10%; color: white;">Não foi encontrado Resultado para sua pesquisa</h1>`;
            }
            pesquisando = false;
            console.log(data);

            botoes.innerHTML = ``;
            for (var i = 0; i < 11; i++) {
                if (i == 10) {
                    botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})">${i}+ Custo</button>`
                } else {
                    botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})">${i} Custo</button>`
                }
            }
            botaopesquisar.innerHTML = `Pesquisar`;
        })
    }
}

class InfoCard {
    #nome; #imagem; #expansao; #custo; #classe; #desc; #raca; #mecanicas; #ataque; #vida; #tipo; #raridade; #imgGold; #flavor; #artista;

    set nome(nome) {
        this.#nome = nome;
    } set imagem(imagem) {
        this.#imagem = imagem;
    } set expansao(expansao) {
        this.#expansao = expansao;
    } set custo(custo) {
        this.#custo = custo;
    } set classe(classe) {
        this.#classe = classe;
    } set descricao(descricao) {
        this.#desc = descricao;
    } set raca(raca) {
        this.#raca = raca;
    } set mecanicas(mecanicas) {
        this.#mecanicas = mecanicas;
    } set ataque(ataque) {
        this.#ataque = ataque;
    } set vida(vida) {
        this.#vida = vida;
    } set tipo(tipo) {
        this.#tipo = tipo;
    } set raridade(raridade) {
        this.#raridade = raridade;
    } set imagemGold(imagemGold) {
        this.#imgGold = imagemGold;
    } set flavor(flavor) {
        this.#flavor = flavor;
    } set artista(artista) {
        this.#artista = artista;
    }
    get nome() {
        return this.#nome;
    } get imagem() {
        return this.#imagem;
    } get expansao() {
        return this.#expansao;
    } get custo() {
        return this.#custo;
    } get classe() {
        return this.#classe;
    } get descricao() {
        return this.#desc;
    } get raca() {
        return this.#raca;
    } get mecanicas() {
        return this.#mecanicas;
    } get ataque() {
        return this.#ataque;
    } get vida() {
        return this.#vida;
    } get tipo() {
        return this.#tipo;
    } get raridade() {
        return this.#raridade;
    } get imagemGold() {
        return this.#imgGold;
    } get flavor() {
        return this.#flavor;
    } get artista() {
        return this.#artista;
    }
}

function FiltrarCusto(custo) {
    var botoes = document.querySelector(".btn-group");
    botoes.innerHTML = ``;
    for (var i = 0; i < 11; i++) {
        if (i != custo) {
            if (i == 10) {
                botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})">${i}+ Custo</button>`
            } else {
                botoes.innerHTML += `<button class="btn btn-dark" onclick="FiltrarCusto(${i})">${i} Custo</button>`
            }
        } else if (i == custo) {
            if (i == 10) {
                botoes.innerHTML += `<button class="btn btn-dark" disabled>${i}+ Custo</button>`
            } else {
                botoes.innerHTML += `<button class="btn btn-dark" disabled>${i} Custo</button>`
            }
        }
    }
    if (globaldata) {
        conteudodiv.innerHTML = ``;

        var datafiltered;
        var quantidade = 0;

        if (custo >= 10) {
            datafiltered = globaldata.filter(value => value.cost >= 10);
            datafiltered = datafiltered.filter(imagem => imagem.img);
        } else if (custo < 10) {
            datafiltered = globaldata.filter(value => value.cost == custo);
            datafiltered = datafiltered.filter(imagem => imagem.img);
        }

        for (let conteudo of datafiltered) {
            quantidade++;
            itenspesquisados++;

            let infocard = new InfoCard();
            infocard.nome = conteudo.name;
            infocard.imagem = conteudo.img;
            infocard.expansao = conteudo.cardSet;
            infocard.custo = conteudo.cost;
            infocard.classe = conteudo.playerClass;
            infocard.desc = conteudo.text;
            infocard.raca = conteudo.race;
            infocard.mecanicas = conteudo.mechanics;
            infocard.ataque = conteudo.attack;
            infocard.vida = conteudo.health;
            infocard.tipo = conteudo.type;
            infocard.imgGold = conteudo.imgGold;
            infocard.raridade = conteudo.rarity;
            infocard.flavor = conteudo.flavor;
            infocard.artista = conteudo.artist;

            const cardinfo = document.createElement('div');
            cardinfo.className = "CardInfo";
            conteudodiv.append(cardinfo);

            const divcard = document.createElement('div');
            divcard.className = "card mb-3";
            divcard.id = "card-mb-3";
            cardinfo.append(divcard);

            const divcardrow = document.createElement('div');
            divcardrow.id = "divrow";
            divcard.append(divcardrow);

            const divcardimg = document.createElement('div');
            divcardimg.id = "imgdiv";
            divcardrow.append(divcardimg);

            if (conteudo.imgGold) {
                const imagemcard = document.createElement('img');
                imagemcard.src = infocard.imgGold;
                imagemcard.className = "img-fluid rounded-start";
                divcardimg.append(imagemcard);
            } else {
                const imagemcard = document.createElement('img');
                imagemcard.src = infocard.imagem;
                imagemcard.className = "img-fluid rounded-start";
                divcardimg.append(imagemcard);
            }

            const divcardcontent = document.createElement('div');
            divcardcontent.className = "col-md-8";
            divcardrow.append(divcardcontent);

            const divcardcontentleft = document.createElement('div');
            divcardcontentleft.className = "card-body";
            divcardcontent.append(divcardcontentleft);

            const divcardmain = document.createElement('div');
            divcardmain.className = "cardcontent";
            divcardcontentleft.append(divcardmain);

            var nomeCarta = document.createElement('h5');
            nomeCarta.textContent = `{{ name }}`;
            rendered = Mustache.render(nomeCarta.innerHTML, { name: `${infocard.nome}` });
            divcardmain.innerHTML += `<h5 class="card-title">${rendered}</h5>`;

            if (infocard.expansao != undefined) {
                const ExpansaoCarta = document.createElement('p');
                ExpansaoCarta.textContent = `{{ expansao }}`
                rendered = Mustache.render(ExpansaoCarta.innerHTML, { expansao: `${infocard.expansao}` });
                divcardmain.innerHTML += `<p>Expansão: ${rendered}</p>`;
            }

            if (infocard.custo != undefined) {
                const CustoCarta = document.createElement('p');
                CustoCarta.textContent = `{{ custo }}`
                rendered = Mustache.render(CustoCarta.innerHTML, { custo: `${infocard.custo}` });
                divcardmain.innerHTML += `<p>Custo⚗️: ${rendered}</p>`;
            }

            if (infocard.classe != undefined) {
                const ClasseCarta = document.createElement('p');
                ClasseCarta.textContent = `{{ classe }}`
                rendered = Mustache.render(ClasseCarta.innerHTML, { classe: `${infocard.classe}` });
                divcardmain.innerHTML += `<p>Classe: ${rendered}</p>`
            }

            if (infocard.raca != undefined) {
                const RacaCarta = document.createElement('p');
                RacaCarta.textContent = `{{ raca }}`
                rendered = Mustache.render(RacaCarta.innerHTML, { raca: `${infocard.raca}` });
                divcardmain.innerHTML += `<p>Raça: ${rendered}</p>`
            }

            if (infocard.mecanicas != undefined) {
                //console.log(infocard);
                const MecanicasCarta = document.createElement('p');
                MecanicasCarta.textContent = `{{ mecanicas }}`
                rendered = Mustache.render(MecanicasCarta.innerHTML, { mecanicas: `${infocard.mecanicas.length}` });
                divcardmain.innerHTML += `<p>Mecânicas: ${rendered}</p>`

                for (let mecanicas of infocard.mecanicas) {
                    const NomeMechanic = document.createElement('p');
                    NomeMechanic.textContent = `{{ mecanicasnome }}`
                    rendered = Mustache.render(NomeMechanic.innerHTML, { mecanicasnome: `${mecanicas.name}` });
                    divcardmain.innerHTML += `<p>Mecânica: ${rendered}</p>`
                }
            }

            if (infocard.ataque != undefined) {
                const AtaqueCarta = document.createElement('p');
                AtaqueCarta.textContent = `{{ ataque }}`;
                rendered = Mustache.render(AtaqueCarta.innerHTML, { ataque: `${infocard.ataque}` });
                divcardmain.innerHTML += `<p>Ataque⚔️: ${rendered}</p>`
            }

            if (infocard.vida != undefined) {
                const VidaCarta = document.createElement('p');
                VidaCarta.textContent = `{{ vida }}`
                rendered = Mustache.render(VidaCarta.innerHTML, { vida: `${infocard.vida}` });
                divcardmain.innerHTML += `<p>Vida❤️: ${rendered}</p>`
            }

            if (infocard.tipo != undefined) {
                const TipoCarta = document.createElement('p');
                TipoCarta.textContent = `{{ tipo }}`;
                rendered = Mustache.render(TipoCarta.innerHTML, { tipo: `${infocard.tipo}` });
                divcardmain.innerHTML += `<p>Tipo: ${rendered}</p>`
            }

            divcard.style = "background-color: #e2ff8a;"
            if (infocard.raridade != undefined) {
                const Rarity = document.createElement('p');
                Rarity.textContent = `{{ raridade }}`;
                rendered = Mustache.render(Rarity.innerHTML, { raridade: `${infocard.raridade}` });
                divcardmain.innerHTML += `<p>Raridade: ${rendered}</p>`
                if (infocard.raridade == "Free") {
                    divcard.style = "background-color: #e5f7ba";
                } else if (infocard.raridade == "Common") {
                    divcard.style = "background-color: #2fff00";
                } else if (infocard.raridade == "Rare") {
                    divcard.style = "background-color: #00bbfa";
                } else if (infocard.raridade == "Epic") {
                    divcard.style = "background-color: #b700ff";
                } else if (infocard.raridade == "Legendary") {
                    divcard.style = "background-color: #e5ff00";
                }
            }

            if (infocard.desc != undefined) {
                const DescCarta = document.createElement('p');
                DescCarta.textContent = `{{ desc }}`;
                rendered = Mustache.render(DescCarta.innerHTML, { desc: `${infocard.desc}` });
                console.log(String(rendered));
                rendered = String(rendered).split('&lt;b&gt;').join("<b>");
                rendered = String(rendered).split('&lt;&#x2F;b&gt;').join("</b>");
                rendered = String(rendered).split(String("\n")).join(" ");
                divcardmain.innerHTML += `Descrição: "${rendered}"`;
            }

            if (infocard.flavor != undefined) {
                const flavor = document.createElement('p');
                flavor.textContent = `{{ flavor }}`;
                rendered = Mustache.render(flavor.innerHTML, { flavor: `${infocard.flavor}` });
                divcardmain.innerHTML += `História: "${rendered}"`
            }

            if (infocard.artista != undefined) {
                const artista = document.createElement('p');
                artista.textContent = `{{ artista }}`;
                rendered = Mustache.render(artista.innerHTML, { artista: `${infocard.artista}` });
                divcardmain.innerHTML += `<p>Artista: <a href="https://google.com.br/search?q=${rendered}" target="_blank" style="text-decoration: none">${rendered}<a></p>`
            }
        }
    }
    foundquantiy.innerHTML = `Foram encontrados ${quantidade} resultados`;
    if (quantidade == 0) {
        conteudodiv.innerHTML = `<h1 style="margin-top: 10%; color: white;">Não foi encontrado Resultado para sua pesquisa</h1>`;
    }
}


function reloadPage() {
    location.reload();
}

function subirPagina() {
    if (window.scrollY != 0) {
        window.scrollTo(0, 0)
    }
}