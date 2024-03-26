const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
//const validation = require('../middleware/validate'); need help with this for JOI
//const {isAuthenticated} = require("../middleware/authenticate"); could use some help on this

router.get('/', /*isAuthenticated,*/ adminController.getAll); // Get all of the admins on the account, only admins should be able to see?
router.post('/', /*validation.someSortOfRule*/ adminController.createAdmin); // Create new manager/admin user 
router.put('/:id', /*validation.isValidId, validation.someSortOfRule, isAuthenticated,*/ adminController.updateAdmin); // Update to admin or manager 
router.delete('/:id', /*validation.isValidId, isAuthenticated,*/ adminController.deleteAdmin); // Delete user by ID 
// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;