import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { WordContext } from "../../context/WordContext";
import { FaSave, FaPen, FaTrash, FaSyncAlt, FaTimes } from "react-icons/fa";
import styles from "./table.module.css";

const Table = observer(() => {
  const wordStore = useContext(WordContext);
  const { words, fetchWords, addWord, updateWord, deleteWord, loading, error } =
    wordStore;

  const [inputData, setInputData] = useState({
    id: "",
    english: "",
    transcription: "",
    russian: "",
    tags: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const handleChange = (field, value) => {
    setInputData({ ...inputData, [field]: value });
    setValidationError(false); // Reset validation error on input change
  };

  const saveRow = () => {
    const isValid =
      inputData.id &&
      inputData.english &&
      inputData.transcription &&
      inputData.russian &&
      inputData.tags;

    if (isValid) {
      addWord(inputData);
      setInputData({
        id: "",
        english: "",
        transcription: "",
        russian: "",
        tags: "",
      });
    } else {
      setValidationError(true);
      alert("Please fill in all fields.");
    }
  };

  const startEditing = (index, word) => {
    setEditingIndex(index);
    setInputData(word);
  };

  const saveRowChanges = (id) => {
    updateWord(id, inputData);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setInputData({
      id: "",
      english: "",
      transcription: "",
      russian: "",
      tags: "",
    });
  };

  return (
    <div className={styles["table-container"]}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>English</th>
            <th>Transcription</th>
            <th>Russian</th>
            <th>Tags</th>
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
                  validationError && !inputData.id ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.english}
                onChange={(e) => handleChange("english", e.target.value)}
                className={
                  validationError && !inputData.english ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.transcription}
                onChange={(e) => handleChange("transcription", e.target.value)}
                className={
                  validationError && !inputData.transcription
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
                  validationError && !inputData.russian ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={inputData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className={
                  validationError && !inputData.tags ? styles.errorInput : ""
                }
              />
            </td>
            <td>
              <button className={styles["btn-save"]} onClick={saveRow}>
                <FaSave />
              </button>
              <button className={styles["btn-clear"]} onClick={cancelEdit}>
                <FaSyncAlt />
              </button>
            </td>
          </tr>

          {words.map((word, index) => (
            <tr key={word.id}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                  />
                ) : (
                  word.id
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.english}
                    onChange={(e) => handleChange("english", e.target.value)}
                  />
                ) : (
                  word.english
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.transcription}
                    onChange={(e) =>
                      handleChange("transcription", e.target.value)
                    }
                  />
                ) : (
                  word.transcription
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.russian}
                    onChange={(e) => handleChange("russian", e.target.value)}
                  />
                ) : (
                  word.russian
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={inputData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                  />
                ) : (
                  word.tags
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button
                      className={styles["btn-save"]}
                      onClick={() => saveRowChanges(word.id)}
                    >
                      <FaSave />
                    </button>
                    <button
                      className={styles["btn-cancel"]}
                      onClick={cancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles["btn-edit"]}
                      onClick={() => startEditing(index, word)}
                    >
                      <FaPen />
                    </button>
                    <button
                      className={styles["btn-delete"]}
                      onClick={() => deleteWord(word.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
