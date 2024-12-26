import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

const API_URL = "http://itgirlschool.justmakeit.ru/api/words";

class WordStore {
  words = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this, {
      fetchWords: true,
      addWord: true,
      updateWord: true,
      deleteWord: true,
    });
  }

  fetchWords = async () => {
    this.loading = true;
    try {
      const response = await axios.get(API_URL);
      runInAction(() => {
        this.words = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to fetch words";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  addWord = async (newWord) => {
    try {
      const response = await axios.post(`${API_URL}/add`, newWord, {
        headers: { "Content-Type": "application/json" },
      });
      runInAction(() => {
        this.words.push(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to add word";
      });
    }
  };

  updateWord = async (id, updatedWord) => {
    try {
      await axios.post(`${API_URL}/${id}/update`, updatedWord);
      runInAction(() => {
        const index = this.words.findIndex((word) => word.id === id);
        if (index !== -1) this.words[index] = updatedWord;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to update word";
      });
    }
  };

  deleteWord = async (id) => {
    try {
      await axios.post(`${API_URL}/${id}/delete`);
      runInAction(() => {
        this.words = this.words.filter((word) => word.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to delete word";
      });
    }
  };
}

export const wordStore = new WordStore();
