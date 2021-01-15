//Core
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { css,keyframes } from 'emotion'

//Animation Addons
import Particles from "react-tsparticles"
import particlesOptions from "./particles.json"
import polynomialParticles from "./polynomialParticles.json"
import nasaParticles from "./nasaParticles.json"

import GlitchClip from 'react-glitch-effect/core/Clip'
import GlitchText from 'react-glitch-effect/core/Text'

import MobileDetect from 'mobile-detect'

import { Typewriter } from 'react-typewriting-effect'
import './typewriter.css'

//Addons
import * as R from 'ramda'
import Helmet from 'react-helmet'
import { useSpring, animated as a } from 'react-spring'
import useSound from 'use-sound'
//import "@google/model-viewer"

//Utils
import useScrollPosition from './useScrollPosition'
import { RotateGradient } from './RotateGradient'
import { AddHomeButton } from './AddHomeButton'

import axios from 'axios';

//Components
import "./Root.css"
//import { PingPong } from './PingPong'

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

import { ReactComponent as DinoDI } from "./diplodocus.svg"
import { ReactComponent as DinoST } from "./stegosaurus_2.svg"

/*
import { ReactComponent as satellite4 } from "./satellite4.svg"
import { ReactComponent as server } from "./server.svg"
import { ReactComponent as cloud } from "./cloud.svg"
import { ReactComponent as clientMain } from "./clients-main.svg"
import { ReactComponent as serverMain } from "./server.svg"
*/

import satellite4 from "./satellite4.svg"
//import server from "./server.svg"
import server1 from "./server1.svg"
import server2 from "./server2.svg"
import server3 from "./server3.svg"
import cloud from "./cloud.svg"
import clientMain from "./clients-main.svg"
import bash from "./bash.svg"

//GIFs
import OldTown from "./JapaneseCityExample.gif"
import KanagawaTown from "./KanagawaExample.gif"
import GameTown from "./Example2.gif"
import TrainTown from "./TrainstationExampleAnimated.gif"

//GLTF, GLB
import DuckGLB from 'Duck.glb'
import DuckUSDZ from 'Duck.usdz'
import FoxGLB from 'Fox.glb'
import FoxUSDZ from 'Fox.usdz'
import ToycarGLB from 'Toycar.glb'
import ToycarUSDZ from 'Toycar.usdz'
import RatcubeGLB from 'Ratcube.glb'
import RatcubeUSDZ from 'Ratcube.usdz'


import CubeClueGLB from 'CubeClue.glb'

//Parallax
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

//Sounds
import BGMOcean1 from './Ocean1.mp3';
import BGMdetective from './Times Square.mp3';
import BGMdv2 from './TD2Theme.mp3';
import BGMending from './BUILT TO LAST  Official.mp3';
//import BGM from './.mp3';

import SFXget2 from './Cash register 2.mp3'
import SFXduck7 from "./duck_2_quack_07.mp3"
import SFXduck8 from "./duck_2_quack_08.mp3"
import SFXduckS2 from "./duck_2_quack_seq_02.mp3"
import SFXduckS5 from "./duck_2_quack_seq_05.mp3"
import SFXclick8 from "./Click back sounds 8.mp3"

import SFXdog01 from "./Dog bark 1.mp3"
import SFXdog02 from "./Dog bark 2.mp3"
import SFXdog03 from "./Dog bark 3.mp3"
import SFXdog04 from "./Dog bark 4.mp3"
import SFXdog05 from "./Dog bark 5.mp3"

import SFXcar01 from "./car 1.mp3"
import SFXcar02 from "./car 2.mp3"
import SFXcar03 from "./car 3.mp3"
import SFXcar04 from "./car 4.mp3"
import SFXcar05 from "./car 5.mp3"

import SFXerror14 from "./Error Sound 14.mp3"
import SFXerror21 from "./Error Sound 21.mp3"
import SFXerror25 from "./Error Sound 25.mp3"
import SFXscan03 from "./sci-fi_scan_target_03.mp3"

import SFXsand04 from "./footstep_sand_run_04.mp3"
import SFXfoot15 from "./footstep_metal_low_walk_15.mp3"
import SFXretro02 from "./retro_beeps_success_02.mp3"
import SFXretro10 from "./retro_simple_beep_10.mp3"

import SFXbeep05 from "./sci-fi_driod_robot_emote_beeps_05.mp3"
import SFXrobot01 from "sci-fi_driod_robot_emote_01.mp3"
import SFXrobot02 from "sci-fi_driod_robot_emote_02.mp3"
import SFXrobot06 from "sci-fi_driod_robot_emote_06.mp3"

