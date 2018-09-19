import { sampleInitialStateType } from '../DTO/types/Sample.initialStateType';
import { sampleWishList } from './Sample.wishList';
import { sampleLogin } from './Sample.login';

const sampleInitialState: sampleInitialStateType = {
  login: sampleLogin,
  wishList: sampleWishList,
};

export { sampleInitialState };