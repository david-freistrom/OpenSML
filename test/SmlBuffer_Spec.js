var chai = require('chai');
chai.use(require('chai-change'));
chai.use(require('sinon-chai'));
var sinon = require("sinon");

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
			var buffer = new Buffer("ffff", 'hex');
			var smlBuffer = new SmlBuffer(buffer);
			expect(smlBuffer.getOffset()).to.be.equal(0);
		});
		
		it("should set buffer length to 2", function(){	    	   
			var buffer = new Buffer("ffff", 'hex');
			var smlBuffer = new SmlBuffer(buffer);
			expect(smlBuffer.getLength()).to.be.equal(2);
		});
	 });
	
	describe("SmlBuffer()", function(){
		  
		it("should create a default Buffer", function(){	   
			var smlBuffer = new SmlBuffer();
		    expect(smlBuffer.getBuffer()).to.be.instanceof(Buffer);
		});
		  
		it("should set offset to 0", function(){	    	   
			var smlBuffer = new SmlBuffer();
			expect(smlBuffer.getOffset()).to.be.equal(0);
		});
		
		it("should set buffer size to MAX_BUFFER_SIZE", function(){	    	   
			var smlBuffer = new SmlBuffer();
			expect(smlBuffer.getLength()).to.be.equal(Constants.MAX_BUFFER_SIZE);
		});
	 });
	
	 describe("getLength()", function(){
		
	    it("should set length to given buffer size", function(){	    	   
			var smlBuffer = new SmlBuffer(new Buffer("ffff", 'hex'));
			expect(smlBuffer.getLength()).to.be.equal(2);
		});
	    
	 });
	 
	describe("writeOctetString(value)", function(){
			
		var smlBuffer = undefined;
		beforeEach(function(){
			smlBuffer = new SmlBuffer();
		})
			  
		it("should write TL-Field 0x0F (0000 1111)", function(){	    	   
			smlBuffer.writeOctetString("0123456789abcd");
			expect(smlBuffer.getBuffer().readUInt8().toString(16)).to.be.equal("f");
		});
		
		it("should set offset to 15", function(){	    	   
			smlBuffer.writeOctetString("0123456789abcd");
			expect(smlBuffer.getOffset()).to.be.equal(15);
		});
		
		it("should write TL-Field 0x8103 (1000 0001 0000 0011)", function(){	
			smlBuffer.writeOctetString("0123456789ABCDEFG");
			expect(smlBuffer.getBuffer().readUInt16BE().toString(16)).to.be.equal("8103");
		});
		
		it("should set offset to 19", function(){	    	   
			smlBuffer.writeOctetString("0123456789ABCDEFG");
			expect(smlBuffer.getOffset()).to.be.equal(19);
		});
		
	 });
	
	describe("readOctetString()", function(){
		
		var smlBuffer = undefined;
		beforeEach(function(){
			smlBuffer = new SmlBuffer();
		})
			  
		it("should read '0123456789abcd'", function(){	    	   
			smlBuffer.writeOctetString("0123456789abcd");
			smlBuffer.setOffset(0);
			expect(smlBuffer.readOctetString()).to.be.equal("0123456789abcd");
		});
		
		it("should read '0123456789ABCDEFG'", function(){	
			smlBuffer.writeOctetString("0123456789ABCDEFG");
			smlBuffer.setOffset(0);
			expect(smlBuffer.readOctetString()).to.be.equal("0123456789ABCDEFG");
		});
		
		it("should set offset to value 19", function(){	
			smlBuffer.writeOctetString("0123456789ABCDEFG");
			smlBuffer.setOffset(0);
			smlBuffer.readOctetString();
			expect(smlBuffer.getOffset()).to.be.equal(19);
		});
		
	});
	
	describe("readUInt8()", function(){
			  
		it("should read value 16", function(){	    	   
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(16);
			expect(smlBuffer.readUInt8()).to.be.equal(16);
		});
		
		it("should set offset to value 1", function(){
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(16);
			smlBuffer.readUInt8();
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
	});
	
	describe("readUInt16()", function(){
		  
		it("should read value 65281", function(){	    	   
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(65281);
			expect(smlBuffer.readUInt16()).to.be.equal(65281);
		});
		
		it("should set offset to value 2", function(){
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(65281);
			smlBuffer.readUInt16();
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("readUInt32()", function(){
		  
		it("should read value 4294967041", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt32BE(4294967041);
			expect(smlBuffer.readUInt32()).to.be.equal(4294967041);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt32BE(4294967041);
			smlBuffer.readUInt32();
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("readUInt64()", function(){
		  
		it("should read value 18446744073709552000", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(18446744073709552000);
			expect(smlBuffer.readUInt64()).to.be.equal(18446744073709552000);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(18446744073709552000);
			smlBuffer.readUInt64();
			expect(smlBuffer.getOffset()).to.be.equal(8);
		});
		
	});
	
	describe("readInt8()", function(){
		  
		it("should read value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt8(-16);
			expect(smlBuffer.readInt8()).to.be.equal(-16);
		});
		
		it("should set offset to value 1", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt8(-16);
			smlBuffer.readInt8();
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
	});
	
	describe("readInt16()", function(){
		  
		it("should read value -3841", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt16BE(-3841);
			expect(smlBuffer.readInt16()).to.be.equal(-3841);
		});
		
		it("should set offset to value 2", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt16BE(-3841);
			smlBuffer.readInt16();
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("readInt32()", function(){
		  
		it("should read value -268435201", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt32BE(-268435201);
			expect(smlBuffer.readInt32()).to.be.equal(-268435201);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt32BE(-268435201);
			smlBuffer.readInt32();
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("readInt64()", function(){
		  
		it("should read value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(-16);
			expect(smlBuffer.readInt64()).to.be.equal(-16);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(-16);
			smlBuffer.readInt64();
			expect(smlBuffer.getOffset()).to.be.equal(8);
		});
		
	});
	
	describe("writeUInt8()", function(){
		  
		it("should write value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt8(16);
			expect(smlBuffer.getBuffer().readUInt8(0)).to.be.equal(16);
		});
		
		it("should set offset to value 1", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt8(16);
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
	});
	
	describe("writeUInt16()", function(){
		  
		it("should write value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt16(16);
			expect(smlBuffer.getBuffer().readUInt16BE(0)).to.be.equal(16);
		});
		
		it("should set offset to value 2", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt16(16);
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("writeUInt32()", function(){
		  
		it("should write value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt32(16);
			expect(smlBuffer.getBuffer().readUInt32BE(0)).to.be.equal(16);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt32(16);
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("writeUInt64()", function(){
		  
		it("should write value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt64(16);
			expect(smlBuffer.getBuffer().readDoubleBE(0)).to.be.equal(16);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeUInt64(16);
			expect(smlBuffer.getOffset()).to.be.equal(8);
		});
		
	});
	
	describe("writeInt8()", function(){
		  
		it("should write value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt8(-16);
			expect(smlBuffer.getBuffer().readInt8(0)).to.be.equal(-16);
		});
		
		it("should set offset to value 1", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt8(-16);
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
	});
	
	describe("writeInt16()", function(){
		  
		it("should write value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt16(-16);
			expect(smlBuffer.getBuffer().readInt16BE(0)).to.be.equal(-16);
		});
		
		it("should set offset to value 2", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt16(-16);
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("writeInt32()", function(){
		  
		it("should write value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt32(-16);
			expect(smlBuffer.getBuffer().readInt32BE(0)).to.be.equal(-16);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt32(-16);
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("writeInt64()", function(){
		  
		it("should write value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt64(-16);
			expect(smlBuffer.getBuffer().readDoubleBE(0)).to.be.equal(-16);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.writeInt64(-16);
			expect(smlBuffer.getOffset()).to.be.equal(8);
		});
		
	});
	
	describe("readTLField()", function(){
		  
		it("should return an Object with size 2", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(0x76, 0);
			var result = smlBuffer.readTLField();
			expect(result).to.be.instanceof(Object);
			expect(Object.keys(result).length).to.be.equal(2);
		});
		
		it("should read value {type: 0x07, length: 0x06}", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(0x76, 0);
			var result = smlBuffer.readTLField();
			expect(result.type).to.be.equal(0x07);
			expect(result.length).to.be.equal(0x06);
			
		});
		
		it("should set offset to value 1 for 0x76", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(0x76, 0);
			smlBuffer.readTLField();
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
		it("should read value {type: 0x07, length: 0x10}", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(0xF171, 0);
			var result = smlBuffer.readTLField();
			expect(result.type).to.be.equal(0x07);
			expect(result.length).to.be.equal(0x10);
			
		});
		
		it("should set offset to value 2 for 0xF171", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(0xF171, 0);
			smlBuffer.readTLField();
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
	});
	
	describe("writeTLField()", function(){
		
		it("should write value 0x76", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0x76);
			expect(smlBuffer.getBuffer().readUInt8()).to.be.equal(0x76);			
		});
		
		it("should set offset to value 1 for 0x76", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0x76);
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
		it("should write value 0xF171", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0xF171);
			expect(smlBufer.getBuffer().readUInt16BE()).to.be.equal(0xF171);
		});
		
		it("should set offset to value 2 for 0xF171", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0xF171);
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
	});
	
	describe("writeUnsigned(value, tlField)", function(){
		it("should call writeUInt8(16) for UINT8 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeUInt8");
	        smlBuffer.writeUnsigned(16, Constants.UINT8);
	        expect(spy).to.have.been.calledWith(16);
		});
		
		it("should call writeUInt16(16) for UINT16 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeUInt16");
	        smlBuffer.writeUnsigned(16, Constants.UINT16);
	        expect(spy).to.have.been.calledWith(16);
		});
		
		it("should call writeUInt32(16) for UINT32 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeUInt32");
	        smlBuffer.writeUnsigned(16, Constants.UINT32);
	        expect(spy).to.have.been.calledWith(16);
		});
		
		it("should call writeUInt64(16) for UINT64 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeUInt64");
	        smlBuffer.writeUnsigned(16, Constants.UINT64);
	        expect(spy).to.have.been.calledWith(16);
		});
		
		it("should call writeTLField(Constants.UINT8) for UINT8 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeUnsigned(16, Constants.UINT8);
	        expect(spy).to.have.been.calledWith(Constants.UINT8);
		});
		
		it("should call writeTLField(Constants.UINT16) for UINT16 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeUnsigned(16, Constants.UINT16);
	        expect(spy).to.have.been.calledWith(Constants.UINT16);
		});
		
		it("should call writeTLField(Constants.UINT32) for UINT32 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeUnsigned(16, Constants.UINT32);
	        expect(spy).to.have.been.calledWith(Constants.UINT32);
		});
		
		it("should call writeTLField(Constants.UINT64) for UINT64 value 16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeUnsigned(16, Constants.UINT64);
	        expect(spy).to.have.been.calledWith(Constants.UINT64);
		});
	});
	
	describe("readUnsigned()", function(){
		
	});
	
	describe("writeInteger()", function(){
		it("should call writeInt8(-16) for INT8 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeInt8");
	        smlBuffer.writeInteger(-16, Constants.INT8);
	        expect(spy).to.have.been.calledWith(-16);
		});
		
		it("should call writeInt16(-16) for INT16 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeInt16");
	        smlBuffer.writeInteger(-16, Constants.INT16);
	        expect(spy).to.have.been.calledWith(-16);
		});
		
		it("should call writeInt32(-16) for INT32 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeInt32");
	        smlBuffer.writeInteger(-16, Constants.INT32);
	        expect(spy).to.have.been.calledWith(-16);
		});
		
		it("should call writeInt64(-16) for INT64 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeInt64");
	        smlBuffer.writeInteger(-16, Constants.INT64);
	        expect(spy).to.have.been.calledWith(-16);
		});
		
		it("should call writeTLField(Constants.INT8) for INT8 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeInteger(-16, Constants.INT8);
	        expect(spy).to.have.been.calledWith(Constants.INT8);
		});
		
		it("should call writeTLField(Constants.INT16) for INT16 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeInteger(-16, Constants.INT16);
	        expect(spy).to.have.been.calledWith(Constants.INT16);
		});
		
		it("should call writeTLField(Constants.INT32) for INT32 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeInteger(-16, Constants.INT32);
	        expect(spy).to.have.been.calledWith(Constants.INT32);
		});
		
		it("should call writeTLField(Constants.INT64) for INT64 value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "writeTLField");
	        smlBuffer.writeInteger(-16, Constants.INT64);
	        expect(spy).to.have.been.calledWith(Constants.INT64);
		});
	});
	
	describe("readIneger()", function(){
	});
	
	describe("readSmlValue()", function(){
	});
	
	describe("writeSmlValue()", function(){
	});
	
	describe("readSmlBoolean()", function(){
	});
	
	describe("writeSmlBoolean()", function(){
	});
	
	describe("readChoice()", function(){
	});
	
	describe("writeChoice()", function(){
	});
});