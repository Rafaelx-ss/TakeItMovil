export interface Evento {
    eventoID?: number;
    imagenEvento?: string;
    categoriaID: number;
    categoriaNombre: string;
    subCategoriaID: number;
    subCategoriaNombre: string;
    nombreEvento: string;
    lugarEvento: string;
    maximoParticipantesEvento: string;
    costoEvento: string;
    descripcionEvento: string;
    cpEvento: string;
    municioEvento: string;
    estadoID: number;
    direccionEvento: string;
    telefonoEvento: string;
    fechaEvento: string;
    horaEvento: string;
    duracionEvento: string;
    kitEvento: string;
    activoEvento?: boolean;
    estadoEvento?: boolean;
    created_at?: string;
    updated_at?: string;
    data?: any;
    tipo_creador?: string;
    imagen_evento?: string;
    costoTipoEntrada2?: string;
    costoTipoEntrada3?: string;
    nombreTipoEntrada2?: string;
    nombreTipoEntrada3?: string;
    countCostoEvento?: number;
}

export interface EventoFormValues {
    eventoID?: number;
    categoriaID: number;
    subCategoriaID: number;
}
