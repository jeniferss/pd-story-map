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
            <ul>
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
        title: "Jacareí - Áreas",
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

                    Além disso, dentro das áreas urbanas existe um conceito importante para entender a desigualdade no
                    calor urbano: o de assentamentos precários.
                    Considera-se um assentamento precário quando há domicílios sujeitos a condições de irregularidade ou
                    risco do
                    local geográfico em que estão. <ReferenceTag number={1} title="Estima Jacareí"
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
];

export default pageList;

