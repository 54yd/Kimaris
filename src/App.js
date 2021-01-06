//Core
import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { css } from 'emotion'

//Addons
import * as R from 'ramda'
import "@google/model-viewer"


//Utils
import useScrollPosition from './useScrollPosition'
import { RotateGradient } from './RotateGradient'
import { AddHomeButton } from './AddHomeButton'

//Components
import "./Root.css"
import { PingPong } from './PingPong'

import {
	Flex,
	Button,
	PlaceHolder,
	Card,
	WingBlank,
	WhiteSpace,
	Modal,
	Icon,
	NoticeBar,
	Progress
  } from "antd-mobile"

  import { Modal as BSModal } from 'react-bootstrap/Modal';

  import { useSpring, animated as a } from 'react-spring'

//Textures,SVGs
import { ReactComponent as SymbolSoundOff } from "./assets/svgs/circumference.svg"
import { ReactComponent as SymbolSoundOn } from "./assets/svgs/circumference_filled.svg"

import OldTown from "./JapaneseCityExample.gif"
import KanagawaTown from "./KanagawaExample.gif"

//GLTF, GLB
import modelDuck from './Duck.glb'

import Mglb from 'Duck.glb'
import Musdz from 'Duck.usdz'



import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

//Sounds
import useSound from 'use-sound'
import BGMOcean1 from './Ocean1.mp3';
import BGMdetective from './Galimatias  Joppe  Mintaka.mp3';
import BGMdv2 from './The Division 2  Theme Music.mp3';

import SFXget2 from './Cash register 2.mp3'
import SFXduck7 from "./duck_2_quack_07.mp3"
import SFXduck8 from "./duck_2_quack_08.mp3"
import SFXduckS2 from "./duck_2_quack_seq_02.mp3"
import SFXduckS5 from "./duck_2_quack_seq_05.mp3"
import SFXclick8 from "./Click back sounds 8.mp3"
// *** App ***  

