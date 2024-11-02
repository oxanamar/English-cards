import React, { useState } from "react";
import data from "../../data";
import { FaSave, FaPen, FaTrash, FaSyncAlt } from "react-icons/fa";
import styles from "./table.module.css";

function Table() {
  const [inputData, setInputData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    collection: "",
  });

  const [rows, setRows] = useState(data);
  const [attemptedSave, setAttemptedSave] = useState(false);

  const handleChange = (field, value) => {
    setInputData({
      ...inputData,
      [field]: value,
    });
  };

  const saveRow = () => {
    setAttemptedSave(true);
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
      setInputData({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        collection: "",
      });
      setAttemptedSave(false);
    }
  };

  const isInputEmpty = (field) => !inputData[field].trim();

  const deleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const toggleEdit = (index) => {
    setRows(
      rows.map((row, i) =>
        i === index ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };

  const handleRowChange = (index, field, value) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const saveRowChanges = (index) => {
    toggleEdit(index);
  };

  const clearInputs = () => {
    setInputData({
      id: "",
      english: "",
      transcription: "",
      russian: "",
      collection: "",
    });
    setAttemptedSave(false);
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
                className={
                  attemptedSave && isInputEmpty("id") ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.english}
                onChange={(e) => handleChange("english", e.target.value)}
                className={
                  attemptedSave && isInputEmpty("english")
                    ? styles.errorInput
                    : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.transcription}
                onChange={(e) => handleChange("transcription", e.target.value)}
                className={
                  attemptedSave && isInputEmpty("transcription")
                    ? styles.errorInput
                    : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.russian}
                onChange={(e) => handleChange("russian", e.target.value)}
                className={
                  attemptedSave && isInputEmpty("russian")
                    ? styles.errorInput
                    : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
                className={
                  attemptedSave && isInputEmpty("collection")
                    ? styles.errorInput
                    : ""
                }
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
                    value={row.tags}
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
