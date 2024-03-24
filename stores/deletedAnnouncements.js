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

    const favAnnouncement = async ({
      id,
      dateparution,
      commercant,
      ville,
      familleavis_lib,
      listeetablissements,
      listepersonnes,
    }) => {
      await handleDB(async (db, keys) => {
        await db.delete(keys.DELETED, id);
        await db.put(keys.FAV, {
          id,
          dateparution,
          commercant,
          ville,
          familleavis_lib,
          listeetablissements,
          listepersonnes,
          dateajoutee: new Date(),
        });
      });

      _removeFromDeletedAnnouncements(id);

      return true;
    };

    const _removeFromDeletedAnnouncements = (id) => {
      deletedAnnouncements.value.results.splice(
        deletedAnnouncements.value.results.findIndex((ann) => ann.id === id),
        1
      );
    };

    return {
      deletedAnnouncements,
      getLastDeletedAnnouncements,
      getAllDeletedAnnouncements,
      favAnnouncement,
    };
  }
);
