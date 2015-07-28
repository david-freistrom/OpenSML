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
			expect(smlBuffer.getBuffer().readUInt8(0).toString(16)).to.be.equal("f");
		});
		
		it("should set offset to 15", function(){	    	   
			smlBuffer.writeOctetString("0123456789abcd");
			expect(smlBuffer.getOffset()).to.be.equal(15);
		});
		
		it("should write TL-Field 0x8103 (1000 0001 0000 0011)", function(){	
			smlBuffer.writeOctetString("0123456789ABCDEFG");
			expect(smlBuffer.getBuffer().readUInt16BE(0).toString(16)).to.be.equal("8103");
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
			smlBuffer.getBuffer().writeUInt8(16, 0);
			expect(smlBuffer.readUInt8()).to.be.equal(16);
		});
		
		it("should set offset to value 1", function(){
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt8(16, 0);
			smlBuffer.readUInt8();
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
	});
	
	describe("readUInt16()", function(){
		  
		it("should read value 65281", function(){	    	   
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(65281, 0);
			expect(smlBuffer.readUInt16()).to.be.equal(65281);
		});
		
		it("should set offset to value 2", function(){
			var smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt16BE(65281, 0);
			smlBuffer.readUInt16();
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("readUInt32()", function(){
		  
		it("should read value 4294967041", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt32BE(4294967041, 0);
			expect(smlBuffer.readUInt32()).to.be.equal(4294967041);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeUInt32BE(4294967041, 0);
			smlBuffer.readUInt32();
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("readUInt64()", function(){
		  
		it("should read value 18446744073709552000", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(18446744073709552000, 0);
			expect(smlBuffer.readUInt64()).to.be.equal(18446744073709552000);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(18446744073709552000, 0);
			smlBuffer.readUInt64();
			expect(smlBuffer.getOffset()).to.be.equal(8);
		});
		
	});
	
	describe("readInt8()", function(){
		  
		it("should read value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt8(-16, 0);
			expect(smlBuffer.readInt8()).to.be.equal(-16);
		});
		
		it("should set offset to value 1", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt8(-16, 0);
			smlBuffer.readInt8();
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
	});
	
	describe("readInt16()", function(){
		  
		it("should read value -3841", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt16BE(-3841, 0);
			expect(smlBuffer.readInt16()).to.be.equal(-3841);
		});
		
		it("should set offset to value 2", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt16BE(-3841, 0);
			smlBuffer.readInt16();
			expect(smlBuffer.getOffset()).to.be.equal(2);
		});
		
	});
	
	describe("readInt32()", function(){
		  
		it("should read value -268435201", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt32BE(-268435201, 0);
			expect(smlBuffer.readInt32()).to.be.equal(-268435201);
		});
		
		it("should set offset to value 4", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeInt32BE(-268435201, 0);
			smlBuffer.readInt32();
			expect(smlBuffer.getOffset()).to.be.equal(4);
		});
		
	});
	
	describe("readInt64()", function(){
		  
		it("should read value -16", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(-16, 0);
			expect(smlBuffer.readInt64()).to.be.equal(-16);
		});
		
		it("should set offset to value 8", function(){
			smlBuffer = new SmlBuffer();
			smlBuffer.getBuffer().writeDoubleBE(-16, 0);
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
			expect(smlBuffer.getBuffer().readUInt8(0)).to.be.equal(0x76);			
		});
		
		it("should set offset to value 1 for 0x76", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0x76);
			expect(smlBuffer.getOffset()).to.be.equal(1);
		});
		
		it("should write value 0xF171", function(){	    	   
			smlBuffer = new SmlBuffer();
			smlBuffer.writeTLField(0xF171);
			expect(smlBufer.getBuffer().readUInt16BE(0)).to.be.equal(0xF171);
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
		it("should call readTLField()", function(){	    	   
			smlBuffer = new SmlBuffer();
			var spy = sinon.spy(smlBuffer, "readTLField");
	        smlBuffer.readUnsigned();
	        expect(spy).to.have.been.called;
		});
		
		it("should call readUInt8 for tlField 0x62", function(){	    	   
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.UNSIGNED, length: 0x02});
			var spy = sinon.spy(smlBuffer, "readUInt8");
			smlBuffer.readUnsigned();
	        expect(spy).to.have.been.called;
		});
		
		it("should call readUInt16 for tlField 0x63", function(){	    	   
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.UNSIGNED, length: 0x03});
			var spy = sinon.spy(smlBuffer, "readUInt16");
			smlBuffer.readUnsigned();
	        expect(spy).to.have.been.called;
		});
		
		it("should call readUInt32 for tlField 0x65", function(){	    	   
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.UNSIGNED, length: 0x05});
			var spy = sinon.spy(smlBuffer, "readUInt32");
			smlBuffer.readUnsigned();
	        expect(spy).to.have.been.called;
		});
		
		it("should call readUInt64 for tlField 0x69", function(){	    	   
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.UNSIGNED, length: 0x09});
			var spy = sinon.spy(smlBuffer, "readUInt64");
			smlBuffer.readUnsigned();
	        expect(spy).to.have.been.called;
		});
		
		it("should throw Error('Wrong TL-Field for Unsigned!')", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.INTEGER, length: 0x09});
			var fn = function() {smlBuffer.readUnsigned()};
	        expect(fn).to.throw("Wrong TL-Field for Unsigned!");
		});
		
		it("should return empty string for tlField 0x00", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: 0x00, length: 0x00});
	        expect(smlBuffer.readUnsigned()).to.be.empty;
		});
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
	
	describe("readInteger()", function(){
		it("should call readTLField()", function(){	    	   
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "readTLField");
			stub.returns({type: Constants.INTEGER, length: 0x02});
	        smlBuffer.readInteger();
	        expect(stub).to.have.been.called;
		});
		
		it("should call readInt8 for tlField 0x52", function(){	    	   
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: Constants.INTEGER, length: 0x02});
			var stub = sinon.stub(smlBuffer, "readInt8");
			smlBuffer.readInteger();
	        expect(stub).to.have.been.called;
		});
		
		it("should call readInt16 for tlField 0x53", function(){	    	   
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: Constants.INTEGER, length: 0x03});
			var stub = sinon.stub(smlBuffer, "readInt16");
			smlBuffer.readInteger();
	        expect(stub).to.have.been.called;
		});
		
		it("should call readInt32 for tlField 0x55", function(){	    	   
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: Constants.INTEGER, length: 0x05});
			var stub = sinon.stub(smlBuffer, "readInt32");
			smlBuffer.readInteger();
	        expect(stub).to.have.been.called;
		});
		
		it("should call readInt64 for tlField 0x59", function(){	    	   
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: Constants.INTEGER, length: 0x09});
			var stub = sinon.stub(smlBuffer, "readInt64");
			smlBuffer.readInteger();
	        expect(stub).to.have.been.called;
		});
		
		it("should throw Error('Wrong TL-Field for Integer!')", function(){
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: Constants.UNSIGNED, length: 0x09});
			var fn = function() {smlBuffer.readInteger()};
	        expect(fn).to.throw("Wrong TL-Field for Integer!");
		});
		
		it("should return empty string for tlField 0x00", function(){
			smlBuffer = new SmlBuffer();
			var readTlField = sinon.stub(smlBuffer, "readTLField");
			readTlField.returns({type: 0x00, length: 0x00});
	        expect(smlBuffer.readUnsigned()).to.be.empty;
		});
	});
	
	describe("readSmlValue()", function(){
		it("should call readOctetString() for tlField 0x00", function(){
			smlBuffer = new SmlBuffer(new Buffer("00", "hex"));
			var stub = sinon.stub(smlBuffer, "readOctetString");
			smlBuffer.readSmlValue();
			expect(stub).to.have.been.called;
		});
		
		it("should call readOctetString() for tlField 0x80", function(){
			smlBuffer = new SmlBuffer(new Buffer("80", "hex"));
			var stub = sinon.stub(smlBuffer, "readOctetString");
			smlBuffer.readSmlValue();
			expect(stub).to.have.been.called;
		});
		
		it("should call readSmlBoolean() for tlField 0x40", function(){
			smlBuffer = new SmlBuffer(new Buffer("40", "hex"));
			var stub = sinon.stub(smlBuffer, "readSmlBoolean");
			smlBuffer.readSmlValue();
			expect(stub).to.have.been.called;
		});
		
		it("should call readInteger() for tlField 0x50", function(){
			smlBuffer = new SmlBuffer(new Buffer("50", "hex"));
			var stub = sinon.stub(smlBuffer, "readInteger");
			smlBuffer.readSmlValue();
			expect(stub).to.have.been.called;
		});
		
		it("should call readUnsigned() for tlField 0x60", function(){
			smlBuffer = new SmlBuffer(new Buffer("60", "hex"));
			var stub = sinon.stub(smlBuffer, "readUnsigned");
			smlBuffer.readSmlValue();
			expect(stub).to.have.been.called;
		});
		
		it("should throw Error('Wrong TL-Field 0x11 for SmlValue!')", function(){
			smlBuffer = new SmlBuffer(new Buffer("11", "hex"));
			var fn = function() {smlBuffer.readSmlValue()};
	        expect(fn).to.throw("Wrong TL-Field 0x11 for SmlValue!");
		});
	});
	
	describe("writeSmlValue()", function(){
		it("should call writeSmlBoolean() for Constants.BOOLEAN true", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeSmlBoolean");
			smlBuffer.writeSmlValue(true, Constants.BOOLEAN);
			expect(stub).to.have.been.calledWith(true);
		});
		
		it("should call writeOctetString() for Constants.OCTET_STRING 'hello world'", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeOctetString");
			smlBuffer.writeSmlValue("hello world", Constants.OCTET_STRING);
			expect(stub).to.have.been.calledWith("hello world");
		});
		
		it("should call writeUnsigned() for Constants.UINT8 1", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeUnsigned");
			smlBuffer.writeSmlValue(1, Constants.UINT8);
			expect(stub).to.have.been.calledWith(1);
		});
		
		it("should call writeUnsigned() for Constants.UINT16 2", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeUnsigned");
			smlBuffer.writeSmlValue(2, Constants.UINT16);
			expect(stub).to.have.been.calledWith(2);
		});
		
		it("should call writeUnsigned() for Constants.UINT32 3", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeUnsigned");
			smlBuffer.writeSmlValue(3, Constants.UINT32);
			expect(stub).to.have.been.calledWith(3);
		});
		
		it("should call writeUnsigned() for Constants.UINT64 4", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeUnsigned");
			smlBuffer.writeSmlValue(4, Constants.UINT64);
			expect(stub).to.have.been.calledWith(4);
		});
		
		it("should call writeInteger() for Constants.INT8 1", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeInteger");
			smlBuffer.writeSmlValue(1, Constants.INT8);
			expect(stub).to.have.been.calledWith(1);
		});
		
		it("should call writeInteger() for Constants.INT16 2", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeInteger");
			smlBuffer.writeSmlValue(2, Constants.INT16);
			expect(stub).to.have.been.calledWith(2);
		});
		
		it("should call writeInteger() for Constants.INT32 3", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeInteger");
			smlBuffer.writeSmlValue(3, Constants.INT32);
			expect(stub).to.have.been.calledWith(3);
		});
		
		it("should call writeInteger() for Constants.INT64 1", function(){
			smlBuffer = new SmlBuffer();
			var stub = sinon.stub(smlBuffer, "writeInteger");
			smlBuffer.writeSmlValue(4, Constants.INT64);
			expect(stub).to.have.been.calledWith(4);
		});
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