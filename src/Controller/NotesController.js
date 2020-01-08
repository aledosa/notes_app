const DataBase = require("../Database/NotesDBQueries");

const ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

module.exports = {
  getNotes: async function(res) {
    const areNotesFound = await DataBase("findAllNotes");
    res.status(200).json(areNotesFound);
  },
  getNote: async function(req, res) {
    const { id } = req.params;
    const isNoteFound = await DataBase("findOneNote", id);
    if (!isNoteFound) {
      res.status(404).json({ response: "Note can't be found" });
      return;
    }
    res.status(200).json(isNoteFound);
  },
  postNote: async function(req, res) {
    const { title, note, id } = req.body;
    if (id) {
      const newNote = {
        id,
        title,
        note
      };
      await DataBase("createOneNote", {}, {}, newNote);
      res.status(201).json({ id: newNote.id });
      return;
    }
    const newNote = {
      id: ID(),
      title,
      note
    };
    await DataBase("createOneNote", {}, {}, newNote);
    res.status(201).json({ id: newNote.id });
  },
  deleteNote: async function(req, res) {
    const { id } = req.params;
    const isNoteFound = await DataBase("findOneNote", id);
    if (!isNoteFound) {
      res.status(404).json({ response: "Note can't be found" });
    }
    await DataBase("deleteOneNote", {}, isNoteFound);
    res.status(200).json({ response: "Note deleted succesfully" });
  },
  putNote: async function(req, res) {
    const { id } = req.params;
    const { title, note } = req.body;
    const isNoteFound = await DataBase("findOneNote", id);
    if (!isNoteFound) {
      res.status(404).json({ response: "Note can't be found" });
      return;
    }
    const updatedNote = {
      id,
      title,
      note
    };
    await DataBase("updateOneNote", {}, isNoteFound, updatedNote);
    res.status(200).json({ response: "Note updated succesfully" });
  }
};
