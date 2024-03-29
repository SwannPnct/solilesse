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

  const addContactsFavAnnouncement = async (id, contact) => {
    await handleDB(async (db, keys) => {
      const announcement = await db.get(keys.FAV, id);
      announcement.contacts = [contact, ...(announcement.contacts ?? [])];
      await db.put(keys.FAV, announcement);
    });

    favAnnouncements.value.results = favAnnouncements.value.results.map(
      (ann) => {
        if (ann.id === id) {
          return {
            ...ann,
            contacts: ann.contacts ? [contact, ...ann.contacts] : [contact],
          };
        }
        return ann;
      }
    );
  };

  const removeContactsFavAnnouncement = async (id, index) => {
    await handleDB(async (db, keys) => {
      const announcement = await db.get(keys.FAV, id);
      announcement.contacts = [
        ...announcement.contacts.slice(0, index),
        ...announcement.contacts.slice(index + 1),
      ];
      await db.put(keys.FAV, announcement);
    });

    favAnnouncements.value.results = favAnnouncements.value.results.map(
      (ann) => {
        if (ann.id === id) {
          return {
            ...ann,
            contacts: [
              ...ann.contacts.slice(0, index),
              ...ann.contacts.slice(index + 1),
            ],
          };
        }
        return ann;
      }
    );
  };

  return {
    favAnnouncements,
    getLastFavAnnouncements,
    getAllFavAnnouncements,
    addContactsFavAnnouncement,
    removeContactsFavAnnouncement,
  };
});
