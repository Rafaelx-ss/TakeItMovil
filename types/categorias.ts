export interface Categoria   {
    categoriaID: number;
    nombreCategoria: string;
    descripcionCategoria: string;
}

export interface SubCategoria {
    subcategoriaID: number;
    categoriaID: number;
    nombreSubcategoria: string;
    descripcionSubcategoria: string;
}