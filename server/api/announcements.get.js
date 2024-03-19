export default defineEventHandler(async (event) => {
  const baseURL =
    "https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records?";

  const query = getQuery(event);
  const params = {};

  const whereItems = ["listeetablissements is not null"];
  if (query.deleted) {
    if (typeof query.deleted === "string") {
      whereItems.push(`NOT id:"${query.deleted}"`);
    } else {
      query.deleted.forEach((id) => {
        whereItems.push(`NOT id:"${id}"`);
      });
    }
  }
  if (query.city) {
    whereItems.push(`ville:"${query.city}"`);
  }
  if (query.family) {
    whereItems.push(`familleavis_lib:"${query.family}"`);
  }

  params.where = whereItems.join(" AND ");

  if (query.limit) {
    params.limit = query.limit;
  }
  if (query.orderBy) {
    params.order_by = query.orderBy;
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
