import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { AppDataSource } from './data-source';
import StickyNote from './models/StickyNote';

const t = initTRPC.create();

export const appRouter = t.router({
    getAllStickyNotes: t.procedure.query(async () => {
        return await AppDataSource.getRepository(StickyNote).find();
    }),
    getStickyNote: t.procedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
        return await AppDataSource.getRepository(StickyNote).findOneBy({ id: input.id });
    }),
    createStickyNote: t.procedure
        .input(z.object({ title: z.string(), description: z.string() }))
        .mutation(async ({ input }) => {
            const stickyNote = new StickyNote();
            stickyNote.title = input.title;
            stickyNote.description = input.description;
            return await AppDataSource.getRepository(StickyNote).save(stickyNote);
        }),
    updateStickyNote: t.procedure
        .input(z.object({ id: z.number(), title: z.string(), description: z.string() }))
        .mutation(async ({ input }) => {
            await AppDataSource.getRepository(StickyNote).update(input.id, {
                title: input.title,
                description: input.description,
            });
            return await AppDataSource.getRepository(StickyNote).findOneBy({ id: input.id });
        }),
    deleteStickyNote: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        await AppDataSource.getRepository(StickyNote).delete(input.id);
        return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
