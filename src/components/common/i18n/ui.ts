export const languages = {
    en: 'EN',
    fr: 'FR',
    nl: 'NL',
};

export const showDefaultLang = false;
export const defaultLang = 'fr';
/*
export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.login': 'Login',
        'nav.about': 'About',
        'nav.twitter': 'Twitter',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.login': 'Se connecter',
        'nav.about': 'À propos',
    },
} as const;
*/

export const ui: LangTrans = {
    en: {
        nav_club: 'Club',
        nav_create: 'Create your tournament',
        nav_player_space: 'Player\'s space',
        nav_home: '',
        nav_login: 'Login',
        nav_tournaments: 'Tournaments',
        nav_pricing: 'Pricing',
        nav_search_tournament: 'Search a tournament',
    },
    fr: {
        nav_club: 'Club',
        nav_create: 'Créer votre tournoi',
        nav_player_space: 'Espace joueur',
        nav_home: '',
        nav_login: 'Se connecter',
        nav_tournaments: 'Tournaments',
        nav_pricing: 'Pricing',
        nav_search_tournament: 'Chercher un tournoi',
    },
    nl: {
        nav_club: 'Club',
        nav_create: 'Maak uw Tournoi',
        nav_player_space: 'Speler ruimte',
        nav_home: '',
        nav_login: 'Inloggen',
        nav_tournaments: 'Tournaments',
        nav_pricing: 'Pricing',
        nav_search_tournament: 'Zoek naar een tournoi'
    }
} as const;


interface LangTrans {
	en: KeyLang
	fr: KeyLang,
    nl: KeyLang
}

interface KeyLang {
    nav_club: string,
    nav_create: string,
    nav_player_space: string,
    nav_home: string,
    nav_login: string,
    nav_tournaments: string,
    nav_pricing: string
    nav_search_tournament: string,
}