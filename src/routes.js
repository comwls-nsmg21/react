import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CompanyLocation = React.lazy(() => import('./views/Location/Company'));
const BankUserLocation = React.lazy(() => import('./views/Location/BankUser'));
const LocationLive = React.lazy(() => import('./views/LocationLive/LocationLive'));
const Company = React.lazy(() => import('./views/Company/CompanyList'));
const CompanySearch = React.lazy(() => import('./views/Company/CompanySearch'));
const Locations = React.lazy(() => import('./views/Company/Locations'));
const Bank = React.lazy(() => import('./views/Bank/BankList'));
const BankCom = React.lazy(() => import('./views/Bank/BankListCom'));
const BankService = React.lazy(() => import('./views/Bank/BankListService'));
const TrendAppsAll = React.lazy(() => import('./views/Trend/TrendAppsAll'));
const TrendAppsKeyword = React.lazy(() => import('./views/Trend/TrendAppsKeyword'));
const TrendAppsPrd = React.lazy(() => import('./views/Trend/TrendAppsPrd'));
const TrendAppsPrdKeyword = React.lazy(() => import('./views/Trend/TrendAppsPrdKeyword'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: '홈', component: DefaultLayout, exact: true },
  { path: '/Dashboard', name: '대시보드', component: Dashboard },
  { path: '/Location/Company', name: '기업 분포', component: CompanyLocation },
  { path: '/Location/BankUser', name: '잠재고객 분포', component: BankUserLocation },
  { path: '/LocationLive', name: '위치기반 라이브', component: LocationLive },
  { path: '/Company/CompanyTop', name: 'Top 100', component: Company },
  { path: '/Company/Company', name: '사업장 검색', component: CompanySearch },
  { path: '/Company/Locations', name: '위치 검색', component: Locations },
  { path: '/bank/BankList', name: '개인 뱅킹', component: Bank },
  { path: '/bank/BankListCom', name: '기업 뱅킹', component: BankCom },
  { path: '/bank/BankListService', name: '서비스 앱 뱅킹', component: BankService },
  { path: '/Trend/TrendAppsAll', name: '은행별 검색(전체)', component: TrendAppsAll },
  { path: '/Trend/TrendAppsKeyword', name: '은행별 검색(키워드)', component: TrendAppsKeyword },
  { path: '/Trend/TrendAppsPrd', name: '은행상품별 검색(전체)', component: TrendAppsPrd },
  { path: '/Trend/TrendAppsPrdKeyword', name: '은행상품별 검색(키워드)', component: TrendAppsPrdKeyword },
];

export default routes;
