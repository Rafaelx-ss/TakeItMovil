import axios from 'axios';
import { backend } from '@/context/endpoints';
import { Categoria, SubCategoria } from '@/types/categorias';

export const CategoriasService = {
    obtenerCategoriasForm: async (): Promise<Categoria[]> => {
        const response = await axios.get(`${backend}/api/categorias/form`);
        return response.data;
    },

    
    obtenerSubCategorias: async (categoriaID: number): Promise<SubCategoria[]> => {
        const response = await axios.get(`${backend}/api/categorias/subcategoria/${categoriaID}`);
        return response.data;
    }
}
