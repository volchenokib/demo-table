import Users from '../../support/fakeUserData.json';
import type { User } from '@/modules/users/support/types';

export default defineEventHandler(async (event): Promise<User[]> => {
  return Users;
});
