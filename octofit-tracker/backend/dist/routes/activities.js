"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const activities = await models_1.ActivityModel.find()
            .populate('user', 'fullName email')
            .populate('team', 'name city')
            .sort({ performedAt: -1 })
            .lean();
        res.json({
            route: '/api/activities/',
            count: activities.length,
            data: activities,
        });
    }
    catch (error) {
        res.status(500).json({
            route: '/api/activities/',
            error: 'Failed to load activities.',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = activitiesRouter;
