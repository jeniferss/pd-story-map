import JacareiIntro from "../pages/JacareiIntro";
import CONSTS from "./conts.ts";
import TempUseShow from "../pages/TempUseShow.tsx";
import JacareiAreas from "../pages/JacareiAreas.tsx";
import AssentamentosPrecariosAreas from "../pages/AssentamentosPrecariosAreas.tsx";

const pageList = [
    {
        title: "Intro Jacareí",
        textContext: "Conteúdo da página de introdução de Jacareí.",
        mapContent: <JacareiIntro/>,

        center: CONSTS.BRASIL_CENTER,
        zoom: CONSTS.BRASIL_ZOOM
    },
    {
        title: "Jacareí - Temperatura e Uso do Solo",
        textContext: "Conteúdo da página de Temperatura e Uso do Solo.",
        mapContent: <TempUseShow/>,

        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "Jacareí - Áreas",
        textContext: "Conteúdo da página das Áreas de Jacreí.",
        mapContent: <JacareiAreas/>,

        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    },
    {
        title: "Jacareí - Assentamentos Precários",
        textContext: "Conteúdo da página dos Assentamentos de Jacreí.",
        mapContent: <AssentamentosPrecariosAreas/>,

        center: CONSTS.JACAREI_CENTER,
        zoom: CONSTS.JACAREI_ZOOM
    }
];

export default pageList;

