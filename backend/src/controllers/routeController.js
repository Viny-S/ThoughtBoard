import Note from "../models/Note.js";

export async function getAllNote(_, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error at getAllNote controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
}

export async function getNoteById(req, res) {
  try {
    const noteOfId = await Note.findById(req.params.id);
    if (!noteOfId) return res.status(404).json({ message: "Note not found" });
    res.json(noteOfId);
  } catch (error) {
    console.error("Error at getNoteById controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Created Note successfully" });
  } catch (error) {
    console.error("Error at createNote controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note Updated successfully" });
  } catch (error) {
    console.error("Error at updateNote controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Deleted Note successfully" });
  } catch (error) {
    console.error("Error at deleteNote controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
}
