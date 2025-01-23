export interface Patrocinador {
    patrocinadorID: number; // Identificador único del patrocinador (primaria)
    usuarioID: number; // Relación con el usuario que registra al patrocinador (índice)
    fotoPatrocinador?: string | null; // Foto del patrocinador (puede ser nula)
    nombrePatrocinador: string; // Nombre del patrocinador
    representantePatrocinador: string; // Nombre del representante del patrocinador
    rfcPatrocinador: string; // RFC del patrocinador
    correoPatrocinador: string; // Correo electrónico del patrocinador
    telefonoPatrocinador: string; // Teléfono del patrocinador
    numeroRepresentantePatrocinador: string; // Número de contacto del representante
    activoPatrocinador: boolean; // Indicador de si el patrocinador está activo (tinyint 1)
    estadoPatrocinador: boolean; // Indicador del estado del patrocinador (tinyint 1)
    image_url?: string | null;
    created_at?: string | null; // Fecha de creación (puede ser nula)
    updated_at?: string | null; // Fecha de actualización (puede ser nula)
}
