"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', (_req, res) => {
    res.json({
        route: '/api/users/',
        message: 'Users endpoint is ready.',
    });
});
exports.default = usersRouter;
