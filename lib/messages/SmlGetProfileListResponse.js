var SmlTreePath = require('./data_structures/SmlTreePath');
var SmlPeriodList = require('./data_structures/SmlPeriodList');
var SmlTime = require('./data_structures/SmlTime');

function SmlGetProfileListResponse(){
	this.serverId = undefined;
	this.actTime = undefined;
	this.regPeriod = undefined;
	this.parameterTreePath = undefined;
	this.valTime = undefined;
	this.status = undefined;
	this.periodList = undefined;
	this.withRawdata = undefined;
	this.periodSignature = undefined;
};

SmlGetProfileListResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfileListResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfileListResponse.prototype.getActTime = function getActTime(){
	return this.actTime;
};

SmlGetProfileListResponse.prototype.setActTime = function setActTime(value){
	this.actTime = value;
};

SmlGetProfileListResponse.prototype.getRegPeriod = function getRegPeriod(){
	return this.regPeriod;
};

SmlGetProfileListResponse.prototype.setRegPeriod = function setRegPeriod(value){
	this.regPeriod = value;
};

SmlGetProfileListResponse.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfileListResponse.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfileListResponse.prototype.getValTime = function getValTime(){
	return this.valTime;
};

SmlGetProfileListResponse.prototype.setValTime = function setValTime(value){
	this.valTime = value;
};

SmlGetProfileListResponse.prototype.getStatus = function getStatus(){
	return this.status;
};

SmlGetProfileListResponse.prototype.setStatus = function setStatus(value){
	this.status = value;
};

SmlGetProfileListResponse.prototype.getPeriodList = function getPeriodList(){
	return this.periodList;
};

SmlGetProfileListResponse.prototype.setPeriodList = function setPeriodList(value){
	this.periodList = value;
};

SmlGetProfileListResponse.prototype.getWithRawdata = function getWithRawdata(){
	return this.withRawdata;
};

SmlGetProfileListResponse.prototype.setWithRawdata = function setWithRawdata(value){
	this.withRawdata = value;
};

SmlGetProfileListResponse.prototype.getPeriodSignature = function getPeriodSignature(){
	return this.periodSignature;
};

SmlGetProfileListResponse.prototype.setPeriodSignature = function setPeriodSignature(value){
	this.periodSignature = value;
};

SmlGetProfileListResponse.prototype.toString = function toString(){
	var str = "";
	str += "Server-ID: "+this.serverId.toString('hex')+"\n";
	str += "Act-Time: "+this.actTime.toString();
	str += "Reg-Period: "+this.regPeriod+"\n";	
	str += "Parameter-Tree-Path: "+this.parameterTreePath.toString()+"\n";
	str += "Val-Time: "+this.valTime.toString();
	str += "Status: "+this.status+"\n";
	str += "Period-List: \n\t"+this.periodList.toString()+"\n";
	str += "Raw-Data: "+this.withRawdata+"\n";
	str += "Period-Signature: "+this.periodSignature+"\n";
	return str;
};

SmlGetProfileListResponse.prototype.write = function write(buffer){
	
};

SmlGetProfileListResponse.parse = function parse(buffer){
	var smlGetProfileListResponse = new SmlGetProfileListResponse();
	
	if(buffer.readTLField()==0x07,0x09){			
		smlGetProfileListResponse.setServerId(buffer.readOctetString());	
		smlGetProfileListResponse.setActTime(SmlTime.parse(buffer));	
		smlGetProfileListResponse.setRegPeriod(buffer.readUnsigned());	
		smlGetProfileListResponse.setParameterTreePath(SmlTreePath.parse(buffer));
		smlGetProfileListResponse.setValTime(SmlTime.parse(buffer));	
		smlGetProfileListResponse.setStatus(buffer.readUnsigned());
		smlGetProfileListResponse.setPeriodList(SmlPeriodList.parse(buffer));
		smlGetProfileListResponse.setWithRawdata(buffer.readSmlBoolean());
		smlGetProfileListResponse.setPeriodSignature(buffer.readOctetString());
		
	} else {
		throw new Error("Unknown TL-Field for SmlGetProfileListResponse!");
	}
	
	return smlGetProfileListResponse;
};

module.exports = SmlGetProfileListResponse;