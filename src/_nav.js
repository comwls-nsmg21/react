export default {
  items: [
    {
      name: '대시보드',
      url: '/Dashboard',
      class: 'font-xs',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: '위치기반 데이터',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: '기업 분포',
      url: '/Location/Company',
      class: 'font-xs',
      icon: 'fa fa-map-o',
    },
    {
      name: '잠재고객 분포',
      url: '/Location/BankUser',
      class: 'font-xs',
      icon: 'fa fa-map-o',
    },
    {
      title: true,
      name: '은행어플 분석',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: '개인 뱅킹',
      url: '/bank/BankList',
      class: 'font-xs',
      icon: 'fa fa-user-o',
    },
    {
      name: '기업 뱅킹',
      url: '/bank/BankListCom',
      class: 'font-xs',
      icon: 'fa fa-building-o',
    },
    {
      name: '서비스 앱 뱅킹',
      url: '/bank/BankListService',
      class: 'font-xs',
      icon: 'fa fa-code-fork',
    },
    // {
    //   name: '위치기반 라이브',
    //   url: '/LocationLive',
    //   class: 'font-xs',
    //   icon: 'fa fa-building',
    // },
    {
      title: true,
      name: '포털 검색 추이',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: '은행별 검색(전체)',
      url: '/Trend/NaverBank',
      class: 'font-xs',
      icon: 'fa fa-hashtag',
    },
    {
      title: true,
      name: '기업 정보',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Top 100',
      url: '/Company/CompanyTop',
      class: 'font-xs',
      icon: 'fa fa-bar-chart',
    },
    {
      name: '사업장 검색',
      url: '/Company/Company',
      class: 'font-xs',
      icon: 'fa fa-search',
    },
    {
      name: '위치 검색',
      url: '/Company/Locations',
      class: 'font-xs',
      icon: 'fa fa-map-o',
    },
  ]
};
