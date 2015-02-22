function SmlGetProfilePackRequest(){
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.withRawdata = undefined;
	this.beginTime = undefined;
	this.endTime = undefined;
	this.parameterTreePath = undefined;
	this.dasDetails = undefined;
};

SmlGetProfilePackRequest.prototype.getServerId = function getServerId(){
	return this.serverId;
};

SmlGetProfilePackRequest.prototype.setServerId = function setServerId(value){
	this.serverId = value;
};

SmlGetProfilePackRequest.prototype.getUsername = function getUsername(){
	return this.username;
};

SmlGetProfilePackRequest.prototype.setUsername = function setUsername(value){
	this.username = value;
};

SmlGetProfilePackRequest.prototype.getPassword = function getPassword(){
	return this.password;
};

SmlGetProfilePackRequest.prototype.setPassword = function setPassword(value){
	this.password = value;
};

SmlGetProfilePackRequest.prototype.isWithRawdata = function isWithRawdata(){
	return this.withRawdata;
};

SmlGetProfilePackRequest.prototype.setWithRawdata = function setWithRawdata(value){
	this.withRawdata = value;
};

SmlGetProfilePackRequest.prototype.getBeginTime = function getBeginTime(){
	return this.beginTime;
};

SmlGetProfilePackRequest.prototype.setBeginTime = function setBeginTime(value){
	this.beginTime = value;
};

SmlGetProfilePackRequest.prototype.getEndTime = function getEndTime(){
	return this.endTime;
};

SmlGetProfilePackRequest.prototype.setEndTime = function setEndTime(value){
	this.endTime = value;
};

SmlGetProfilePackRequest.prototype.getParameterTreePath = function getParameterTreePath(){
	return this.parameterTreePath;
};

SmlGetProfilePackRequest.prototype.setParameterTreePath = function setParameterTreePath(value){
	this.parameterTreePath = value;
};

SmlGetProfilePackRequest.prototype.getDasDetails = function getDasDetails(){
	return this.dasDetails;
};

SmlGetProfilePackRequest.prototype.setDasDetails = function setDasDetails(value){
	this.dasDetails = value;
};

SmlGetProfilePackRequest.prototype.write = function write(buffer){
	
};

SmlGetProfilePackRequest.prototype.toString = function toString(){
	var str = "";
	str += "Server-ID: "+this.serverId+"\n";
	str += "Username: "+this.userame+"\n";
	str += "Password: "+this.password+"\n";	
	str += "With Rawdata: "+this.withRawdata+"\n";
	str += "Begin Time: "+this.beginTime.toString()+"\n";	
	str += "End Time: "+this.endTime.toString()+"\n";
	str += "Parameter Tree-Path: "+this.parameterTreePath.toString()+"\n";	
	str += "DAS Details: "+this.dasDetails+"\n";	
	return str;
};

SmlGetProfilePackRequest.parse = function parse(buffer){
	if(buffer.readTLField()==0x07,0x08){
		var smlGetProfilePackRequest = new SmlGetProfilePackRequest();
		smlGetProfilePackRequest.setServerId(buffer.readOctetString());
		smlGetProfilePackRequest.setUsername(buffer.readOctetString());
		smlGetProfilePackRequest.setPassword(buffer.readOctetString);
		smlGetProfilePackRequest.setWithRawdata(buffer.readSmlBoolean());
		smlGetProfilePackRequest.setBeginTime(SmlTime.parse(buffer));
		smlGetProfilePackRequest.setEndTime(SmlTime.parse(buffer));
		smlGetProfilePackRequest.setParamaterTreePath(SmlTreePath.parse(buffer));
		smlGetProfilePackRequest.setDasDetails(SmlTree.parse(buffer));
		
		return smlGetProfilePackRequest;
	} else {
		throw new Error("Unknown TL-Field for SmlGetProfilePackRequest!");
	}
};

module.exports = SmlGetProfilePackRequest;