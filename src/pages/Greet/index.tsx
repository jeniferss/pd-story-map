import React, {useState, useRef, useEffect} from "react";
import {Button, Card, Tooltip, Typography} from "antd";
import {styles} from "./styles.ts";

const {Title, Paragraph} = Typography;

type GreetPageProps = {
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

const slides = [
    {
        title: "Olá! Vamos falar sobre cidade, moradia e… calor.",
        content: (
            <>
                <Paragraph style={{textAlign: "justify", fontSize: "1rem"}}>
                    Você já parou pra pensar por que algumas partes da cidade acabam sofrendo mais com{" "}
                    <Tooltip
                        title="Ondas de calor são períodos de tempo em que a temperatura local fica mais elevada que o comum, que podem durar dias ou semanas, podendo causar riscos à saúde e ao bem-estar da população."
                        placement="top"
                    >
                        <span style={{borderBottom: "1px dashed #722ed1", cursor: "help"}}>
                            ondas de calor
                        </span>
                    </Tooltip>
                    {" "}e parecem muito mais quentes do que outras?
                </Paragraph>
                <Paragraph style={{textAlign: "justify", fontSize: "1rem"}}>
                    Neste projeto, vamos olhar para um recorte do mundo real: o município de Jacareí no estado de São
                    Paulo.
                    A partir dele, vamos entender como inadequações na moradia podem deixar alguns grupos mais expostos
                    ao calor urbano.
                </Paragraph>
                <Paragraph style={{textAlign: "justify", fontSize: "1rem"}}>
                    A ideia é mostrar se e como clima e cidade estão conectados…
                </Paragraph>
            </>
        ),
    },
    {
        title: "Por que isso importa?",
        content: (
            <>
                <Paragraph style={{fontSize: "1rem", marginBottom: "2rem"}}>
                    Mudanças no clima e problemas urbanos não são temas distantes da nossa rotina. Eles afetam
                    diretamente a qualidade de vida das pessoas, especialmente em áreas com infraestrutura mais frágil.
                    Para entender melhor esse desafio, vamos nos apoiar em dois Objetivos de Desenvolvimento Sustentável
                    (ODS) da ONU:
                </Paragraph>

                <div style={{
                    display: "flex",
                    gap: "1.25rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: "1.5rem"
                }}>
                    <Card
                        hoverable
                        style={{width: "100%", maxWidth: "16rem", textAlign: "center"}}
                        cover={
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <a href="https://brasil.un.org/pt-br/sdgs/11" target="_blank" rel="noopener noreferrer">
                                    <img
                                        alt="ODS 11"
                                        src="https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg"
                                        style={{width: "100%", maxWidth: "8rem", height: "auto", cursor: "pointer"}}
                                    />
                                </a>
                            </div>
                        }
                    >
                        <Card.Meta
                            description={<span style={{fontSize: "0.85rem"}}>Busca garantir que todas as pessoas possam viver em cidades mais seguras, inclusivas e bem planejadas, com moradias adequadas e acesso básico a infraestrutura.</span>}
                        />
                    </Card>

                    <Card
                        hoverable
                        style={{width: "100%", maxWidth: "16rem", textAlign: "center"}}
                        cover={
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <a href="https://brasil.un.org/pt-br/sdgs/13" target="_blank" rel="noopener noreferrer">
                                    <img
                                        alt="ODS 13"
                                        src="https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-13.svg"
                                        style={{width: "100%", maxWidth: "8rem", height: "auto", cursor: "pointer"}}
                                    />
                                </a>
                            </div>
                        }
                    >
                        <Card.Meta
                            description={<span style={{fontSize: "0.85rem"}}>Fala sobre preparar comunidades para eventos climáticos extremos, como as ondas de calor, que tendem a aumentar com o aquecimento global.</span>}
                        />
                    </Card>
                </div>

                <Paragraph style={{textAlign: "justify", fontSize: "1rem"}}>
                    Esses dois ODS nos ajudam a entender por que estudar calor urbano e inadequação habitacional é tão
                    importante, principalmente para pensar no futuro das cidades, e no nosso próprio.
                </Paragraph>

                <Paragraph style={{fontSize: "1.1rem"}}>
                    <strong>Vamos seguir juntos em um{" "}
                        <Tooltip
                            title="Um Story Map é uma ferramenta interativa que combina mapas, textos e dados para contar uma história."
                            placement="top"
                        >
                            <span style={{borderBottom: "1px dashed #722ed1", cursor: "help"}}>
                                <i>Story Map</i>
                            </span>
                        </Tooltip>
                        {" "}e descobrir o que os dados de Jacareí têm a contar.
                    </strong>
                </Paragraph>

            </>
        ),
    },
];

export default function GreetPage({setStart}: GreetPageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay foi bloqueado pelo navegador:", error);
            });
        }
    }, []);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleStart = () => {
        setStart(true);
    };

    return (
        <div style={styles.container}>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                style={styles.videoBackground}
            >
                <source src="6735330-uhd_3840_2160_30fps.mp4" type="video/mp4"/>
            </video>
            <Card style={styles.card}>
                <Title level={2} style={styles.title}>
                    {slides[currentSlide].title}
                </Title>
                <div style={styles.content}>
                    {slides[currentSlide].content}
                </div>
                <div style={styles.buttonContainer}>
                    {currentSlide === 0 ? (
                        <Button
                            type="primary"
                            size="large"
                            color="purple"
                            variant="filled"
                            onClick={handleNext}
                            style={styles.button}
                        >
                            Próximo
                        </Button>
                    ) : (
                        <>
                            <Button
                                size="large"
                                variant="filled"
                                onClick={handlePrevious}
                                style={styles.button}
                                color="purple"
                            >
                                Anterior
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                color="purple"
                                variant="filled"
                                onClick={handleStart}
                                style={styles.button}
                            >
                                Começar
                            </Button>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
