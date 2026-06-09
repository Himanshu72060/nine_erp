const express =
    require("express");

const router =
    express.Router();

const {

    createLiveClass,

    getLiveClasses,

    getLiveClass,

    updateLiveClass,

    deleteLiveClass

} = require(
    "../controllers/liveClassController"
);


router.post(
    "/",
    createLiveClass
);

router.get(
    "/",
    getLiveClasses
);

router.get(
    "/:id",
    getLiveClass
);

router.put(
    "/:id",
    updateLiveClass
);

router.delete(
    "/:id",
    deleteLiveClass
);

module.exports =
    router;