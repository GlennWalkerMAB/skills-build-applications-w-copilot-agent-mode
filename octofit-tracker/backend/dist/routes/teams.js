"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', (_req, res) => {
    res.json({
        route: '/api/teams/',
        message: 'Teams endpoint is ready.',
    });
});
exports.default = teamsRouter;
