import React from "react";
import { Button, Typography } from "antd";
import MapLeaflet from "../components/MapLeaflet";
import pageList from "../utils/pageList.tsx";

const { Title, Paragraph } = Typography;

type BasePageProps = {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const containerStyle: React.CSSProperties = {
    display: "flex",
    padding: 20,
    alignItems: "stretch",
    width: "100%",
    boxSizing: "border-box"
};

const leftColStyle: React.CSSProperties = {
    flex: "0 0 45%",
    overflow: "auto",
    boxSizing: "border-box"
};

const rightColStyle: React.CSSProperties = {
    flex: "0 0 55%",
    minWidth: 0
};

const footerStyle: React.CSSProperties = {
    padding: 10,
    background: "#000",
    height: "5.5vh",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12
};

const logoStyle: React.CSSProperties = {
    height: "100%",
    width: "auto",
    objectFit: "contain",
    cursor: "pointer"
};

export default function BasePage({ index, setIndex }: BasePageProps) {
    const page = pageList[index];

    // key única por mudança de página (inclui timestamp)
    const [mapKey, setMapKey] = React.useState(() => `map-${index}-${Date.now()}`);
    React.useEffect(() => {
        setMapKey(`map-${index}-${Date.now()}`);
    }, [index]);

    const goPrev = React.useCallback(() => {
        setIndex(i => Math.max(0, i - 1));
    }, [setIndex]);

    const goNext = React.useCallback(() => {
        setIndex(i => Math.min(pageList.length - 1, i + 1));
    }, [setIndex]);

    return (
        <>
            <div style={containerStyle}>
                <div style={leftColStyle}>
                    <Title>{page.title}</Title>
                    <Paragraph>{page.textContext}</Paragraph>

                    <div style={{ padding: 10 }}>
                        <Button type="text" onClick={goPrev} disabled={index === 0}>
                            Anterior
                        </Button>
                        <Button
                            type="text"
                            onClick={goNext}
                            disabled={index >= pageList.length - 1}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>

                <div style={rightColStyle}>
                    <MapLeaflet
                        key={mapKey}
                        center={page.center}
                        zoom={page.zoom}
                        style={{ width: "100%", height: "90vh"}}
                    >
                        {page.mapContent}
                    </MapLeaflet>
                </div>
            </div>

            <div style={footerStyle}>
                <img
                    style={logoStyle}
                    onClick={() => window.open("https://cefavela.ufabc.edu.br/")}
                    src="logotipo-cefavela.png"
                    alt="CEFAVELA"
                />
                <img
                    style={logoStyle}
                    onClick={() => window.open("https://www.ufabc.edu.br/")}
                    src="logotipo-ufabc.png"
                    alt="UFABC"
                />
            </div>
        </>
    );
}
