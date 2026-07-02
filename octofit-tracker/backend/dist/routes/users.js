"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const users = await models_1.UserModel.find().populate('team', 'name city').sort({ fullName: 1 }).lean();
        res.json({
            route: '/api/users/',
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            route: '/api/users/',
            error: 'Failed to load users.',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = usersRouter;
