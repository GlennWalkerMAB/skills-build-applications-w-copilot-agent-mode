"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', (_req, res) => {
    res.json({
        route: '/api/activities/',
        message: 'Activities endpoint is ready.',
    });
});
exports.default = activitiesRouter;
