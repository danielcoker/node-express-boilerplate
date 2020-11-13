import { generateUser, requester } from '../../../../helpers/api-integration/v1';

describe('GET /users', () => {
  let api;
  let user;
  const endpoint = '/users';

  beforeEach(async () => {
    api = requester();
    user = await generateUser({ name: 'John Doe', email: 'johndoe@example.com' });
  });

  it('gets a user', async () => {
    const response = await user.get(endpoint);

    expect(response.data.user.id).to.exist;
    expect(response.data.user.name).to.eql('John Doe');
    expect(response.data.user.email).to.eql('johndoe@example.com');
  });

  it('rejects for guests', async () => {
    await expect(api.get(endpoint)).to.eventually.be.rejected.and.eql({
      code: 401,
      error: 'NotAuthorized',
      message: 'You are not authorized to access this route.',
    });
  });
});