const App = () => {


	// if touchcount==10 hp-=10 touchcount=0

	// Device Size Checker Implementation
	// ------------------------------

	const [screenSize, setScreenSize] = useState({width : window.innerWidth, height : window.innerHeight });
	const scrollPos = useScrollPosition();

	// Sound Implementation
	// ------------------------------
	const [cntTouchDuck, setCntTouchDuck] = useState(0)
	const [HPDuck, setHPDuck] = useState(100)


	const [items, setItems] = useState([])
	const [sortedItems, setSortedItems] = useState([])
	const [isSortAscend, setIsSortAscend] = useState(true)

	const [isBGMPlaying, setBGMPlaying] = useState(false)

	const [isMobile, setIsMobile] = useState(false)
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
	const [isOverWidth, setIsOverWidth] = useState(false)	
	// [TIPS] ES6 Destructure import caught by : (it is not key:value, means a command framed key:(const variable) then import as variable=key )
	// BGMs
	const [playBGMOcn1, {stop : stopBGMOcn1} ] = useSound(BGMOcean1,{ volume: 0.5 })
	const [playBGMdv2, {stop : stopBGMdv2} ] = useSound(BGMdv2,{ volume: 1.0 })
	const [playBGMDtv, {stop : stopBGMDtv} ] = useSound(BGMdetective)
	
	//SFXs
	const [playSFXget2, {stop : stopSFXget2} ] = useSound(SFXget2)
	const [playSFXclick8, {stop : stopSFXclick8} ] = useSound(SFXclick8)
	const [playSFXduck7, {stop : stopSFXduck7} ] = useSound(SFXduck7)
	const [playSFXduck8, {stop : stopSFXduck8} ] = useSound(SFXduck8)
	const [playSFXduckS2, {stop : stopSFXduckS2} ] = useSound(SFXduckS2)
	const [playSFXduckS5, {stop : stopSFXduckS5} ] = useSound(SFXduckS5)



	const mesDuckBattle = [
		{
			mes:"げんき！げんき！",
			snd:playSFXduckS5
		},
		{
			mes:"え、なあに？",
			snd:playSFXduckS2
		},
		{
			mes:"えっ、いたいよっ！！",
			snd:playSFXduckS5
		},
		{
			mes:"や…………　　め　……て……！！！",
			snd:playSFXduck8
		},
		{
			mes:"いたい………どう…して…",
			snd:playSFXduckS5
		},
		{
			mes:"返事がない。(事切れている…。)",
			snd:playSFXclick8
		}
	]


	const toggleBGM = () => {
		console.log(isBGMPlaying)		
		const currentState = isBGMPlaying
		setBGMPlaying(!currentState)
		console.log(isBGMPlaying)		
	}

	// *** UseEffect
	useEffect(
		() => { 	
			const handleResize = () => setScreenSize({width : window.innerWidth, height : window.innerHeight })
			window.addEventListener("resize", handleResize)
			console.log(screenSize)
			console.log("scroll:"+scrollPos+" "+window.pageYOffset)

			return () => window.removeEventListener("resize", handleResize);
			
	},[])

	useEffect(
		() => {
			if (isBGMPlaying) playBGMdv2()
			else stopBGMdv2()
	},[isBGMPlaying])

	useEffect(
		() => {
		const _isMobile = () => {
			let check = false;
			//  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}

		setIsMobile(_isMobile);

		const _isMobileOrTablet= () => {
			let check = false;
			//  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}

		setIsMobileOrTablet(_isMobileOrTablet);

		if (window.innerWidth > 800) setIsOverWidth(true);


	},[])



	// *** SFX
	
	/*
	const SfxBeachGently = './Ocean1.mp3';

	const [playBGMBlue, { stopBGMBlue }] = useSound(
		SfxBeachGently,
		{ volume: 0.5 }
	);
	*/
	
	// *** Constructor
	
	const RootDesign = css`
		display: flex;
		width:100%;
	`
	const backgroundParallax = css`
		--heightWeight : 10;

		position: absolute;

		display: flex;
		width:100%;
		height:calc( 100vh * var(--heightWeight) );

		background:
			linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
			linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
			linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);

		// *** Sorting Priority (higher is front)
		z-index: 0;	
	`	

	const backgroundModelBoard = css`
		model-viewer {
		
			margin: auto;
			width: 100%;
			//height: 100%; /* 600px by default is preferred. */ 
			height: ${screenSize.height+"px"};
					
			background-color: rgba(0, 0, 0, 0);
		}

		position: sticky;
		box-sizing: border-box;
		
		top: 0;
		height: 300px;				
		width:100%;
		
		justify-content: center;
		
		border: 0px solid #555;

		// *** Sorting Priority (higher is front)
		z-index: 1;
	`	

	const FirstViewWhiteSpace = css`
		--prevent-line-break:2000px;
		min-width: var(--prevent-line-break);
		display: flex;
		flex-flow : row no-wrap;
		margin : auto;
		content :"";
		height: ${screenSize.height/4+"px"};

	`
	const ArticleRootDesign = css`
		display: flex;
		flex : 1 300px;
		flex-flow : row wrap;
		margin : auto;
		
		justify-content: center;
		align-items: center;
		
		text-align: center;

		color: gray;
		font-family: "Noto Sans JP","Helvetica";
	`
	const ArticleContainer = css`
		align-items:center;

		// *** Sorting Priority (higher is front)
		z-index: 2;
	`	
	// SymbolSoundOn / Off StyleSheet
	// ------------------------------
	const StyleSymbolSoundOn = css`
		height:50%;
		width:50%;
		opacity:100%;
		border-radius:10px;
		@keyframes flash {
			0% {transform: rotate(0deg)}
			20% {transform: rotate(180deg); background: rgba(125,210,240,1.0);border-radius:10px;}
			40% {transform: rotate(360deg); background: rgb(125,210,240,1.0);border-radius:7px;}
			80% {transform: rotate(540deg); background: rgb(125,210,240,1.0);border-radius:10px; }
			100% {transform: rotate(540deg); background: rgb(125,210,240,0.0);border-radius:10px; }
		}
		animation-name:flash;
		animation-duration 5s;
		animation-iteration-count:infinite;
		animation-timing-function:ease-in-out;
	`

	const StyleSymbolSoundOff = css`
		height:50%;
		width:50%;
		opacity:100%;
		@keyframes rotation {
			0% {transform: rotate(0deg)}
			50% {transform: rotate(360deg); opacity: 40%;}
			100% {transform: rotate(720deg); opacity: 100%;}
		}
		animation-name:rotation;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-timing-function:ease-in-out;
	`
	
	const backdropFilter1 = css`
		backdrop-filter: blur(10px);
	`

	const ButtonFillAnimation = css`
		content: "";
		display: block;
		position: absolute;
		height: 100%;
		width: 120%;
		top: 0;
		left: -5%;
		background: #00bfff;
		transform: translateX(-100%) skew(-10deg);
		transition: -webkit-transform 0.3s ease-out;
		transition: transform 0.3s ease-out;
		
		&:hover {
			transform: translateX(0) skew(-10deg);
		}
  }
	`

	const onclicked = async () => { 
		console.log("clicked") 	
 	}


	// Modal
	// ------------------------------

 	const closest =(el, selector) => {
		const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
		while (el) {
			if (matchesSelector.call(el, selector)) {
			return el;
			}
			el = el.parentElement;
		}
		return null;
	}

	//modal state
	const [ stateModalAudioAgreement,setStateModalAudioAgreement ] = useState(
		{
			modal1: false,
			modal2: false,
		}
	)

	const showModal = key => (e) => {
		e.preventDefault(); // Fix click penetration on Android
		setStateModalAudioAgreement({ [key]: true });
	}

	const onClose = key => () => {
		setStateModalAudioAgreement({ [key]: false });
	}

	const onWrapTouchStart = (e) => {
		// fix touch to scroll  backgrounded page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) { return; }

		// fix modal problem in each platform *CAUTION : need to target selector at 2nd argument
		const pNode = closest(e.target, '.am-modal-content');

		if (!pNode) { e.preventDefault(); }
	}

	// Flip Card

	const cardCSS = css`
		div {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.c {
			position: absolute;
			max-width: 500px;
			max-height: 500px;
			width: 50px;
			height: 50px;
			cursor: pointer;
			will-change: transform, opacity;
		}
		
		.front,
		.back {
			background-size: cover;
		}
		
		.back {
			background-image: url(https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop);
		}
		
		.front {
			background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
		}
	`


	const FlipCard = () => {
		const [flipped, set] = useState(false)
		const { transform, opacity } = useSpring({
			opacity: flipped ? 1 : 0,
			transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
			config: { mass: 5, tension: 500, friction: 80 }
		})
		return (
			<div onClick={() => set(state => !state)}>
				<a.div style={{ opacity: opacity.interpolate(o => 1 - o), transform }} />
				<a.div style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
			</div>
		)
	}

	// Parallax
	// ------------------------------

	// Little helpers
	const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
	const Pink = ({ children }) => <span style={{ color: '#FF6AC1' }}>{children}</span>
	const Yellow = ({ children }) => <span style={{ color: '#EFF59B' }}>{children}</span>
	const Lightblue = ({ children }) => <span style={{ color: '#9AEDFE' }}>{children}</span>
	const Green = ({ children }) => <span style={{ color: '#57EE89' }}>{children}</span>
	const Blue = ({ children }) => <span style={{ color: '#57C7FF' }}>{children}</span>
	const Gray = ({ children }) => <span style={{ color: '#909090' }}>{children}</span>
	
	let parallax=null

	let arOptionProps = {
		// "camera-controls" : false [TIPS] if you write "camera-controls", then it is activsted whether the value is false or not ( so be careful, nothing to write for disable )
	}
	if (isOverWidth) { 
		arOptionProps = {
			"camera-controls" : true
		} 
	}

	  

	// Component
	// ------------------------------
	return (

		<div className={RootDesign}>
		<AddHomeButton/>

			<div className={backgroundParallax}>
				
				{/* *** Background 3D   */}
				<div className={backgroundModelBoard}>
						<model-viewer
						src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb"
		  				ios-src={Musdz}
		  				alt="年賀状" 
						auto-rotate 
						disable-zoom
						camera-orbit="45deg 55deg 2.5m"
						shadow-intensity="1" 
						ar 
						{...arOptionProps}
						ar-modes="webxr scene-viewer quick-look"
						ar-scale="auto"
						>
						{(isMobileOrTablet) &&
							<button slot="ar-button" 
								id="ar-button-1"
								style={{
									fontFamily:"Helvetica",
									background:"white", 
									borderRadius: "12px", 
									border: "none", 
									position: "absolute", 
									fontSize:"20px",
									top: 16+"px", 
									right: "16px",
									padding: "8px",
									textAlign: "center",
									zIndex: "10",
									pointerEvents: 'none',
								}}>🎍
							</button>
						}
					</model-viewer >
				</div>


			</div>

			{ isOverWidth ||
			<NoticeBar 	mode="closable" 
						marqueeProps= {{ loop: true, leading: 1000, trailing: 18000, style: { padding: '0 7.5px', fontFamily:"Helvetica" }} }
						style={{marginTop: 16+3+"px", marginLeft:15+5+"px", marginRight:40+15+"px"}}>この年賀状アプリには、「ある謎」が隠されています。探索をし、様々なモノに触れてみましょう。この謎を解くには、「音」を聞く必要があります。</NoticeBar>
			}

			<button
				id="BGMSwitcher"
				style={{
					background: "transparent",
					border: "0px",
					width: 40+"px",
					height: 40+"px",
					position: "absolute", 
					top: 16+2+"px", 
					left: 16+"px",
					padding: "0px",
					textAlign: "center",
					zIndex: "10",
				}}
				onClick={toggleBGM}>
				{ (isBGMPlaying) ?
					<SymbolSoundOn className={StyleSymbolSoundOn}/> : 
					<SymbolSoundOff className={StyleSymbolSoundOff}/>
				}
			</button>

			{ document.querySelector('button#ar-button-1') &&
			<button
				onClick={()=>{ document.querySelector('button#ar-button-1').click(); playSFXclick8(); console.log(document.querySelector('button#ar-button-1')+"ar button 1 clicked");  }}
				style={{
					fontFamily:"Helvetica",
					background:"white", 
					borderRadius: "12px", 
					border: "none", 
					position: "absolute", 
					fontSize:"20px",
					top: "16px", 
					right: "16px",
					padding: "8px",
					textAlign: "center",
					zIndex: "10"+"10",
				}}>🎍
			</button>
			}
			
			{ isOverWidth ? 
			
			<Card style={{margin:"auto", padding:"20px", top:`${screenSize.height/(1.0+1.0-0.7)}px`, blur:"20px", background:"rgba(255,255,255,0.3)" ,display:"flex", justifyContent:"center", fontFamily:"Helvetica", textAlign:"center"}} className={backdropFilter1}><strong>🍊 ゆうびん 🎍🏠🎍 お知らせ 🍊</strong><WhiteSpace sm/>スマホの専用機能を使っているため、ゲームモードを起動できません。<WhiteSpace lg/>スマホからお楽しみくだされ　<WhiteSpace lg/><strong> ( ただしアヒルとはふれあえます )</strong></Card>

			:

			<Parallax ref={ref => (parallax = ref)} pages={10} style={{zIndex:"5"}}>


				<ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#fdb230' }} />
				<ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
				<ParallaxLayer offset={3} speed={0} style={{ backgroundColor: '#2897e6' }} />
				<ParallaxLayer offset={4} speed={0} style={{ backgroundColor: '#87BCDE' }} />

				<ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover' }} />

				<ParallaxLayer offset={0.3} speed={0} style={{zIndex:"100"}}>
					{/* *** Articles   */}
					<div className={ArticleRootDesign}>
					
						<div 
							className={FirstViewWhiteSpace} 
							onClick={ async (e)=>{
								if(HPDuck>0){ await setHPDuck(HPDuck-5);} 
								if(parseFloat(HPDuck-5)%20.0===0.0){ showModal("modal1")(e)}; 
								playSFXduck7(); 
								await console.log("HPD:"+HPDuck);
 							}}>
						</div>
						<div className={ArticleContainer}>
							<h1 style={{ color:"#0f1923" }}>HAPPY NEW YEAR 2021</h1>
							<WhiteSpace lg/>
							<WhiteSpace lg/>
							<WhiteSpace lg/>
							
							<Button
								onClick={ ()=>{window.document.querySelector("#BGMSwitcher").click(); return;} } 
								style={{zIndex:"100", borderRadius:"30px", border:"1px solid #ffffff", boxSizing:"border-box", background:"rgba(255,255,255,0.3)", display:"flex", justifyContent:"center", alignItems:"center"}}>|  || ||||| ||| ||| ||| ||||     ||
							</Button>
							<WhiteSpace lg/>
							<WingBlank>
							<WhiteSpace />
								<Modal
									visible={stateModalAudioAgreement.modal1}
									transparent
									maskClosable={false}
									onClose={onClose('modal1')}
									title="アヒル : HP"
									footer={[{ text: '×', onPress: () => { console.log('modal closed'); onClose('modal1')(); } }]}
									wrapProps={{ onTouchStart: onWrapTouchStart }}
									afterClose={() => { mesDuckBattle[(5-parseInt(HPDuck/20))].snd(); alert( mesDuckBattle[(5-parseInt(HPDuck/20))].mes ); }}
								>
									<div style={{ height: "100px", overflow: 'scroll' }}>
										<br />
										<Progress percent={HPDuck} position="normal" unfilled={true} barStyle={{borderRadius:"5px"}} style={{}} appearTransition/>
										{HPDuck}/100
									</div>
								</Modal>

							<Button onClick={ showModal("modal2")} style={{zIndex:"100", borderRadius:"30px"}}>MODAL</Button>
							<Modal
									visible={stateModalAudioAgreement.modal2}
									transparent
									maskClosable={false}
									onClose={onClose('modal2')}
									title="LOG FILE"
									footer={[{ text: '×', onPress: () => { console.log('modal 2 closed'); onClose('modal2')(); } }]}
									wrapProps={{ onTouchStart: onWrapTouchStart }}
									afterClose={() => {}}
								>
									<div style={{ height: "100px", overflow: 'scroll' }}>
										MODAL 2<br />
									</div>
								</Modal>

							</WingBlank>
						
						</div>

					</div>
				</ParallaxLayer>


				<ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
					<img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
					<Card style={{margin:"auto", bottom:"-10px", maxWidth:"280px", maxHeight:"30px",display:"flex" , justifyContent:"center", textAlign:"center", fontFamily:"Noto Sans JP", padding:"10px 10px"}}>秀知院学園周知の事実</Card>
					<img src={OldTown} />

				</ParallaxLayer>

				<ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
					<img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
					<img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
					<img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
					<img src={url('earth')} style={{ width: '60%' }} />
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0.3}
					style={{
						backgroundSize: '80%',
						backgroundPosition: 'center',
						backgroundImage: url('clients', true)
					}}
				/>

				<ParallaxLayer
					offset={0}
					speed={0.1}
					/*onClick={() => parallax.scrollTo(1)}*/
					onClick={()=> playSFXget2() }
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					{/*<img src={url('server')} style={{ width: '20%' }} />*/}
				</ParallaxLayer>

				<ParallaxLayer
					offset={1}
					speed={0.1}
					/*onClick={() => parallax.scrollTo(2)}*/
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img src={url('bash')} style={{ width: '40%' }} />
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0}
					/*onClick={() => parallax.scrollTo(0)}*/
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img src={url('clients-main')} style={{ width: '40%' }} />
				</ParallaxLayer>


				

				<ParallaxLayer
					offset={4.5}
					speed={0.3}
					/*onClick={() => parallax.scrollTo(0)}*/
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<div style={{opacity:"30%", backdropFilter: "invert(40px) blur(1000px)"}}>
						{/*<RotateGradient width={1500} height={1800}/>*/}
					</div>
				</ParallaxLayer>		

				<ParallaxLayer offset={3} speed={-0.3} style={{ pointerEvents: 'none' }}>
					<Card style={{margin:"auto", bottom:"10px", maxWidth:"100px", display:"flex" , justifyContent:"center", textAlign:"center", fontFamily:"Noto Sans JP", padding:"10px 10px"}}>秀知院学園周知の事実</Card>
					<img src={KanagawaTown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>
				</ParallaxLayer>			
			</Parallax>

		}



		</div>

		
		
	)
}

export default App
