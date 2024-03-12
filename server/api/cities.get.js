export default defineEventHandler(async () => {
  const baseURL = "https://geo.api.gouv.fr/communes";

  const params = {};

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
