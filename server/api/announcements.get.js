export default defineEventHandler(async (event) => {
  const baseURL =
    "https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records?";

  const query = getQuery(event);
  const params = {};

  if (query.city) {
    params.where = `ville:"${query.city}"`;
  }
  if (query.limit) {
    params.limit = query.limit;
  }
  if (query.page) {
    params.offset = (query.page - 1) * query.limit;
  }

  let data;
  let json;

  try {
    data = await fetch(baseURL + new URLSearchParams(params));
    json = await data.json();
  } catch {
    data = {
      status: 500,
    };
  }

  if ([400, 500].includes(data.status)) {
    throw createError({
      statusCode: data.status,
      statusMessage: json.message ?? "Erreur inconnue.",
    });
  } else {
    return json;
  }
});
