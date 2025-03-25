import React from 'react';
import { useState, useEffect } from 'react';

interface GrafanaDashboardEmbedProps {
    dashboardUid: string;
    height: string;
}

interface Dashboard {
    uid: string;
    title: string;
}

interface Alert {
    name: string;
    message: string;
}

export interface GrafanaService {
    getDashboards: () => Promise<Dashboard[]>;
    getAlerts: () => Promise<Alert[]>;
}

// Mock data for development
const mockDashboards: Dashboard[] = [
    { uid: 'hydro-overview', title: 'Hydro Station Overview' },
    { uid: 'turbine-metrics', title: 'Turbine Performance' },
    { uid: 'environmental', title: 'Environmental Metrics' }
];

const mockAlerts: Alert[] = [
    { name: 'High Pressure Warning', message: 'Turbine pressure exceeding normal range' },
    { name: 'Maintenance Due', message: 'Scheduled maintenance required for Turbine #2' }
];

export function useGrafana(): GrafanaService {
    const getDashboards = async (): Promise<Dashboard[]> => {
        // TODO: Replace with actual Grafana API call
        return mockDashboards;
    };

    const getAlerts = async (): Promise<Alert[]> => {
        // TODO: Replace with actual Grafana API call
        return mockAlerts;
    };

    return {
        getDashboards,
        getAlerts
    };
}

export function GrafanaDashboardEmbed({ dashboardUid, height }: GrafanaDashboardEmbedProps) {
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        // TODO: Replace with actual Grafana dashboard URL
        setUrl(`https://grafana.example.com/d/${dashboardUid}`);
    }, [dashboardUid]);

    return (
        <iframe
            src={url}
            width="100%"
            height={height}
            frameBorder="0"
            title={`Grafana Dashboard ${dashboardUid}`}
        />
    );
} 