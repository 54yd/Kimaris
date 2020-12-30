import React from 'react'
import { useState, useEffect } from 'react'
import { css } from 'emotion'

import "./Root.css"

import * as R from 'ramda'
import * as ModelViewer from "@google/model-viewer"
import {
	Flex,
	Button,
	PlaceHolder,
	Card,
	WingBlank,
	WhiteSpace,
	Modal,
	Icon
  } from "antd-mobile"


const App = () => {
	// Constructor

	const Foundation = css`
		width:100%;
		height:100%;
		display : grid;
		/* backgrounded: linear-gradient(#ff4655, #7bcecc); */

		 backgrounded:linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
			linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
		z-index: 0;	

	`

	const backgroundedBoard = css`
		width:100%;
		height:500px;
		margin : 0 0 0 0
		grid-template-columns: 1fr
		z-index: 1;
	`	
	const ModelViewerContainer = css`
		width:500px;
		height:500px;
		margin : 0 0 0 0
	`

	const MainDesign = css`
		display: flex;
		justify-content:center;

		text-align: center;
		color: gray;
		font-family: "Noto Sans JP","Helvetica";
	`
	const Container = css`
		align-items:center;
		z-index: 2;
		
	`


	const [items, setItems] = useState([])
	const [sortedItems, setSortedItems] = useState([])
	const [isSortAscend, setIsSortAscend] = useState(true)


	
	// Sorting Button Implementation
	// ------------------------------

	const onclicked = async () => { console.log("clicked") }
	useEffect(() => { /*console.table(items)*/ })

	// List Component (should be split from this file in the future)
	// ------------------------------
	const modelPath = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf';

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

	const [ stateModalAudioAgreement,setStateModalAudioAgreement ] = useState(
		{
			modal1: false,
			modal2: false,
		}
	)

	const showModal = key => (e) => {
		e.preventDefault(); // 修复 Android 上点击穿透
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

	// Component
	// ------------------------------
	return (
		
		<div className={Foundation}>
			<div className={backgroundedBoard}>
				<model-viewer 	src={modelPath} 
								className={ModelViewerContainer}
								alt="3Dmodel" 
								auto-rotate 
								camera-controls 
								shadow-intensity="1" 
								ar 
								ar-scale="auto" >
					<button slot="ar-button" 
							style={{
								fontFamily:"Helvetica",
								background:"white", 
								borderRadius: "4px", 
								border: "none", 
								position: "absolute", 
								fontSize:"20px",
								top: "16px", 
								right: "16px",
								padding: "8px",
								textAlign: "center",
							}}>🎍
					</button>
				</model-viewer>
			</div>
			<div className={MainDesign}>
				
		
				<div className={Container} >
					<h1 style={{ color:"#0f1923" }}>GUSHION</h1>
					<Button onClick={onclicked}>Hello World</Button>
					<WhiteSpace />

					<Card>
				<Card.Header
				title="秀知院学園 - 生徒会室"
				thumb="https://lostinanime.com/wp-content/uploads/2019/01/Kaguya-sama-Kokurasetai-01-33.jpg"
				thumbStyle={{
					width: "30px",
					borderRadius: "40px",
					marginRight: "10px"
				}}
				extra={<span style={{ fontSize: "12px" }} />}
				/>
				<Card.Body>
				<WhiteSpace size="lg" />
				<div>入室許可証</div>
				</Card.Body>
				<Card.Footer
				content="| || ||| || ||"
				extra={<div>学生番号:1D28001</div>}
				/>
			</Card>
			<WhiteSpace size="lg" />

				</div>

				
			

	{/*
				<WingBlank>

				<Button onClick={onclicked}>
					<Icon type="up" />basic<Icon type="up" />
				</Button>
				<WhiteSpace />
					<Modal
					visible={stateModalAudioAgreement.modal1}
					transparent
					maskClosable={false}
					onClose={onClose('modal1')}
					title="Title"
					footer={[{ text: 'Ok', onPress: () => { console.log('ok'); onClose('modal1')(); } }]}
					wrapProps={{ onTouchStart: onWrapTouchStart }}
					afterClose={() => { alert('afterClose'); }}
					>
						<div style={{ height: 100, overflow: 'scroll' }}>
							scoll content...<br />
						</div>
					</Modal>
				</WingBlank>
	*/}
			</div>
		</div>
	)
}

export default App
