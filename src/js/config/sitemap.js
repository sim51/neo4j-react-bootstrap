import Home from '~/pages/home/home';
import SettingsNeo4j from '~/pages/settings/settings.neo4j';
import SettingsSigmaLayout from '~/pages/settings/settings.sigma.layout';
import SettingsSigma from '~/pages/settings/settings.sigma';
import SettingsApplication from '~/pages/settings/settings.application';
import MovieSearch from '~/pages/movie/movie-search';
import MovieDetail from '~/pages/movie/movie-detail';
import PersonSearch from '~/pages/person/person-search';
import PersonDetail from '~/pages/person/person-detail';

/**
* Configuration object for the sitemap
*/

/**
* Sitemap of the application.
*
* Each object should have :
*  - path : for the router
*  - name : will be display in menu
*  - title : will be the title of the page
*  - hidden (true/false) : if the item should be display into main menu
*  - component : component that will be loaded to display the page
*  - expand (true/false) : if there is an array of sub-pages, do we display a list into the menu ?
*  - state : the constraint on state for the router (it's bi-directional with the hash)
*     - must have a view, and it must be unique across all page.
*  - an array of sub-pages if needed
*
*  If an item has no path & no state, it's not a route, but an item to add to the menu
*/
const configSitemap = {
  defaultRoute: '/home',
  pages: [
    {
      path: '/home',
      name: 'Accueil',
      title: 'Accueil',
      component: Home,
      state: {
        view: 'home'
      }
    },
    {
      path: '/movie/:id',
      name: 'Movie detail',
      title: 'Movie detail',
      hidden: true,
      component: MovieDetail,
      state: {
        view: 'movie.detail',
        movie: {
          id: ':id'
        }
      }
    },
    {
      path: '/movie',
      name: 'Movie',
      title: 'Search a movie',
      component: MovieSearch,
      state: {
        view: 'movie.search'
      }
    },
    {
      path: '/person/:id',
      name: 'Person detail',
      title: 'Person detail',
      hidden: true,
      component: PersonDetail,
      state: {
        view: 'person.detail',
        person: {
          id: ':id'
        }
      }
    },
    {
      path: '/person',
      name: 'Person',
      title: 'Search a person',
      component: PersonSearch,
      state: {
        view: 'person.search'
      }
    },
    {
      path: '/settings',
      name: 'Configuration',
      title: 'Configuration',
      defaultRoute: '/application',
      state: {
        view: 'settings'
      },
      expand : false,
      pages: [
        {
          path: '/application',
          name: 'Application',
          title: 'Application configuration',
          component: SettingsApplication,
          state: {
            view: 'settings.application'
          }
        },
        {
          path: '/server',
          name: 'Neo4j',
          title: 'Neo4j configuration',
          component: SettingsNeo4j,
          state: {
            view: 'settings.neo4j'
          }
        },
        {
          path: '/sigma',
          name: 'Sigma',
          title: 'Sigma configuration',
          component: SettingsSigma,
          state: {
            view: 'settings.sigma'
          }
        },
        {
          path: '/layout',
          name: 'Sigma layout',
          title: 'Sigma layout configuration',
          component: SettingsSigmaLayout,
          state: {
            view: 'settings.layout'
          }
        }
      ]
    }
  ]
}

export default configSitemap;
