import axios from 'axios';

export const get = ( url: string ) => {
  return axios.get ( url );
};

export const post = ( url: string, data: any ) => {
  return axios.post ( url, data );
    // .then((response) => {
    //   console.log(response)
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
};