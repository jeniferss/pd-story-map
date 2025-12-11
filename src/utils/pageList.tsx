import JacareiIntro from "../pages/AboutJacarei/index.tsx";
import CONSTS from "./conts.ts";
import TempUseShow from "../pages/UsoECobertura/index.tsx";
import JacareiAreas from "../pages/TemperaturaClasse/index.tsx";
import UserLocation from "../pages/UserLocation";
import LayersLegend from "../components/LayersLegend.tsx";
import ReferenceTag from "../components/ReferenceTag.tsx";
import BarChart from "../components/BarChart.tsx";

const pageList = [
    {
        title: "Como navegar pelo Story Map",
        textContext: (
            <ul style={{lineHeight: "1.5"}}>
                <li><strong>Mapa Interativo:</strong> você pode dar zoom, arrastar, e clicar em camadas.</li>
                <li><strong>Títulos e Textos:</strong> ajudam a entender o que cada mapa está mostrando.</li>
                <li><strong>Gráficos e Visualizações:</strong> mostram relações importantes, como temperatura da
                    superfície e condições de moradia.
                </li>
                <li><strong>Botões de Navegação:</strong> é só avançar ou voltar como se fosse uma apresentação de
                    slides.
                </li>
            </ul>
        ),
        mapContent: <UserLocation/>,
        mapDescription: <p>Caso tenha uma legenda para o mapa será ativado um botão azul no lado direito da tela, para
            visualizá-la basta clicar nele.</p>,
        center: CONSTS.BRASIL_CENTER,
        zoom: CONSTS.BRASIL_ZOOM
    },
    {
        title: "Descobrindo Jacareí",
        textContext: (
            <div>
                <p style={{textAlign: "justify", lineHeight: "1.5"}}>Jacareí é uma cidade do estado de São Paulo que
                    começou a ser povoada em 1652 com o nome de Nossa
                    Senhora da Conceição da Parayba e tornou-se município em 1849.
                    <br></br>
                    <br></br>
                    Localizada às margens do rio Paraíba, a cidade passou de um ponto de parada colonial para um centro
                    urbano impulsionado pelo ciclo do café no Vale do Paraíba, e atualmente suas tradições
                    e marcos históricos, como o Largo da Matriz e festas em homenagem à padroeira Imaculada Conceição,
                    fazem parte da identidade local.<ReferenceTag number={1} title="Conheça Jacareí"
                                                                  url="https://www.jacarei.sp.gov.br/cidade/conheca-jacarei/"/>
                </p>
            </div>
        ),
        mapContent: <JacareiIntro/>,
        mapDescription: <LayersLegend layers={[{name: 'Limite Municipal', color: '#2A3E5B', type: 'polygon'}]}/>,
        center: CONSTS.BRASIL_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "Entendendo o Território de Jacareí",
        textContext: (
            <div>
                <p style={{textAlign: "justify", lineHeight: "1.5"}}>Para começar, vamos entender quais elementos formam
                    a cidade de Jacareí. Uma das formas de analisar
                    isso é por meio de técnicas de geoprocessamento, que usam a assinatura espectral <ReferenceTag
                        number={1} title="Assinaturas espectrais"
                        url="https://www.esa.int/SPECIALS/Eduspace_PT/SEM7W765P1G_0.html"/> de cada tipo de superfície
                    para identificá-la a partir de imagens de satélite. No Brasil, esse tipo de mapeamento é realizado
                    pelo Projeto MapBiomas, <ReferenceTag number={2} title="MapBiomas"
                                                          url="https://brasil.mapbiomas.org/o-projeto/"/> que classifica
                    o uso e a cobertura do solo em categorias como áreas urbanizadas, vegetação, corpos d’água e muito
                    mais.
                    <br></br>
                    <br></br>
                    No mapa ao lado, você pode passar o mouse sobre as regiões e observar como a temperatura varia em
                    cada classe de solo. E não esqueça de conferir a legenda, que mostra quais categorias estão
                    representadas.
                </p>


            </div>
        ),
        mapContent: <TempUseShow/>,
        mapDescription: <LayersLegend layers={[
            {name: 'Área Urbanizada', color: '#d4271e', type: 'polygon'},
            {name: 'Afloramento Rochoso', color: '#ffaa5f', type: 'polygon'},
            {name: 'Soja', color: '#f5b3c8', type: 'polygon'},
            {name: 'Campo Alagado e Área Pantanosa', color: '#519799', type: 'polygon'},
            {name: 'Outras Áreas não Vegetadas', color: '#db4d4f', type: 'polygon'},
            {name: 'Outras Lavouras Temporárias', color: '#f54ca9', type: 'polygon'},
            {name: 'Outras Lavouras Perenes', color: '#e6ccff', type: 'polygon'},
            {name: 'Cana', color: '#db7093', type: 'polygon'},
            {name: 'Mosaico de Usos', color: '#ffefc3', type: 'polygon'},
            {name: 'Pastagem', color: '#edde8e', type: 'polygon'},
            {name: 'Mineração', color: '#9c0027', type: 'polygon'},
            {name: 'Formação Campestre', color: '#d6bc74', type: 'polygon'},
            {name: 'Aquicultura', color: '#091077', type: 'polygon'},
            {name: 'Formação Florestal', color: '#1f8d49', type: 'polygon'},
            {name: 'Café', color: '#d68fe2', type: 'polygon'},
            {name: 'Silvicultura', color: '#7a5900', type: 'polygon'},
            {name: 'Rio, Lago e Oceano', color: '#2532e4', type: 'polygon'},
        ]}/>,
        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "Classe de Uso do Solo",
        textContext: (
            <div style={{
                maxHeight: "calc(90vh - 12rem)",
                overflowY: "auto",
                paddingRight: "0.5rem"
            }}>
                <p style={{textAlign: "justify", lineHeight: "1.5"}}>Como pode ser visto na visualização anterior, a
                    temperatura tende a ser mais alta nas áreas classificadas como urbanas e mais baixa em regiões de
                    formação florestal ou próximas de rios, lagos e outras superfícies de água. No gráfico abaixo, você
                    pode visualizar a temperatura média associada a cada classe de uso do solo.
                    <br></br>
                    <br></br>
                </p>

                <BarChart
                    csvPath="temperatura_por_classe.csv"
                    xKey="Descricao"
                    yKey="temperatura_media"
                    colorKey="Color"
                    title="Temperatura Média por Classe de Uso do Solo"
                    xLabel="Classe"
                    yLabel="Temperatura (°C)"
                    height={300}
                />

                <p style={{textAlign: "justify", lineHeight: "1.5"}}>
                    Isso acontece porque
                    cidades possuem muitas superfícies impermeáveis (asfalto, concreto, telhados) que acumulam e liberam
                    calor com mais intensidade, enquanto áreas verdes e corpos d’água ajudam a resfriar o ambiente ao
                    refletir menos radiação e liberar mais umidade. Esse fenômeno é conhecido como Ilha de Calor.

                    <br></br>
                    <br></br>

                    Além disso, dentro das áreas urbanas existe um conceito importante para entender a desigualdade no calor urbano, o de assentamentos precários. Esse termo se refere a regiões onde os domicílios apresentam algum tipo de irregularidade, falta de infraestrutura básica ou estão localizados em áreas de risco <ReferenceTag number={1} title="Estima Jacareí"
                                                                 url="https://cefavela.ufabc.edu.br/estima-favelas-estimativas-multidimensionais-das-necessidades-habitacionais-em-favelas/"/>
                    <br></br>
                    <br></br>
                    No mapa, você pode clicar em cada assentamento para ver o nome dele e a quantidade de domicílios que
                    o compõem.
                </p>
            </div>
        ),
        mapContent: <JacareiAreas/>,
        mapDescription: <LayersLegend layers={[
            {name: 'Limite Municipal', color: '#2A3E5B', type: 'polygon'},
            {name: 'Assentamentos Precários', color: '#E53935', type: 'polygon'},
            {name: 'Área Urbana', color: '#7B1FA2', type: 'polygon'},
        ]}/>,
        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "A Base do Estudo",
        textContext: (
            <div style={{
                maxHeight: "calc(90vh - 12rem)",
                overflowY: "auto",
                paddingRight: "0.5rem"
            }}>
                <p style={{textAlign: "justify", lineHeight: "1.5"}}>Para além disso, queremos entender como as
                    construções da cidade podem estar relacionadas à temperatura da superfície. Para isso, vamos
                    utilizar uma série de indicadores de inadequação habitacional, que ajudam a identificar regiões onde
                    as condições das moradias podem aumentar a vulnerabilidade ao calor.
                    <br></br>
                    <br></br>

                    Esses dados vêm de um projeto de extensão da UFABC realizado em parceria com o CEFAVELA (Centro de
                    Estudos da Favela) e a Prefeitura de Jacareí. Esse projeto desenvolveu uma metodologia própria para
                    identificar diferentes formas de inadequação e déficits nas moradias do município.

                    <br></br>
                    <br></br>

                    Porém, por questões de LGPD, as informações não são mostradas individualmente, elas aparecem no
                    formato de densidade, ou seja, em mapas que indicam quantas ocorrências de cada inadequação existem
                    em determinadas áreas.
                    <br></br>
                    <br></br>

                    A seguir, estão alguns dos indicadores usados no estudo. Eles mostram diferentes tipos de condições
                    inadequadas presentes nas moradias:
                </p>

                <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "1rem"
                    }}>
                        <thead>
                        <tr style={{borderBottom: "0.125rem solid #ddd"}}>
                            <th style={{
                                padding: "0.75rem 2rem 0.75rem 0",
                                textAlign: "left",
                                fontWeight: "600",
                                borderBottom: "0.15rem solid #333"
                            }}>Indicador
                            </th>
                            <th style={{
                                padding: "0.75rem 0",
                                textAlign: "left",
                                fontWeight: "600",
                                borderBottom: "0.15rem solid #333"
                            }}>Descrição
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Domicílios em Assentamentos Precários sem
                                Previsão de Remoção
                            </td>
                            <td style={{padding: "0.75rem 0"}}>Mostra domicílios localizados em assentamentos precários,
                                sem previsão oficial de remoção ou realocação.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Densidade Excessiva</td>
                            <td style={{padding: "0.75rem 0"}}>Quando três ou mais pessoas dividem o mesmo cômodo usado
                                como dormitório, indicando pouco espaço para a quantidade de moradores.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Banheiro</td>
                            <td style={{padding: "0.75rem 0"}}>Quando o domicílio não possui banheiro.</td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Material de Piso Inadequado</td>
                            <td style={{padding: "0.75rem 0"}}>Piso feito de terra ou de madeira reaproveitada.</td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Água Canalizada</td>
                            <td style={{padding: "0.75rem 0"}}>Quando não há água encanada dentro do domicílio.</td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Coleta e Tratamento de Esgoto
                            </td>
                            <td style={{padding: "0.75rem 0"}}>Quando o esgoto é descartado em fossa rudimentar, vala a
                                céu aberto, rios, lagos, mar ou outras formas inadequadas.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Abastecimento de Água por Rede
                                Pública
                            </td>
                            <td style={{padding: "0.75rem 0"}}>Quando a água vem de poço, nascente, cisterna ou outras
                                fontes alternativas, em vez de rede pública.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Energia Elétrica Adequada</td>
                            <td style={{padding: "0.75rem 0"}}>Quando a iluminação é feita sem medidor ou com fontes
                                como óleo, querosene, gás, vela ou outras formas inadequadas.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ausência de Coleta de Lixo</td>
                            <td style={{padding: "0.75rem 0"}}>Quando o lixo é queimado, enterrado na propriedade,
                                jogado em terreno baldio, rua, rio, mar ou tem outro destino irregular.
                            </td>
                        </tr>
                        <tr style={{borderBottom: "0.0625rem solid #ddd"}}>
                            <td style={{padding: "0.75rem 2rem 0.75rem 0"}}>Ônus Excessivo com Aluguel</td>
                            <td style={{padding: "0.75rem 0"}}>Quando a família gasta 30% ou mais da renda total com
                                aluguel.
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        ),
        mapContent: null,
        mapDescription: null,
        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "Juntando o quebra-cabeça",
        textContext: (
            <div style={{
                maxHeight: "calc(90vh - 12rem)",
                overflowY: "auto",
                paddingRight: "0.5rem"
            }}>
                <p style={{textAlign: "justify", lineHeight: "1.5"}}>
                    Agora que já conhecemos os indicadores de inadequação habitacional, podemos observar como eles se
                    relacionam com a temperatura da superfície (LST). Esse tipo de análise é chamado
                    de <strong>correlação</strong>, que mostra o quanto duas variáveis variam juntas, ou seja, se quando uma aumenta, a outra também tende a aumentar, se uma cresce enquanto a outra diminui, ou se não existe um padrão entre elas.
                    <br></br>
                    <br></br>
                    Mas atenção, <strong>correlação não significa causalidade</strong>, ou seja, duas coisas podem estar
                    relacionadas sem que uma necessariamente cause a outra.
                    <br></br>
                    <br></br>
                    De forma geral, os resultados mostram que a maior parte dos indicadores de inadequação habitacional
                    tem correlação positiva com a temperatura. Isso quer dizer que, nas áreas onde a LST é mais alta,
                    costuma haver também mais ocorrências de domicílios com ou em:
                </p>

                <ul style={{lineHeight: "1.5"}}>
                    <li>Ônus excessivo com aluguel</li>
                    <li>Assentamentos precários</li>
                    <li>Densidade excessiva</li>
                    <li>Piso inadequado</li>
                    <li>Ausência de banheiro</li>
                    <li>Ausência de água canalizada ou pública</li>
                    <li>Ausência de energia adequada</li>
                </ul>

                <p style={{textAlign: "justify", lineHeight: "1.5"}}>
                    Essas correlações variam de fracas a fortes, mostrando que o calor tende a se concentrar justamente
                    onde as condições de moradia são mais frágeis.
                    <br></br>
                    <br></br>
                    Por outro lado, alguns indicadores apresentam correlações negativas muito fracas, como ausência de
                    abastecimento por rede pública, ausência de coleta de lixo e ausência de esgoto adequado.
                    Isso significa que, nesses casos, o aumento da temperatura não acompanha o aumento da
                    densidade de domicílios com essas inadequações.
                    <br></br>
                    <br></br>
                    <strong>Em resumo,</strong> as áreas mais quentes tendem a ser também aquelas com mais sinais de
                    vulnerabilidade urbana, reforçando a relação entre infraestrutura, desigualdade e exposição ao
                    calor.
                </p>
            </div>
        ),
        imageContent: "matriz_correlacao_indicadores.png",
        mapContent: null,
        mapDescription: null,
        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },

];

export default pageList;

