"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const asyncWrapper_1 = require("../utils/asyncWrapper");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.post('/register', (0, asyncWrapper_1.asyncWrapper)(userController_1.register));
router.post('/login', (0, asyncWrapper_1.asyncWrapper)(userController_1.login));
router.get('/logout', (0, asyncWrapper_1.asyncWrapper)(userController_1.logout));
router.get('/one', auth_1.auth, userController_1.getUser);
router.get('/all', auth_1.auth, userController_1.getUsers);
exports.default = router;
