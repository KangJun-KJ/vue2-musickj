import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	singer: {},
	playing: false,
	fullScreen: false,
	playlist: [],
	/* 列表歌单*/
	sequenceList: [],
	/*播放列表 表示歌单的播放模式的顺序 */
	mode: 0,
	/*0顺序播放 1随机播放 2随机播放*/
	currentIndex: -1,
	//disc: {},
	//topList: {},
	searchHistory: [],
	playHistory: [],
	favoriteList: [],
	IsShowSonglist:false,
	IsFullScreen:false,
	lyric:"",
	songTime:''
}

const getters = {
	currentSong(state) {
		if(state.currentIndex==-1)return 
		return state.playlist[state.currentIndex]
	},
	getSongImgUrl(state){
		if(state.currentIndex==-1)return 
		return state.playlist[state.currentIndex].songImgUrl
	},
	getSongName(state){
		if(state.currentIndex==-1)return 
		return state.playlist[state.currentIndex].name
	},
	getSingerName(state){
		if(state.currentIndex==-1)return 
		return state.playlist[state.currentIndex].singer
	},
	
}

const mutations = {
	stopmusic(state) {
		state.playing = false;
	},
	startmusic(state) {
		state.playing = true;
	},
	setCurrentIndex(state, index) {
		state.currentIndex = index;
	},
	changeCurrIndex(state, index) {
		state.currentIndex += index;
		if(state.currentIndex === -1) {
			state.currentIndex = state.playlist.length - 1;
		} else if(state.currentIndex === state.playlist.length) {
			state.currentIndex = 0;
		}
	},
	addPlaylist(state, item) {
		state.playlist.push(item);
	},
	addQueuelist(state, item) {
		state.sequenceList.push(item);
	},
	clearList(state){
		state.playlist=[];
		state.sequenceList=[];
	},
	changePlayMode(state){
		state.mode=++state.mode>=3?0:state.mode
	},
	changeIsShowSonglist(state){
		state.IsShowSonglist=!state.IsShowSonglist;
	},
	addHistoryList(state){
		state.playHistory.forEach(function(item,index){
			if(item.id==state.playlist[state.currentIndex].id){
				state.playHistory.splice(index,1);
			}
		})
		state.playHistory.unshift(state.playlist[state.currentIndex]);
	},
	HistoryFoundInPlay(state,index){
		console.log(state.playHistory[index].id)
		var hisId=state.playHistory[index].id,Isfound=false;
		state.playlist.forEach(function(item,index){
			if(item.id==hisId){
				state.currentIndex=index;
				Isfound=true;
			}
		});
		if(!Isfound){
			state.currentIndex=state.playlist.length;
			state.playlist.push(state.playHistory[index]);
		}
	},
	setFullScreen(state,flag){
		state.IsFullScreen=flag;
	},
	setSongTime(state,time){
		state.songTime=time;
	}
}

const actions = {

}
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})