var chai = require('chai');
chai.use(require('chai-change'));

var expect = require("chai").expect;
var should = require('chai').should;

describe("SmlBuffer", function() {

	var SmlBuffer = require("../lib/SmlBuffer");
	var Constants = require('../lib/Constants');
		   
	describe("SmlBuffer(buffer)", function(){
				  
		it("should set this.buffer to a given Buffer", function(){	   
			var buffer = new Buffer("ffff", 'hex');
			var smlBuffer = new SmlBuffer(buffer);
		    expect(smlBuffer.getBuffer()).to.be.instanceof(Buffer);
		    expect(smlBuffer.getBuffer()).to.be.equal(buffer);
		});
		  
		it("should set this.offset to 0", function(){	    	   
			var smlBuffer = new SmlBuffer("ffff", "hex");
			expect(smlBuffer.getOffset()).to.be.equal(0);
		});
	 });
	
	 describe("getLength()", function(){
		
	    it("should set length to given buffer size", function(){	    	   
			var smlBuffer = new SmlBuffer(new Buffer("ffff", 'hex'));
			expect(smlBuffer.getLength()).to.be.equal(2);
		});
	    
	 });
	
});