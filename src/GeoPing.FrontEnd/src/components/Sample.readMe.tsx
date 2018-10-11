import * as React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../constants/routes';

export class ReadMeComponent extends React.Component<any, any> {
  render() {
    return (
      <div className="container-div-readme">
        <div className="container">
          <div>
            <h5><b>Контакты GitHub</b></h5>
            <a href="https://github.com/bugnabuggy">github</a>
          </div>
          <div className="text-justify">
            <h4><b>Описание: </b></h4>
            <div>
              <h6>Данный проект является шаблоном для написания приложения на библиотеке React.
                В данном шаблоне возможно использовать type script.
                Используетя React Router v4. В шаблоне представленна одна из возможностей его использования.
                Показан пример передачи свойств от роутера компоненту, а так же передача свойств через ссылки.
                В шаблоне представленны 2 просты формочки, одна сделана с помощью bootstrap, а вторая на css Grid.
              </h6>
            </div>
          </div>
          <div className="text-justify">
            <dl>
              <dt>Используемые Технологии:</dt>
              <dd>- React v16.2.0</dd>
              <dd>- Type script v2.7.2</dd>
              <dd>- Redax v5.0.7</dd>
              <dd>- Webpack v3.11.0</dd>
              <dd>- Mocha v5.0.4</dd>
              <dd>- Express v4.13.4</dd>
              <dd>- Bootstrap v4.0.0</dd>
            </dl>
          </div>
          <div className="text-justify">
            <h4><b>Файлы в шаблоне: </b></h4>
            <h6>
              <dl>
                <dt>index.html</dt>
                <dd>- хранится основная html разметка, куда подключается bundle.js файл с основным кодом.</dd>
                <dt>index.ejs</dt>
                <dd>- шаблон разметки, который используется webpack при сборке приложения.</dd>
                <dt>index.tsx</dt>
                <dd>- точка входа приложения.</dd>
                <dt>router.tsx</dt>
                <dd>- в данном файле создается маршрутизация в приложении.</dd>
                <dt>setupComponentViaEnzyme.tsx</dt>
                <dd>- небольшая утилита для отрисовки компонентов при тестировании.</dd>
                <dt>build.js</dt>
                <dd>- файл хранит настройки для сборки приложения.</dd>
                <dt>prestart.js</dt>
                <dd>- этот файл запускается до старта приложения. (в режиме разработки)</dd>
                <dt>startServer.js</dt>
                <dd>- данный файл хранит настройки для запуска приложения в режиме разработки</dd>
                <dt>startTest.js</dt>
                <dd>- хранит настройки для тестов</dd>
              </dl>
            </h6>
          </div>
        </div>
        <div className="col-12 footer">
          <div className="footer-content2">
            <div>
              <Link to={baseUrl}>Back</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}