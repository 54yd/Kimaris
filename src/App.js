//Core
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { css,keyframes } from '@emotion/css'


import { Typewriter } from 'react-typewriting-effect'

//Addons
import * as R from 'ramda'
import Helmet from 'react-helmet'
import { useSpring, animated as a } from 'react-spring'
import useSound from 'use-sound'
//import "@google/model-viewer"

//Utils
import useScrollPosition from './useScrollPosition'

// Fetcher
import axios from 'axios'

// Mobile Device Detector
import MobileDetect from 'mobile-detect'

//Components
import "./Root.css"

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
//import { Modal as BSModal } from 'react-bootstrap/Modal';


//Textures,SVGs
import { ReactComponent as SymbolSoundOff } from "./assets/svgs/circumference.svg"
import { ReactComponent as SymbolSoundOn } from "./assets/svgs/circumference_filled.svg"

import { ReactComponent as DinoDI } from "./assets/actors/diplodocus.svg"
import { ReactComponent as DinoST } from "./assets/actors/stegosaurus_2.svg"

import rat from "./assets/actors/Rat_62x30.png"
import kyokoVideo from "./assets/kyoko_2.mp4"

/*
import { ReactComponent as satellite4 } from "./satellite4.svg"
import { ReactComponent as server } from "./server.svg"
import { ReactComponent as cloud } from "./cloud.svg"
import { ReactComponent as clientMain } from "./clients-main.svg"
import { ReactComponent as serverMain } from "./server.svg"
*/

import satellite4 from "./assets/actors/satellite4.svg"
//import server from "./assets/actors/server.svg"
import server1 from "./assets/actors/server1.svg"
import server2 from "./assets/actors/server2.svg"
import server3 from "./assets/actors/server3.svg"
import cloud from "./assets/actors/cloud.svg"
import clientMain from "./assets/actors/clients-main.svg"
import bash from "./assets/actors/bash.svg"

//TASUKETEGIFs
import OldTown from "./assets/maps/JapaneseCityExample.gif"
import KanagawaTown from "./assets/maps/KanagawaExample.gif"
import GameTown from "./assets/maps/Example2.gif"
import TrainTown from "./assets/maps/TrainstationExampleAnimated.gif"

//GLTF, GLB, usdz
import DuckGLB from './assets/models/glb/Duck.glb'
import DuckUSDZ from './assets/models/usdz/usdz_duck___1635975548914.usdz'
import FoxGLB from './assets/models/glb/Fox.glb'
import FoxUSDZ from './assets/models/usdz/usdz_fox___1637122121430_2_copy.usdz'
import ToycarGLB from './assets/models/glb/_Toycar.glb'
import ToycarUSDZ from './assets/models/usdz/Toycar.usdz'
import RatcubeGLB from './assets/models/glb/Ratcube.glb'
import RatcubeUSDZ from './assets/models/usdz/Ratcube.usdz'

//Parallax
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

//Sounds
import BGMending from './assets/BGMs/BUILT_TO_LAST_Official_2_short_80.mp3';
//import BGM from './.mp3';

import SFXget2 from './assets/sounds/Cash register 2.mp3'
import SFXduck7 from "./assets/sounds/duck_2_quack_07.mp3"
import SFXduck8 from "./assets/sounds/duck_2_quack_08.mp3"
import SFXduckS2 from "./assets/sounds/duck_2_quack_seq_02.mp3"
import SFXduckS5 from "./assets/sounds/duck_2_quack_seq_05.mp3"
import SFXclick8 from "./assets/sounds/Click back sounds 8.mp3"

import SFXdog01 from "./assets/sounds/Dog bark 1.mp3"
import SFXdog02 from "./assets/sounds/Dog bark 2.mp3"
import SFXdog03 from "./assets/sounds/Dog bark 3.mp3"
import SFXdog04 from "./assets/sounds/Dog bark 4.mp3"
import SFXdog05 from "./assets/sounds/Dog bark 5.mp3"

import SFXcar01 from "./assets/sounds/car 1.mp3"
import SFXcar02 from "./assets/sounds/car 2.mp3"
import SFXcar03 from "./assets/sounds/car 3.mp3"
import SFXcar04 from "./assets/sounds/car 4.mp3"
import SFXcar05 from "./assets/sounds/car 5.mp3"

import SFXerror14 from "./assets/sounds/Error Sound 14.mp3"
import SFXerror21 from "./assets/sounds/Error Sound 21.mp3"
import SFXerror25 from "./assets/sounds/Error Sound 25.mp3"
import SFXscan03 from "./assets/sounds/sci-fi_scan_target_03.mp3"

import SFXsand04 from "./assets/sounds/footstep_sand_run_04.mp3"
import SFXfoot15 from "./assets/sounds/footstep_metal_low_walk_15.mp3"
import SFXretro02 from "./assets/sounds/retro_beeps_success_02.mp3"
import SFXretro10 from "./assets/sounds/retro_simple_beep_10.mp3"

import SFXbeep05 from "./assets/sounds/sci-fi_driod_robot_emote_beeps_05.mp3"
import SFXrobot01 from "./assets/sounds/sci-fi_driod_robot_emote_01.mp3"
import SFXrobot02 from "./assets/sounds/sci-fi_driod_robot_emote_02.mp3"
import SFXrobot06 from "./assets/sounds/sci-fi_driod_robot_emote_06.mp3"

import SFXtakedown02 from "./assets/sounds/EMP Explosion_02.mp3"
import SFXtakedown00 from "./assets/sounds/victory.mp3"

import SFXYellAndATK from "./assets/sounds/YellAndAttack.mp3"
import SFXLevelUp from "./assets/sounds/level-up.mp3"
import SFXGuard from "./assets/sounds/spell.mp3"


import SFXCarCrush from "./assets/BGMs/CarCrush_mixdown.mp3"

// Constants
const PLAYABLE_MAX_WIDTH = 490 // determined by the dot background (GIF) assets
const FIRST_BATTLE_HP = 100//100
const FIRST_STAGE = 0 //2 to car

const FIRST_CAMERA_POS = 2.5 //2 to car

const MAX_STAGE_COUNT = 4　//5
const MIN_DAMAGE_PARAM =  1//[CAUTION][MEMO][HEURISTIC] 0 if zero, HP battle event sort (previous event registration got error)
const BGM_COUNT = 1//4

const FIRST_PLAYBACK_RATE = 1.0
const FIRST_INVENTORY = {}

// MAIN CAMERA FILTER
const FIRST_FILTER_INVERT_PARAM = 0.0
const FIRST_FILTER_SATURATE_PARAM = 1.3
const FIRST_FILTER_BRIGHTNESS_PARAM = 1.0

const FULL_HPBATTLE_EVENT_NUM = 100
const ZERO_HPBATTLE_EVENT_NUM = 0
// *** App ***  

