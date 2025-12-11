import React from "react";

export const styles: Record<string, React.CSSProperties> = {
    containerStyle: {
        display: "flex",
        padding: "1.875rem",
        width: "100%",
        gap: "3rem",
    },

    leftColStyle: {
        flex: "0 0 40%",
        overflow: "auto",
        paddingRight: "1rem",
    },

    rightColStyle: {
        flex: "0 0 58%",
        minWidth: 0
    },

    fixedControlsStyle: {
        position: "fixed" as const,
        bottom: "1rem",
        display: "flex",
        gap: "6.25rem",
        borderRadius: "0.5rem",
        width: "100%",
    }
}
