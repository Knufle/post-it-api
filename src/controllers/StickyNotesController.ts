import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import StickyNote from '../models/StickyNote';
import stickyNoteView from '../views/sticky_notes_view';
import { object, string, number } from 'yup';

export default {
    async index(req: Request, res: Response) {
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNotes = await stickyNotesRepository.find();

        return res.json(stickyNoteView.renderMany(stickyNotes));
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne(id)) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        const stickyNote = await stickyNotesRepository.findOneOrFail(id);

        return res.json(stickyNoteView.render(stickyNote));
    },
    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const stickyNotesRepository = getRepository(StickyNote);

        const data = { title, description };

        const schema = object({
            title: string().required(),
            description: string()
        })

        await schema.validate(data, { abortEarly: false });

        const stickyNote = stickyNotesRepository.create(data);

        await stickyNotesRepository.save(stickyNote);

        return res.status(201).json(stickyNoteView.render(stickyNote));
    },
    async update(req: Request, res: Response) {
        const { id, title, description } = req.body;
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNote = await stickyNotesRepository.findOne(id);

        if (!stickyNote) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        const data = { id, title, description };

        const schema = object().shape({
            id: number().required(),
            title: string().required(),
            description: string().required()
        });

        await schema.validate(data, { abortEarly: false });

        stickyNote.title = title;
        stickyNote.description = description;

        await stickyNotesRepository.save(stickyNote);

        return res.json(stickyNoteView.render(stickyNote));
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne(id)) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        await stickyNotesRepository.delete(id);

        return res.status(204).end();
    },
};