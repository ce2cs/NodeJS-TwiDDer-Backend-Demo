const server = require('../server');

const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
};

let COOKIE = '';

test('register test: supposed to succeed', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser);
    expect(res.body.errno).toBe(0);
});

test('register a duplicated account: supposed to fail', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser);
    expect(res.body.errno).not.toBe(0);
});

test('check if an account exist: supposed to succeed', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName});
    expect(res.body.errno).toBe(0);
});

test('json schema validation: supposed to fail', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '123',
            password: 'a',
            gender: 'male'
        });
    expect(res.body.errno).not.toBe(0)
});

test('login: supposed to succeed', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        });
    expect(res.body.errno).toBe(0);

    COOKIE = res.headers['set-cookie'].join(';')
});

test('change personal information: supposed to succeed', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: 'test123',
            city: 'san jose',
            picture: '/test.png'
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

test('change password: supposed to succeed', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

test('delete an account: supposed to success', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

test('logout: supposed to success', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

test('check if account exist after delete: suppose to fail', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName});
    expect(res.body.errno).not.toBe(0);
});
