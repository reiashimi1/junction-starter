const Joi = require('joi');

const libPhoneNum = require("libphonenumber-js");

const joiMaxLengthString = Joi.string().max(255);

const joiNullableEmptyMaxLengthString = joiMaxLengthString.allow(null, '');

const joiRequiredMaxLengthString = joiMaxLengthString.required();

const joiStringMonospace = Joi.string().replace(/ +/g, ' ');

const joiStringTrimmed = Joi.string().trim();
const joiRequiredStringTrimmed = joiStringTrimmed.required();
const joiNullableEmptyStringTrimmed = joiStringTrimmed.allow(null, '');

const joiRequiredStringTrimmedUppercase = Joi.string().uppercase().trim().required();

const joiNullableEmptyStringTrimmedUppercase = Joi.string().uppercase().trim().allow(null, '');

const joiEmailTrimmed = Joi.string().trim().email();

const joiRequiredEmailTrimmed = joiEmailTrimmed.required();

const joiStringMonospaceTrimmed = joiStringMonospace.trim();

const joiStringNullableEmptyMonospaceTrimmed =
    joiStringMonospaceTrimmed.allow(null, '');

const joiRequiredStringMonospaceTrimmed =
    joiStringMonospaceTrimmed.required();

const joiStringNoSpace = Joi.string().replace(/ /g, '');

const joiStringLowercaseNoSpace = joiStringNoSpace.lowercase();

const joiRequiredStringUppercaseNoSpace = joiStringNoSpace.uppercase().required();

const joiStringNullableEmptyUppercaseNoSpace = joiStringNoSpace.uppercase().allow(null, '');

const joiStringNullableEmptyNoSpace = joiStringNoSpace.allow(null, '');

const joiRequiredStringNoSpace = joiStringNoSpace.required();

const joiRequiredStringLowercaseNoSpace = joiStringLowercaseNoSpace.required();


const joiSdkSupportedCurrencyCode = joiStringNoSpace.uppercase().valid('EUR', 'ALL', 'GBP', 'USD', 'ILS', 'CAD', 'COP', 'DZD', 'PKR', 'AUD');


const joiRequiredSdkSupportedCurrencyCode = joiSdkSupportedCurrencyCode.required();

const joiPositiveNumber = Joi.number().positive();
const joiPositiveInteger = Joi.number().integer().positive();
const joiRequiredPositiveInteger = joiPositiveInteger.required();
const joiNullableEmptyPositiveNumber = Joi.number().positive().allow(null, '');
const joiPage = joiPositiveNumber.default(1);
const joiPageSize = joiPositiveNumber.default(15);

const joiRequiredPositiveNumber = joiPositiveNumber.required();

const joiNullableEmptyUuid = Joi.string().guid({ version: 'uuidv4' }).allow(null, '');

const joiRequiredUuid = Joi.string().guid({ version: 'uuidv4' }).required();

const joiNuis = Joi.string().trim().regex(/^([A-Z][0-9]\d{7}[A-Z]$)/i).uppercase();
const joiRequiredNuis = joiNuis.required();
const joiNullableEmptyNuis = joiNuis.allow(null, '');

const joiRequiredNID = joiRequiredNuis

const joiIban = Joi.string().trim().regex(/^[A-Za-z]{2}[A-Za-z0-9]{26}/).uppercase().length(28)

const joiNullableIban = joiIban.allow(null, '')

const joiRequiredIban = joiIban.required();

