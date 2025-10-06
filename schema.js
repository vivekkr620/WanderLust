const Joi = require('joi');

/*
const listingSchema = Joi.object ({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().allow("", null),
    }).required()
});
*/

module.exports.listingSchema = Joi.object ({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.object({
            url: Joi.string().allow("", null)
        }),
    }).required()
});

module.exports.reviewSchema = Joi.object({

    /*object hone wali hai aur obj ke andar review name ka 
    obj aani chiaye and review v Joi.object honi chaiyea */
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), //fixed range of rating min & max
        comment: Joi.string().required(),
    }).required()
});