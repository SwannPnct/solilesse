import { handleDB } from "~/lib/utils";

export const useDeletedAnnouncements = defineStore(
  "deletedAnnouncements",
  () => {
    const deletedAnnouncements = ref({
      results: [],
      total: 0,
    });

    const getLastDeletedAnnouncements = async (query) => {
      await handleDB(async (db, keys) => {
        deletedAnnouncements.value.total = await db.count(keys.DELETED);
        deletedAnnouncements.value.results = await db.getAllFromIndex(
          keys.DELETED,
          "datesupprimee",
          undefined,
          query.limit
        );
      });
    };

    const getAllDeletedAnnouncements = async () => {
      await handleDB(async (db, keys) => {
        deletedAnnouncements.value.results = await db.getAllFromIndex(
          keys.DELETED,
          "datesupprimee"
        );
      });
    };

    return {
      deletedAnnouncements,
      getLastDeletedAnnouncements,
      getAllDeletedAnnouncements,
    };
  }
);
