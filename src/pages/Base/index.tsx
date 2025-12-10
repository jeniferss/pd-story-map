import React from "react";
import {Button, Typography} from "antd";
import MapLeaflet from "../../components/MapLeaflet.tsx";
import pageList from "../../utils/pageList.tsx";
import {styles} from "./styles.ts";

const {Title, Paragraph} = Typography;

type BasePageProps = {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
};


export default function BasePage({index, setIndex}: BasePageProps) {
    const page = pageList[index];

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
            <div style={styles.containerStyle}>
                <div style={styles.leftColStyle}>
                    <Title>{page.title}</Title>
                    <Paragraph>{page.textContext}</Paragraph>

                    <div style={styles.fixedControlsStyle}>
                        <Button
                            variant="filled"
                            color="purple"
                            onClick={goPrev}
                            disabled={index === 0}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="filled"
                            color="purple"
                            onClick={goNext}
                            disabled={index >= pageList.length - 1}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>

                <div style={styles.rightColStyle}>
                    <MapLeaflet
                        key={mapKey}
                        center={page.center}
                        zoom={page.zoom}
                        style={{width: "100%", height: "90vh"}}
                    >
                        {page.mapContent}
                    </MapLeaflet>
                </div>
            </div>

        </>
    );
}
