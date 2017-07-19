export  function getUrlLastPath(url,index){
	return  url.split('/')[index];
}
export function getCreateTime(time){
	var date=new Date(time);
	return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+"创建";
}

export function getMinute(time){
	var minute=Math.floor(time/1000/60);
	var s=Math.round(time%1000%60);
	return (minute<=9?("0"+minute):minute)+":"+(s<=9?("0"+s):s);
}
export function getMinuteS(time){
	var minute=Math.floor(time/60);
	var s=Math.round(time%60);
	return (minute<=9?("0"+minute):minute)+":"+(s<=9?("0"+s):s);
}
