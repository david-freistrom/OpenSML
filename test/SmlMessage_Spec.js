/*!
 * OpenSML
 * Copyright(c) 2014-2015 D. Spautz (d.spautz@web.de)
 * MIT Licensed
 */

var chai = require('chai');
chai.use(require('chai-change'));

var expect = require("chai").expect;
var should = require('chai').should;

describe("SmlMessage", function() {

	var SmlMessage = require("../lib/SmlMessage");
	var SmlBuffer = require("../lib/SmlBuffer");
	var Constants = require('../lib/Constants');
		   
	describe("SmlMessage()", function(){
		  
	});
	
	describe("write()", function(){	  
	});
	
	describe("getSize()", function(){	  
	});
	
	describe("parse()", function(){
		it("should parse with valid crc", function () {
			let buffer = Buffer.from("760400000162006200726500000101760101070000011D5C360B0A01484C59020001206A0101637DC6", "hex");
			let smlMessage = SmlMessage.parse(new SmlBuffer(buffer));
			expect(smlMessage.valid).to.be.true;
		});
	});
});