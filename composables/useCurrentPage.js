import { replaceQuery } from "~/lib/utils";

export default () => {
  const route = useRoute();
  const page = computed(() => route.query.page);

  const currentPage = ref(page.value ? parseInt(page.value, 10) : 1);

  watch(currentPage, async () => {
    await replaceQuery(route, {
      page: currentPage.value,
    });
    window.scrollTo({ top: 0 });
  });

  watch(page, () => {
    if (page !== currentPage) {
      currentPage.value = parseInt(page.value, 10);
    }
  });

  return {
    page,
    currentPage,
  };
};
