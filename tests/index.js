
const chai = require('chai');
const {expect, use} = chai;

const chaiHTTP = require('chai-http');
const server = require('../index').index;

use(chaiHTTP);

describe('Index Endpoint Test: /', function() {
    it('should return a message of Hello World!, a random number less than 100 and greater than 0 with a status of OK', function(done) {
        chai.request(server)
            .get(`/`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(Object.keys(res.body)).to.have.contains('data');
                expect(Object.keys(res.body)).to.have.contains('message');
                expect(Object.keys(res.body)).to.have.contains('status');

                expect(Object.keys(res.body.data)).to.have.contains('message');
                expect(Object.keys(res.body.data)).to.have.contains('randomNum');

                expect(res.body.data.randomNum).to.be.greaterThan(0);
                expect(res.body.data.randomNum).to.be.lessThan(100);

                expect(res.body.message).equals("Hello world!");
                expect(res.body.status).equals("OK");
                done();
            });
    })
});
