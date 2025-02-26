export interface Categoria {
    categoriaID: number;
    nombreCategoria: string;
    descripcionCategoria: string;
    data?: any;
}

export interface SubCategoria {
    subcategoriaID: number;
    categoriaID: number;
    nombreSubcategoria: string;
    descripcionSubcategoria: string;
}

