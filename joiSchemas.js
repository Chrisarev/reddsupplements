const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')
///schemas made for different user input 

const extension = (joi) =>({
    type:'string', 
    base: joi.string(), 
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML or Scripts!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [], 
                    allowedAttributes:{},
                });
                if(clean!== value) return helpers.error('string.escapeHTML', {value})
                return clean;
            }
        }
    }
}) ///Joi allows us to create extensions for joi types, 
///we are using sanitize-html npm package to sanitize input 

///new Joi instance with our extension applied 
const Joi = BaseJoi.extend(extension);

module.exports.validateSignUpUser = Joi.object({
    user: Joi.object({ ///campground should be an object AND it is required
        email: Joi.string().required().escapeHTML().min(6).max(20),
        username: Joi.string().required().escapeHTML().alphanum().min(6).max(20),
        password: Joi.string().required().escapeHTML().alphanum().min(6).max(20)
    }).required()
})