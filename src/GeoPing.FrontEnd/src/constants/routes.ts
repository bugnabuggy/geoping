/* url for all users */
export const baseUrl: string = '/';
export const publicCheckListUrl: string = `${baseUrl}public_check_list`;
export const publicCheckListInfoUrl: string = `${baseUrl}public_check_list/info/:listId`;
export const notFoundUrl: string = `${baseUrl}not_found`;
export const emailConfirm: string = `${baseUrl}email_confirm`;
export const token: string = `${baseUrl}token/:token`;
export const tokenError: string = `${baseUrl}token_error`;

/* url for not authorize user */
export const loginUrl: string = `${baseUrl}login`;
export const registerUrl: string = `${baseUrl}register`;
export const resetPassword: string = `${baseUrl}reset_password/:idUser?/:token?`;

/* url for authorize user */
export const dashboardUrl: string = `${baseUrl}dashboard`;
export const profileUrl: string = `${baseUrl}profile`;
export const checkListUrl: string = `${baseUrl}check_list/([a-z0-9-]+)`;
export const checkInUrl: string = `${baseUrl}check_in`;
export const checkInStatistics: string = `${baseUrl}check_in_statistics/:listId/:userId?`;
export const logOutUrl: string = `${baseUrl}log_out`;

/* url for admin role user */
export const adminPrefixUrl: string = 'admin/';
export const adminDashboardUrl: string = `${baseUrl + adminPrefixUrl}dashboard`;
export const adminAllUsersUrl: string = `${baseUrl + adminPrefixUrl}all_users`;
export const adminAllCheckLists: string = `${baseUrl + adminPrefixUrl}all_check_lists`;
