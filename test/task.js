const chai = require('chai');
const server = require('../app');
const chaihttp = require('chai-http');
const userModel = require('../models/user.models');


// assertion style
chai.should();

chai.use(chaihttp);

describe('signup', () => {
    beforeEach((done) => {
        userModel.deleteMany({}, (err) => {
            done();
        });
    });

    afterEach((done) => {
        userModel.deleteMany({}, (err) => {
            done();
        });
    });
    /**
     *test sign up
     */
    describe('/POST signup', () => {
        it('it should POST a new user', (done) => {
            const user = {
                Name: 'lalit',
                email: 'lalit32@gmail.com',
                password: 'lalit@23',
                role: 'user',
                phoneNumber: 34567234
            }

            chai.request(server)
            .post('/signup')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                response.body.should.have.property('Name');
                response.body.should.have.property('email');
                response.body.should.have.property('password');
                response.body.should.have.property('role');
                response.body.should.have.property('phoneNumber');
                done();
            });
        });

        it('it should not POST a new user with out any property all property are required', (done) => {
            let user = {
                email: 'lalit32@gmail.com',
                password: 'lalit@23',
                role: 'user',
                phoneNumber: 34567234
            }
            chai.request(server)
            .post('/signup')
            .send(user)
            .end((err, response) => {
                response.body.should.be.a('object');
                response.should.have.status(304);

                done();
            });
        });
    });

    /**
     * all users
     */
    describe('/GET all users', () => {
        it('it should get all users', (done) => {
            chai.request(server)
            .get('/dataget')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
        });
    });

    /**
     * get by gmail
     */
    describe('GET data by gmail', () => {
        it('should return data by of one users', () => {
            chai.request(server)
            .get('/dataget/mail')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
            });
        });
    });

     /**
      * test login 
      */
})