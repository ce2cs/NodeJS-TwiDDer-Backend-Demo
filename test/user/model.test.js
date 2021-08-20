/**
 * @description user model test
 * @author 双越老师
 */

const { User } = require('../../src/model/index')

test('user data validation', () => {
    const user = User.build({
        userName: 'aaaa',
        password: '123456',
        nickName: 'bbbb',
        picture: '/xxx.png',
        city: 'San Jose'
    })
    expect(user.userName).toBe('aaaa')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('bbbb')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('San Jose')
})
