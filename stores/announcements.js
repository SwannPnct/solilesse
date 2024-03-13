export const useAnnouncements = defineStore("announcements", () => {
  const announcements = ref({});

  const fetchAnnouncements = async (query) => {
    const data = await $fetch("/api/announcements?", {
      query,
    });
    announcements.value = data;
    return true;
  };

  return {
    announcements,
    fetchAnnouncements,
  };
});