const joiSemVer = Joi.string().regex(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
const joiRequiredSemVer = joiSemVer.required()
const joiNullableEmptySemVer = joiSemVer.allow(null, '')

const joiSupportedPhoneOperator = Joi.string().valid('ONE', 'ALBTELECOM', 'VODAFONE');
const joiRequiredSupportedPhoneOperator = joiSupportedPhoneOperator.required();
const joiNullableEmptySupportedPhoneOperator = joiSupportedPhoneOperator.allow(null, '');

const joiValidPhone = joiStringNoSpace
    .custom((value, helper) => {
        const firstTwoDigits = value.substring(0, 2);
        const firstThreeDigits = value.substring(0, 3);

        const formattedNumberWithoutPlus = firstThreeDigits === '355' ? value.replace(/3556/, '+3556') : value;
        const formattedNumber = firstTwoDigits === '06' ? value.replace(/06/, '+3556') : formattedNumberWithoutPlus;

        if (libPhoneNum.isValidPhoneNumber(formattedNumber)) {
            return libPhoneNum.parsePhoneNumber(formattedNumber).number;
        }
        return helper.message('Invalid phone number format');
    });

const joiRequiredValidPhone = joiValidPhone.required();

const joiRequiredAlbanianValidPhone = joiValidPhone
    .custom((value, helper) => {
        if (libPhoneNum.isValidNumber(value, 'AL')) {
            return libPhoneNum.parsePhoneNumber(value, 'AL').number;
        }
        return helper.message('Invalid phone number.');
    }).required();

const joiNullableEmptyValidPhone = joiValidPhone.allow(null, '');

const joiValidUrl = Joi.string().custom((value, helper) => {
    try {
        const validUrl = new URL(value);
        return value;
    } catch (err) {
        return helper.message('Invalid URL');
    }
});

const joiClientMerchantType = Joi.string().valid('client', 'merchant');
const joiRequiredClientMerchantType = joiClientMerchantType.required();
const joiNullableEmptyClientMerchantType = joiClientMerchantType.allow(null, '');

const joiLocale = Joi.string().lowercase().valid('en', 'al');
const joiRequiredLocale = joiLocale.required();

const joiBase64 = Joi.string().base64();
const joiRequiredBase64 = joiBase64.required();
const joiNullableEmptyBase64 = joiBase64.allow(null, '');

const joiNumber = Joi.number();
const joiRequiredNumber = joiNumber.required();

const joiDate = Joi.date();
const joiNullableEmptyDate = joiDate.allow(null, '');
const joiRequiredDate = joiDate.required();

const joiGender = Joi.string().uppercase().valid('M', 'F');
const joiNullableEmptyGender = joiGender.allow(null, '');
const joiRequiredGender = joiGender.required();

const joiDefaultFalseBoolean = Joi.boolean().default(false);
const joiDefaultTrueBoolean = Joi.boolean().default(true);

const joiRequiredSupportedInsuranceAgency = Joi.string().valid('ANSIG', 'ALBSIG', 'INTERSIG').required();


module.exports = {
    joiMaxLengthString,
    joiNullableEmptyMaxLengthString,
    joiRequiredMaxLengthString,
    joiStringMonospace,
    joiRequiredStringTrimmed,
    joiStringMonospaceTrimmed,
    joiStringNullableEmptyMonospaceTrimmed,
    joiRequiredStringMonospaceTrimmed,
    joiStringLowercaseNoSpace,
    joiRequiredStringUppercaseNoSpace,
    joiStringNullableEmptyNoSpace,
    joiRequiredStringNoSpace,
    joiRequiredStringTrimmedUppercase,
    joiRequiredEmailTrimmed,
    joiEmailTrimmed,
    joiRequiredStringLowercaseNoSpace,
    joiSdkSupportedCurrencyCode,
    joiRequiredSdkSupportedCurrencyCode,
    joiPositiveNumber,
    joiRequiredPositiveNumber,
    joiRequiredUuid,
    joiNuis,
    joiRequiredNuis,
    joiNullableEmptyNuis,
    joiValidPhone,
    joiRequiredValidPhone,
    joiNullableEmptyValidPhone,
    joiRequiredAlbanianValidPhone,
    joiNullableEmptyUuid,
    joiValidUrl,
    joiSemVer,
    joiRequiredSemVer,
    joiNullableEmptySemVer,
    joiPage,
    joiPageSize,
    joiClientMerchantType,
    joiRequiredClientMerchantType,
    joiNullableEmptyClientMerchantType,
    joiLocale,
    joiRequiredLocale,
    joiBase64,
    joiRequiredBase64,
    joiNullableEmptyBase64,
    joiSupportedPhoneOperator,
    joiRequiredSupportedPhoneOperator,
    joiNullableEmptySupportedPhoneOperator,
    joiIban,
    joiRequiredIban,
    joiNullableIban,
    joiStringNullableEmptyUppercaseNoSpace,
    joiNumber,
    joiRequiredNumber,
    joiDate,
    joiRequiredDate,
    joiNullableEmptyDate,
    joiRequiredNID,
    joiNullableEmptyStringTrimmed,
    joiNullableEmptyGender,
    joiRequiredGender,
    joiDefaultFalseBoolean,
    joiDefaultTrueBoolean,
    joiStringNoSpace,
    joiNullableEmptyStringTrimmedUppercase,
    joiRequiredSupportedInsuranceAgency,
    joiNullableEmptyPositiveNumber,
    joiPositiveInteger,
    joiRequiredPositiveInteger,
}
