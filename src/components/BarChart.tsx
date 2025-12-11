import { useEffect, useState } from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import * as Papa from "papaparse";

type BarChartProps = {
    csvPath: string;
    xKey: string;
    yKey: string;
    colorKey?: string;
    title?: string;
    xLabel?: string;
    yLabel?: string;
    height?: number;
};

type DataRow = Record<string, any>;

export default function BarChart({
    csvPath,
    xKey,
    yKey,
    colorKey,
    title,
    xLabel,
    yLabel,
    height = 400
}: BarChartProps) {
    const [data, setData] = useState<DataRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCSV = async () => {
            try {
                setLoading(true);
                const response = await fetch(csvPath);
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data as DataRow[]);
                        setLoading(false);
                    },
                    error: (err: any) => {
                        setError(`Erro ao parsear CSV: ${err.message}`);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError(`Erro ao carregar CSV: ${err}`);
                setLoading(false);
            }
        };

        loadCSV();
    }, [csvPath]);

    if (loading) {
        return <div style={{ padding: "1rem", textAlign: "center" }}>Carregando dados...</div>;
    }

    if (error) {
        return <div style={{ padding: "1rem", color: "red" }}>Erro: {error}</div>;
    }

    if (data.length === 0) {
        return <div style={{ padding: "1rem" }}>Nenhum dado encontrado</div>;
    }

    // Custom tooltip para mostrar valores formatados
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div style={{
                    backgroundColor: "white",
                    padding: "0.75rem",
                    border: "1px solid #ccc",
                    borderRadius: "0.25rem",
                    boxShadow: "0 0.125rem 0.5rem rgba(0,0,0,0.1)"
                }}>
                    <p style={{ margin: 0, fontWeight: "600", marginBottom: "0.25rem" }}>
                        {item[xKey]}
                    </p>
                    <p style={{ margin: 0, color: payload[0].color }}>
                        {yLabel || yKey}: {typeof item[yKey] === 'number' ? item[yKey].toFixed(2) : item[yKey]}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ width: "100%", padding: "1rem" }}>
            {title && (
                <h3 style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    textAlign: "center"
                }}>
                    {title}
                </h3>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey={xKey}
                        label={xLabel ? { value: xLabel, position: "insideBottom", offset: -10 } : undefined}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                        tick={{ fontSize: "0.75rem" }}
                    />
                    <YAxis
                        label={yLabel ? { value: yLabel, angle: -90, position: "insideLeft" } : undefined}
                        tick={{ fontSize: "0.75rem" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={yKey} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colorKey && entry[colorKey] ? entry[colorKey] : "#8884d8"}
                            />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}

