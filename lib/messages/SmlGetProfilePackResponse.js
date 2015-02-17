function SmlGetProfilePackResponse(){
	this.serverId = undefined;
	this.actTime = undefined;
	this.regPeriod = undefined;
	this.parameterTreePath = undefined;
	this.headerList = undefined;
	this.periodList = undefined;
	this.withRawdata = undefined;
	this.profileSignature = undefined;
};

SmlGetProfilePackResponse.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfilePackResponse.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfilePackResponse.prototype.getActTime = function getActTime(){
	return this.actTime;
};

SmlGetProfilePackResponse.prototype.setActTime = function setActTime(value){
	this.actTime = value;
};

SmlGetProfilePackResponse.prototype.getRegPeriod = function getRegPeriod(){
	return this.regPeriod;
};

SmlGetProfilePackResponse.prototype.setRegPeriod = function setRegPeriod(value){
	this.regPeriod = value;
};

SmlGetProfilePackResponse.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfilePackResponse.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfilePackResponse.prototype.getHeaderList = function getHeaderList(){
	return this.headerList;
};

SmlGetProfilePackResponse.prototype.setHeaderList = function setHeaderList(value){
	this.headerList = value;
};

SmlGetProfilePackResponse.prototype.getPeriodList = function getPeriodList(){
	return this.periodList;
};

SmlGetProfilePackResponse.prototype.setPeriodList = function setPeriodList(value){
	this.periodList = value;
};

SmlGetProfilePackResponse.prototype.isWithRawdata = function isWithRawdata(){
	return this.withRawdata;
};

SmlGetProfilePackResponse.prototype.setWithRawdata = function setWithRawdata(value){
	this.withRawdata = value;
};

SmlGetProfilePackResponse.prototype.getProfileSignature = function getProfileSignature(){
	return this.profileSignature;
};

SmlGetProfilePackResponse.prototype.setProfileSignature = function setProfileSignature(value){
	this.profileSignature = value;
};

SmlGetProfilePackResponse.prototype.write = function write(buffer){
	
};

SmlGetProfilePackResponse.prototype.toString = function toString(){
	var str = "";
	str += "Server-ID: "+this.serverId+"\n";
	str += "Act Time: "+this.actTime.toString()+"\n";
	str += "Reg Period: "+this.regPeriod+"\n";	
	str += "Parameter Tree-Path: "+this.paramaterTreePath.toString()+"\n";
	str += "Header List: "+this.headerList.toString()+"\n";	
	str += "Period List: "+this.periodList.toString()+"\n";
	str += "With Rawdata: "+this.withRawdata.toString()+"\n";	
	str += "Profile Signature: "+this.profileSignature+"\n";	
	return str;
};

SmlGetProfilePackResponse.parse = function parse(buffer){
var smlGetProfilePackResponse = new SmlGetProfilePackResponse();
	
	if(buffer.readTLField()==0x07,0x08){			
		smlGetProfilePackResponse.setServerId(buffer.readOctetString());	
		smlGetProfilePackResponse.setActTime(SmlTime.parse(buffer));	
		smlGetProfilePackResponse.setRegPeriod(buffer.readUnsigned());	
		smlGetProfilePackResponse.setParameterTreePath(SmlTreePath.parse(buffer));
		smlGetProfilePackResponse.setHeaderList(SmlTime.parse(buffer));	
		smlGetProfilePackResponse.setPeriodList(SmlPeriodList.parse(buffer));
		smlGetProfilePackResponse.setWithRawdata(buffer.readUnsigned());
		smlGetProfilePackResponse.setProfileSignature(buffer.readOctetString());
		
	} else {
		throw new Error("Unknown TL-Field for SmlGetProfilePackResponse!");
	}
	
	return smlGetProfileListResponse;
};

module.exports = SmlGetProfilePackResponse;