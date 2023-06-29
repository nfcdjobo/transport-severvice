const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/auth')
const cors = require('cors');

const AdminController = require('../controllers/adminController');
const CompagnyController = require('../controllers/compagnyController');
const IndexController = require('../controllers/indexController');
const ConnexionController = require('../controllers/connexionController');
const PassagerController = require('../controllers/passagerController');
const LigneController = require('../controllers/ligneController');
const MachinisteController = require('../controllers/machinisteController');
const CarController = require('../controllers/carController');
const VoyageController = require('../controllers/voyageController');
const TicketController = require('../controllers/ticketController');
const SliderController = require('../controllers/sliderController');
const RoleController = require('../controllers/roleController');

const DemendeController = require('../controllers/demandeController');
const ReservationController = require('../controllers/reservationController')

const Telecharger = require(`../middlewares/upload`)

// Rooting of login
Router.post('/loginAdmin', ConnexionController.loginAdmin);
Router.post('/loginMachiniste', ConnexionController.loginMachiniste);
Router.post('/loginPassager', ConnexionController.loginPassager);


Router.get('/', IndexController.index);
// Rooting of compagny
Router.post('/saveCompagny', Telecharger, auth, CompagnyController.create);
Router.get('/getAllCompagny', CompagnyController.allCompagny);
Router.get('/getByIdCompagny', auth, CompagnyController.getById);
Router.get('/getByCodeCompagny', auth, CompagnyController.getByCode);
Router.get('/getByNameCompagny', auth, CompagnyController.getByName);
Router.get('/getByEmail1Compagny', auth, CompagnyController.getByEmail1);
Router.get('/getByEmail2Compagny', auth, CompagnyController.getByEmail2);
Router.post('/updateCompagny', Telecharger, auth, CompagnyController.updateCompagny);
Router.post('/deleteCompagny', auth, CompagnyController.deleteCompagny);

Router.post('/saveRole', auth, RoleController.create);
Router.get('/getAllRole', auth, RoleController.getById);
Router.get('/getByIdRole', auth, RoleController.getByCode);
Router.get('/getByCodeRole', auth, RoleController.getByLibelle);
Router.post('/updateRole', auth, RoleController.updateRole);
Router.post('/deleteRole', auth, RoleController.deleteRole);

// Rooting of administrator of compagny
Router.post('/saveAdmin', Telecharger, AdminController.create);
Router.get('/getAllAdmin', auth, AdminController.allAdmin);
Router.get('/getByIdAdmin/:id', auth, AdminController.getById);
Router.get('/getByCodeAdmin', auth, AdminController.getByCode);
Router.get('/getByNameAdmin', auth, AdminController.getByName);
Router.get('/getByEmailAdmin', auth, AdminController.getByEmail);
Router.get('/getByTelephoneAdmin', auth, AdminController.getByTelephone);
Router.get('/getByRoleAdmin', auth, AdminController.getByRole);
Router.post('/updateAdmin', Telecharger, auth, AdminController.updateAdmin);
Router.post('/deleteAdmin', auth, AdminController.deleteAdmin);

// Rooting of passager of compagny
Router.post('/savePassager', Telecharger, PassagerController.create);
Router.get('/getAllPassager', auth, PassagerController.allPassager);
Router.get('/getByIdPassager/:id', auth, PassagerController.getById);
Router.get('/getByCodePassager', auth, PassagerController.getByCode);
Router.get('/getByNamePassager', auth, PassagerController.getByName);
Router.get('/getByEmailPassager', auth, PassagerController.getByEmail);
Router.get('/getByTelephonePassager', auth, PassagerController.getByTelephone);
Router.get('/getByRolePassager', auth, PassagerController.getByRole);
Router.post('/updatePassager', Telecharger, auth, PassagerController.updatePassager);
Router.post('/updatePassager2', Telecharger, auth, PassagerController.updatePassager2);
Router.post('/deletePassager', auth, PassagerController.deletePassager);


Router.post('/saveLigne', Telecharger, auth, LigneController.create);
Router.get('/getAllLigne',  LigneController.allLigne); 

Router.get('/getLigne', LigneController.getLigne);
Router.get('/getByIdLigne/:id', auth, LigneController.getById);
Router.get('/getByCodeLigne', auth, LigneController.getByCode);
Router.get('/getByVilleLigne', auth, LigneController.getByVille);
Router.get('/getByMontantLigne', auth, LigneController.getByMontant);
Router.get('/getByDistanceLigne', auth, LigneController.getByDistance);
Router.post('/updateLigne', Telecharger, auth, LigneController.updateLigne);
Router.post('/deleteLigne',  auth, LigneController.deleteLigne);

