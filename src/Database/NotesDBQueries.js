const sequelize = require("../Database/Sequelize");
const noteModel = sequelize.models.note;

const NotesDBQueries = async function(querie, id, item, newItem) {
  switch (querie) {
    case "findAllNotes":
      const elements = await noteModel.findAll();
      return elements;
    case "findOneNote":
      const element = await noteModel.findOne({ where: { id } });
      return element;
    case "createOneNote":
      await noteModel.create(newItem);
      return;
    case "updateOneNote":
      await item.update(newItem);
      return;
    case "deleteOneNote":
      await item.destroy();
    default:
      break;
  }
};

module.exports = NotesDBQueries;
