import { TourGuideClient } from "@sjmc11/tourguidejs/src/Tour";

const homeTourSteps = [
  {
    group: "home",
    title: "Bienvenue sur Solilesse",
    content: "Voici un rapide tutoriel sur l'utilisation de cette application.",
  },
  {
    group: "home",
    title: "Liste des annonces",
    content:
      "C'est ici que vous verrez la liste des dernières annonces commerciales. <br /> Elles sont toujours ordonnées de la plus récente à plus ancienne.",
  },
  {
    group: "home",
    title: "Filtrage des annonces",
    content:
      "Vous pouvez affiner votre recherche à des villes et à des familles d'avis.",
    target: "#tour-home-1",
  },
  {
    group: "home",
    title: "Affichage de plus d'informations",
    content:
      "Vous pouvez aussi afficher plus d'informations concernant une annonce en cliquant sur sa carte correspondante.",
    target: "#tour-home-2",
  },
  {
    group: "home",
    title: "Mise en favori ou suppression",
    content:
      "Si une annonce vous intéresse et vous souhaitez l'enregistrer, utilsez le bouton <span class='text-green-500 font-semibold'>Étoile</span>.<br /> Sinon, supprimez-la pour qu'elle n'apparaisse plus dans la liste, via le bouton <span class='text-red-500 font-semibold'>Poubelle</span>.",
    target: "#tour-home-3",
  },
  {
    group: "home",
    title: "Gêrer les favories et les suppressions.",
    content:
      "Utiliser le menu de navigation afin d'accéder aux annonces que vous avez mises en favori ou que vous avez supprimées.",
    target: "#tour-home-4",
  },
];

const deletedTourSteps = [
  {
    group: "deleted",
    title: "Liste des annonces supprimées",
    content: "C'est ici que vous verrez la liste des annonces commerciales que vous avez <span class='text-red-500'>supprimées</span>.",
  },
  {
    group: "deleted",
    title: "Mise en favori",
    content: "Vous pouvez à tout moment revenir sur votre décision en mettant l'annonce en favori.",
    target: "#tour-deleted-1",
  },
]

const favTourSteps = [
  {
    group: "fav",
    title: "Liste des annonces favories",
    content: "C'est ici que vous verrez la liste des annonces commerciales que vous avez <span class='text-green-500'>mises en favori</span>.",
  },
  {
    group: "fav",
    title: "Carte d'annonce favorie",
    content: "Afin d'accéder au détail des sollicitations, cliquez sur la carte.",
    target: "#tour-fav-1",
  },
  {
    group: "fav",
    title: "Status d'une annonce",
    content: "Vous pouvez également avoir un aperçu du statut de vos sollicitations.",
    target: "#tour-fav-2",
  },
]

let instance: TourGuideClient;
const _getTourGuide = (): TourGuideClient => {
  if (!instance)
    instance = new TourGuideClient({
      debug: false,
      steps: [...homeTourSteps, ...deletedTourSteps, ...favTourSteps],
    });
  return instance;
};

const _startTour = ({ group, force }: { group: string, force?: boolean }) => {
  const tg = _getTourGuide();
  if (force || (!tg.isFinished(group) && !tg.isVisible)) {
    tg.start(group)
  }
};

export const startHomeTour = ({ force }: { force?: boolean } = {}) => {
  _startTour({
    group: "home",
    force
  })
};

export const startDeletedTour = ({ force }: { force?: boolean } = {}) => {
  _startTour({
    group: "deleted",
    force
  })
};

export const startFavTour = ({ force }: { force?: boolean } = {}) => {
  _startTour({
    group: "fav",
    force
  })
};
