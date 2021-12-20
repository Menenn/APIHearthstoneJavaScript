chamarAPI();

var globaldata;

async function chamarAPI() {
    var botaochamar = document.getElementById("botaochamarbtn");
    botaochamar.innerHTML = ``;
    var conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
    let response = await fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
            "x-rapidapi-key": "d485dd4608msh039667f8f365b2bp1d5100jsnb9c4ae89910f"
        }
    })
    let json_response = response.json();
    json_response.then(data => {
        globaldata = data;
        conteudo.innerHTML = ``;
        botaochamar.innerHTML = ``;
        Object.keys(data).forEach(objetos => {

            var contador = 0;

            console.log(objetos);

            for (let objeto of globaldata[objetos]) {
                if (contador < 50) {
                    //console.log(data[objetos].length);
                    if (objeto.img) {

                        //function InfoCard(nome,imagem,expansao,custo,classe,desc,raca,mecanicas,ataque,vida,tipo)

                        let infocard = new InfoCard(objeto.dbfId, objeto.name, objeto.img, objeto.cardSet, objeto.cost, objeto.playerClass, objeto.text, objeto.race, objeto.mechanics, objeto.attack, objeto.health, objeto.type);

                        const divcardinfo = document.createElement('div');
                        divcardinfo.className = "CardInfo";
                        conteudo.append(divcardinfo);

                        const divcard = document.createElement('div');
                        divcard.className = "card";
                        divcardinfo.append(divcard);

                        const divcardimg = document.createElement('div');
                        divcardimg.className = "card-image";
                        divcard.append(divcardimg);

                        const nomeCarta = document.createElement('p');
                        nomeCarta.textContent = `${infocard.nome}`
                        divcardimg.append(nomeCarta);

                        const imagemcard = document.createElement('img');
                        imagemcard.src = infocard.imagem;
                        divcardimg.append(imagemcard);

                        const divcardcontent = document.createElement('div');
                        divcardcontent.className = "card-content";
                        divcard.append(divcardcontent);

                        const divcardcontentleft = document.createElement('div');
                        divcardcontentleft.className = "card-content-left";
                        divcardcontent.append(divcardcontentleft);

                        if (infocard.expansao != undefined) {
                            const ExpansaoCarta = document.createElement('p');
                            ExpansaoCarta.textContent = `Expansão: ${infocard.expansao}`
                            divcardcontentleft.append(ExpansaoCarta);
                        }

                        if (infocard.custo != undefined) {
                            const CustoCarta = document.createElement('p');
                            CustoCarta.textContent = `Custo⚗️: ${infocard.custo}`
                            divcardcontentleft.append(CustoCarta);
                        }

                        if (infocard.classe != undefined) {
                            const ClasseCarta = document.createElement('p');
                            ClasseCarta.textContent = `Classe: ${infocard.classe}`
                            divcardcontentleft.append(ClasseCarta);
                        }

                        if (infocard.raca != undefined) {
                            const RacaCarta = document.createElement('p');
                            RacaCarta.textContent = `Raça: ${infocard.raca}`
                            divcardcontentleft.append(RacaCarta);
                        }

                        const divcardcontentright = document.createElement('div');
                        divcardcontentright.className = "card-content-right";
                        divcardcontent.append(divcardcontentright);

                        if (infocard.mecanicas != undefined) {
                            //console.log(infocard);
                            const MecanicasCarta = document.createElement('p');
                            MecanicasCarta.textContent = `Mecânicas: ${infocard.mecanicas.length}`
                            divcardcontentright.append(MecanicasCarta);
                            for (let mecanicas of infocard.mecanicas) {
                                const NomeMechanic = document.createElement('p');
                                NomeMechanic.textContent = `Mecânica: ${mecanicas.name}`
                                divcardcontentright.append(NomeMechanic);
                                //console.log("Mecanica aq: " + mecanicas.name);
                            }
                        }

                        if (infocard.ataque != undefined) {
                            const AtaqueCarta = document.createElement('p');
                            AtaqueCarta.textContent = `Ataque⚔️: ${infocard.ataque}`
                            divcardcontentright.append(AtaqueCarta);
                        }

                        if (infocard.vida != undefined) {
                            const VidaCarta = document.createElement('p');
                            VidaCarta.textContent = `Vida❤️: ${infocard.vida}`
                            divcardcontentright.append(VidaCarta);
                        }

                        if (infocard.tipo != undefined) {
                            const TipoCarta = document.createElement('p');
                            TipoCarta.textContent = `Tipo: ${infocard.tipo}`
                            divcardcontentright.append(TipoCarta);
                        }

                        const divcardcontentmiddle = document.createElement('div');
                        divcardcontentmiddle.className = "card-content-middle";
                        divcard.append(divcardcontentmiddle);

                        if (infocard.desc != undefined) {
                            var descricao = `${infocard.desc}`;
                            descricao = descricao.replace(/\n/g, ' ');
                            divcardcontentmiddle.innerHTML += `Descrição: ${descricao}`
                        }

                        //console.log(infocard);

                        contador++;
                    }
                }
            }
            console.log("Cartas carregadas: " + contador)
        })
        console.log(globaldata);
    });
}

function InfoCard(id, nome, imagem, expansao, custo, classe, desc, raca, mecanicas, ataque, vida, tipo) {
    this.id = id;
    this.nome = nome;
    this.imagem = imagem;
    this.expansao = expansao;
    this.custo = custo;
    this.classe = classe;
    this.desc = desc;
    this.raca = raca;
    this.mecanicas = mecanicas;
    this.ataque = ataque;
    this.vida = vida;
    this.tipo = tipo;
}

function reloadPage() {
    location.reload();
}

function subirPagina() {
    if (window.scrollY != 0) {
        window.scrollTo(0, 0)
    }
}