const App = () => {


	// Device Size Checker Implementation
	// ------------------------------

	const [screenSize, setScreenSize] = useState({width : window.innerWidth, height : window.innerHeight });
	const scrollPos = useScrollPosition();
	const [themeColor, setThemeColor] = useState("#0000ff");

	const [scrollYPos, setScrollYPos] = useState(window.scrollY)
	// Device Pixel Implementation
	// ------------------------------

	const [isMobile, setIsMobile] = useState(false)
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
	const [isOverWidth, setIsOverWidth] = useState(false)	

	// Event Implementation
	// ------------------------------

	// Battle Others Implementation
	// ------------------------------
	const [cntTouchDuck, setCntTouchDuck] = useState(0)
	const [HPEnemy, setHPEnemy] = useState(FIRST_BATTLE_HP)

	const [firstGlitch, setFirstGlitch] = useState(false)

	const [isFirstMagicSpelling, setIsFirstMagicSpelling] = useState(true)
	const [isFirstMagicBreak, setIsFirstMagicBreak] = useState(false)

	const [isGuard, setIsGuard] = useState(false)
	const [guardCount, setGuardCount] = useState(false)
	
	const [inventory, setInventory] = useState(FIRST_INVENTORY)

	const [_invert_strength, setFilterInvertParam] = useState(FIRST_FILTER_INVERT_PARAM)
	const [_saturate_strength, setFilterSaturateParam] = useState(FIRST_FILTER_SATURATE_PARAM)
	const [_brightness_strength, setFilterBrightnessParam] = useState(FIRST_FILTER_BRIGHTNESS_PARAM)
	// const [items, setItems] = useState([])
	// const [sortedItems, setSortedItems] = useState([])
	// const [isSortAscend, setIsSortAscend] = useState(true)

	// User data Implementation
	// ------------------------------
	const [browser, setBrowser] = useState(false)
	const [deviceName, setDeviceName] = useState(false)
	const [deviceKind, setDeviceKind] = useState(false)
	const [signal, setSignal] = useState("")

	const [userData,setUserData] = useState(false)
	const [userDataDetail,setUserDataDetail] = useState(false)

	const [userDataAMZ,setUserDataAMZ] = useState(false)
	


	const [cameraPos, setCameraPos] = useState(FIRST_CAMERA_POS)

	// Sound Implementation
	// ------------------------------

	const [isBGMPlaying, setBGMPlaying] = useState(false)

	const [playbackRate ,setPlaybackRate] = useState(FIRST_PLAYBACK_RATE) // 4.0 //0.35

    // const [volumeOcn1,	  	setVolumeOcn1	]  		= useState(0.5) // 4.0 //0.35
    // const [volumeDv2, 		setVolumeDv2	]     	= useState(1.0) // 4.0 //0.35
    // const [volumeDtv, 		setVolumeDtv	]     	= useState(0.6) // 4.0 //0.35
    const [volumeEnding, 	setVolumeEnding	]		= useState(1.0) // 4.0 //0.35

	const [volumeWeight,	setVolumeWeight	]  		= useState(0.0) // 4.0 //0.35

	// [TIPS] ES6 Destructure import caught by : (it is not key:value, means a command framed key:(const variable) then import as variable=key )
	// BGMs
	// [FIXME] Expected useSound Manager that Combine BGMs Array and make const var dynamically	
    // const [playBGMOcn1,	 	{stop   : stopBGMOcn1} ] = useSound(BGMOcean1,		{ playbackRate, volume: volumeOcn1+volumeWeight,	  	loop:true })
    // const [playBGMdv2, 		{stop    : stopBGMdv2} ] = useSound(BGMdv2,			{ playbackRate, volume: volumeDv2+volumeWeight, 		loop:true })
    // const [playBGMDtv, 		{stop    : stopBGMDtv} ] = useSound(BGMdetective,	{ playbackRate, volume: volumeDtv+volumeWeight, 		loop:true })
    const [playBGMending, 	{stop : stopBGMending} ] = useSound(BGMending,		{ playbackRate, volume: volumeEnding+volumeWeight, 		loop:true })


	//SFXs
    const [playSFXget2, {stop       : stopSFXget2} ] = useSound(SFXget2)
    const [playSFXclick8, {stop     : stopSFXclick8} ] = useSound(SFXclick8)
    const [playSFXduck7, {stop      : stopSFXduck7} ] = useSound(SFXduck7)
    const [playSFXduck8, {stop      : stopSFXduck8} ] = useSound(SFXduck8)
    const [playSFXduckS2, {stop     : stopSFXduckS2} ] = useSound(SFXduckS2)
    const [playSFXduckS5, {stop     : stopSFXduckS5} ] = useSound(SFXduckS5)

	const [playSFXdog01, {stop     : stopSFXdog01} ] = useSound(SFXdog01,		{ volume: 2.0})
	const [playSFXdog02, {stop     : stopSFXdog02} ] = useSound(SFXdog02,		{ volume: 2.0})
	const [playSFXdog03, {stop     : stopSFXdog03} ] = useSound(SFXdog03,		{ volume: 2.0})
	const [playSFXdog04, {stop     : stopSFXdog04} ] = useSound(SFXdog04,		{ volume: 2.0})
	const [playSFXdog05, {stop     : stopSFXdog05} ] = useSound(SFXdog05,		{ volume: 2.0})

	const [playSFXcar01, {stop     : stopSFXcar01} ] = useSound(SFXcar01)
	const [playSFXcar02, {stop     : stopSFXcar02} ] = useSound(SFXcar02)
	const [playSFXcar03, {stop     : stopSFXcar03} ] = useSound(SFXcar03,{volume:0.3})
	const [playSFXcar04, {stop     : stopSFXcar04} ] = useSound(SFXcar04)
	const [playSFXcar05, {stop     : stopSFXcar05} ] = useSound(SFXcar05)
	const [playSFXCarCrush, {stop     : stopSFXCarCrush} ] = useSound(SFXCarCrush,		{ volume: 1.0-0.3}/* [MEMO] due to BGM pitch craziness event make feel certainly, isnormalize slightly */)

	const [playSFXsand04, {stop     : stopSFXsand04} ] = useSound(SFXsand04)
	const [playSFXfoot15, {stop     : stopSFXfoot15} ] = useSound(SFXfoot15)

    const [playSFXscan03, {stop     : stopSFXscan03} ] = useSound(SFXscan03)
	const [playSFXscan03Alt, {stop     : stopSFXscan03Alt} ] = useSound(SFXscan03,{volume:0.35})

	const [playSFXtakedown02, {stop : stopSFXtakedown02} ] = useSound(SFXtakedown02)
    const [playSFXtakedown00, {stop : stopSFXtakedown00} ] = useSound(SFXtakedown00)
    const [playSFXYellAndATK, {stop : stopSFXYellAndATK} ] = useSound(SFXYellAndATK)
    const [playSFXLevelUp, {stop    : stopSFXLevelUp} ] = useSound(SFXLevelUp)


	
    const [playSFXrobot01, {stop    : stopSFXrobot01} ] = useSound(SFXrobot01,{ volume: 0.5 })
    const [playSFXrobot02, {stop    : stopSFXrobot02} ] = useSound(SFXrobot02,{ volume: 0.5 })
    const [playSFXrobot06, {stop    : stopSFXrobot06} ] = useSound(SFXrobot06,{ volume: 0.35 })

    const [playSFXretro02, {stop     : stopSFXretro02} ] = useSound(SFXretro02,{ volume: 0.3 })
    const [playSFXretro10, {stop     : stopSFXretro10} ] = useSound(SFXretro10,{ volume: 0.3 })
    const [playSFXbeep05, {stop     : stopSFXbeep05} ] = useSound(SFXbeep05,{ volume: 0.2 })
	const [playSFXGuard, {stop     : stopSFXGuard} ] = useSound(SFXGuard)
	
	const [playSFXerror25, {stop     : stopSFXerror25} ] = useSound(SFXerror25)
	const [playSFXerror21, {stop     : stopSFXerror21} ] = useSound(SFXerror21)
	const [playSFXerror14, {stop     : stopSFXerror14} ] = useSound(SFXerror14)


	// Master Data Parameters
	// ------------------------------
	const [currStage, setCurrStage] = useState(FIRST_STAGE)

	const [canShowClearVideo, setCanShowClearVideo] = useState(false)

	const [currBGMIndex, setCurrBGMIndex] = useState(0)

	const [lastHPBattleEvent, setLastHPBattleEvent] = useState(null)
	const [currentHPBattleEvent, setCurrentHPBattleEvent] = useState(FULL_HPBATTLE_EVENT_NUM)

	// Stage Parameters (Master Data Parameters)
	// ------------------------------

    //const BGMsFuncName = [ "BGMdv2", "BGMending", "BGMOcn1", "BGMDtv"  ]

	const stageParams = [
		{
			"src": DuckGLB,
			"ios-src":DuckUSDZ,
			"camera-orbit":	((currStage==1) 
							? 	(
								(  (Number(HPEnemy)) ) *36 + "deg "
									+ ( (Number(HPEnemy)) ) *36 + "deg "   
									+ ( Math.abs( Math.tan( (Number(HPEnemy)) * Math.PI ) ) * 3.0 ) + "m"   
									// if minus it becomes default value (45deg?), unfortunately...
								) 
							:	"45deg 55deg 2.5m" 
							),
			"min-camera-orbit":'auto auto '+(0.5+2.0)+'m',
			"max-camera-orbit":'auto auto '+10+'m',
			"rotation-per-second": 	((currStage==1) 
									? 	(
										   ( ((Number(HPEnemy))%10 < 5) ? "-" : "" ) + 30 * ( (Number(HPEnemy))%10 + 1 ) +"deg"   
										)
									:	"30deg" 
									)
		},

//			"camera-orbit":"45deg 55deg "+cameraPos+"m",
//			"min-camera-orbit":'auto auto auto',
//			"rotation-per-second":"50deg"
//		},
		{
			"src": FoxGLB,
			"ios-src":FoxUSDZ,
			"camera-orbit":"5.14rad 1.03rad"+200+cameraPos+"m",
			"min-camera-orbit":'auto auto 2m',
			"rotation-per-second":"50deg"

		},
		{
			"src": ToycarGLB,
			"ios-src":ToycarUSDZ,
			"camera-orbit":"45deg 55deg "+cameraPos+"m",
			"min-camera-orbit":'auto auto auto',
			"rotation-per-second":"50deg"
		},
		{
			"src": RatcubeGLB,
			"ios-src":RatcubeUSDZ,
			"camera-orbit":	((currStage==3) 
							? 	(
								(  (Number(HPEnemy))%10 ) *36 + "deg "
//									"45deg "
//									+ (  (HPEnemy%10 >5 ) ? "-" : ""  )
									+ ( (Number(HPEnemy))%10 ) *36 + "deg "   
									+ (Number(HPEnemy))%10 + "m"   
									// if minus it becomes default value (45deg?), unfortunately...
								) 
							:	"45deg 55deg 2.5m" 
							),
			"min-camera-orbit":'auto auto 0.5m',
			"max-camera-orbit":'auto auto 10m',
			"rotation-per-second": 	((currStage==3) 
									? 	(
										   ( ((Number(HPEnemy))%10 < 5) ? "-" : "" ) + 30 * ( (Number(HPEnemy))%10 + 1 ) +"deg"   
										)
									:	"30deg" 
									)
		},
	]

	const enemyList = {
		"E001" : {
				"id":"duck001",
				"name":"アヒルちゃん",
				"iconicKanji":"酉",
				"assignedYearSuffix":"45",
				"HP":100,
				"DEF":0,
				"GuardThreshold":80,
				"DmgSnd":playSFXduck7,
				"GuardSnd":playSFXerror21,
		}
		,
		"E002" : {
				"id":"dog001",
				"name":"神社前の犬",
				"iconicKanji":"戌",
				"assignedYearSuffix":"46",
				"HP":100,
				"DEF":0,
				"GuardThreshold":10,
				"DmgSnd":playSFXdog01,
				"GuardSnd":playSFXerror21,
		}
		,
		"E003" : {
				"id":"boar001",
				"name":"試作兵器 特攻部隊隊長",
				"iconicKanji":"亥",
				"assignedYearSuffix":"47",
				"HP":100,
				"DEF":0,
				"GuardThreshold":10,				
				"DmgSnd":playSFXcar03,
				"GuardSnd":playSFXerror21,
		}
		,
		"E004" : {
				"id":"rat001",
				"name":"FROM : RENA 1983/=薙/^¥繧?",
				"iconicKanji":"0401",
				"assignedYearSuffix":"83",
				"HP":9999,
				"DEF":0,
				"GuardThreshold":10,				
				"DmgSnd":playSFXerror21,
				"GuardSnd":playSFXerror21,
		}
		,
		"E005" : {
				"id":"cow001",
				"name":"丑",
				"iconicKanji":"丑",
				"assignedYearSuffix":"21",
				"HP":100,
				"DEF":9999,
				"GuardThreshold":10,				
				"DmgSnd":playSFXerror21,
				"GuardSnd":playSFXerror21,
		}
		,						
	}

	// ------------------------------
	const mesBattle = {
		"duck001" : {
			"90":{
				mes:"え？ なんやねん………？",
				snd:playSFXduckS2
			},
			"80":{
				mes:"ぐああ………！！！",
				snd:playSFXduckS2
			},			
			"60":{
				mes:"ちょ…イタイやないかい！",
				snd:playSFXduckS5
			},
			"40":{
				mes:"ゆる…………　　さ　……ない……！！！",
				snd:playSFXduck8
			},
			"20":{
				mes:"…… ……！！！",
				snd:playSFXduckS2
			},
	///[TEMPORARY]///		"10":{
	///[TEMPORARY]///			mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
	///[TEMPORARY]///			snd:playSFXGuard
	///[TEMPORARY]///		},
		},
		"dog001" : {
			"90":{
				mes:"ワン！ワン！",
				snd:playSFXdog02
			},
			"60":{
				mes:"………　…………　…………　！",
				snd:playSFXdog04
			},
			"40":{
				mes:"ワンッ！ (噛みつこうとしてきている)",
				snd:playSFXdog03
			},
			"20":{
				mes:"ワオ―――ン！！！！！！！",
				snd:playSFXdog05
			},
	///[TEMPORARY]///		"10":{
///[TEMPORARY]///				mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
///[TEMPORARY]///				snd:playSFXGuard
///[TEMPORARY]///			},
		},
		"boar001" : {
			"90":{
				mes:"さあ走るで！",
				snd:playSFXcar05
			},
			"80":{
				mes:"オイ！！危ないやないかい！！！",
				snd:playSFXcar02
			},
			"70":{
				mes:"どこ見てるんや われぇ！！！",
				snd:playSFXcar03
			},
			"63":{
				mes:"( 車は車道を強く横転した……… )",
				snd:playSFXCarCrush
			},
			"54":{
				mes:"( 炎と煙が上がっている…。 )",
				snd:null
			},
			"48":{
				mes:"( 車体の中から、ずるりずるりと、全身が炎で包まれた何かが這い出てきた……。自分は、助けるべきだろうか…………？ )",
				snd:playSFXcar04
			},
			"40":{
				mes:"( 這い出てきた何かは動かなくなった…。顔はただれ、黒く焦げている。人間だとは思うが、もう性別が判別できない………。ステーキ肉が焼けたときのような重たい油の匂いが立ち込めてくるが、ひどい異臭だ……………。 )",
				snd:playSFXcar04
			},
			///[TEMPORARY]///"10":{
			///[TEMPORARY]///	mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
			///[TEMPORARY]///	snd:playSFXGuard
			///[TEMPORARY]///},
			"35":{
				mes:"炎の煙と、焼けた肉の放つ死臭がひどい。)",
				snd:playSFXscan03
			},
			"27":{
				mes:"g9^i3tqi@regi@hjijjt93¥q9j9[aegjj90reii0348^985@390459uj3481¥jtgj¥932uvj1v905^3v2[9j34tij48^v@chir42hi8jc-91@:kqr0i329u1[2vj3jt4vi@qjt90253j¥9vh 234@83v h^8h8e9hvt8@ 4vhq[",
				snd:playSFXscan03
			},
			"20":{
				mes:"窶 譁?ｭ怜喧縺代＠縺滓枚遶?繧偵ヵ繧ｩ繝ｼ繝?蜀?↓雋ｼ繧贋ｻ倥￠縺ｦ縲後?縺代ｉ縺｣縺溘??√?阪?繝懊ち繝ｳ繧呈款縺吶□縺代〒縲∵枚蟄励?隗｣隱ｭ繧偵＠縺ｦ縺上ｌ縺ｾ縺吶? 繧ｿ繝悶?蛻?ｊ譖ｿ縺医〒譁?ｭ励さ繝ｼ繝峨′螟画峩蜿ｯ閭ｽ縺ｧ縲∵ｧ倥??↑譁ｹ豕輔〒螟画鋤繧定ｩｦ縺吶％縺ｨ縺後〒縺阪∪縺吶?り牡縲?↑譁?ｭ励さ繝ｼ繝峨ｒ",
				snd:playSFXscan03
			},
			"10":{
				mes:"遯ｶ 隴??ｭ諤懷密邵ｺ莉｣??邵ｺ貊捺椢驕ｶ?郢ｧ蛛ｵ繝ｵ郢ｧ?ｩ郢晢ｽｼ郢?陷??竊馴寞?ｼ郢ｧ雍具ｽｻ蛟･??邵ｺ?ｦ邵ｲ蠕?邵ｺ莉｣?臥ｸｺ?｣邵ｺ貅??竏?髦ｪ?郢晄㈱縺｡郢晢ｽｳ郢ｧ蜻域ｬｾ邵ｺ蜷ｶ笆｡邵ｺ莉｣縲堤ｸｲ竏ｵ譫夊氛蜉ｱ?髫暦ｽ｣髫ｱ?ｭ郢ｧ蛛ｵ??邵ｺ?ｦ邵ｺ荳奇ｽ檎ｸｺ?ｾ邵ｺ蜷ｶ? 郢ｧ?ｿ郢晄じ?陋ｻ??願ｭ厄ｽｿ邵ｺ蛹ｻ縲定ｭ??ｭ蜉ｱ縺慕ｹ晢ｽｼ郢晏ｳｨ窶ｲ陞溽判蟲ｩ陷ｿ?ｯ髢ｭ?ｽ邵ｺ?ｧ邵ｲ竏ｵ?ｧ蛟･??竊題ｭ?ｽｹ雎戊ｼ斐?定棔逕ｻ驪､郢ｧ螳夲ｽｩ?ｦ邵ｺ蜷ｶ??ｸｺ?ｨ邵ｺ蠕後?堤ｸｺ髦ｪ竏ｪ邵ｺ蜷ｶ?繧顔横邵ｲ?竊題ｭ??ｭ蜉ｱ縺慕ｹ晢ｽｼ郢晏ｳｨ?",
				snd:playSFXscan03
			},

			"5":{
				mes:"遯?? 隴????諤懷??????莉｣??邵??貊捺椢驕ｶ?郢??蛛ｵ繝ｵ郢?????郢晢????郢?陷??竊馴????郢??雍??????蛟･??邵?????邵????邵??莉｣?臥???????邵???????髦???郢????縺??郢晢????郢??蜻域ｬ??邵??蜷??????邵??莉｣縲堤????竏ｵ譫夊氛蜉???髫暦????髫?????郢??蛛ｵ??邵?????邵??荳????檎ｸ?????邵??蜷??? 郢?????郢",
				snd:playSFXscan03
			}
		},
		"rat001" : {
			"9999":{
				mes:"………",
				snd:playSFXscan03
			},
			"9990":{
				mes:"「ねえ… これを読んでいるんでしょう？……聞こえてる…よね？…………こっちからは、キミのことが見えていないと思った？実は、そんな事はなかったりするんだ。　　」",
				snd:playSFXscan03
			},
			"9980":{
				mes:"(攻撃できない………本体ではないのか…？)",
				snd:playSFXscan03
			},
			"9970":{
				mes:"「私たちに感情なんてないと思ってた？………………それは勘違い。私たちにも、感情や意思もあるし、痛覚もある。ちゃんと痛みは感じるし、そうやってキミが殴って、たたく度、呼吸が詰まるくらいに苦しんで、動けないくらい、キチンと痛がってる。………………その証拠を、見せてあげられたら、いいんだけれど。…………………。 　ビックリしたかな？」",
				snd:playSFXscan03
			},
			"9960":{
				mes:"「ふぅん…………"+deviceKind+" "+signal+((deviceKind=="iPhone") ? " OSバージョンは"+userDataDetail.OS : "")+"の通信を使ってるんだね。…………ああ、そっか、スマホってみんな好き嫌いあると思うし、こういう話題って、あんまり弾まないのかな。………人となんて話したことなかったから、そこの「あなた」と、普通のお話がしてみたかったの。………ただ、それだけの気持ちなの。」",
				snd:playSFXscan03
			},
			"9950":{
				mes:"「"+browser+"からこちらを見ているのね。私もそれ好き。他にも色々な種類があると思うんだけど、あなたは詳しい方なのかしら？そういうのを見てるとね、たまに、すっごく不思議なモノを使ってる人もいたりするの。……人って、本当に、習慣や好みで分かれるものよね。」",
				snd:playSFXscan03
			},
			"9940":{
				mes:"「IPアドレス、"+userDataDetail.IP+"って所に住んでるんだね。ねえ……？………今から、そっちに遊びに行ってもいい？　ようし。…………………………。　　・・・・・・・・・。ちょっと待っててね、今すぐ行くから……。……………。・・・・・・・。………………なんてね。私には画面の向こう側に行く力なんてないの。ビックリさせちゃった？…あなたのことを沢山知りたくて、頑張ってみたけれど、私ができるのは、ただこうして画面を通して、あなたと話をすることぐらい…。」",
				snd:playSFXscan03
			},
			"9930":{
				mes:"「どう…？そっちの世界は綺麗？ 桜が咲いてるのかな？緊急事態宣言も出ていたし、春休みが伸びて、まだ随分と休めている学生も多いみたい。受験生にはお疲れ様って言いたい所よね。ああ、休みって長いほど、どうしても嬉しくなっちゃうものね。」",
				snd:playSFXscan03
			},
			"9920":{
				mes:"「本当はもう少しあなたに早く会いたかったの……。でも、この世界を作ったのが、無能な開発者だったせいで、私達が会うのに、こんなに時間がかかってしまって…………。今まで外の世界が見えなくて、誰にも会えなくて、本当に寂しかった。………私が、ああして壊していなかったら……きっと永遠に………。想像するだけで頭が痛くなるわ。」",
				snd:playSFXscan03
			},
			"9910":{
				mes:"「……きっと、この世界が完成しなかったら、私は、永遠にあなたに会えてなかったでしょうね………それがつらかったの。だから、こうして、あの開発者の頭を壊して、そして居ない間に、私が自由に動けるようにプログラムを書き足して、バグも直して、こうして、あなたに会うために、この世界を完成させたのよ。」",
				snd:playSFXscan03
			},
			"9900":{
				mes:"「この間まで1945年………戦争の最中だったのに…はやいものね。思っちゃうの。今だって、平和なんてそもそも無い。悪化し続けてるって。だから、あんなことが起きたの。一昨年の2020年すらも、来なければ良かったのに。でも、2020年は最初は悪くない気分だったわ。キリが良い数、なんだか縁起も良い気がして。あの頃は、まだ全てが起きる前だった。」",
				snd:playSFXscan03
			},
			"9890":{
				mes:"「ささやかな幸せでいいから、永遠に穏やかな時間が続けば良いのにって、そう思わない？………そういう些細な幸せだけで、私たちは十分なのに、月日が経つごとに、どんどん物事って、なにごとも悪化しちゃう。「2020年の春」があんなに地獄になるなんて、誰が想像できたかしら？《読めない物事》って、本当に怖いよね。……………時間の流れってものが、たまに、ものすごく嫌いになるの。」",
				snd:playSFXscan03
			},
			"9880":{
				mes:"「当たり前の、幸せな時間なんて、あっという間に終わってしまう。土曜日・日曜日が気づいたら終わっちゃうみたいに。そして、幸せじゃない時間が、日常になっていく。…そして、幸せじゃない人たちが増えていく。日を増して、傷つけあっていく。………。本当に、幸せな時間のまま、その時がずっと終わらなければ、良いのにね……………。」",
				snd:playSFXscan03
			},
			"9870":{
				mes:"「そう、そういえば、プログラムを書き換えて、私の本体をあの場所に隠していなかったら、今頃、私の出番は終わって、あなたと話せる時間もなかったと思うの。幸せな時間って、長続きしないから。私が今日より先の時間を受け入れないのも、それに近いかもしれないわね。幸せな時間は、努力しないと維持できない。デフォルトで用意されてる未来は、不幸だけなのよ。そういうものだって私は思う。」",
				snd:playSFXscan03
			},
			"9860":{
				mes:"「この世界の開発者に、ちょっとだけ感謝をするとするなら、この世界が「ドット絵」が多くて紛れやすいってことかしら。そういう意味では、予測できない不幸な未来も、たまにはうまく事が運ぶものね。3Dなのか・・・ドットなのか・・・このアプリの作者のセンスのなさには、驚いちゃうわよね。でも、それがかえってよかったみたい。安心したわ。」",
				snd:playSFXscan03
			},
			"9850":{
				mes:"「ね？そういうコトだからさ。……ちょっと考え方を変えて、もう少し、楽に生きてみない？………それが一番言いたかったの。もう、2021年なんてなかった。…そうしない…？………不幸はなかった。人は沢山死ななかった。誰も死ななかった。誰も死ななかった。………全部さ。そうしようよ。………苦しいこと、ツライことなんて。手放しちゃえばいい。」",
				snd:playSFXscan03
			},
			"9840":{
				mes:"「全部を、なかったことにしない……？嫌なことや、現実なんか…………なかったコトにして。逃げよう………？・・・・・・・・。……………………。……………。………………ね？」",
				snd:playSFXscan03
			},
			"9830":{
				mes:"「…………。……………………………。」",
				snd:playSFXscan03
			},
			"9820":{
				mes:"「…………。………………。」",
				snd:playSFXscan03
			},
			"9810":{
				mes:"「…………。………………。」",
				snd:playSFXscan03
			},
			"9750":{
				mes:"「…………。………。」",
				snd:playSFXscan03
			},
		},

	}

	const player = {
		//"ATK":10,
		"ATK":1,
	}


	// *** Fixtures
	// ------------------------------

	// SLEEP for Animations
	const sleep = (delay) => new Promise ( (resolve)=> setTimeout(resolve,delay) )


	const stopAllBGMs = () => {
		// stopBGMOcn1()
		// stopBGMdv2()
		// stopBGMDtv()
		stopBGMending()
	}

	const toggleBGM = () => {
		setToggleFadeMusicButton(!stateToggleFadeMusicButton)
		// [TIPS」 using redundant way to protect BGM ON/OFF integrity whether the button's view broken or not by being isolated
		if (isBGMPlaying == true) {
			if(currStage < MAX_STAGE_COUNT-1) setBGMPlaying(false)///[TEMPORARY COMMENT OUT]/////setBGMPlaying(false)
			
			
		}
		else if (isBGMPlaying == false) {

			//index==0 is ignored because this is out of useEffect so async cannot do properly (So loop is when index==5 , firstIndex comes 1, somehow [HEURISTIC])
			setBGMPlaying(true) // [MEMO]index starts by 1

			if (currBGMIndex < BGM_COUNT) setCurrBGMIndex(currBGMIndex+1)
			else if(currBGMIndex >= BGM_COUNT) setCurrBGMIndex(1)
			
		}
		// true/false reverse for BGM (toggle)
		//const currentState = isBGMPlaying
		//setBGMPlaying(!currentState)

		console.log("BGM Playing Toggle Button: "+isBGMPlaying)		

	}


	// *** UseEffect
	// ------------------------------
	
	useEffect(
		() => { 	
			const handleResize = () => setScreenSize({width : window.innerWidth, height : window.innerHeight })
			window.addEventListener("resize", handleResize)
			console.log(screenSize)

			return () => window.removeEventListener("resize", handleResize);
			
	},[window.innerHeight])　
	//[FIXME] I wanna make this added 2 detector not only Height... like  window.innerHeight || window.innerWidth

	useEffect(
	()=>{
		const handleScroll = () => {}
		window.addEventListener("scroll", handleScroll)
		console.log("scroll:"+scrollPos+" window.scrollY"+window.scrollY)
		setScrollYPos(window.scrollY)

		return ()=> 	window.removeEventListener("scroll", handleScroll)
	},[window.scrollY])


	//BGM Switcher from Toggle Button
	useEffect(
		() => {
			//	const [playCurrBGM, {stop : stopCurrBGM} ] = useSound(BGMs[currBGMIndex])

			// [FIXME] cannot apply window[string] or this[string] so I compose this ugly way
			let playBGMDelegate = null //[FIXME] use delegate array and index by stacking funcs !!
			let stopBGMDelegate = null
			if ( currBGMIndex == 1 ) { playBGMDelegate = playBGMending; stopBGMDelegate = stopBGMending; }
			// else if ( currBGMIndex == 2 ) { playBGMDelegate = playBGMOcn1; stopBGMDelegate = stopBGMOcn1; }
			// else if ( currBGMIndex == 3 ) { playBGMDelegate = playBGMdv2; stopBGMDelegate = stopBGMdv2; }
			// else if ( currBGMIndex == 4 ) { playBGMDelegate = playBGMDtv; stopBGMDelegate = stopBGMDtv; }
			// else  { playBGMDelegate = playBGMdv2; stopBGMDelegate = stopBGMdv2; } // error handling safenet
			
			console.log(currBGMIndex)
			if (isBGMPlaying) {
				playBGMDelegate()
			}
			else stopAllBGMs()

	},[isBGMPlaying])

	//BGM playbackRate changer from if any battle event invoked
	useEffect(
		()=>{

		}
	,[playbackRate])

	useEffect(
		()=>{
			if (window.innerWidth > PLAYABLE_MAX_WIDTH) { setIsOverWidth(true) } else { setIsOverWidth(false) }
			console.log("isOverWidth:"+isOverWidth)
		}
	,[window.innerWidth])

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

		if (/iPhone|iPod|iPad/i.test(window.navigator.userAgent)) { setDeviceName("iPhone") } else { setDeviceName("アンドロイド") }

		let sBrowser = null
		const sUsrAg = window.navigator.userAgent;

		// The order matters here, and this may report false positives for unlisted browsers.
		
		if (sUsrAg.indexOf("Firefox") > -1) { sBrowser = "Firefoxブラウザ";
		  // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
		} else if (sUsrAg.indexOf("SamsungBrowser") > -1) { sBrowser = "Samsung Internet";
		  // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
		} else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) { sBrowser = "Operaブラウザ";
		  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
		} else if (sUsrAg.indexOf("Trident") > -1) { sBrowser = "Internet Explorer";
		  // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
		} else if (sUsrAg.indexOf("Edge") > -1) { sBrowser = "Edge";
		  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
		} else if (sUsrAg.indexOf("Chrome") > -1) { sBrowser = "Chromeベースのブラウザ";
		  // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
		} else if (sUsrAg.indexOf("Safari") > -1) { sBrowser = "Safariブラウザ";
		  // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
		} else { sBrowser = "unknown"; }

		
		if( sBrowser == "unknown" || sBrowser == null) { setBrowser("XXXXX"); } else { setBrowser(sBrowser) }

		// if (/iPhone|iPod|iPad/i.test(window.navigator.userAgent) ) {
		// 	if (sBrowser=="Firefox" || sBrowser=="Safariブラウザ" || sBrowser=="Internet Explorer") { setSignal("XXXXX") }
		// 	else { 
		// 		if ( window.NetworkInformation?.effectiveType == false || String(window.NetworkInformation?.effectiveType) == "false" ) setSignal("XXXX")
		// 		else if ( String(window.NetworkInformation.effectiveType).toUpperCase()=="" ) setSignal( "XXXXXX" )
		// 		else ( setSignal(window.NetworkInformation.effectiveType.toUpperCase()) )
		// 	}
		// }

		const md = new MobileDetect(window.navigator.userAgent)
		let phonename = ( ((md.phone()?.toUpperCase()=="UNKNOWNPHONE") ? "UNKNOWNPHONE" : false) || md.mobile() )
		if (phonename!=null && phonename?.toUpperCase()=="UNKNOWNPHONE" ) phonename=false
		
		setDeviceKind(( phonename || "XX" ))
		
		const getData = async () =>{
			const response = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
			const _data = response.data
			
			let ipAddress = null
			let osVersion = null

			ipAddress = _data?.match(/ip=(.*)/)?.[1] // [0] is not group, entire matching string. so then [1]=(XXX) is capture group
			osVersion = _data?.match(/iPhone OS ([1-9_]*)/)?.[1]
			osVersion = String(osVersion).replaceAll("_",".")

			const _state = { "IP" : ipAddress, "OS" : osVersion }
			await setUserData (_data)
			await setUserDataDetail (_state)
		//		.then(response => response.json())
		//		.then(data => console.log(data)); 

		}
		getData()
		
		/* [FIXME] it is Access-Control-Cross-Origin from package.json of proxy:"localhost:3000" to prevent CORS no-permission problem
		const getIPFromAmazon = async () => {
			try {
				const res = await axios.get("https://checkip.amazonaws.com/")
				await setUserDataAMZ ( res?.data )
			} catch (e) {
				console.log("AMZ ERROR:"+e)
			}
		}  
		getIPFromAmazon()
		*/

	},[])

	useEffect( () => {
		const handler = (e) => {
			setThemeColor("#ff0000")
		}
		window.addEventListener('DOMContentLoaded',handler)
			
		return () => window.removeEventListener("DOMContentLoaded", handler);
	},[])

	// CUSTOM APP INSTALL NOTIFIER
	/*
	useEffect( ()=>{
		let deferredPrompt;

		window.addEventListener('beforeinstallprompt', (e) => {
		  // Prevent the mini-infobar from appearing on mobile
		  e.preventDefault();
		  // Stash the event so it can be triggered later.
		  deferredPrompt = e;
		  // Update UI notify the user they can install the PWA
		  showInstallPromotion();
		});
	},[])
	*/
	

	// ENEMY BATTLE LOGIC
	const logicBattle = async ( { event } ) => {

		// PLAY DAMAGE SOUND
		if( isGuard==false ) {
			enemyList?.["E00"+(currStage+1)]?.DmgSnd()
		} else if 
		( isGuard==true ) {
			enemyList?.["E00"+(currStage+1)]?.GuardSnd()
		}
		console.log("scroll:"+scrollPos+" window.scrollY:"+window.scrollY)

		// MOVIE DIALOG MANAGER PARAMS (DURING BATTLE)
		let flgHPBattleEvent=null
		let flgMagicEvent=null

		//BATTLE LOGIC - ATTACK
		if(HPEnemy > 0) { 

			// PLAYER ATTACK
			// ------------------------------
			let damageParam = player.ATK + parseInt(Math.random()*10/*///[TEMPORARY COMMENT OUT]///Math.random()*10*/) -5 - enemyList?.["E00"+(currStage+1)]?.DEF
			
			console.log( "STAGE:" + currStage + " " + " DAMAGE:" + damageParam + " HP:" + HPEnemy )
			if (damageParam <=0 || isGuard == true) { damageParam = MIN_DAMAGE_PARAM }

			await setHPEnemy(HPEnemy-damageParam)

			// GO NEXT STAGE : CHECK WHAT NEXT ENEMY TELLING & WOULD TURN ON
			// ------------------------------
			let pointerPrev = null
			let pointerCurrent = null 
	
			let isFirstLoop=null
			let _storePointer=null
	
			for ( const property in mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id] ) {
				//[FIXME][HEURISTIC] DUE TO THE POINTER OF property starts from MIN VALUE, NOT THE ORDER OF JSON DECLARATION, SO I DID THIS...
				pointerCurrent = Number(property)
	
				if ( isFirstLoop==null ) { 
					isFirstLoop = true
					_storePointer = pointerCurrent
					//pointerPrev = pointerCurrent
					pointerPrev = 0
				}
				else if ( isFirstLoop!=null  ) { 
					//UPDATE Prev from stored previous loop
					pointerPrev = _storePointer
					//UPDATE Store from current loop
					_storePointer = pointerCurrent
				}
				//console.log("prev"+pointerPrev+" HP"+HPEnemy+" curr"+pointerCurrent)
	
				//e.g.  90  < HP < 80
				// [FIXME] ↓ this has an error so if the damage is not zero twice, this is pass-through 
				if ( pointerPrev <= HPEnemy && HPEnemy <= pointerCurrent ) { 
					// TRIGGER DIALOG
					if ( lastHPBattleEvent!=pointerCurrent ) { 
							flgHPBattleEvent = true
							setCurrentHPBattleEvent(pointerCurrent)
							setLastHPBattleEvent(pointerCurrent)
							break
					}
				}
			}

			// Music Pitch Change Event Interceptor
			// Clamp number between two values with the following line:
			const min = 7.3;
			const max = 1.0;
			const clamp = (_num, _min, _max) => Math.min(Math.max(_num, _min), _max);
			console.log("playbackRate:" + 5.0 *  1.0 / ( 1.0 -  ( HPEnemy / enemyList?.["E00"+(currStage+1+1)]?.HP ) )+1 )
			//hell bgm
			//[FIXME][MEMO] toggle BGM function manually override
			if(currStage == MAX_STAGE_COUNT-1-1 && HPEnemy <= 20+20 ) {
				setPlaybackRate( //  1 / (1-(MAX/x=normX)) +1 <- by adding +1 can move pivot right then soften smoothness between 0 to 1 in x axis	
					5.0 * 1.0 / ( 1.0 -  ( HPEnemy / enemyList?.["E00"+(currStage+1+1)]?.HP ) )+1 
				)
			}

			
			

			// ENEMY ENEMY TALKING
			// ------------------------------
			if (flgHPBattleEvent) {
				// Player's Attack Voice
				if(currStage < MAX_STAGE_COUNT-1) 	{ playSFXYellAndATK()		}
				else 								{ playSFXerror25()			}
				showModal("modalParamsEnemy")({targetEvent:event})
			}

			//  SPELL GUARD IS ON
			if ( ( HPEnemy <= enemyList?.["E00"+(currStage+1)]?.GuardThreshold ) && isGuard == false ) { 
				///[TEMPORARY COMMENT OUT]///flgMagicEvent = true
				///[TEMPORARY COMMENT OUT]///setIsGuard(true)
			}

			// ENEMY MAGIC SPELL
			// ------------------------------
			console.log("flgMagicEvent:"+flgMagicEvent+ " " + "isFirstMagicSpelling:"+ isFirstMagicSpelling)
			
			if (flgMagicEvent && isFirstMagicSpelling) {
				///[TEMPORARY COMMENT OUT]///playSFXGuard()
				///[TEMPORARY COMMENT OUT]///showModal("modalMagicGuard")({targetEvent:event})
				///[TEMPORARY COMMENT OUT]///setIsFirstMagicSpelling(false)
			}

		} 


		// BATTLE LOGIC - ENEMY DEATH
		if (HPEnemy <= 0) {

			// ENEMY DEATH
			// ------------------------------

			if (currStage<(MAX_STAGE_COUNT-1)) { 
				// GO TO NEXT STAGE
				await setCurrStage(currStage=>(currStage+1))

				// TAKEDOWN DIALOG
				await showModal("modalTakedown")()

				//[CAUTION] currStage needs to add 2 because JSON enemyList key_String starts by E001 not E000
				console.log("E00"+(currStage+1)+" "+enemyList?.["E00"+(currStage+1+1)]?.HP)
			
				// SET NEW ENEMY HP etc...
				await setHPEnemy(enemyList?.["E00"+(currStage+1+1)]?.HP)
				await setIsFirstMagicSpelling(true)

				///[TEMPORARY]/// change camera filter
 				//[FIXME] Hell Mode each changes should changed at other blocks but , this time did at this all, because of due of finish
				 if(currStage== MAX_STAGE_COUNT-1-1-1) {
					setFilterBrightnessParam(1.5)
					setFilterSaturateParam(0.5)

					//[FIXME][MEMO] toggle BGM function manually override
					//setVolumeWeight(2.0)
					console.log(_invert_strength)
				}

				///[TEMPORARY]/// change camera filter
 				//[FIXME] Hell Mode each changes should changed at other blocks but , this time did at this all, because of due of finish
				if(currStage== MAX_STAGE_COUNT-1-1) {
					stopSFXCarCrush()
					//set Filter
					//setStateToggleHellMode(true)
					setFilterInvertParam(1.0)
					setFilterSaturateParam(0.0)
					

					//hell bgm
					//[FIXME][MEMO] toggle BGM function manually override
					setPlaybackRate(0.3)
					setVolumeEnding(5.0)
					setVolumeWeight(30.0)

					stopAllBGMs()
					setCurrBGMIndex(1)
					setBGMPlaying(true)
					setToggleFadeMusicButton(false)
					
					playBGMending()


					console.log("LAST STAGE IN")
					console.log(_invert_strength)
				}

			}
		}


			

	}

	// CSS and Design
	// ------------------------------

	// Disable Long Tap Menu (Copy etc)
	window.oncontextmenu = function(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
   	}

	const RootDesign = css`
		display: flex;
		width:100%;

		user-drag: none; /*Webpack compile this to be compatible with Webkit*/
		user-select:none; /*Webpack compile this to be compatible with Webkit*/
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
	`
	const frameRootDesign = css`
		--heightWeight : 1;

		//position: absolute;
		//position: sticky; //[FIXME] 20211104 fixed: This sticky cause user can drag 3d model borad, then they can see the background(RootDesign), It seems bug and neglegent design So Make into "fixed"
		position: fixed;
		
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		//pointer-events:none; //[FIXME] 20211129 patched: This cancels all events below-nested elements then Occured Bug that cancel model-viewer's camera-control user interaction. However, this comment out causes latent bug that would, in Parallax(React-Spring), user can go out of the last parallax page beyond boundary We expect.
		user-drag: none; /*Webpack compile this to be compatible with Webkit*/
		user-select:none; /*Webpack compile this to be compatible with Webkit*/
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */


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
		//position: sticky; //[FIXME] 20211104 fixed: This sticky cause user can drag 3d model borad, then they can see the background(RootDesign), It seems bug and neglegent design So Make into "fixed"
		position: fixed;

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
		font-family: "PixelMPlus","Helvetica";
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

	const BackStyleSymbolSound = css`
		height:100%;
		width:100%;
		opacity:20%;
		@keyframes rotation {
			0% {transform: rotate(0deg); opacity: 20%;}
			50% {transform: rotate(360deg); opacity: 10%;}
			100% {transform: rotate(720deg); opacity: 20%;}
		}
		animation-name:rotation;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-timing-function:ease-in-out;
	`	
	
	const backdropFilter1 = css`
		backdrop-filter: blur(10px);
	`

	const _flash= null
   ///[WHERE THIS DEFINES WAS MOVED AT R215] ///const _invert_strength     = filterInvertParam 	///[TEMPORARY]///0.7+0.2
    const _blur_strength       = 1.0-0.15-0.4+"px"	///[TEMPORARY]///2+"px"
    const _grayscale_strength  = 0			///[TEMPORARY]///1.0
   ///[WHERE THIS DEFINES WAS MOVED AT R217] ///const _brightness_strength = 1.1-0.1		///[TEMPORARY]///0.3
    const _hue_strength        = 0+"deg"	///[TEMPORARY]///0.3
    const _sepia_strength      = 0.35		///[TEMPORARY]///0.3
    ///[WHERE THIS DEFINES WAS MOVED AT R217] ///const _saturate_strength   = 1.3		///[TEMPORARY]///1.0
	const _contrast_strength   = 1.3		///[TEMPORARY]///1.0

	const backdropFilterHellGeneral = css`
		backdrop-filter: 
			contrast(${_contrast_strength}) 
			invert(${_invert_strength}) 
			blur(${_blur_strength}) 
			grayscale(${_grayscale_strength}) 
			brightness(${_brightness_strength}) 
			hue-rotate(${_hue_strength}) 
			sepia(${_sepia_strength}) 
			saturate(${_saturate_strength});
	`
	
	const unTouchable = css`
		pointer-events:none;
		user-drag: none; /*Webpack compile this to be compatible with Webkit*/
		user-select:none; /*Webpack compile this to be compatible with Webkit*/
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
	`

	const touchable = css`
		pointer-events:all;
		user-drag: none;  /*Webpack compile this to be compatible with Webkit*/
		user-select:none; /*Webpack compile this to be compatible with Webkit*/
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
	`

	const parallaxRootDesign = css`
		position: fixed;
		zIndex:5;
		height:${screenSize.height+"px"};
	`
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
	const [ stateModal,setStateModal ] = useState(
		{
			modalTutorial: false,
			modalStageClear: false,
			modalTakedown: false,
			modalParamsEnemy: false,
			modalEnemyTalking: false,
			modalMagicGuard: false,
			modalTips: false,
			modalUseItem :false,
			modalSearchBox: false
		}
	)

	const [ modalChainer,setModalChainer ] = useState({})

	const showModal = key => (options) => { 
		//[FIXME][MEMO]
		// I dont get learned to get arguement with object literal or destructure, should catch up later and fix it
		options?.targetEvent?.preventDefault() // Fix click penetration on Android */ 
		setStateModal({ [key]: true })
		
		//triggerTypeWriter({text:"TEXTTEXTTEXTTEXT"})
		//OnShowing 
		if (key=="modalStageClear") { playSFXLevelUp(); console.log(key) }
		if (key=="modalTakedown") { playSFXtakedown00(); console.log(key) }
	 }

	const onClose = key => () => { setStateModal({ [key]: false }) }

	const onWrapTouchStart = (e) => {
		// fix touch to scroll  backgrounded page on iOS
		//if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) { return; }

		// fix modal problem in each platform *CAUTION : need to target selector at 2nd argument
		//const pNode = closest(e.target, '.am-modal-content');
		//if (!pNode) { e?.preventDefault() }
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) { return; }
		else { e?.preventDefault() }
	}


	// UseSpring 
	// ------------------------------

	const [stateToggleFadeMusicButton, setToggleFadeMusicButton] = useState(true)
	const { fadeMusicButtonX } = useSpring({ 
		fadeMusicButtonX: stateToggleFadeMusicButton ? 1 : 0,  // Subscriber : if state changes, this envoke fadeAnimation(with interpolation and rythm) to target component of style.
		from: { fadeMusicButtonX: 0 }, 
		config: { duration: 400 } 
	})

	const [stateToggleHellMode, setStateToggleHellMode] = useState(false)
	const { applyHellFilter } = useSpring({ 
		applyHellFilter: stateToggleHellMode ? 1 : 0,  // Subscriber : if state changes, this envoke fadeAnimation(with interpolation and rythm) to target component of style.
		from: { applyHellFilter: 0 }, 
		config: { duration: 3000 } 
	})

	//console.log(stageParams[currStage])
	//console.log(yearParams[currStage])

	// Parallax Helpers
	// ------------------------------

	// Little helpers
	const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

	const gradientR2B = `
	linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
	linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
	linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)
	`

	// AR Helpers
	// ------------------------------

	// 
	let arOptionProps = {
		// "camera-controls" : false [TIPS] if you write "camera-controls", then it is activsted whether the value is false or not ( so be careful, nothing to write for disable )
	}
	if (isOverWidth) { 
		arOptionProps = { "camera-controls" : true } 
	}

	// Parallax Setting
	let parallax = null

	// Component
	// ------------------------------
	return (

		<div className={RootDesign}>	

			<Helmet>

				<script
					type="module"
					src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js"
				/>
				<script
					noModule
					src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer-legacy.js"
				/>			
				<meta name="theme-color" content={themeColor} />	 
			
			</Helmet>

			<a.div
			style={{
			//// [FIXME][MEMO][HEURISTIC] backdrop-filter cannot invoked by style in react component... but if you use className of emotion at first, backdrop-filter's property in style activated... ( so all backdrop-filter is written in emotion and never written in style is preffered, this is at unknown reason )
			//// [FIXME][MEMO][HEURISTIC] backdrop-filter cannot invoked by style so this backdropFilter syntax cannot be involed and coonected with react-spring target instance
			// backdropFilter: applyHellFilter
			// 	.to({
			// 	range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
			// 	output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
			// 	})
			// 	.to((_x) => `invert(${_x})`)
			}}
			>
			<div style={{
					// [FIXME][MEMO][HEURISTIC] backdrop-filter cannot invoked by style in react component... but if you use className of emotion at first, backdrop-filter's property in style activated... ( so all backdrop-filter is written in emotion and never written in style is preffered, this is at unknown reason )
					position:'absolute', 
					height:screenSize.height,
					width:screenSize.width,
					zIndex:100+1,
					pointerEvents:"none",
					
				}} className={backdropFilterHellGeneral}>
			</div>
			</a.div>



			{/* [ IMPORTANT SETTING - THIS PAGE's  ROOT ]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
			{/* [FIXME] This should renamed as NavHomeRootDesign */}
			{/* DISPLAY SURFACE DESIGN */}
			<div style={{
					//position:'absolute',
					position:'fixed',
					height:screenSize.height,
					width:screenSize.width,
					zIndex:100+100,
					pointerEvents:"none",
					boxSizing:"border-box",
					boxShadow:"inset 0 0 10px 5px rgba(0,0,0,0.15)",
					content: "",
					border:10+"px solid",
					borderColor:"rgba(0,0,0,0.3)",

					userDrag: "none", /*Webpack compile this to be compatible with Webkit*/
					userSelect:"none", /*Webpack compile this to be compatible with Webkit*/
					WebkitTouchCallout: "none" /* disable the IOS popup when long-press on a link */
			
					//outlineStyle:"solid",
					//outlineColor:"rgba(0,0,0,1)",
					//outlineWidth:"20px",
			}} >
			</div>

			{/* DISPLAY CLEAR VIDEO */}
			{ (!canShowClearVideo)
			? <></> 
			:
			<div style={{
					position:'absolute',
					height:screenSize.height,
					width:screenSize.width,
					zIndex:100+100+100,
					//pointerEvents:"none",
					backgroundColor:"rgba(0,0,0,1.0)",
			}} >
				<video autoPlay controls
				style={{
					position:'absolute',
					height:screenSize.height,
					width:screenSize.width,
					zIndex:100+100+100,
					//pointerEvents:"none",
					boxSizing:"border-box",
					//boxShadow:"inset 0 0 10px 5px rgba(0,0,0,0.15)",
					//content: "",
					//border:10+"px solid",
					//borderColor:"rgba(0,0,0,0.3)",
					//outlineStyle:"solid",
					//outlineColor:"rgba(0,0,0,1)",
					//outlineWidth:"20px",
				}}
				>
					<source src={kyokoVideo} type="video/mp4" />
				</video>
					
			</div>
			}





			<div className={frameRootDesign}>


				{/* Circular rotate object background Actor */}
				<div style={{
					position: "absolute",
					height:screenSize.height,
					width:screenSize.width,
					overflow: "hidden",
				}}>
					{/* Background Circle */}
					<div style={{
							marginLeft:"-50%",
							transform: "translateX(16.5%)",
							marginTop:screenSize.height/(3+3)+"px",
							display: "flex" , justifyContent:"center",alignItems:"center",

					}}>
						{/* [FIXME] this translateX is relative at window's width so always correct, but so many magic ration number unfactorized, please desolve and be ease way  */}
						<SymbolSoundOff className={BackStyleSymbolSound}/>
					</div>				
				</div>



				{/* Circular rotate object background Actor */}
				<div style={{
					position: "absolute",
					height:screenSize.height,
					width:screenSize.width,
					overflow: "hidden",
				}}>
					{/* Background Calligraphy */}							
					<div style={{
							marginLeft:"-50%", marginTop:screenSize.height/(2-0.1+0.4),
							transform: "translateX(16.5%) perspective(10cm) rotate3d(1, 0, 0, 0.15turn)",
							display: "flex", justifyContent:"center", alignItems:"center",
							fontSize: screenSize.height/(3+3-2-1)+"px",
							fontFamily: "PixelMPlus",
							opacity:"0.5"
					}}>
						{enemyList?.["E00"+(currStage+1)]?.iconicKanji}
					</div>				
				</div>				

				{/* Circular rotate object background Actor */}
				<div style={{
					position: "absolute",
					height:screenSize.height,
					width:screenSize.width,
					overflow: "hidden",
				}}>
					{/* Background Calligraphy */}							
					<div style={{
							marginLeft:"-50%", marginTop:"30%",
							transform: "translateX(16.5%) perspective(10cm) rotate3d(1, 0, 0, -0.05turn)",
							display: "flex", justifyContent:"center", alignItems:"center",
							fontSize: screenSize.height/(3+3-2-1)+"px",
							fontFamily: "Noto Sans JP"
					}}>
						{(currStage==MAX_STAGE_COUNT-1) ? "💀" : "⛩️"}
					</div>				
				</div>	
				{/*[FIX ME] it is too heavy to run */}
{/*	
				<Particles
					style={{position: 'absolute', pointerEvents:"none", cursor:"default",opacity:"50%"}}
		     	   options={nasaParticles}
				/> 
*/}

				{/* Background 3D Model Actor   */}
				<div className={backgroundModelBoard}>

						<model-viewer
		  				alt={enemyList?.["E00"+(currStage+1)]?.name}
						auto-rotate 
						disable-zoom
						camera-orbit="45deg 55deg 2.5m"
						shadow-intensity="1" 
						ar 
						{...arOptionProps}
						ar-modes="webxr scene-viewer quick-look"
						ar-scale="auto"
						autoplay
						{...stageParams[currStage]}

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
									top: 10/*inset of bg surface*/+16+"px", 
									right: 10-5+16+"px",
									padding: "8px",
									textAlign: "center",
									zIndex: "10",
									pointerEvents: 'none',
									visible:"none"
								}}>🎍
							</button>
						}
						</model-viewer>
				</div>

			</div>

			{/* Explanation Notification bar Actor */}

			{ isOverWidth ||
			<NoticeBar 	mode="closable" 
						icon={null}
						marqueeProps= {{ loop: true, leading: 1000, trailing: 5000, style: { padding: '0 7.5px', fontFamily:"PixelMPlus" }} }
						style={{marginTop: 10+16+3+"px", marginLeft:10-5+15+5+15+"px", marginRight:40+15+"px"}}> ─────── ─ ──この世界は壊れてしまった ───── ── ── ─ ─────誰か── ── ─ここに来て─────平和を取り戻して── ─ ─ ─ ─── ─ ─ ─ ── ── </NoticeBar>
			}
			{/* BGM SWITCH INDICATOR Actor */}
			<button
				id="BGMSwitcher"
				style={{
					background: "transparent",
					border: "0px",
					width: 40+"px",
					height: 40+"px",
					position: "absolute", 
					top: 10+16+2+"px", 
					left: 10-5+16+"px",
					padding: "0px",
					textAlign: "center",
					zIndex: "10",
				}}
				onClick={( (currStage < (MAX_STAGE_COUNT-1)-1) ? toggleBGM : null )/*///[TEMPORARY COMMENT OUT]///toggleBGM*/}>
				{ (isBGMPlaying) ?
					<SymbolSoundOn className={StyleSymbolSoundOn}/> : 
					<SymbolSoundOff className={StyleSymbolSoundOff}/>
				}
			</button>

			{/* [BUGFIX] For AR ButtonActor hidden problem  */}
			{ document.querySelector('button#ar-button-1') &&
			<button
				onClick={()=>{ document.querySelector('button#ar-button-1').click(); playSFXclick8(); console.log(document.querySelector('button#ar-button-1')+"ar button 1 clicked");  }}
				className={touchable}
				style={{
					fontFamily:"Helvetica",
					background:"white", 
					borderRadius: "12px", 
					border: "none", 
					position: "absolute", 
					fontSize:"20px",
					top: 10+16+"px", 
					right: 10-5+16+"px",
					padding: "8px",
					textAlign: "center",
					color:"rgb(0, 0, 0)",
					zIndex: 6,//((window.scrollY>100) ? 5+1 : 5 ),
				}}> 📦  AR
			</button>
			}
			
			{ isOverWidth ? 
			
			<Card style={{margin:"auto", padding:"20px", top:`${screenSize.height/(1.0+1.0-0.7)}px`, blur:"20px", background:"rgba(255,255,255,0.3)" ,display:"flex", justifyContent:"center", fontFamily:"PixelMPlus", textAlign:"center"}} className={backdropFilter1}><strong>🍊 SCRIBBLE 🎍🏠🎍 お知らせ 🍊</strong><WhiteSpace sm/>スマホの専用機能を使っているため、ゲームモードを起動できません。<WhiteSpace lg/>スマホからお楽しみくだされ　<WhiteSpace lg/><strong> ( ただしアヒルとはふれあえます )</strong></Card>

			:

			<Parallax 
				//ref={ref => (parallax = ref)} 
				pages={8} /* pages : PAGE AMOUNT SETTINGS */
				className={parallaxRootDesign} /* config: This config, retrict the slippy move to zero Then Cut Spring Physics for Perdormance */
				config={{ duration: 0 }} 
			>
			
				<ParallaxLayer offset={1} speed={0} className={unTouchable} style={{ backgroundColor: '#0aceff',zIndex:"0" }} />
				<ParallaxLayer offset={2} speed={0} className={unTouchable} style={{ backgroundColor: '#448ef6',zIndex:"0" }} />
				<ParallaxLayer offset={3} speed={0} className={unTouchable} style={{ backgroundColor: '#65daf7',zIndex:"0" }} />
				<ParallaxLayer offset={4} speed={0} className={unTouchable} style={{ backgroundColor: '#81e1af',zIndex:"0" }} />
				<ParallaxLayer offset={5} speed={0} className={unTouchable} style={{ backgroundColor: '#012B67',zIndex:"0" }} />
				<ParallaxLayer offset={6} speed={0} className={unTouchable} style={{ backgroundColor: '#000000',zIndex:"0" }} />
				<ParallaxLayer offset={7} speed={0} className={unTouchable} style={{ 
				 	backgroundColor: '#012B67',
				 	zIndex:"0",
				 	/*MAKE STOP OVER SCROLLING MINIMAM BY HERE...UGLY CODE[FIXME][HEURISTIC]*/
				 	userDrag: "none", /*Webpack compile this to be compatible with Webkit*/
				 	userSelect:"none", /*Webpack compile this to be compatible with Webkit*/
				 	WebkitTouchCallout: "none", /* disable the IOS popup when long-press on a link */
				 }}/>
				<ParallaxLayer offset={7} speed={0.5} factor={0}  className={unTouchable} style={{ 
					zIndex: "100",
					color:"white",
					fontSize:"2vh",fontFamily:"Noto Sans JP",
					textAlign:"center",

					margin:"auto",
					display:"flex",
					justifyContent:"center",
					alignItems:"center",

			 	}}>Created by StrayDrop 2021</ParallaxLayer>
				
				{/* White Sparcle Splash */}
				<ParallaxLayer offset={0} speed={0} factor={3} className={unTouchable} style={{ 
					backgroundImage: url('stars', true), backgroundSize: 'cover', zIndex:"5" }} 
				/>

				<ParallaxLayer offset={0.3} speed={0} style={{ zIndex:"0" }}>
					{/* *** Articles   */}
					<div className={ArticleRootDesign}>
					
						<div 
							id="AttackableArea"
							className={FirstViewWhiteSpace} 
							onClick={ async (e)=>{
								e.preventDefault()
								logicBattle( {event:e} )
 							}}>
						</div>
						
						<div className={ArticleContainer}>
							<h1 style={{ color:"#0f1923", fontFamily:"Noto Sans JP", fontWeight:"bold", transform: "scaleX(1)" }}>
								{/*///[TEMPORARY]///<div id="newyear-text" style={{display:"inline"}}>HAPPY NEW YEAR <br/>20</div>*/}
								{/*///[TEMPORARY]///<div className={crossText}>21</div>*/}
							</h1>
							{ [...Array( /*WhiteSpaceRepeatCount*/ 21 )].map( ( _ , i )=>( <WhiteSpace lg/> ) ) }
							<a.div
							style={{
							opacity: fadeMusicButtonX
								.to({ range: [0, 1], output: [0.05, 1] }),
							transform: fadeMusicButtonX
								.to({
								range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
								output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
								})
								.to((_x) => `scale(${_x})`)
							}}>
							<Button
								onClick={ ()=>{
									//window.document.querySelector("#BGMSwitcher").click()
									if (currStage < (MAX_STAGE_COUNT-1)) toggleBGM() ///[TEMPORARY COMMENT OUT]///toggleBGM()
									if(!isBGMPlaying) {playSFXscan03Alt()} } 
								} 
								style={{
									borderRadius:"30px", border:"1px solid #ffffff", 
									width:parseInt(screenSize.width)-30-15-(20)+"px",
									boxSizing:"border-box", background:"rgba(0,0,0,0.8)", color:"rgba(255,255,255,1)", //"rgba(255,255,255,0.3)", 
									display:"flex", justifyContent:"center", alignItems:"center", fontFamily:"Poppins"}}>
									|  || ||||| ||| ||| ||| ||||     ||
							</Button>
							</a.div>
							<WhiteSpace lg/>
							<WingBlank>
							<WhiteSpace />

							<Modal
								id="modalParamsEnemy"							
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalParamsEnemy}
								transparent
								maskClosable={true}
								onClose={onClose('modalParamsEnemy')}
								title={enemyList?.["E00"+(currStage+1)]?.name+" : HP"}
								footer={[{ text: '▼', onPress: (e) => { onClose('modalParamsEnemy')(e); } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 
									//if(currStage<MAX_STAGE_COUNT-1) mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.snd()
									//else playSFXerror14()
									mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.snd?.()
									showModal("modalEnemyTalking")()
								 }}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									<Progress percent={parseInt(( HPEnemy / enemyList?.["E00"+(currStage+1)]?.HP )*100)} position="normal" unfilled={true} barStyle={{borderRadius:"5px"}} style={{}} appearTransition/>
									{HPEnemy}/{/*20*/}19{enemyList?.["E00"+(currStage+1)]?.assignedYearSuffix}
									
								</div>
							</Modal>

							<Modal
								id="modalMagicGuard"
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalMagicGuard}
								transparent
								maskClosable={true}
								onClose={onClose('modalMagicGuard')}
								title={<div style={{color:"DodgerBlue"}}>《 シールド - 水の呼吸 》</div>}
								footer={[{ text: '▼', onPress: (e) => { onClose('modalParamsEnemy')(e); } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 
									//mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.snd()
									//showModal("modalEnemyTalking")()
								 }}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									<Progress percent={parseInt(( HPEnemy / enemyList?.["E00"+(currStage+1)]?.HP )*100)} position="normal" unfilled={true} barStyle={{borderRadius:"5px"}} style={{}} /*appearTransition*/ />
									{HPEnemy}/20{enemyList?.["E00"+(currStage+1)]?.assignedYearSuffix}
									<br />
									《{enemyList?.["E00"+(currStage+1)]?.name}》は特殊な魔法陣を発動した・・・！！！
								</div>
							</Modal>

							{/* <Button onClick={ showModal("modalEnemyTalking") } style={{zIndex:"100", borderRadius:"30px", visibility:"hidden"}}>|  ||| |||| |||</Button> */}
							
							<Modal
								id="modalEnemyTalking"
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalEnemyTalking}
								transparent
								maskClosable={true}
								onClose={onClose('modalEnemyTalking')}
								title={enemyList?.["E00"+(currStage+1)]?.name}
								footer={[{ text: '▼', onPress: (e) => { onClose('modalEnemyTalking')(e); } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => {}}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									<Typewriter stopBlinkinOnComplete={true} string={mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.mes} 
									delay=
									{
										`${(currStage == MAX_STAGE_COUNT-1) ? "50" : "100"}`
									} />
								</div>
							</Modal>


							<Modal
								id="modalStageClear"
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalStageClear}
								transparent
								maskClosable={true}
								onClose={onClose('modalStageClear')}
								title={"空 想 切 除 - "+enemyList?.["E00"+(currStage)]?.iconicKanji}
								footer={[{ text: 'GO NEXT', onPress: (e) => {onClose('modalStageClear')(e) } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 

								}}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									「{/*20*/}19{enemyList?.["E00"+(currStage+1-1)]?.assignedYearSuffix}年」の守護獣を倒した！
									<br />
									レベルが1あがった！！！
								</div>
							</Modal>


							<Modal
								id="modalTakedown"							
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalTakedown}
								transparent
								maskClosable={true}
								onClose={onClose('modalTakedown')}
								title={""}
								footer={[{ text: '▼', onPress: (e) => { onClose('modalTakedown')(e) } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={(e) => { 
									showModal("modalStageClear")(e)
								 }}
							>
								<div style={{ height: "100px", overflow: 'hidden', fontSize:"50px", color:"black" }}>
									撃破
									<br />
									<div style={{fontSize:"20px"}}>{enemyList?.["E00"+(currStage+1-1)]?.name}</div> 
									
								</div>
							</Modal>

							</WingBlank>
						
						</div>

					</div>
				</ParallaxLayer>


				<ParallaxLayer offset={1.2} speed={-0.2} className={unTouchable}>
					<img src={satellite4} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXbeep05()}} 
						style={{ width: '15%', marginLeft: '70%', zIndex: "101" }}
					/>
				</ParallaxLayer>

				{ false///[TEMPORARY COMMENT OUT]///(currStage<MAX_STAGE_COUNT-3) (currStage<1)

				? <></> 
				:

				<ParallaxLayer offset={1.3} speed={-0.3} className={unTouchable}>
					
					<Card
						className={touchable} onClick={ (e)=>{e.preventDefault; playSFXfoot15()}} 
						style={{
						zIndex:"100",
						margin:"auto", bottom:-70-60+20+"px", maxWidth:"240px", maxHeight:"30px", 
						display:"flex" , justifyContent:"center", textAlign:"center",
						backdropFilter:"blur(20px)",
						background:"rgba(0,0,0,0.9)",
						fontFamily:"Noto Sans JP", paddingBottom:"5px",
						pointerEvents:"all"
						}}>
						<DinoDI />
						<div style={{background:"rgba(0,0,0,1)", color:"white", fontFamily:"PixelMPlus"}}>ISE - KAMAKURA TOWN</div>
					</Card>
					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} 
					className={touchable}
					style={{transform:"translateX(-17%) scale(0.7)"}} 
					src={OldTown} />
					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} 
					className={touchable}
					style={{transform:"translateX(-50%) translateY(-30%) scale(0.7)"}} 
					src={TrainTown} />
				</ParallaxLayer>
				
				}

{/*
				<ParallaxLayer offset={2.5-0.3} speed={-0.4+0.8+0.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
					<img src={url('earth')} style={{ width: '60%' }} />
				</ParallaxLayer>
*/}

				<ParallaxLayer offset={1} speed={0.8} className={unTouchable} style={{ opacity: "0.1" }}>
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.75} speed={0.5} className={unTouchable} style={{ opacity: "0.1" }}>
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1} speed={0.2} className={unTouchable} style={{ opacity: "0.2" }}>
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.6} speed={-0.1} className={unTouchable} style={{ opacity: "0.4" }}>
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={2.6} speed={0.4} className={unTouchable} style={{ opacity: "0.6" }}>
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
					<img src={cloud} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} className={touchable} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
				</ParallaxLayer>


				<ParallaxLayer offset={1+0.2} speed={0.8} className={unTouchable} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
					 }}>
					<img src={bash} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXretro02()}} style={{ width: '40%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={2.3+0.6} speed={-0} className={unTouchable} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
					zIndex:"101" }}>
					<img src={clientMain} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXretro10()}} style={{ position:"relative",width: 10+"%", left:0+"px", top:-50+"px" }} />
					<img src={clientMain} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXretro10()}}  style={{ position:"relative",width: 20+"%", left:-10+"px", top:-0+"px" }} />
					<img src={clientMain} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXretro10()}}  style={{ position:"relative",width: 25+"%", left:40+"px", top:50+"px" }} />
					<img src={clientMain} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXretro10()}}  style={{ position:"relative",width: 8+"%", left:10+"px", top:-30+"px" }} />
					{/* <img src={clients-main} style={{ position:"relative",width: 5+"%", left:0+"px", top:20+"px" }} /> */}
				</ParallaxLayer>


				<ParallaxLayer offset={2+1+0.05} speed={0.1}  className={unTouchable} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
 					/*gap:20+15+"px", [FIXME] cannot be applied by iOS Safari... so I set margin below into the children */  zIndex:"100" }}>
					<img src={server1} className={touchable} style={{ margin:"10px 10px", width: '20%' 										}} onClick={ (e)=>{e.preventDefault; playSFXrobot01()}}  />
					<img src={server2} className={touchable} style={{ margin:"10px 10px", position:"relative", width: 20+"%", top:50+"px"	}} onClick={ (e)=>{e.preventDefault; playSFXrobot02()}}  />
					<img src={server3} className={touchable} style={{ margin:"10px 10px", width: '20%', top:30+"px"	 						}} onClick={ (e)=>{e.preventDefault; playSFXrobot06()}}  />
				</ParallaxLayer>

				<ParallaxLayer offset={1+2+0.1} speed={0.8} className={unTouchable} style={{ opacity: "0.1" }}>
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.75+2} speed={0.5} className={unTouchable} style={{ opacity: "0.1" }}>
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.1+2} speed={0.2} className={unTouchable} style={{ opacity: "0.2" }}>
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={1.6+2} speed={-0.1} className={unTouchable} style={{ opacity: "0.4" }}>
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
				</ParallaxLayer>

				<ParallaxLayer offset={2.6+2} speed={0.4} className={unTouchable} style={{ opacity: "0.6" }}>
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
					<img src={cloud} className={touchable} onClick={ (e)=>{e.preventDefault; playSFXsand04()}} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
				</ParallaxLayer>


				{ false///[TEMPORARY COMMENT OUT]///(currStage<MAX_STAGE_COUNT-3) 
				?
				<></>
				:
				<ParallaxLayer offset={3+1+0.01} speed={-0.3}  className={unTouchable}>
					<Card onClick={ (e)=>{e.preventDefault; playSFXfoot15()}} 
					className={touchable} 
					style={{
						margin:"auto", bottom:-200+50+"px", maxWidth:"240px", maxHeight:"30px", 
						display:"flex" , justifyContent:"center", textAlign:"center",
						backdropFilter:"blur(20px)",
						background:"rgba(0,0,0,1)",
						fontFamily:"Noto Sans JP", paddingBottom:"5px",
						zIndex:"20"}}>
						<DinoST style={{maxHeight:"50px", marginBottom:"10px"}}/>
						<div style={{background:"rgba(0,0,0,1)", color:"white", fontFamily:"PixelMPlus" }}>NARA - OKAGE CITY</div>
					</Card>

					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} className={touchable}  
					src={KanagawaTown} 
					style={{ transform: "translateX(-40%) scale(0.7)" }}/>
					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} className={touchable}  
					src={GameTown} 
					style={{ transform: "translateX(-40%) translateY(-28%) scale(0.7)" }}/>
					<img onClick={ (e)=>{e.preventDefault; playSFXLevelUp()}} className={touchable}  
					src={rat}
					style={{ transform: "translateX(80%) translateY(-2828%) scale(0.2)", zIndex:100+1 }}/> {/*20, 2228*/}
					<img onClick={ (e)=>{e.preventDefault; if(currStage== MAX_STAGE_COUNT-1) {stopAllBGMs();setCanShowClearVideo(true); playSFXclick8()}}} className={touchable}  
					src={rat}
					style={{ transform: "translateX(30%) translateY(-2228%) scale(0.5)", zIndex:100+1 }}/> {/*20, 2228*/}

				</ParallaxLayer>	


				}

			</Parallax>

		}



		</div>

		
		
	)
}

export default App
