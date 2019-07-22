export default {
  items: [
    {
      name: '대시보드',
      url: '/Dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: '위치기반 라이브',
      url: '/LocationLive',
      icon: 'fa fa-building',
    },
    {
      title: true,
      name: '기업 직원 통계',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Top 100',
      url: '/CompanyTop',
      icon: 'fa fa-building',
    },
    {
      name: '사업장 검색',
      url: '/Company',
      icon: 'fa fa-building',
    },
    {
      name: '위치 검색',
      url: '/Locations',
      icon: 'fa fa-building',
    },
    {
      title: true,
      name: '은행 트렌드',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: '개인 뱅킹',
      url: '/bank/BankList',
      icon: 'fa fa-building',
    },
    {
      name: '기업 뱅킹',
      url: '/bank/BankListCom',
      icon: 'fa fa-building',
    },
    {
      name: '서비스 앱 뱅킹',
      url: '/bank/BankListService',
      icon: 'fa fa-building',
    },
    {
      name: '네이버 월간 조회수',
      url: '/NaverBank/NaverBank',
      icon: 'fa fa-building',
    },
  ]
};
