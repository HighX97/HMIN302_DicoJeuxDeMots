// ***** Config
//https://www.npmjs.com/package/validator
var validator = require('validator');
//http://lollyrock.com/articles/nodejs-encryption/

var commonHelper = function() {
	/*
	Validators
	contains(str, seed) - check if the string contains the seed.
	equals(str, comparison) - check if the string matches the comparison.
	isAfter(str [, date]) - check if the string is a date that's after the specified date (defaults to now).
	isAlpha(str [, locale]) - check if the string contains only letters (a-zA-Z). Locale is one of ['en-US', 'de-DE']) and defaults to en-US.
	isAlphanumeric(str [, locale]) - check if the string contains only letters and numbers. Locale is one of ['en-US', 'de-DE']) and defaults to en-US.
	isAscii(str) - check if the string contains ASCII chars only.
	isBase64(str) - check if a string is base64 encoded.
	isBefore(str [, date]) - check if the string is a date that's before the specified date.
	isBoolean(str) - check if a string is a boolean.
	isByteLength(str, options) - check if the string's length (in bytes) falls in a range.options is an object which defaults to {min:0, max: undefined}.
	isCreditCard(str) - check if the string is a credit card.
	isCurrency(str, options) - check if the string is a valid currency amount. options is an object which defaults to {symbol: '$', require_symbol: false, allow_space_after_symbol: false, symbol_after_digits: false, allow_negatives: true, parens_for_negatives: false, negative_sign_before_digits: false, negative_sign_after_digits: false, allow_negative_sign_placeholder: false, thousands_separator: ',', decimal_separator: '.', allow_space_after_digits: false }.
	isDate(str) - check if the string is a date.
	isDecimal(str) - check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
	isDivisibleBy(str, number) - check if the string is a number that's divisible by another.
	isEmail(str [, options]) - check if the string is an email. options is an object which defaults to { allow_display_name: false, allow_utf8_local_part: true, require_tld: true }. If allow_display_name is set to true, the validator will also match Display Name <email-address>. If allow_utf8_local_part is set to false, the validator will not allow any non-English UTF8 character in email address' local part. If require_tld is set to false, e-mail addresses without having TLD in their domain will also be matched.
	isFQDN(str [, options]) - check if the string is a fully qualified domain name (e.g. domain.com). options is an object which defaults to { require_tld: true, allow_underscores: false, allow_trailing_dot: false }.
	isFloat(str [, options]) - check if the string is a float. options is an object which can contain the keys min and/or max to validate the float is within boundaries (e.g. { min: 7.22, max: 9.55 }).
	isFullWidth(str) - check if the string contains any full-width chars.
	isHalfWidth(str) - check if the string contains any half-width chars.
	isHexColor(str) - check if the string is a hexadecimal color.
	isHexadecimal(str) - check if the string is a hexadecimal number.
	isIP(str [, version]) - check if the string is an IP (version 4 or 6).
	isISBN(str [, version]) - check if the string is an ISBN (version 10 or 13).
	isISIN(str) - check if the string is an ISIN (stock/security identifier).
	isISO8601(str) - check if the string is a valid ISO 8601 date.
	isIn(str, values) - check if the string is in a array of allowed values.
	isInt(str [, options]) - check if the string is an integer. options is an object which can contain the keys min and/or max to check the integer is within boundaries (e.g. { min: 10, max: 99 }).
	isJSON(str) - check if the string is valid JSON (note: uses JSON.parse).
	isLength(str, options) - check if the string's length falls in a range. options is an object which defaults to {min:0, max: undefined}. Note: this function takes into account surrogate pairs.
	isLowercase(str) - check if the string is lowercase.
	isMACAddress(str) - check if the string is a MAC address.
	isMobilePhone(str, locale) - check if the string is a mobile phone number, (locale is one of ['zh-CN', 'zh-TW', 'en-ZA', 'en-AU', 'en-HK', 'pt-PT', 'fr-FR', 'el-GR', 'en-GB', 'en-US', 'en-ZM', 'ru-RU', 'nb-NO', 'nn-NO', 'vi-VN', 'en-NZ', 'en-IN', 'es-ES', 'de-DE', 'fi-FI']).
	isMongoId(str) - check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
	isMultibyte(str) - check if the string contains one or more multibyte chars.
	isNull(str) - check if the string is null.
	isNumeric(str) - check if the string contains only numbers.
	isSurrogatePair(str) - check if the string contains any surrogate pairs chars.
	isURL(str [, options]) - check if the string is an URL. options is an object which defaults to { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false }.
	isUUID(str [, version]) - check if the string is a UUID (version 3, 4 or 5).
	isUppercase(str) - check if the string is uppercase.
	isVariableWidth(str) - check if the string contains a mixture of full and half-width chars.
	isWhitelisted(str, chars) - checks characters if they appear in the whitelist.
	matches(str, pattern [, modifiers]) - check if string matches the pattern. Either matches('foo', /foo/i) or matches('foo', 'foo', 'i').
	Sanitizers
	blacklist(input, chars) - remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need to escape some chars, e.g. blacklist(input, '\\[\\]').
	escape(input) - replace <, >, &, ', " and / with HTML entities.
	ltrim(input [, chars]) - trim characters from the left-side of the input.
	normalizeEmail(email [, options]) - canonicalize an email address. options is an object which defaults to { lowercase: true, remove_dots: true, remove_extension: true }. With lowercase set to true, the local part of the email address is lowercased for all domains; the hostname is always lowercased and the local part of the email address is always lowercased for hosts that are known to be case-insensitive (currently only GMail). Normalization follows special rules for known providers: currently, GMail addresses have dots removed in the local part and are stripped of extensions (e.g. some.one+extension@gmail.com becomes someone@gmail.com) and all @googlemail.com addresses are normalized to @gmail.com.
	rtrim(input [, chars]) - trim characters from the right-side of the input.
	stripLow(input [, keep_new_lines]) - remove characters with a numerical value < 32 and 127, mostly control characters. If keep_new_lines is true, newline characters are preserved (\n and \r, hex 0xA and 0xD). Unicode-safe in JavaScript.
	toBoolean(input [, strict]) - convert the input to a boolean. Everything except for '0', 'false' and '' returns true. In strict mode only '1' and 'true' return true.
	toDate(input) - convert the input to a date, or null if the input is not a date.
	toFloat(input) - convert the input to a float, or NaN if the input is not a float.
	toInt(input [, radix]) - convert the input to an integer, or NaN if the input is not an integer.
	toString(input) - convert the input to a string.
	trim(input [, chars]) - trim characters (whitespace by default) from both sides of the input.
	whitelist(input, chars) - remove characters that do not appear in the whitelist. The characters are used in a RegExp and so you will need to escape some chars, e.g. whitelist(input, '\\[\\]').
	 */
	this.validator = validator; // var HelperValidator = commonHelper.validator;

	this.result_json = function(err, result, msg)
	{
		console.log(err);
		console.log(result);
		console.log(msg);
		if(err)
		{
			return { success: false, message: msg+' : failed', data: err };
		}
		else
		{
			return { success: true, message: msg+' : suceeded', data: result };
		}
	}

	this.getValidationResponse = function(){
		return {
			success : true,
			errors : [],
			addError: function(error){
				this.errors.push(error);
				this.success = false;
			},
			formatErrors : function(){
				var resultErrors = "";
				console.log(this.errors);
				for (key in this.errors ){
					resultErrors += this.errors[key] + " - ";
				}
				return resultErrors;
			}
		};
	}

	this.calculateTotalProd = function(Order) {
		var obj = JSON.parse(Order);
		var som = 0;
		try{
			for(var i in  obj)
			{
				var s = obj[i].quantity;
				som = som + s;
			}
		}
		catch(e){
			console.log("Parsing error:", e);
		}
		return som;
	}

	this.getNextSequence = function (name) {
	    //Model.findByIdAndUpdate(id, { name: 'jason borne' }, options, callback)
	    var ret = Counter.findByIdAndUpdate(id,
	        {
	            query: { _id: name },
	            update: { $inc: { seq: 1 } },
	            new: true
	        },
	        options,
	        callback
	    );

	    /*
	    Counter.update(
	        { _id: name }, //query
	        { $inc: { seq: 1 } }, //update
	        function (err, raw) {
	            if (err) return handleError(err);

	            var msgResponse = ' ok ';
	            console.log(msgResponse);
	            res.json({ success: true, message: msgResponse, data: raw });
	        }
	    );*/
	    return ret.seq;
	}

	this.cleanArray = function(array) {
	  var i, j, len = array.length, out = [], obj = {};
	  for (i = 0; i < len; i++) {
	    obj[array[i]] = 0;
	  }
	  for (j in obj) {
	    out.push(j);
	  }
	  return out;
	}

}

module.exports = new commonHelper();
