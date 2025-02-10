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
}

export interface EventoFormValues {
    eventoID?: number;
    categoriaID: number;
    subCategoriaID: number;
}
