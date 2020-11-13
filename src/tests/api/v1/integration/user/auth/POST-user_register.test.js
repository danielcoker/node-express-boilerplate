import { v4 as uuidv4 } from 'uuid';
import { generateUser, requester } from '../../../../../helpers/api-integration/v1';

const generateRandomEmail = () => `${(Date.now() + uuidv4()).substring(0, 20)}@example.com`;

describe('POST /users/auth/register', () => {
  const endpoint = '/users/auth/register';
  let api;

  context('email is free', () => {
    beforeEach(async () => {
      api = requester();
    });

    it('registers a new user', async () => {
      const name = 'John Doe';
      const email = generateRandomEmail();
      const password = 'password';

      const response = await api.post(endpoint, {
        name,
        email,
        password,
      });

      expect(response.data.user.id).to.exist;
      expect(response.data.user.token).to.exist;
      expect(response.data.user.name).to.eql(name);
      expect(response.data.user.email).to.eql(email);
    });
  });

  context('login is already taken', () => {
    let email;

    beforeEach(async () => {
      api = requester();
      email = generateRandomEmail();

      await generateUser({ email });
    });

    it('rejects if email is already taken', async () => {
      await expect(
        api.post(endpoint, {
          name: 'John Doe',
          email,
          password: 'password',
        }),
      ).to.eventually.be.rejected.and.eql({
        code: 401,
        error: 'NotAuthorized',
        message: 'User with this email already exist.',
      });
    });
  });
});
