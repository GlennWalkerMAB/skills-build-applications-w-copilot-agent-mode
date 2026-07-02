"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const workouts = await models_1.WorkoutModel.find()
            .populate('createdBy', 'fullName level')
            .sort({ difficulty: 1, durationMinutes: 1 })
            .lean();
        res.json({
            route: '/api/workouts/',
            count: workouts.length,
            data: workouts,
        });
    }
    catch (error) {
        res.status(500).json({
            route: '/api/workouts/',
            error: 'Failed to load workouts.',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = workoutsRouter;
