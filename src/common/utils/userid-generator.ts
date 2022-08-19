import { customAlphabet } from 'nanoid/non-secure';

export function userIdGenerator(roles: number) {
  let prefix = '';

  switch (roles) {
    case 1:
   
      prefix = 'USER';
      break;   

    default:
      break;
  }
  let nanoid = customAlphabet('1234567890', 5);
  let userId = `${prefix}_${nanoid()}`;

  return userId.toUpperCase();
}
