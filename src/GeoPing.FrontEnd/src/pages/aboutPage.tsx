import * as React from 'react';

import AboutComponentContainer from '../componentContainers/aboutComponentContainer';
import IAboutPageProps from '../pageProps/aboutPageProps';
import { AboutBlockInfoComponent } from '../components/aboutBlockInfoComponent';

export class AboutComponent extends React.Component<IAboutPageProps, any> {
  render() {
    return (
      <div className="about-page-container">
        <AboutComponentContainer/>
        <AboutBlockInfoComponent
          title="Создавайте свои списки и делайте их публичными."
          info="Создайте собственный маршрут для путешествий и поделитесь с другими.
              Получайте отзывы от других пользователей.
              Добавляйте к себе списки других пользователей и оценивайте их."
          imageLeftReverse={false}
          image="../assets/images/public_lists.png"
        />
        <AboutBlockInfoComponent
          title="История отметок"
          info="Просматривайте историю своих отметок."
          imageLeftReverse={true}
          image="../assets/images/table-history.png"
        />
        <AboutBlockInfoComponent
          title="Делитесь с друзьями"
          info="Делитесь своими списками с другими.
            Предоставляйте им возможность отмечаться на точках, которые вы создали. "
          imageLeftReverse={false}
          image="../assets/images/sharing.png"
        /><AboutBlockInfoComponent
          title="Статистика"
          info="Смотрите статистику отметок своих списков, кто, где и когда отмечался."
          imageLeftReverse={true}
          image="../assets/images/statistics.png"
        />
      </div>
    );
  }
}