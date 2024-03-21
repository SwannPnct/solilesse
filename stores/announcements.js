import { handleDB, replaceQuery } from "~/lib/utils";

export const useAnnouncements = defineStore("announcements", () => {
  const announcements = ref({
    total: 0,
    pages: {},
  });
  const lastQuery = ref({});

  const fetchAnnouncements = async (query) => {
    lastQuery.value = query;

    if (query.reset === "true") {
      resetAnnouncements();
      const route = useRoute();
      await replaceQuery(route, {
        reset: false,
      });
      return true;
    }

    await handleDB(async (db, keys) => {
      query.deleted = await db.getAllKeys(keys.DELETED);
    });

    const page = query.page ? parseInt(query.page, 10) : 1;

    if (!announcements.value.pages[page]) {
      const data = await $fetch("/api/announcements?", {
        query,
      });
      announcements.value.total = data.total_count;
      announcements.value.pages[page] = data.results;
    }

    const nextPage = page + 1;

    if (
      announcements.value.total > page * query.limit &&
      !announcements.value.pages[nextPage]
    ) {
      const data = await $fetch("/api/announcements?", {
        query: {
          ...query,
          page: nextPage,
        },
      });
      announcements.value.pages[nextPage] = data.results;
    }

    query.deleted = undefined;
    return true;
  };

  const deleteAccouncement = async ({
    id,
    dateparution,
    commercant,
    ville,
    familleavis_lib,
    listeetablissements,
  }) => {
    await handleDB(async (db, keys) => {
      await db.put(keys.DELETED, {
        id,
        dateparution,
        commercant,
        ville,
        familleavis_lib,
        listeetablissements,
        datesupprimee: new Date(),
      });
    });

    let targetPage;

    Object.keys(announcements.value.pages).forEach((page) => {
      announcements.value.pages[page] = announcements.value.pages[page].filter(
        (announcement) => {
          if (announcement.id !== id) {
            return true;
          } else {
            targetPage = parseInt(page, 10);
            return false;
          }
        }
      );
    });

    if (announcements.value.pages[targetPage + 1]) {
      announcements.value.pages[targetPage].push(
        announcements.value.pages[targetPage + 1][0]
      );
    }

    announcements.value.total--;

    resetNextAnnouncements(targetPage);
    fetchAnnouncements(lastQuery.value);

    return true;
  };

  const resetAnnouncements = () => {
    announcements.value = {
      total: 0,
      pages: {},
    };
  };

  const resetNextAnnouncements = (fromPage) => {
    Object.keys(announcements.value.pages).forEach((page) => {
      if (parseInt(page, 10) > fromPage) {
        announcements.value.pages[page] = undefined;
      }
    });
  };

  return {
    announcements,
    fetchAnnouncements,
    deleteAccouncement,
    resetAnnouncements,
  };
});
