const app = require('../../index');
const request = require('supertest');
const should = require('should');

describe('GET /users 는', () => {
    describe('성공 시', () => {
        it('유저 객체를 담은 배열로 응답한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });
        it('최대 limit 갯수 만큼만 응답한다.', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                });
        });
    });
    describe('실패 시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/:id 는', () => {
    describe('성공 시', () => {
        it('id 가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1) // id 라는 프로퍼티가 1이어야 한다.
                    done();
                });
        });
    });
    describe('실패 시', () => {
        it('id 가 숫자가 아닐 경우 400으로 응답한다.', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id 로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
            request(app)
                .get('/users/99999999')
                .expect(404)
                .end(done);
        });
    });
});

describe('DELETE /users/:id 는 ', () => {
    describe('성공 시', () => {
        it('Status Code 204를 응답한다.', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });
    describe('실패 시', () => {
        it('아이디가 숫자가 아닐 경우 Status code 400으로 응답한다.', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done)
        });
    });
});

describe("POST /users 는", () => {
    describe("성공 시", () => {
        let body;
        const name = 'daniel';
        before(done => {
            request(app)
                .post('/users')
                .send({ name })
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        }) // test case 동작 전 미리 실행 되는 것.
        it('생성된 유저 객체를 반환한다', () => {
            body.should.have.property('id'); // id 가 있는지 없는지 검사
        });
        it('입력한 name을 반환한다.', () => {
            body.should.have.property('name', name);
        });
    });
    describe("실패 시", () => {
        it('name 파라메터 누락 시 400을 반환한다.', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        });
        it('name이 중복인 경우 409를 반환한다', done => {
            request(app)
                .post('/users')
                .send({ name: 'daniel' })
                .expect(409)
                .end(done);
        })
    });
});

describe("PUT /users/:id 는", () => {
    describe("성공 시", () => {
        it('변경된 사용자 정보를 응답한다.', done => {
            const name = 'choco';
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe("실패 시", () => {
        it('id 가 정수가 아닐 경우 400을 응답한다.', done => {
            const name = 'choco'
            request(app)
                .put('/users/three')
                .send({ name })
                .expect(400)
                .end(done);
        });
        it('name 이 없을 경우 400 을 응답한다.', done => {
            request(app)
                .put('/users/3')
                .send({})
                .expect(400)
                .end(done);
        });
        it('없는 user 일 경우 404 을 응답한다.', done => {
            request(app)
                .put('/users/9999999')
                .send({ name: 'foo' })
                .expect(404)
                .end(done);
        });
        it('이름이 중복 될 경우 409 를 응답한다.', done => {
            request(app)
                .put('/users/3')
                .send({ name: 'choco' })
                .expect(409)
                .end(done);
        });
    });
});
