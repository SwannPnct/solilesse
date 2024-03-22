import { handleDB } from "~/lib/utils";

export const useFavAnnouncements = defineStore("favAnnouncements", () => {
  const favAnnouncements = ref({
    results: [],
    total: 0,
  });

  const getLastFavAnnouncements = async (query) => {
    await handleDB(async (db, keys) => {
      favAnnouncements.value.total = await db.count(keys.FAV);
      favAnnouncements.value.results = await db.getAllFromIndex(
        keys.FAV,
        "dateajoutee",
        undefined,
        query.limit
      );
    });
  };

  const getAllFavAnnouncements = async () => {
    await handleDB(async (db, keys) => {
      favAnnouncements.value.results = await db.getAllFromIndex(
        keys.FAV,
        "dateajoutee"
      );
    });
  };

  return {
    favAnnouncements,
    getLastFavAnnouncements,
    getAllFavAnnouncements,
  };
});
