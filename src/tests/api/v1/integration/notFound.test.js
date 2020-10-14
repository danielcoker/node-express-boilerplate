import { requester } from '../../../helpers/api-integration/v1';

describe('notFound', () => {
  it('returns 404 error when the resource is not found', async () => {
    const request = requester().get('/dummy-url');

    await expect(request).to.eventually.be.rejected.and.eql({
      code: 404,
      error: 'NotFound',
      message: 'API endpoint does not exist.',
    });
  });
});
