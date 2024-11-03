import React, { useState } from "react";
import data from "../../data";
import { FaSave, FaPen, FaTrash, FaSyncAlt, FaTimes } from "react-icons/fa";
import styles from "./table.module.css";

function Table() {
  const [inputData, setInputData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    collection: "",
  });

  const [rows, setRows] = useState(
    data.map((row) => ({
      ...row,
      attemptedSave: false,
      isEditing: false, // Track editing state here
    }))
  );
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
  };

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
        {
          ...inputData,
          tags: inputData.collection,
          isEditing: false,
          attemptedSave: false,
        },
      ]);
      setInputData({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        collection: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const deleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const toggleEdit = (index) => {
    // Toggle edit state and store current row values for canceling
    setEditingIndex(index);
    setRows(
      rows.map((row, i) =>
        i === index
          ? { ...row, isEditing: !row.isEditing, originalData: { ...row } }
          : row
      )
    );
  };

  const handleRowChange = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const saveRowChanges = (index) => {
    const row = rows[index];
    const hasEmptyFields =
      !row.id ||
      !row.english ||
      !row.transcription ||
      !row.russian ||
      !row.tags;

    if (hasEmptyFields) {
      setRows(
        rows.map((row, i) =>
          i === index ? { ...row, attemptedSave: true } : row
        )
      );
      alert("An error occurred: please fill in all fields.");
    } else {
      console.log("Saved changes:", row);
      setRows(
        rows.map((row, i) => (i === index ? { ...row, isEditing: false } : row))
      );
      setEditingIndex(null);
    }
  };

  const cancelEdit = (index) => {
    // Restore original data if editing was in progress
    setRows(
      rows.map((row, i) =>
        i === index
          ? { ...row.originalData, isEditing: false, attemptedSave: false }
          : row
      )
    );
    setEditingIndex(null);
  };

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
              <button
                className={styles["btn-save"]}
                onClick={saveRow}
                disabled={
                  !inputData.id ||
                  !inputData.english ||
                  !inputData.transcription ||
                  !inputData.russian ||
                  !inputData.collection
                }
              >
                <FaSave />
              </button>
              <button className={styles["btn-clear"]} onClick={clearInputs}>
                <FaSyncAlt />
              </button>
            </td>
          </tr>

          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.id}
                    onChange={(e) =>
                      handleRowChange(index, "id", e.target.value)
                    }
                    className={
                      editingIndex === index && row.attemptedSave && !row.id
                        ? styles.errorInput
                        : ""
                    }
                  />
                ) : (
                  row.id
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.english}
                    onChange={(e) =>
                      handleRowChange(index, "english", e.target.value)
                    }
                    className={
                      editingIndex === index &&
                      row.attemptedSave &&
                      !row.english
                        ? styles.errorInput
                        : ""
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
                    className={
                      editingIndex === index &&
                      row.attemptedSave &&
                      !row.transcription
                        ? styles.errorInput
                        : ""
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
                    className={
                      editingIndex === index &&
                      row.attemptedSave &&
                      !row.russian
                        ? styles.errorInput
                        : ""
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
                    value={row.tags}
                    onChange={(e) =>
                      handleRowChange(index, "tags", e.target.value)
                    }
                    className={
                      editingIndex === index && row.attemptedSave && !row.tags
                        ? styles.errorInput
                        : ""
                    }
                  />
                ) : (
                  row.tags
                )}
              </td>
              <td>
                {row.isEditing ? (
                  <>
                    <button
                      className={styles["btn-save"]}
                      onClick={() => saveRowChanges(index)}
                    >
                      <FaSave />
                    </button>
                    <button
                      className={styles["btn-cancel"]}
                      onClick={() => cancelEdit(index)}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <button
                    className={styles["btn-edit"]}
                    onClick={() => toggleEdit(index)}
                  >
                    <FaPen />
                  </button>
                )}
                {!row.isEditing && (
                  <button
                    className={styles["btn-delete"]}
                    onClick={() => deleteRow(index)}
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
