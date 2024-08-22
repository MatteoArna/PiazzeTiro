const chai = require('chai');
const sinon = require('sinon');
const UserController = require('../../src/controllers/userController');
const User = require('../../src/models/user');
const UserRole = require('../../src/models/userRole');

const expect = chai.expect;

describe('UserController', () => {
    describe('findOne', () => {
        it('should return user details including role', async () => {
            // Mock dei dati
            const mockUser = {
                email: 'test@example.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                language: 'en',
                UserRole: {
                    role: 'admin'
                },
                update: sinon.stub().resolves()
            };

            // Stub delle funzioni del modello
            const userFindOneStub = sinon.stub(User, 'findOne').resolves(mockUser);
            const req = { params: { id: 'test@example.com' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            // Esegui il metodo
            await UserController.findOne(req, res);

            // Verifica che il metodo User.findOne sia stato chiamato con i parametri corretti
            expect(userFindOneStub.calledOnce).to.be.true;
            expect(userFindOneStub.calledWith({
                where: { email: 'test@example.com' },
                attributes: { include: ['createdAt', 'updatedAt', 'language'] },
                include: [{ model: UserRole, attributes: ['role'] }]
            })).to.be.true;

            // Verifica che lo status e la risposta JSON siano corretti
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon.match({
                email: 'test@example.com',
                language: 'en',
                roleId: 'admin'
            }))).to.be.true;

            // Ripristina lo stub
            userFindOneStub.restore();
        });

        it('should handle errors', async () => {
            // Stub che lancia un errore
            const userFindOneStub = sinon.stub(User, 'findOne').throws(new Error('Database error'));

            const req = { params: { id: 'test@example.com' } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            // Esegui il metodo
            await UserController.findOne(req, res);

            // Verifica che lo status e la risposta JSON siano corretti
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith(sinon.match({ message: 'Errore nel recuperare gli utenti' }))).to.be.true;

            // Ripristina lo stub
            userFindOneStub.restore();
        });
    });
});
