import AppContainer from '../components/componentContainers/appContainer';
import wishListContainer from '../components/componentContainers/wishListContainer';
import { ContentComponent } from '../components/contacts';
import { ReadMeComponent } from '../components/readMe';

export const map: object = {
  '/': {
    component: AppContainer,
    exact: true,
  },
  '/contacts': {
    component: ContentComponent,
    exact: false,
  },
  '/readme': {
    component: ReadMeComponent,
    exact: false,
  },
  '/wishList': {
    component: wishListContainer,
    exact: false,
  }
};