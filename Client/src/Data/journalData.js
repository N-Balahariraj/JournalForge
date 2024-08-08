import { fetchJournals } from "../UtilFunctions/journals.api";

export let journals = [];

export const loadJournals = async () => {
  const data = await fetchJournals();
  journals = data.journals;
};

