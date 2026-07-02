"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', (_req, res) => {
    res.json({
        route: '/api/workouts/',
        message: 'Workouts endpoint is ready.',
    });
});
exports.default = workoutsRouter;
