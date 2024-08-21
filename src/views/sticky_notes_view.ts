import StickyNote from "../models/StickyNote"

export default {
    render(stickyNote: StickyNote) {
        return {
            id: stickyNote.id,
            title: stickyNote.title,
            description: stickyNote.description
        };
    },

    renderMany(stickyNotes: StickyNote[]) {
        return stickyNotes.map(stickyNote => this.render(stickyNote));
    }
}