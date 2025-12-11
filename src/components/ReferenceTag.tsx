import { useState } from "react";
import { Popover } from "antd";
import { LinkOutlined } from "@ant-design/icons";

type ReferenceTagProps = {
    number: number;
    title: string;
    url?: string;
};

export default function ReferenceTag({ number, title, url }: ReferenceTagProps) {
    const [isOpen, setIsOpen] = useState(false);

    const content = (
        <div style={{ maxWidth: "18.75rem" }}>
            <p style={{ margin: 0, marginBottom: "0.5rem", fontWeight: "600" }}>
                {title}
            </p>
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                    <LinkOutlined />
                    Acessar referência
                </a>
            )}
        </div>
    );

    return (
        <Popover
            content={content}
            title={null}
            trigger="hover"
            open={isOpen}
            onOpenChange={setIsOpen}
            placement="top"
        >
            <sup
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "1.25rem",
                    height: "1.25rem",
                    backgroundColor: "#a78bfa",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginLeft: "0.25rem",
                    transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#9370db";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#a78bfa";
                }}
            >
                {number}
            </sup>
        </Popover>
    );
}

