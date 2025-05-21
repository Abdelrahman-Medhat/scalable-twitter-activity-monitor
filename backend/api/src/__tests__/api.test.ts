import request from 'supertest';
import app from '../index';

describe('API Endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /activity', () => {
        it('should return 422 for invalid activity type', async () => {
            const response = await request(app)
                .post('/activity')
                .send({
                    handle: 'testuser',
                    type: 'INVALID_TYPE'
                });

            expect(response.status).toBe(422);
            expect(response.body).toHaveProperty('message', 'Validation Error');
            expect(response.body).toHaveProperty('errors');
        });

    });

    describe('GET /profiles', () => {
        it('should return profiles list', async () => {
            const response = await request(app)
                .get('/profiles');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
}); 