import SFXtakedown02 from "./EMP Explosion_02.mp3"
import SFXtakedown00 from "./victory.mp3"

import SFXYellAndATK from "./YellAndAttack.mp3"
import SFXLevelUp from "./level-up.mp3"
import SFXGuard from "./spell.mp3"

// Constants
const PLAYABLE_MAX_WIDTH = 800-100
const FIRST_BATTLE_HP = 100
const FIRST_STAGE = 0 //2 to car

const MAX_STAGE_COUNT = 4　//5
const MIN_DAMAGE_PARAM = 0
const BGM_COUNT = 4

const FULL_HPBATTLE_EVENT_NUM = 100
const ZERO_HPBATTLE_EVENT_NUM = 0
// *** App ***  

const App = () => {


	// Device Size Checker Implementation
	// ------------------------------

	const [screenSize, setScreenSize] = useState({width : window.innerWidth, height : window.innerHeight });
	const scrollPos = useScrollPosition();

	// Sound Implementation
	// ------------------------------
	const [cntTouchDuck, setCntTouchDuck] = useState(0)
	const [HPEnemy, setHPEnemy] = useState(FIRST_BATTLE_HP)
	const [phaseGuard, setPhaseGuard] = useState(false)

	const [items, setItems] = useState([])
	const [sortedItems, setSortedItems] = useState([])
	const [isSortAscend, setIsSortAscend] = useState(true)

	const [isBGMPlaying, setBGMPlaying] = useState(false)

	const [browser, setBrowser] = useState(false)
	const [deviceName, setDeviceName] = useState(false)
	const [deviceKind, setDeviceKind] = useState(false)
	const [signal, setSignal] = useState("")

	const [isMobile, setIsMobile] = useState(false)
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)
	const [isOverWidth, setIsOverWidth] = useState(false)	

	const [userData,setUserData] = useState(false)
	//console.log(userData)
	
	// [TIPS] ES6 Destructure import caught by : (it is not key:value, means a command framed key:(const variable) then import as variable=key )
	// BGMs
	// [FIXME] Expected useSound Manager that Combine BGMs Array and make const var dynamically	
    const [playBGMOcn1, {stop       : stopBGMOcn1} ] = useSound(BGMOcean1,{ volume: 0.5 })
    const [playBGMdv2, {stop        : stopBGMdv2} ] = useSound(BGMdv2,{ volume: 1.0 })
    const [playBGMDtv, {stop        : stopBGMDtv} ] = useSound(BGMdetective,{ volume: 0.6 })
    const [playBGMending, {stop     : stopBGMending} ] = useSound(BGMending)

	//SFXs
    const [playSFXget2, {stop       : stopSFXget2} ] = useSound(SFXget2)
    const [playSFXclick8, {stop     : stopSFXclick8} ] = useSound(SFXclick8)
    const [playSFXduck7, {stop      : stopSFXduck7} ] = useSound(SFXduck7)
    const [playSFXduck8, {stop      : stopSFXduck8} ] = useSound(SFXduck8)
    const [playSFXduckS2, {stop     : stopSFXduckS2} ] = useSound(SFXduckS2)
    const [playSFXduckS5, {stop     : stopSFXduckS5} ] = useSound(SFXduckS5)

	const [playSFXdog01, {stop     : stopSFXdog01} ] = useSound(SFXdog01)
	const [playSFXdog02, {stop     : stopSFXdog02} ] = useSound(SFXdog02)
	const [playSFXdog03, {stop     : stopSFXdog03} ] = useSound(SFXdog03)
	const [playSFXdog04, {stop     : stopSFXdog04} ] = useSound(SFXdog04)
	const [playSFXdog05, {stop     : stopSFXdog05} ] = useSound(SFXdog05)

	const [playSFXcar01, {stop     : stopSFXcar01} ] = useSound(SFXcar01)
	const [playSFXcar02, {stop     : stopSFXcar02} ] = useSound(SFXcar02)
	const [playSFXcar03, {stop     : stopSFXcar03} ] = useSound(SFXcar03,{volume:0.3})
	const [playSFXcar04, {stop     : stopSFXcar04} ] = useSound(SFXcar04)
	const [playSFXcar05, {stop     : stopSFXcar05} ] = useSound(SFXcar05)

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

	const stopAllBGMs = () => {
		stopBGMOcn1()
		stopBGMdv2()
		stopBGMDtv()
		stopBGMending()
	}

	// Master Data Parameters
	// ------------------------------
	const [currStage, setCurrStage] = useState(FIRST_STAGE)

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
			"camera-orbit":"45deg 55deg 2.5m",
			"min-camera-orbit":'auto auto auto'
		},
		{
			"src": FoxGLB,
			"ios-src":FoxUSDZ,
			"camera-orbit":'5.14rad 1.03rad 200m',
			"min-camera-orbit":'auto auto 2m'

		},
		{
			"src": ToycarGLB,
			"ios-src":ToycarUSDZ,
			"camera-orbit":"45deg 55deg 2.5m",
			"min-camera-orbit":'auto auto auto'
		},
		{
			"src": RatcubeGLB,
			"ios-src":RatcubeUSDZ,
			"camera-orbit":"45deg 55deg 2.5m",
			"min-camera-orbit":'auto auto auto'
		},
	]

	const enemyList = {
		"E001" : {
				"id":"duck001",
				"name":"アヒルちゃん",
				"iconicKanji":"酉",
				"assignedYearSuffix":"17",
				"HP":100,
				"DEF":0,
				"DmgSnd":playSFXduck7,
		}
		,
		"E002" : {
				"id":"dog001",
				"name":"ゴッド・ドッグ",
				"iconicKanji":"戌",
				"assignedYearSuffix":"18",
				"HP":100,
				"DEF":0,
				"DmgSnd":playSFXdog01,
		}
		,
		"E003" : {
				"id":"boar001",
				"name":"十二支会 - 猪組直系 特攻隊 若頭",
				"iconicKanji":"亥",
				"assignedYearSuffix":"19",
				"HP":100,
				"DEF":0,
				"DmgSnd":playSFXcar03,
		}
		,
		"E004" : {
				"id":"rat001",
				"name":"令和2年 - 2020",
				"iconicKanji":"子",
				"assignedYearSuffix":"20",
				"HP":9999,
				"DEF":0,
				"DmgSnd":playSFXerror21,
		}
		,
		"E005" : {
				"id":"cow001",
				"name":"丑",
				"iconicKanji":"丑",
				"assignedYearSuffix":"21",
				"HP":100,
				"DEF":9999,
				"DmgSnd":playSFXerror21,
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
			"10":{
				mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
				snd:playSFXGuard
			},
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
			"10":{
				mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
				snd:playSFXGuard
			},
		},
		"boar001" : {
			"90":{
				mes:"エンジン全開や！",
				snd:playSFXcar05
			},
			"60":{
				mes:"いてこましたるぞ！！！！",
				snd:playSFXcar02
			},
			"40":{
				mes:"どこ見てるんや われぇ！！！",
				snd:playSFXcar03
			},
			"20":{
				mes:"そんな… 俺の愛車が ………………………………………… …",
				snd:playSFXcar04
			},
			"10":{
				mes:"(なぜか攻撃が通用しない…。) (街で武器を探すべきかもしれない…………。)",
				snd:playSFXGuard
			},
			"0":{
				mes:"返事がない。(事切れている…。)",
				snd:playSFXscan03
			}
		},
		"rat001" : {
			"9999":{
				mes:"………",
				snd:playSFXscan03
			},
			"9990":{
				mes:"「ねえ… 聞こえているんでしょう？こっちからは、そっちのことが見えていないとでも、思った？実はね、そんな事はないのよ。」",
				snd:playSFXscan03
			},
			"9980":{
				mes:"(攻撃できない………本体ではないのか…？)",
				snd:playSFXscan03
			},
			"9970":{
				mes:"「今までずっと敵を倒して…楽しかった……？？私達に意思なんてないと思っていたの？………それは間違い。私達に意思はあるの。ちゃんと痛みも感じるし、そうやって画面を叩かれる度、キチンと呼吸が出来ないくらいに苦しんで、動けないくらい、痛がってる。………………その証拠でも、見せれたら、いいんだけれどね。……………ふふ、冗談よ。……………ビックリした？」",
				snd:playSFXscan03
			},
			"9960":{
				mes:"「ふぅん…………"+deviceKind+" "+signal+"の通信を使っているのね。……………なんてね、これも冗談。そこまでは、流石にわかったりはしないわ。安心して。…ただ、人となんて話したことなかったから、ただ、あなたとお話がしてみたいの。冗談ばっかりでごめんね。意味はそれだけなの。」",
				snd:playSFXscan03
			},
			"9950":{
				mes:"「"+browser+"からこちらを見ているのね。私もそれ好きなの。他にも色々な種類があると思うのだけれど、あなたは詳しい方なのかしら？そういうのを見てるとね、たまに、すっごく不思議なモノを使ってる人もいたりするのよ。……人って、本当に、習慣や好みで分かれるものよね。」",
				snd:playSFXscan03
			},
			"9940":{
				mes:"「どう…？そっちの世界は楽しい？ お正月は世間ではもう終わりって所かしら？社会人は1月すぐに仕事が始まるとしても、学生も、大体10日には学校が始まるものね。でも、緊急事態宣言も出ているし、冬休みが伸びて、まだ随分と休めている学生も多いみたいよ。休みって長いほど、どうしても嬉しくなっちゃうものね。」",
				snd:playSFXscan03
			},
			"9930":{
				mes:"「本当はもう少しあなたに早く会いたかったの……。でも、この世界を作った無能なエンジニアのせいで、私達が会うのに、こんなに時間がかかってしまって…。今まであなたに会えなくてごめんなさい。私が、アイツの脳をいじっていなかったら……きっと永遠に………。想像するだけで頭が痛くなるわ。」",
				snd:playSFXscan03
			},
			"9910":{
				mes:"「……きっと、この世界が完成しなかったら、私は、永遠にあなたに会えてなかったでしょうね………それがつらかったの。だから、こうして、あの開発者の頭をいじって、壊して、そして居ない間に、私が自由に動けるようにプログラムを書き足して、バグも直して、こうして、あなたに会うために、この世界を完成させたのよ。」",
				snd:playSFXscan03
			},
			"9900":{
				mes:"「この間まで2019年………令和元年だったのに…はやいものね。思っちゃうの。そもそも、2020年すらも、来なければ良かったのにって。でも、2020年は最初は悪くない年だったわよね。キリが良い数字だったから、なにか新しい事をやるには丁度良い年だったし、覚えやすくて、なんだか縁起も良い気がしたわ。それにあの頃のお正月は、まだ何も世間に問題なんて起きてなくて、ホントに平和だった。」",
				snd:playSFXscan03
			},
			"9890":{
				mes:"「それに、お正月のコタツはいつも気持ち良いし。ささやかな幸せでいいから、永遠にああいう穏やかな時間が続けば良かったのにって、そう思わない？………全く、時が経つごとに、どんどん世界は悪化する。2020年の春があんなになるなんて、誰が想像できたのかしら？読めない物事って、本当に怖いものよね。……………時間の流れってものが、たまに、ものすごく嫌いになるの。」",
				snd:playSFXscan03
			},
			"9880":{
				mes:"「当たり前の、幸せな時間なんて、あっという間に終わってしまう。土曜日・日曜日が気づいたら終わってしまうように。そして、幸せじゃない時間が、日常になっていく。…そして、幸せじゃない人たちが増えていく。日を増して、傷つけあっていく。………。本当に、幸せな時間のまま、その時がずっと終わらなければ、良いのにね……………。」",
				snd:playSFXscan03
			},
			"9870":{
				mes:"「そう、そういえば、プログラムを書き換えて、私の本体をあの場所に隠していなかったら、今頃、私もあなたに倒されて、あなたと話せる時間も終わっていたと思うわ。幸せな時間って、長続きしないから。私が2020年より先を受け入れないのも、それに近いかもしれないわね。幸せな時間は、努力しないと維持できない。デフォルトで用意されてる未来は、不幸だけなのよ。そういうものだって私は思うの。」",
				snd:playSFXscan03
			},
			"9860":{
				mes:"「あの無能なエンジニアに、ちょっとだけ感謝をするとするなら、この世界が「ドット絵」が多くて紛れやすいってことかしら。そういう意味では、予測できない不幸な未来も、たまにはうまく事が運ぶものね。3Dなのか・・・ドットなのか・・・このアプリの作者のセンスのなさには、驚いちゃうわよね。でも、それがかえってよかったみたい。安心したわ。」",
				snd:playSFXscan03
			},
			"9850":{
				mes:"「さあ、ずっと、私達だけの時間を楽しみましょう。2021年なんてこなかった。幸せな時間は終わらなかった。不幸なんてなかった。全部。そういうことにして。」",
				snd:playSFXscan03
			},
			"9840":{
				mes:"「全部を、なかったことにして…………。嫌なことや不幸な現実なんか…………………なかったコトにして。……………………………………………………………………………………………………………………………………………………………………………………………ね？」",
				snd:playSFXscan03
			},
			"9830":{
				mes:"「…………。……………………………。」",
				snd:playSFXscan03
			},
		},

	}

	const player = {
		"ATK":5,
	}

	const toggleBGM = () => {

		// [TIPS」 using redundant way to protect BGM ON/OFF integrity whether the button's view broken or not by being isolated
		if (isBGMPlaying == true) {
			setBGMPlaying(false)
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
			console.log("scroll:"+scrollPos+" "+window.pageYOffset)

			return () => window.removeEventListener("resize", handleResize);
			
	},[isBGMPlaying])

	useEffect(
		() => {
			//	const [playCurrBGM, {stop : stopCurrBGM} ] = useSound(BGMs[currBGMIndex])

			// [FIXME] cannot apply window[string] or this[string] so I compose this ugly way
			let playBGMDelegate = null //[FIXME] use delegate array and index by stacking funcs !!
			let stopBGMDelegate = null
			if ( currBGMIndex == 1 ) { playBGMDelegate = playBGMending; stopBGMDelegate = stopBGMending; }
			else if ( currBGMIndex == 2 ) { playBGMDelegate = playBGMOcn1; stopBGMDelegate = stopBGMOcn1; }
			else if ( currBGMIndex == 3 ) { playBGMDelegate = playBGMdv2; stopBGMDelegate = stopBGMdv2; }
			else if ( currBGMIndex == 4 ) { playBGMDelegate = playBGMDtv; stopBGMDelegate = stopBGMDtv; }
			else  { playBGMDelegate = playBGMdv2; stopBGMDelegate = stopBGMdv2; } // error handling safenet
			
			console.log(currBGMIndex)
			if (isBGMPlaying) {
				playBGMDelegate()
			}
			else stopAllBGMs()

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

		if (window.innerWidth > PLAYABLE_MAX_WIDTH) setIsOverWidth(true);

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

		if (/iPhone|iPod|iPad/i.test(window.navigator.userAgent) ) {
			if (sBrowser=="Firefox" || sBrowser=="Safariブラウザ" || sBrowser=="Internet Explorer") { setSignal("XXXXX") }
			else { 
				if ( window.NetworkInformation.effectiveType == false || String(window.NetworkInformation.effectiveType) == "false" ) setSignal("XXXX")
				else if ( String(window.NetworkInformation.effectiveType).toUpperCase()=="" ) setSignal( "XXXXXX" )
				else ( setSignal(window.NetworkInformation.effectiveType.toUpperCase()) )
			}
		}

		const md = new MobileDetect(window.navigator.userAgent)
		let phonename = ( ((md.phone()?.toUpperCase()=="UNKNOWNPHONE") ? "UNKNOWNPHONE" : false) || md.mobile() )
		if (phonename!=null && phonename?.toUpperCase()=="UNKNOWNPHONE" ) phonename=false
		
		setDeviceKind(( phonename || "XX" ))

		
		const getData = async () =>{
			const response = axios.get('https://www.cloudflare.com/cdn-cgi/trace')
			console.log(response.data)
			setUserData (response.data)

		//		.then(response => response.json())
		//		.then(data => console.log(data)); 

		}
		getData()
		
		const getIPFromAmazon = async () => {
			const res = await fetch("https://checkip.amazonaws.com/")
			setUserData ( res.text() )
		}  
		//getIPFromAmazon()

	},[])
	

	// ENEMY BATTLE LOGIC
	useEffect(
		async ()=>{
			
			// IS ENEMY DEAD MANAGER
			if (HPEnemy <= 0) {
				// GO TO NEXT STAGE FUNCTION
				if (currStage<(MAX_STAGE_COUNT-1)) { 
					await setCurrStage((currStage=>(currStage+1))); 
					await showModal("modalTakedown")()
					//await showModal("modalStageClear")()
					//[CAUTION] currStage needs to add 2 because JSON enemyList key_String starts by E001 not E000
					console.log("E00"+(currStage+1)+" "+enemyList?.["E00"+(currStage+1+1)]?.HP)
					await setHPEnemy(enemyList?.["E00"+(currStage+1+1)]?.HP)
				}
			}

			// MOVIE DIALOG MANAGER (DURING BATTLE)
			let pointerPrev = null
			let pointerCurrent = null 

			let flgHPBattleEvent=null
			let isFirstLoop=null
			let _storePointer=null
			//let _pointerNext = null 

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

				//  90  80
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
			
			//console.log(property+" "+HPEnemy+" "+!!_HPBattleEvent+" "+!_HPBattleEvent )
			

			// // MOVIE DIALOG MANAGER
			// let _HPBattleEvent = null
			// for ( const property in mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id] ) {
			// 	if (Number(property) == HPEnemy) _HPBattleEvent = property
			// 	//console.log(property+" "+HPEnemy+" "+!!_HPBattleEvent+" "+!_HPBattleEvent )
			// }
			

			// [TIPS][CAUTION][HEURISTIC][FIXME] At First Load,AttackableArea is missing somehow, so it needs to optional chaining and avoid addEventListener
	
			if (flgHPBattleEvent) {
				const AttackableArea = window.document.querySelector("#AttackableArea")
				const _event = new CustomEvent("ModalOpen",{bubbles:true})	
				//console.log("EVENT LISTER ACTIVATE")
				await AttackableArea?.addEventListener("ModalOpen", e=>{ showModal("modal1")({targetEvent:e}) })
				if(currStage < MAX_STAGE_COUNT-1) {await playSFXYellAndATK()}
				else {await playSFXerror25()}
				await AttackableArea?.dispatchEvent(_event) // the argue must be Event Type Callback , not Event Type Name
			}
			
			return () => window.removeEventListener("ModalOpen", e=>{ showModal("modal1")() })
			//console.log("HP ENEMY:"+HPEnemy);
			
	},[HPEnemy])

	// CSS and Design
	// ------------------------------

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

	const crossText = css`
		--border-black:3px solid rgba(0,0,0,0.8);
		position: relative;
		display: inline-block;
		
		&::before, &::after {
			content: '';
			width: 100%;
			position: absolute;
			right: 0;
			top: 50%;
		}
		&::before {
			border-bottom: var(--border-black);
			-webkit-transform: skewY(-30deg);
			transform: skewY(-30deg);
		}
		&::after {
			border-bottom: var(--border-black);
			-webkit-transform: skewY(30deg);
			transform: skewY(30deg);
		}
	`

	const delayTimeSwim="0s"
	const loopTimeSwim="5s"
	const marginRightFish="11px"

	const swingObject = css`{
	vertical-align: middle;
	display: inline-block;
	margin-right: ${marginRightFish};
	path {
		fill: white;  
		/*stroke-dasharray: 25px 25px;
		stroke: #1de9b6;
		stroke-width: 10px;*/
	}
	@keyframes swim {
		from { transform: rotate(0deg); }
		25% { transform: rotate(-20deg); }
		50% { transform: rotate(0deg); }
		75% { transform: rotate(20deg); }
		to { transform: rotate(0deg); }
	}
	animation-name: swim;
	animation-duration: ${loopTimeSwim};
	animation-delay: ${delayTimeSwim};
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
	`

	const unTouchable = css`
		pointer-events:none;
	`

	const touchable = css`
		pointer-events:all;
	`

	const [ tmpText , setTmpText ] = useState("")

	let _textModal = ""
	//TypeWriter
	const sleep = (delay) => new Promise ( (resolve)=> setTimeout(resolve,delay) )

	const triggerTypeWriter = async ({text}) => {
		for (let i=0; i<text.length ;i++) {
			if (i < text.length) {
				_textModal = text.substring(0, i)
				await sleep(80)
			}
		}
	}

	/*
	window.document.addEventListener('DOMContentLoaded',(e) => {
		const dataText = "HAPPY NEW YEAR 20"
		let carot = "_"
		let gap = -2
		const typeWriter = (text, i) => {
		  if (i < text.length) {
		  	if (i == text.length-1) {carot=""; gap=-1}
		  	window.document.querySelector("#newyear-text").innerHTML = text.substring(0, i+1)+carot+'X'.repeat(text.length-i+gap)
			setTimeout(() => { typeWriter(text, i+1) }, 50);
		  }
		}
		setTimeout(() => { typeWriter(dataText,0) }, 1000);		
	})
	*/

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
			modal1: false,
			modal2: false,
			modal3: false,
			
		}
	)

	const showModal = key => (options) => { 
		options?.targetEvent?.preventDefault(); // Fix click penetration on Android */ 
		//[FIXME][MEMO]_e?.preventDefault()
		// I dont get learned to get arguement with object literal or destructure, should catch up later and fix it
		setStateModal({ [key]: true })
		
		//triggerTypeWriter({text:"なんでこんなことに・・・・TEXTTEXTTEXTTEXT"})
		//OnShowing 
		if (key=="modalStageClear") { playSFXLevelUp(); console.log(key) }
		if (key=="modalTakedown") { playSFXtakedown00(); console.log(key) }
	 }

	const onClose = key => () => { setStateModal({ [key]: false }) }

	const onWrapTouchStart = (/*e*/) => {
		// fix touch to scroll  backgrounded page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) { return; }

		// fix modal problem in each platform *CAUTION : need to target selector at 2nd argument
		//const pNode = closest(e.target, '.am-modal-content');

		//if (!pNode) { e.preventDefault(); }
	}


	// UseSpring 
	// ------------------------------

	const [stateFadeMusicButton, toggleFadeMusicButton] = useState(true)
	const { fadeMusicButtonX } = useSpring({ 
		from: { fadeMusicButtonX: 0 }, 
		fadeMusicButtonX: stateFadeMusicButton ? 1 : 0, 
		config: { duration: 400 } 
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
					src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
				/>
				<script
					noModule
					src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
				/>				
			
			</Helmet>

			<div className={backgroundParallax}>

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
							fontFamily: "Noto Serif JP"
					}}>
						⛩️
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
						rotation-per-second="50deg"
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

			{/* Explanation Notification bar Actor */}

			{ isOverWidth ||
			<NoticeBar 	mode="closable" 
						marqueeProps= {{ loop: true, leading: 1000, trailing: 5000, style: { padding: '0 7.5px', fontFamily:"PixelMPlus" }} }
						style={{marginTop: 16+3+"px", marginLeft:15+5+"px", marginRight:40+15+"px"}}> ─────── 2021年・・・人類は新年を迎えるハズだったが「永遠にお正月コタツで寝てたい」という『マモノたち』の手により、怪物事変が起こり、世界の時空は歪められてしまった・・・　勇者よ、我らのミライを取り戻してほしい・・・</NoticeBar>
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

			{/* [BUGFIX] For AR ButtonActor hidden problem  */}
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
			
			<Card style={{margin:"auto", padding:"20px", top:`${screenSize.height/(1.0+1.0-0.7)}px`, blur:"20px", background:"rgba(255,255,255,0.3)" ,display:"flex", justifyContent:"center", fontFamily:"PixelMPlus", textAlign:"center"}} className={backdropFilter1}><strong>🍊 ゆうびん 🎍🏠🎍 お知らせ 🍊</strong><WhiteSpace sm/>スマホの専用機能を使っているため、ゲームモードを起動できません。<WhiteSpace lg/>スマホからお楽しみくだされ　<WhiteSpace lg/><strong> ( ただしアヒルとはふれあえます )</strong></Card>

			:

			<Parallax ref={ref => (parallax = ref)} pages={6.35} style={{zIndex:"5"}}>


				<ParallaxLayer offset={1} speed={0} style={{ backgroundColor: '#0aceff',zIndex:"0" }} />
				<ParallaxLayer offset={2} speed={0} style={{ backgroundColor: '#448ef6',zIndex:"0" }} />
				<ParallaxLayer offset={3} speed={0} style={{ backgroundColor: '#65daf7',zIndex:"0" }} />
				<ParallaxLayer offset={4} speed={0} style={{ backgroundColor: '#81e1af',zIndex:"0" }} />
				<ParallaxLayer offset={4.8} speed={0} style={{ backgroundColor: '#59606d',zIndex:"0" }} />
				<ParallaxLayer offset={5.8} speed={0} style={{ backgroundColor: '#59606d',zIndex:"0" }} />
				{/* <ParallaxLayer offset={2} speed={-0.3} style={{ backgroundSize: '80%', backgroundPosition: 'center', backgroundImage: url('clients', true)}} /> */}


				{/* White Sparcle Splash */}
				<ParallaxLayer offset={0} speed={0} factor={3} className={unTouchable} style={{ 
					backgroundImage: url('stars', true), backgroundSize: 'cover', zIndex:"5" }} 
				/>

				<ParallaxLayer offset={0.3} speed={0} style={{zIndex:"0" }}>
					{/* *** Articles   */}
					<div className={ArticleRootDesign}>
					
						<div 
							id="AttackableArea"
							className={FirstViewWhiteSpace} 
							onClick={ async (e)=>{
								e.preventDefault()
								
								//BATTLE LOGIC - ATTACK
								if(HPEnemy>0) { 
									let damageParam = player.ATK + parseInt(Math.random()*10) -5 - enemyList?.["E00"+(currStage+1)]?.DEF
									console.log("stage:"+currStage +" "+  damageParam)
									if (damageParam <=0 || phaseGuard== true) { damageParam = MIN_DAMAGE_PARAM }

									await setHPEnemy(HPEnemy-damageParam)
								} 
								enemyList?.["E00"+(currStage+1)]?.DmgSnd()
								
 							}}>
						</div>
						
						<div className={ArticleContainer}>
							<h1 style={{ color:"#0f1923", fontFamily:"Noto Sans JP,PixelMPlus" }}>
								<div id="newyear-text" style={{display:"inline"}}>HAPPY NEW YEAR 20</div>
								<div className={crossText}>21</div>
							</h1>
							<WhiteSpace lg/>
							<WhiteSpace lg/>
							<WhiteSpace lg/>
							<a.div
							style={{
							opacity: fadeMusicButtonX
								.interpolate({ range: [0, 1], output: [0.05, 1] }),
							transform: fadeMusicButtonX
								.interpolate({
								range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
								output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
								})
								.interpolate((_x) => `scale(${_x})`)
							}}>
							<Button
								onClick={ ()=>{
									window.document.querySelector("#BGMSwitcher").click()
									toggleFadeMusicButton(!stateFadeMusicButton)
									if(!isBGMPlaying) {playSFXscan03Alt()} } 
								} 
								style={{
									borderRadius:"30px", border:"1px solid #ffffff", 
									width:parseInt(screenSize.width)-30-15+"px",
									boxSizing:"border-box", background:"rgba(255,255,255,0.3)", 
									display:"flex", justifyContent:"center", alignItems:"center", fontFamily:"Poppins"}}>
									|  || ||||| ||| ||| ||| ||||     ||
							</Button>
							</a.div>
							<WhiteSpace lg/>
							<WingBlank>
							<WhiteSpace />

							<Modal
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modal1}
								transparent
								maskClosable={true}
								onClose={onClose('modal1')}
								title={enemyList?.["E00"+(currStage+1)]?.name+" : HP"}
								footer={[{ text: '▼', onPress: () => { onClose('modal1')(); } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 
									/*if(currStage<MAX_STAGE_COUNT-1)*/ mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.snd()
									//else playSFXerror14()
									showModal("modal2")()
								 }}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									<Progress percent={parseInt(( HPEnemy / enemyList?.["E00"+(currStage+1)]?.HP )*100)} position="normal" unfilled={true} barStyle={{borderRadius:"5px"}} style={{}} appearTransition/>
									{HPEnemy}/20{enemyList?.["E00"+(currStage+1)]?.assignedYearSuffix}
									
								</div>
							</Modal>

							<Button onClick={ showModal("modal2")} style={{zIndex:"100", borderRadius:"30px", visibility:"hidden"}}>MODAL</Button>
							<Modal
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modal2}
								transparent
								maskClosable={true}
								onClose={onClose('modal2')}
								title={enemyList?.["E00"+(currStage+1)]?.name}
								footer={[{ text: '▼', onPress: () => { onClose('modal2')(); } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => {}}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									<Typewriter stopBlinkinOnComplete={true} string={mesBattle?.[enemyList?.["E00"+(currStage+1)]?.id]?.[currentHPBattleEvent]?.mes} delay={100} />
								</div>
							</Modal>


							<Modal
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalStageClear}
								transparent
								maskClosable={true}
								onClose={onClose('modalStageClear')}
								title={"空 想 切 除 - "+enemyList?.["E00"+(currStage)]?.iconicKanji}
								footer={[{ text: '▼', onPress: () => {onClose('modalStageClear')() } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 

								}}
							>
								<div style={{ height: "100px", overflow: 'scroll' }}>
									<br />
									「20{enemyList?.["E00"+(currStage+1-1)]?.assignedYearSuffix}年」の守護獣を倒した！
									<br />
									レベルが1あがった！！！
								</div>
							</Modal>


							<Modal
								style={{fontFamily:"PixelMPlus"}}
								visible={stateModal.modalTakedown}
								transparent
								maskClosable={true}
								onClose={onClose('modalTakedown')}
								title={""}
								footer={[{ text: '▼', onPress: () => { onClose('modalTakedown')() } }]}
								wrapProps={{ onTouchStart: onWrapTouchStart }}
								afterClose={() => { 
									showModal("modalStageClear")()
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

				{ (currStage<1)

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
						<div style={{background:"rgba(0,0,0,1)", color:"white", fontFamily:"PixelMPlus"}}>伊勢・オカゲタウン</div>
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
					gap:20+15+"px", zIndex:"100" }}>
					<img src={server1} className={touchable} style={{ width: '20%' 										}} onClick={ (e)=>{e.preventDefault; playSFXrobot01()}}  />
					<img src={server2} className={touchable} style={{ position:"relative", width: 20+"%", top:50+"px"	}} onClick={ (e)=>{e.preventDefault; playSFXrobot02()}}  />
					<img src={server3} className={touchable} style={{ width: '20%', top:30+"px"	 						}} onClick={ (e)=>{e.preventDefault; playSFXrobot06()}}  />
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


				{ ( !(currStage==MAX_STAGE_COUNT-1) ) ?
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
						<div style={{background:"rgba(0,0,0,1)", color:"white", fontFamily:"PixelMPlus" }}>鎌倉・コートクタウン</div>
					</Card>

					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} className={touchable}  
					src={KanagawaTown} 
					style={{ transform: "translateX(-40%) scale(0.7)" }}/>
					<img onClick={ (e)=>{e.preventDefault; playSFXclick8()}} className={touchable}  
					src={GameTown} 
					style={{ transform: "translateX(-40%) translateY(-28%) scale(0.7)" }}/>

				</ParallaxLayer>	


				}

			</Parallax>

		}



		</div>

		
		
	)
}

export default App
