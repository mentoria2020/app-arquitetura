export interface DetalheItem {
    _id: string,
    item: string,
    checked: boolean
}

export interface Etapa {
    _id: string;
    titulo: string;
    descricao: string;
    concluido: number;
    detalhes: DetalheItem[];
}