// Rooting of passager of compagny
Router.post('/saveMachiniste', Telecharger, MachinisteController.create);
Router.get('/getAllMachiniste', auth, MachinisteController.allMachiniste);
Router.get('/getByIdMachiniste/:id', auth, MachinisteController.getById);
Router.get('/getByCodeMachiniste', auth, MachinisteController.getByCode);
Router.get('/getByNameMachiniste', auth, MachinisteController.getByName);
Router.get('/getByEmailMachiniste', auth, MachinisteController.getByEmail);
Router.get('/getByTelephoneMachiniste', auth, MachinisteController.getByTelephone);
Router.get('/getByRoleMachiniste', auth, MachinisteController.getByRole);
Router.post('/updateMachiniste', Telecharger, auth, MachinisteController.updateMachiniste);
Router.post('/updateMachiniste2', Telecharger, auth, MachinisteController.updateMachiniste2);
Router.post('/deleteMachiniste',  auth, MachinisteController.deleteMachiniste);

// Rooting of car of compagny 
Router.post('/saveCar', Telecharger, auth, CarController.create);
Router.get('/getAllCar', auth, CarController.allCar);
Router.get('/getByIdCar/:id', auth, CarController.getById);
Router.get('/getByCodeCar', auth, CarController.getByCode);
Router.get('/getByMarqueCar', auth, CarController.getByMarque);
Router.get('/getByPlaceCar', auth, CarController.getByPlace);
Router.get('/getByClimatisationCar', auth, CarController.getByClimatisation);
Router.post('/updateCar', Telecharger, auth, CarController.updateCar);
Router.post('/deleteCar', auth, CarController.deleteCar);

Router.post('/saveVoyage', Telecharger, auth, VoyageController.create);
Router.get('/getAllVoyage', auth, VoyageController.allVoyage);
Router.get('/getByIdVoyage', auth, VoyageController.getById);
Router.get('/getByCodeVoyage', auth, VoyageController.getByCode);
Router.get('/getByRevenuVoyage', auth, VoyageController.getByRevenu);
Router.get('/getByDepartVoyage', auth, VoyageController.getByDepart);
Router.get('/getByLineVoyage', auth, VoyageController.getByLigne);
Router.get('/getByMachinisteVoyage', auth, VoyageController.getByMachiniste);
Router.get('/getByCarVoyage', auth, VoyageController.getByCar);
Router.get('/getByAdminVoyage', auth, VoyageController.getByAdmin);
Router.post('/updateVoyage', Telecharger, auth, VoyageController.updateVoyage);
Router.post('/deleteVoyage', auth, VoyageController.deleteVoyage);

Router.post('/saveTicket', auth, TicketController.create);
Router.get('/getAllTicket', auth, TicketController.allTicket);
Router.get('/getByIdTicket', auth, TicketController.getById);
Router.get('/getByCodeTicket', auth, TicketController.getByCode);
Router.get('/getByMontantTicket', auth, TicketController.getByMontantTicket);

Router.post(`/sendDemande`, DemendeController.create);
Router.get(`/getAllDemande`, auth, DemendeController.allCompagny);
Router.get(`/getByIdDemande`, auth, DemendeController.getById);
Router.get(`/getByEmailDemande`, auth, DemendeController.getByEmail);
Router.get(`/getByNameDemande`, auth, DemendeController.getByName);
Router.post(`/updateDemande`, auth, DemendeController.updateDemande);
Router.post(`/deleteDemande`, auth, DemendeController.deleteDemande);

Router.post(`/saveSlider`, auth, SliderController.create);

Router.post('/saveReservation', ReservationController.saveReservation);
Router.get('/getAllReservation', ReservationController.getAllReservation);

Router.post('/verifyAdmin', ConnexionController.verifyAdmin);
Router.post('/verifyMachiniste', ConnexionController.verifyMachiniste);
Router.post('/verifyPassager', ConnexionController.verifyPassager);

Router.post('/updatedAdmin', AdminController.updatedAdmin);
Router.post('/updatedMachiniste', MachinisteController.updatedMachiniste);
// Router.post('/updatedPassager', PassagerController.updatedPassager);





module.exports = Router