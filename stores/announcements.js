import { replaceQuery } from "~/lib/utils";

export const useAnnouncements = defineStore("announcements", () => {
  const announcements = ref({
    total: 0,
    pages: {},
  });

  const fetchAnnouncements = async (query) => {
    if (query.reset === "true") {
      resetAnnouncements();
      const route = useRoute();
      await replaceQuery(route, {
        reset: false,
      });
    }
    if (!announcements.value.pages[query.page]) {
      const data = await $fetch("/api/announcements?", {
        query,
      });
      announcements.value.total = data.total_count;
      announcements.value.pages[query.page ?? 1] = data.results;
    }
    return true;
  };

  const resetAnnouncements = () => {
    announcements.value = {
      total: 0,
      pages: {},
    };
  };

  return {
    announcements,
    fetchAnnouncements,
    deleteAccouncement,
    resetAnnouncements,
  };
});
