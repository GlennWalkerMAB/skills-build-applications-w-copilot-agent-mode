"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    try {
        const teams = await models_1.TeamModel.find()
            .populate('members', 'fullName email totalPoints')
            .sort({ totalPoints: -1 })
            .lean();
        res.json({
            route: '/api/teams/',
            count: teams.length,
            data: teams,
        });
    }
    catch (error) {
        res.status(500).json({
            route: '/api/teams/',
            error: 'Failed to load teams.',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.default = teamsRouter;
