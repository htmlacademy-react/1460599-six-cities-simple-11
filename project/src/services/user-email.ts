const USER_EMAIL = 'user-email-value';

export type UserEmail = string;

export const getUserEmail = (): UserEmail => {
  const userEmail = localStorage.getItem(USER_EMAIL);
  return userEmail ?? '';
};

export const saveUserEmail = (userEmail: UserEmail): void => {
  localStorage.setItem(USER_EMAIL, userEmail);
};

export const dropUserEmail = (): void => {
  localStorage.removeItem(USER_EMAIL);
};
