import { v4 as uuidV4 } from 'uuid';

const idLists: Array<any> = [];
const idUsers: Array<any> = [];

function getIdLists() {
  for ( let i: number = 0; i < 3; i += 1 ) {
    idLists.push( uuidV4() );
  }
}

function getIdUsers() {
  for ( let i: number = 0; i < 7; i += 1 ) {
    idUsers.push( uuidV4() );
  }
}

getIdLists();
getIdUsers();

export const lists: any = [
  {
    id: idLists[ 0 ],
    name: 'List one',
  },
  {
    id: idLists[ 1 ],
    name: 'List Two',
  },
  {
    id: idLists[ 2 ],
    name: 'List Three',
  }
];

export const users: any = [
  {
    id: idUsers[ 0 ],
    idList: idLists[ 0 ],
    name: 'User one',
  },
  {
    id: idUsers[ 1 ],
    idList: idLists[ 0 ],
    name: 'User shmuzer',
  },
  {
    id: idUsers[ 2 ],
    idList: idLists[ 0 ],
    name: 'Polotok',
  },
  {
    id: idUsers[ 3 ],
    idList: idLists[ 1 ],
    name: 'User two',
  },
  {
    id: idUsers[ 4 ],
    idList: idLists[ 1 ],
    name: 'TWOOOOOe',
  },
  {
    id: idUsers[ 5 ],
    idList: idLists[ 2 ],
    name: 'User three',
  },
  {
    id: idUsers[ 6 ],
    idList: idLists[ 2 ],
    name: 'Puzer',
  }
];

export const points: any = [
  {
    id: uuidV4(),
    name: 'Point 1',
    idList: idLists[ 0 ],
    idUser: idUsers[ 0 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 2',
    idList: idLists[ 0 ],
    idUser: idUsers[ 0 ],
    checkin: false,
  },
  {
    id: uuidV4(),
    name: 'Point 3',
    idList: idLists[ 0 ],
    idUser: idUsers[ 0 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 4',
    idList: idLists[ 0 ],
    idUser: idUsers[ 1 ],
    checkin: false,
  },
  {
    id: uuidV4(),
    name: 'Point 5',
    idList: idLists[ 0 ],
    idUser: idUsers[ 1 ],
    checkin: false,
  },
  {
    id: uuidV4(),
    name: 'Point 6',
    idList: idLists[ 0 ],
    idUser: idUsers[ 2 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 7',
    idList: idLists[ 0 ],
    idUser: idUsers[ 2 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 1',
    idList: idLists[ 1 ],
    idUser: idUsers[ 3 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 1',
    idList: idLists[ 1 ],
    idUser: idUsers[ 3 ],
    checkin: true,
  },
  {
    id: uuidV4(),
    name: 'Point 1',
    idList: idLists[ 1 ],
    idUser: idUsers[ 4 ],
    checkin: false,
  },
  {
    id: uuidV4(),
    name: 'Point 1',
    idList: idLists[ 1 ],
    idUser: idUsers[ 4 ],
    checkin: true,
  }
];