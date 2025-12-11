import React, {useState} from "react";
import {Button, Modal, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import MapLeaflet from "../../components/MapLeaflet.tsx";
import LayerCleaner from "../../components/LayerCleaner.tsx";
import pageList from "../../utils/pageList.tsx";
import {styles} from "./styles.ts";

const {Title} = Typography;

type BasePageProps = {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
};


export default function BasePage({index, setIndex}: BasePageProps) {
    const page = pageList[index];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const goPrev = React.useCallback(() => {
        setIndex(i => Math.max(0, i - 1));
    }, [setIndex]);

    const goNext = React.useCallback(() => {
        setIndex(i => Math.min(pageList.length - 1, i + 1));
    }, [setIndex]);

    const hasMapDescription = !!page.mapDescription;

    return (
        <>
            <div style={styles.containerStyle}>
                <div style={{...styles.leftColStyle, display: "flex", flexDirection: "column"}}>

                    <Title style={{margin: 0, marginBottom: "1rem"}}>{page.title}</Title>

                    <div style={{flex: 1, marginBottom: "1rem"}}>
                        {page.textContext}
                    </div>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid #e0e0e0"
                    }}>
                        <Button
                            variant="filled"
                            color="purple"
                            onClick={goPrev}
                            disabled={index === 0}
                            style={{minWidth: "7.5rem"}}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="filled"
                            color="purple"
                            onClick={goNext}
                            disabled={index >= pageList.length - 1}
                            style={{minWidth: "7.5rem"}}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>

                <div style={styles.rightColStyle}>
                    {page.imageContent ? (
                        <div style={{
                            width: "100%",
                            height: "90vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "0.5rem",
                            padding: "2rem"
                        }}>
                            <img
                                src={page.imageContent}
                                alt={page.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    borderRadius: "0.5rem",
                                    boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.1)"
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <MapLeaflet
                                center={page.center}
                                zoom={page.zoom}
                                style={{width: "100%", height: "90vh"}}
                            >
                                <LayerCleaner triggerIndex={index}/>
                                {page.mapContent}
                            </MapLeaflet>

                            {hasMapDescription && (
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<InfoCircleOutlined/>}
                                    onClick={() => setIsModalOpen(true)}
                                    style={{
                                        position: "absolute",
                                        right: "1rem",
                                        bottom: "1rem",
                                        zIndex: 1000
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {hasMapDescription && (
                <Modal
                    title="Legenda"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    style={{
                        position: "fixed",
                        left: "5rem",
                        top: "5rem"
                    }}
                >
                    {page.mapDescription}
                </Modal>
            )}

        </>
    );
}
