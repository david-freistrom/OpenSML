function SmlGetProfilePackRequest(){
	this.serverId = undefined;
	this.username = undefined;
	this.password = undefined;
	this.withRawdata = false;
	this.beginTime = new SmlTime();
	this.endTime = new SmlTime();
	this.parameterTreePath = [OctetString];
	this.dasDetails = new SmlTree();
};