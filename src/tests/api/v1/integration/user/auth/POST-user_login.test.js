import { generateUser, requester } from '../../../../../helpers/api-integration/v1';

describe('POST /users/auth/login', () => {
  let api;
  let user;
  const endpoint = '/users/auth/login';
  const password = 'password';

  beforeEach(async () => {
    api = requester();
    user = await generateUser();
  });

  it('logs in successfully with email', async () => {
    const response = await api.post(endpoint, {
      email: user.email,
      password,
    });

    expect(response.data.user.token).to.exist;
  });

  it('wrong email', async () => {
    await expect(
      api.post(endpoint, {
        email: 'wrong-email@example.com',
        password,
      }),
    ).to.eventually.be.rejected.and.eql({
      code: 401,
      error: 'NotAuthorized',
      message: 'User with this email does not exist.',
    });
  });

  it('wrong password', async () => {
    await expect(
      api.post(endpoint, {
        email: user.email,
        password: 'adfafasfadfadfawdf',
      }),
    ).to.eventually.be.rejected.and.eql({
      code: 401,
      error: 'NotAuthorized',
      message: 'Incorrect password.',
    });
  });

  it('missing email', async () => {
    await expect(
      api.post(endpoint, {
        password,
      }),
    ).to.eventually.be.rejected.and.eql({
      code: 400,
      error: 'BadRequest',
      message: 'Invalid request parameters.',
    });
  });

  it('missing password', async () => {
    await expect(
      api.post(endpoint, {
        email: user.email,
      }),
    ).to.eventually.be.rejected.and.eql({
      code: 400,
      error: 'BadRequest',
      message: 'Invalid request parameters.',
    });
  });
});
