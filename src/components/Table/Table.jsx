import React, { useState } from "react";
import data from "../../data";
import { FaSave, FaPen, FaTrash, FaSyncAlt } from "react-icons/fa";
import styles from "./table.module.css";

function Table() {
  // State to manage the first row's input fields
  const [inputData, setInputData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    collection: "",
  });

  // State to manage the list of words (initially populated from data.js)
  const [rows, setRows] = useState(data);

  // Handler for updating the first row's input fields
  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
  };

  // Handler to save the first row's data and add a new word to the table
  const saveRow = () => {
    if (
      inputData.id &&
      inputData.english &&
      inputData.transcription &&
      inputData.russian &&
      inputData.collection
    ) {
      setRows([
        ...rows,
        { ...inputData, tags: inputData.collection, isEditing: false },
      ]);
      // Clear the input fields after saving
      setInputData({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        collection: "",
      });
    }
  };

  // Handler to delete a word from the table
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1); // Remove the row by index
    setRows(updatedRows);
  };

  // Handler to toggle edit mode for a word
  const toggleEdit = (index) => {
    setRows(
      rows.map((row, i) =>
        i === index ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  // Handler for updating the fields of a word in edit mode
  const handleRowChange = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // Handler to save changes after editing a word
  const saveRowChanges = (index) => {
    toggleEdit(index);
  };

  // Handler to clear the input fields in the first row
  const clearInputs = () => {
    setInputData({
      id: "",
      english: "",
      transcription: "",
      russian: "",
      collection: "",
    });
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Collection</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* First row with input fields to add a new word */}
          <tr>
            <td>
              <input
                type="text"
                value={inputData.id}
                onChange={(e) => handleChange("id", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.english}
                onChange={(e) => handleChange("english", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.transcription}
                onChange={(e) => handleChange("transcription", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.russian}
                onChange={(e) => handleChange("russian", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
              />
            </td>
            <td>
              <button className={styles["btn-save"]} onClick={saveRow}>
                <FaSave />
              </button>
              <button className={styles["btn-clear"]} onClick={clearInputs}>
                <FaSyncAlt />
              </button>
            </td>
          </tr>

          {/* Display existing rows with edit and delete functionality */}
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.english}
                    onChange={(e) =>
                      handleRowChange(index, "english", e.target.value)
                    }
                  />
                ) : (
                  row.english
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.transcription}
                    onChange={(e) =>
                      handleRowChange(index, "transcription", e.target.value)
                    }
                  />
                ) : (
                  row.transcription
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.russian}
                    onChange={(e) =>
                      handleRowChange(index, "russian", e.target.value)
                    }
                  />
                ) : (
                  row.russian
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.tags} // tags represent the collection
                    onChange={(e) =>
                      handleRowChange(index, "tags", e.target.value)
                    }
                  />
                ) : (
                  row.tags
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <button
                    className={styles["btn-save"]}
                    onClick={() => saveRowChanges(index)}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className={styles["btn-edit"]}
                    onClick={() => toggleEdit(index)}
                  >
                    <FaPen />
                  </button>
                )}
                <button
                  className={styles["btn-delete"]}
                  onClick={() => deleteRow(index)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
