import express from 'express';
const booksRouter = express.Router();

import { Book } from '../models/books.js';

booksRouter.get('/', async (_req, res) => {
	const books = await Book.find({});
	res.status(200).json(books);
});

booksRouter.get('/:id', async (req, res) => {
	const book = await Book.findById(req.params.id);
	res.status(200).json(book);
});

booksRouter.post('/', async (req, res) => {
	const book = new Book({ ...req.body });
	const savedBook = await book.save();
	res.status(201).json(savedBook);
});

booksRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const deletedBook = await Book.findByIdAndDelete(id);
	res.status(204).json(deletedBook);
});

booksRouter.patch('/:id', async (req, res) => {
	const field = req.body;
	const id = req.params.id;
	const foundBook = await Book.findByIdAndUpdate(id, field, { new: true });
	res.json(foundBook);
});

export default booksRouter;