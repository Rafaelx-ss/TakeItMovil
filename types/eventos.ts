export interface Evento {
    eventoID?: number;
    categoriaID: number;
    subCategoriaID: number;
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
}

export interface EventoFormValues {
    eventoID?: number;
    categoriaID: number;
    subCategoriaID: number;
}
