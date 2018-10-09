import * as testUser from '../../mocks/testUser.json';

const rand = () => Math.random().toString( 36 ).substr( 2 );

export function loginMockService( email: string, password: string ) {
  return `${rand()}${rand()}${rand()}${rand()}`;
}

export function loadTestData() {
  return testUser;
  // return '';
}