export default (announcement) => {
  const establishment = computed(() =>
    JSON.parse(announcement.listeetablissements)
  );
  const people = computed(() => JSON.parse(announcement.listepersonnes));

  const name = computed(
    () =>
      people.value.personne.denomination ??
      people.value.personne.nomCommercial ??
      announcement.commercant
  );
  const address = computed(
    () =>
      Object.values(establishment.value.etablissement.adresse ?? {}).join(
        " "
      ) || "Pas d'adresse."
  );
  const activity = computed(() => establishment.value.etablissement?.activite);
  const actors = computed(
    () =>
      people.value.personne.administration ??
      (people.value.personne.nom
        ? `${people.value.personne.prenom} ${people.value.personne.nom}`
        : "Pas de noms.")
  );

  return {
    establishment,
    people,
    name,
    address,
    activity,
    actors,
  };
};
