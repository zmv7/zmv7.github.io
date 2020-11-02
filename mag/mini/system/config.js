/**
 * System configuration
 */

'use strict';

/* jshint unused:false */

var configuration = (function () {
	var config = {
			newRemoteControl: false,
			allowBluetooth: false,
			allowMulticastUpdate: false,
			videoOutputMode: [
				{value: 'Auto', title: 'Auto', translated: false},
				{value: 'PAL', title: 'PAL (576i)', translated: true},
				{value: '576p-50', title: '576p-50', translated: true},
				{value: '720p-50', title: '720p-50', translated: true},
				{value: '1080i-50', title: '1080i-50', translated: true},
				{value: '1080p-50', title: '1080p-50', translated: true},
				{value: 'NTSC', title: 'NTSC (480i)', translated: true},
				{value: '720p-60', title: '720p-60', translated: true},
				{value: '1080i-60', title: '1080i-60', translated: true},
				{value: '1080p-60', title: '1080p-60', translated: true}
			]
		},
		model = gSTB.GetDeviceModelExt(),
		control = null;

	switch ( model ) {
		case 'AuraHD2':
		case 'AuraHD3':
		case 'AuraHD8':
		case 'MAG275':
		case 'WR320':
			config.newRemoteControl = true;
			break;

		// remove 576p-50 video mode
		// TODO: remove this code when MAG256 fix this video mode
		case 'MAG256':
		case 'MAG257':
			config.videoOutputMode = [
				{value: 'Auto', title: 'Auto', translated: false},
				{value: 'PAL', title: 'PAL (576i)', translated: true},
				{value: '720p-50', title: '720p-50', translated: true},
				{value: '1080i-50', title: '1080i-50', translated: true},
				{value: '1080p-50', title: '1080p-50', translated: true},
				{value: 'NTSC', title: 'NTSC (480i)', translated: true},
				{value: '720p-60', title: '720p-60', translated: true},
				{value: '1080i-60', title: '1080i-60', translated: true},
				{value: '1080p-60', title: '1080p-60', translated: true}
			];
			break;

		case 'MAG351':
		case 'MAG352':
		case 'MAG420':
		case 'MAG422':
		case 'MAG424':
		case 'MAG425':
		case 'IM4410WV':
		case 'IM4411':
		case 'IM4411V':
		case 'IM4411WV':
		case 'IM4412':
			config.videoOutputMode = [
				{value: 'Auto', title: 'Auto', translated: false},
				{value: 'PAL', title: 'PAL (576i)', translated: true},
				{value: '576p-50', title: '576p-50', translated: true},
				{value: '720p-50', title: '720p-50', translated: true},
				{value: '1080i-50', title: '1080i-50', translated: true},
				{value: '1080p-50', title: '1080p-50', translated: true},
				{value: 'NTSC', title: 'NTSC (480i)', translated: true},
				{value: '720p-60', title: '720p-60', translated: true},
				{value: '1080i-60', title: '1080i-60', translated: true},
				{value: '1080p-60', title: '1080p-60', translated: true},
				{value: '3840x2160p50', title: '3840x2160p-50', translated: true},
				{value: '3840x2160p60', title: '3840x2160p-60', translated: true}
			];
			break;

		default:
			break;
	}

	// enable bluetooth only for these devices
	if ( ['MAG424', 'IM4410', 'IM4410WV', 'IM4412'].indexOf(model) > -1 ) {
		config.allowBluetooth = true;
	}

	try{
		control = JSON.parse(gSTB.GetEnv('{"varList":["controlModel"]}'));
		if ( !control.errMsg && control.result && control.result.controlModel ) {
			if ( control.result.controlModel === 'SRC4513' ) {
				config.newRemoteControl = true;
			} else {
				config.newRemoteControl = false;
			}
		}
	} catch (e) {
		echo(e ,'controlModel parse')
	}

	return config;
})();
