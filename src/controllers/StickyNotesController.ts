import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import StickyNote from '../models/StickyNote';
import stickyNoteView from '../views/sticky_notes_view';
import { z, ZodError } from 'zod';

export default {
    async index(req: Request, res: Response) {
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNotes = await stickyNotesRepository.find();

        return res.json(stickyNoteView.renderMany(stickyNotes));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne({ where: { id: parseInt(id, 10) } })) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        const stickyNote = await stickyNotesRepository.findOneOrFail({ where: { id: parseInt(id, 10) } });

        return res.json(stickyNoteView.render(stickyNote));
    },

    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const stickyNotesRepository = getRepository(StickyNote);

        const data = { title, description };

        // Zod schema for validation
        const schema = z.object({
            title: z.string().min(1, { message: "Title is required" }),
            description: z.string().optional()
        });

        try {
            schema.parse(data);
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({ errors: e.errors });
            }
            return res.status(500).json({ message: "An unexpected error occurred" });
        }

        const stickyNote = stickyNotesRepository.create(data);

        await stickyNotesRepository.save(stickyNote);

        return res.status(201).json(stickyNoteView.render(stickyNote));
    },

    async update(req: Request, res: Response) {
        const { id, title, description } = req.body;
        const stickyNotesRepository = getRepository(StickyNote);

        const stickyNote = await stickyNotesRepository.findOne({ where: { id: parseInt(id, 10) } });

        if (!stickyNote) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        const data = { id, title, description };

        const schema = z.object({
            id: z.number().int().positive(),
            title: z.string().min(1, { message: "Title is required" }),
            description: z.string().min(1, { message: "Description is required" })
        });

        // Validation
        try {
            schema.parse(data);
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({ errors: e.errors });
            }
            return res.status(500).json({ message: "An unexpected error occurred" });
        }

        stickyNote.title = title;
        stickyNote.description = description;

        await stickyNotesRepository.save(stickyNote);

        return res.json(stickyNoteView.render(stickyNote));
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const stickyNotesRepository = getRepository(StickyNote);

        if (!await stickyNotesRepository.findOne({ where: { id: parseInt(id, 10) } })) {
            return res.status(400).json({ message: "Sticky Note doesn't exist" });
        }

        await stickyNotesRepository.delete(id);

        return res.status(204).end();
    },
};
