export function getDataFromResponse( response: any ) {
  if ( response.hasOwnProperty( 'data' ) ) {
    const data: any = response.data;
    if ( data.hasOwnProperty( 'data' ) ) {
      return data.data;
    } else {
      return data;
    }
  } else {
    return response;
  }
}