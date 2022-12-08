export const RATING_MULTIIER_FOR_STYLES = 20;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/offer',
}

export enum APIRoute {
  Hotels = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Data = 'DATA',
  Room = 'ROOM',
  User = 'USER',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortOptions {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const Month: {[index: string]: string} = {
  '01' : 'January',
  '02' : 'February',
  '03' : 'March',
  '04' : 'April',
  '05' : 'May',
  '06' : 'June',
  '07' : 'Jule',
  '08' : 'August',
  '09' : 'September',
  '10' : 'October',
  '11' : 'November',
  '12' : 'December'
} as const;
