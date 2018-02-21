export interface Hamaca {
    _id?: string;
    fecha: string;
    sector: number;
    hamacas: number;
    sombrillas: number;
    h_rotas: number;
    h_retiradas: number;
    h_repuestas: number;
    s_rotas: number;
    s_retiradas: number;
    s_repuestas: number;
    observacion: string;
}

export interface Acumulados {
    _id?: number;
    total_h_rotas: number;
    total_h_retiradas: number;
    total_h_repuestas: number;
    total_s_rotas: number;
    total_s_retiradas: number;
    total_s_repuestas: number;
}

export interface Localizaciones {
    _id?: string;
    sector: number;
    localizacion: string;
    url: string;
    geo_1: string;
    geo_2: string;
}
