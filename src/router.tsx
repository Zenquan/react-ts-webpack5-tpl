import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from 'utils';
import { BlockLoading } from 'zent';
import random from 'number-random';

const routes: Array<{component: any, path?: string}> = [
  {
    component: lazy(() =>
      import(/* webpackChunkName: "home" */'pages/Home')),
    path: "/",
  },
  {
    component: lazy(() =>
      import(/* webpackChunkName: "not-found" */'pages/NotFound')),
  }
];

export default function AppRouter() {
  return (
    <Router history={history}>
      <Suspense fallback={
        <BlockLoading loading icon="circle"
          iconSize={64} iconText="加载中" />
      }>
        <Switch>
          {routes &&
            routes.map((
              route: { component: any; path?: string },
              index: number
            ) => {
              const key = random(100, 999),
                { component, path, } = route;
              return (<Route
                path={path}
                key={key}
                exact={!index ? true : false}
                component={component}
              ></Route>);
            })}
        </Switch>
      </Suspense>
    </Router>
  );
}
