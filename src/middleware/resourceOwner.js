const Gun = require('../models/Gun');
const Ammo = require('../models/Ammo');

const resourceOwner = async (req, res, next) => {
    const ResourceModel = req.originalUrl.includes('guns') ? Gun : Ammo;
    let resource = await ResourceModel.findOne({ _id: req.params.id });

    if (!resource || resource.ownerId !== req.user.id) {
        return res.sendStatus(404);
    }

    next();
};

module.exports = resourceOwner;