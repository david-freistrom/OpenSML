function SmlGetProfilePackResponse(){
	this.serverId = undefined;
	this.actTime = undefined;
	this.regPeriod = undefined;
	this.parameterTreePath = new SmlTreePath();
	this.headerList = [ProfObjHeaderEntry];
	this.periodList = [ProfObjPeriodEntry];
	this.rawdata = undfined;
	this.profileSignature = new SmlSignature();
};