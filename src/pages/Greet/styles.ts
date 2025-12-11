import React from "react";

export const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
    },
    videoBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
    } as React.CSSProperties,
    card: {
        maxWidth: "50rem",
        width: "100%",
        padding: "2.5rem",
        borderRadius: "1rem",
        boxShadow: "0 0.5rem 2rem rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(0.625rem)",
        position: "relative",
        zIndex: 1,
        margin: "1.25rem",
    },
    title: {
        marginBottom: "1.5rem",
        color: "#333",
        fontSize: "1.75rem",
    },
    content: {
        marginBottom: "2.5rem",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "1.25rem",
        flexWrap: "wrap",
    },
    button: {
        minWidth: "7.5rem",
        fontSize: "1rem",
    },
}