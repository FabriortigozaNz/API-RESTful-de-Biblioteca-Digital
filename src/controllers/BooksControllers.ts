import { Request, Response } from "express"
import { Book } from "../models/booksModels"
import { IBook} from "../interfaces/IBook"
import { sendSuccess, sendError } from "../utils/responseHandler"

const getAllBooks = async (req: Request, res:Response): Promise <void> =>{
 try {
    const books = await Book.find();
    sendSuccess(res, books, "Recuperar todos los libros");
  } catch (error) {
    const err = error as Error;
    sendError(res, "Error al recuperar los libros", err.message);
  }
};

const deleteBooks= async (req: Request, res: Response): Promise<void> => {
    // 68233ffb3f86906f03d72a93
    try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook){
       sendError(res, "Libro no encontrado", "BookNotFound", 404);
      return;
    }

    sendSuccess(res, deletedBook, "Libro eliminado con éxito");
  } catch (error) {
    const err = error as Error;
    sendError(res, "Error al eliminar el libro", err.message);
  }
};


const createBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    // recibir los datos del cuerpo de la petición
    const body: IBook = req.body
    
    const newBook = new Book(body)
    const savedBook = await newBook.save();

  sendSuccess(res, savedBook, "Libro creado con éxito", 201);
    
  } catch (error) {
    const err = error as Error
    sendError(res, "Error al crear el libro", err.message, 400);
  }
}


const updateBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const body: Partial<IBook> = req.body

    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true })
  
    if (!updatedBook){
      sendError(res, "Libro no encontrado para actualizar", "BookNotFound", 404);
      return;
    }

  
    sendSuccess(res, updatedBook, "Libro actualizado con éxito");
  } catch (error) {
    const err = error as Error
    sendError(res, "Error al actualizar el libro", err.message);
  }
}

const getBookById = async (req:Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      sendError(res, "Libro no encontrado", "BookNotFound", 404);
      return;
    }

       sendSuccess(res, book, "Libro recuperado correctamente");

  } catch (error) {
    const err = error as Error;
    sendError(res, "Error al buscar el libro", err.message);
  }
}

export { getAllBooks, deleteBooks, createBooks, updateBooks, getBookById }