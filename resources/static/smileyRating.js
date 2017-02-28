(function (window, $) {

	"use strict";

	$.fn.adcSmileyrating = function adcSmileyrating(options) {

		(options.backgroundBorderSize = options.backgroundBorderSize);
		(options.smileyminwidth = options.smileyminwidth);
		(options.smileybigcoef = options.smileybigcoef);
		(options.smileycoef = options.smileycoef);
		(options.animate = options.animate);
		(options.animateSpeed = options.animateSpeed);
		(options.turnOnDK = options.turnOnDK);
		(options.controlAlignment = options.controlAlignment);
		(options.dkfontSize = options.dkfontSize);
		(options.controlheight = options.controlheight);
		(options.dkAlignment = options.dkAlignment);
		(options.dkborderSize = options.dkborderSize);
		(options.tooltipBorderThickness = options.tooltipBorderThickness);
		(options.showTooltips = options.showTooltips);
		(options.tooltipFontSize = options.tooltipFontSize);
		(options.controlwidth = options.controlwidth);
		(options.controlmaxwidth = options.controlmaxwidth);
		(options.controlheight = options.controlheight);
		(options.availableResponsesCount = options.availableResponsesCount);
		(options.autoForward = options.autoForward);

		var sizeCoef;
		var backgroundHeightCoef;
		var youHaveClicked = false;

		$(this).css({'max-width':options.controlmaxwidth,'width':options.controlWidth});
		$(this).parents('.controlContainer').css({'width':'100%','overflow':'hidden'});
		
		if ( options.controlAlignment === "center" ) {
			$(this).parents('.controlContainer').css({'text-align':'center'});
			$(this).css({'margin':'0px auto'});
		} else if ( options.controlAlignment === "right" ) {
			$(this).css({'margin':'0 0 0 auto'});
		}
		
		//$(this).css({'max-width':options.controlmaxwidth});
		
		function getValue(string){
			var value;
			if ( string.indexOf("px") != -1 ) {
				value = Math.round(parseFloat(string));
			}
			else if ( string.indexOf("%") != -1 ) {
				value = parseFloat(string);
			}
			else {
				value = Math.round(parseFloat(string));
			}
			return value;
		}



		function computeSmileyMinWidth(smileyMinWidth,imgPercentWidth){
			var smileyMinPercent = 0;
			if (smileyMinWidth.indexOf("%") != -1) {
				if (imgPercentWidth < getValue(smileyMinWidth)) {
					smileyMinPercent = getValue(smileyMinWidth);
				}
				smileyMinWidth = Math.round(getValue(smileyMinWidth)*$(".smileysSection").width()/100);
			}
			else{
				smileyMinWidth = getValue(smileyMinWidth);
			}
			return {
				smileyMinPercent: smileyMinPercent,
				smileyMinWidth: smileyMinWidth
			};  
		}



		function computeClassesWithoutGrey($img,$adcAnswers,length){
			var path = "";
			var index,boundary;
			for (index = 0,boundary=(length-1); index < boundary; index++) {
				path += $img.attr("src").split("/")[index] + "/";
			}
			path += ($img.attr("src").split("/")[(length-1)]).replace('Grey','');
			$img.attr("src",path);
			$img.addClass("bigsmile");
			$adcAnswers.find('input').val(""+$img.attr("class").split("answer")[1].split("answer")[0]);
			$adcAnswers.find('input').attr("class",$img[0].id);
            if (window.askia) {
                askia.triggerAnswer();
            }
		}
		
		
		
		function autoForward(){
			if ( options.autoForward == 'true' && youHaveClicked) {
				var index, boundary, $smileys = $('.answerContent');
				var next = true;
				for ( index = 0, boundary = $smileys.length; index < boundary; index++) {
					if ( $('input',$($smileys[index])).val() == "" ) {
						next = false;
					}
				}
				if (next) {
					$('input[name=Next]',$('#navcontent')).click();
				}
			}
		}



		function fatImage($img,$adcAnswers){
			var length = $img.attr("src").split("/").length;
			var answerHeight = $(".answers", $adcAnswers).height();
			var borderSize = parseInt(options.backgroundBorderSize);
			var imgPercentWidth = 100/($(".smile", $adcAnswers).length*2);
			var smileysMin = computeSmileyMinWidth(options.smileyminwidth,imgPercentWidth);
			var smileyMinPercent = smileysMin.smileyMinPercent;
			var smileyMinWidth = smileysMin.smileyMinWidth;
			var imgPercentWidthMin = smileyMinWidth/$(".answers", $adcAnswers).width()*100;
			var gapPercentWidth = ( 100-imgPercentWidth*$(".smile", $adcAnswers).length )/($(".smile", $adcAnswers).length - 1);
			var resizeCoef = parseFloat(options.smileybigcoef);
			var percentLeft = (parseInt($img.attr("id").split("smile")[1]) - 1) * imgPercentWidth + (parseInt($img.attr("id").split("smile")[1]) - 1) * gapPercentWidth;
			var bigPercentLeft = percentLeft - ((resizeCoef*imgPercentWidth) - (parseFloat(options.smileycoef)*Math.max(imgPercentWidth,smileyMinPercent)))/2 ;
			var imgBigSize = Math.round(Math.max( imgPercentWidth*resizeCoef * $(".smileysSection", $adcAnswers).width() /100, smileyMinWidth));
			computeClassesWithoutGrey($img,$adcAnswers,length);
			if ( $img.width() == imgBigSize) {
				if (options.animate == "yes") {
					$img.animate({width:imgPercentWidth*resizeCoef+'%', left:percentLeft+'%'},parseInt(options.animateSpeed));
				}
				else{
					$img.css({width:imgPercentWidth*resizeCoef+'%', left:percentLeft+'%'});
				}
			} else if ( $img.width() == smileyMinWidth ) {
				var gapPercentWidthMin = (Math.round(10*parseFloat($img.css("left"))/$img.parent().width()*100,1)/10 - ( 100/($(".smile", $adcAnswers).length*2)*resizeCoef/parseFloat(options.smileycoef) - ($img.width()/$img.parent().width()*100))/2 );
				if (smileyMinPercent != 0) {
					if (options.animate == "yes") {
						$img.animate({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:bigPercentLeft+'%'},parseInt(options.animateSpeed));
					}
					else{	
						$img.css({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:bigPercentLeft+'%'});
					}
				}
				else {
					if (options.animate == "yes") {
						$img.animate({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:gapPercentWidthMin+'%'},parseInt(options.animateSpeed));
					}
					else{
						$img.css({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:gapPercentWidthMin+'%'});
					}
				}
			} else {
				if (options.animate == "yes") {
					$img.animate({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:bigPercentLeft+'%'},parseInt(options.animateSpeed));
				}
				else{
					$img.css({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px', left:bigPercentLeft+'%'});
				}
			}
			autoForward();
		}



		function computeClassesWithGrey($adcAnswers,length){
			var imgSize;
			if ( parseFloat(options.smileycoef) <= parseFloat(options.smileybigcoef) ) {
				imgSize = Math.min($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());
			}
			else{
				imgSize = Math.max($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());
			}
			var path = "";
			var index,boundary;
			for (index = 0,boundary = (length - 1); index < boundary; index++) {
				path += $("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("src").split("/")[index] + "/";
			}
			path += 'Grey';
			path += $("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("src").split("/")[(length-1)];
			$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("src",path);
			return imgSize;
		}



		function transformInGreyImg($adcAnswers){
			var length = $("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("src").split("/").length;
			var answerHeight = $(".answers", $adcAnswers).height();
			var borderSize = parseInt(options.backgroundBorderSize);
			var imgPercentWidth = 100/($(".smile", $adcAnswers).length*2);
			var resizeCoef = parseFloat(options.smileycoef);
			var gapPercentWidth = ( 100-imgPercentWidth*$(".smile", $adcAnswers).length )/($(".smile", $adcAnswers).length - 1);
			var numberImg = parseInt($("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("id").split("smile")[1]);
			var percentLeft = (numberImg - 1) * imgPercentWidth + (numberImg - 1) * gapPercentWidth;
			var imgSize = computeClassesWithGrey($adcAnswers,length);
			$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).css({width:imgPercentWidth*resizeCoef+'%', top:-((answerHeight/2) + borderSize + (imgSize/2))+'px', left:percentLeft+'%'});
			$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).removeClass("bigsmile");
		}



		function fatDK($element, $adcAnswers){
			$element.attr("class",$element.attr("class")+" dkselected");
			$adcAnswers.find('input').val($element.attr("class").split(" ")[0]);
            if (window.askia) {
                askia.triggerAnswer();
            }
			$adcAnswers.find('input').attr("class",$element[0].id);
			autoForward();
		}



		function clickEvent($adcAnswers){
			$('.smile',$adcAnswers).mousedown(function(){
				youHaveClicked = true;
				var index, boundary, element = $( ".smile:animated",$adcAnswers );
				for (index = 0,boundary = element.length; index < boundary; index++) {
					if ( $($( ".smile:animated",$adcAnswers )[index])[0].id != $(this)[0].id ) {
						$($( ".smile:animated",$adcAnswers )[index]).stop();
					}
				}
				if ( $adcAnswers.find('input').attr("class") != $(this)[0].id) {
					if ($adcAnswers.find('input').attr("class") != "empty") {
						if ( $adcAnswers.find('input').attr("class").indexOf("smile") == -1 ) {
							$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("class",$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("class").replace("dkselected",""));
						}
						else {
							transformInGreyImg($adcAnswers);
						}
					}
					fatImage($(this),$adcAnswers);
				}
			});
			if ( options.turnOnDK == "dkon" ) {
				$('.dkdiv',$adcAnswers).mousedown(function(){
					youHaveClicked = true;
					$( ".smile:animated",$adcAnswers ).stop();
					if ( $adcAnswers.find('input').attr("class") != $(this)[0].id) {
						if ($adcAnswers.find('input').attr("class") != "empty") {
							if ( $adcAnswers.find('input').attr("class").indexOf("smile") == -1 ) {
								$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("class",$("#"+$adcAnswers.find('input').attr("class"),$adcAnswers).attr("class").replace("dkselected",""));
							}
							else{
								transformInGreyImg($adcAnswers);
							}
						}
						fatDK($(this), $adcAnswers);
					}
				});
			}
		}



		function fixImgId($adcAnswers,indexLoop){
			var index, boundary, element = $('.smile',$adcAnswers);
			for (index = 0, boundary = element.length; index < boundary; index++) {
				$($('.smile',$adcAnswers)[index]).attr("id",indexLoop+"smile"+(index+1));
			}
			if ( options.turnOnDK == "dkon" ) {
				$('.dkdiv',$adcAnswers).attr("id",indexLoop+"DKanswer");
			}
		}



		function fixImgPosition($adcAnswers){
			/*
			if (options.controlAlignment == "right") {
				$(".smileysSection", $adcAnswers).css({"margin-right":-($(".smileysSection", $adcAnswers).width() - $(".answers", $adcAnswers).width())/2+'px'});
			}
			else if (options.controlAlignment == "left") {
				$(".smileysSection", $adcAnswers).css({"margin-left":-($(".smileysSection", $adcAnswers).width() - $(".answers", $adcAnswers).width())/2+'px'});
			}
			*/
		}



		function computeSmileyBigHeight($adcAnswers){
			var smileyBigHeight;
			if ( parseFloat(options.smileycoef) <= parseFloat(options.smileybigcoef) ) {
				smileyBigHeight = Math.min($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());
				smileyBigHeight = smileyBigHeight/parseFloat(options.smileycoef)*parseFloat(options.smileybigcoef);
			}
			else{
				smileyBigHeight = Math.max($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());
			}
			return smileyBigHeight;
		}



		function alignDK(dkAlignment,$adcAnswers,dkPadding,dkborderThickness){
			if ( options.turnOnDK == "dkon" ) {
				if ( dkAlignment == "right" ) {
					$('.dkdiv').css({right:'0px'});
				}
				else if ( dkAlignment == "left" ) {
					$('.dkdiv').css({left:'0px'});
				}
				else if ( dkAlignment == "center" ) {
					$('.dkdiv').css({left:(($('.smileysSection',$adcAnswers).width()/2-dkPadding-dkborderThickness-$('.dkdiv',$adcAnswers).width()/2))+'px'});
				}
			}
		}



		function computePaddings(backgroundHeight,smileyBigHeight,borderThickness,dkPadding,additionnalPadding,isInLoop){
			if ( backgroundHeight < smileyBigHeight ) {
				$('.dkdiv').css({top:((smileyBigHeight-backgroundHeight)/2+2+borderThickness+dkPadding)+'px'});
				$('.answerContent').css({paddingBottom:((smileyBigHeight-backgroundHeight)/2+2+borderThickness+dkPadding*2+$('.dkdiv').height())+'px'});
				$('.smileyratingquestion').css({margin:0+"px"});
				$('.smileyratingquestion').css({"padding-bottom":((smileyBigHeight-backgroundHeight)/2+2+borderThickness+additionnalPadding)+'px'});
				if ( !isInLoop ) {
					$('.adc-default').css({"padding-top":((smileyBigHeight-backgroundHeight)/2+2+borderThickness+additionnalPadding)+'px'});
				}
			}
			else {
				$('.dkdiv').css({top:'0px'});
			}
		}



		function setDKposition($adcAnswers,isInLoop){
			var smileyBigHeight = computeSmileyBigHeight($adcAnswers);
			var backgroundHeight = getValue(options.controlheight)/sizeCoef;
			var dkPadding = 0;
			if ( options.turnOnDK == "dkon" ) {
				dkPadding = getValue($('.dkdiv').css("padding-left"));
			}
			var dkAlignment = options.dkAlignment;
			var borderThickness = parseInt(options.backgroundBorderSize);
			var dkborderThickness = parseInt(options.dkborderSize);
			var tooltipborderThickness = parseInt(options.tooltipBorderThickness);
			var additionnalPadding = 0;
			if ( options.showTooltips == "yes" ) {
				additionnalPadding = $(".tooltip",$adcAnswers).height() + getValue($(".tooltip",$adcAnswers).css("padding-top")) + getValue($(".tooltip",$adcAnswers).css("padding-bottom"))+2*tooltipborderThickness;
			}
			computePaddings(backgroundHeight,smileyBigHeight,borderThickness,dkPadding,additionnalPadding,isInLoop);
			alignDK(dkAlignment,$adcAnswers,dkPadding,dkborderThickness);
		}



		function noLoopOperations($adcAnswers){
			if ($adcAnswers.find('input').val() != "") {
				var alreadyFat = false;
				var val = $adcAnswers.find('input').val();
				if (val.slice(-1) == " ") {
					val = val.slice(0,-1);	
				}
				var index, boundary, elements = $("img", $(".smileysSection",$adcAnswers));
				for (index = 0, boundary = elements.length; index < boundary; index++) {
					compareImgToInput($adcAnswers,index,val,alreadyFat);
				}
				compareSpanToInput($adcAnswers,val,alreadyFat);
			}
		}



		function compareImgToInput($adcAnswers,index,val,alreadyFat){
			var text = $($(".smile", $(".smileysSection",$adcAnswers))[index]).attr("class").split("answer")[1].split("answer")[0];
			if (text.slice(-1) == " ") {
				text = text.slice(0,-1);	
			}
			if ( (text == val) && !alreadyFat) {
				fatImage($("#"+$(".smile", $(".smileysSection",$adcAnswers))[index].id,$adcAnswers),$adcAnswers);
			}
		}



		function compareSpanToInput($adcAnswers,val,alreadyFat){
			var text = $("span",$adcAnswers).attr("class");
			if (text != undefined) {
				if (text.slice(-1) == " ") {
					text = text.slice(0,-1);	
				}
				if ( (text == val) && !alreadyFat) {
					$adcAnswers.find('input').val($("span",$adcAnswers).attr("class"));
					$adcAnswers.find('input').attr("class",$("span",$adcAnswers)[0].id);
                    if (window.askia) {
                        askia.triggerAnswer();
                    }
				}
			}
		}



		function loopOperations($adcAnswers){
			if ($adcAnswers.find('input').val() != "") {
				var alreadyFat = false;
				var val = $adcAnswers.find('input').val();
				if (val.slice(-1) == " ") {
					val = val.slice(0,-1);	
				}
				var index, boundary, elements = $("img", $(".smileysSection",$adcAnswers));
				for (index = 0, boundary = elements.length; index < boundary; index++) {
					compareImgToInput($adcAnswers,index,val,alreadyFat);
				}
				compareSpanToInput($adcAnswers,val,alreadyFat);
			}
		}



		function setImgTop($adcAnswers){
			var answerHeight = $(".answers", $adcAnswers).height();
			var imgSize;
			var borderSize = parseInt(options.backgroundBorderSize);
			if ( parseFloat(options.smileycoef) <= parseFloat(options.smileybigcoef) ) {
				imgSize = Math.min($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());	
			}
			else{
				imgSize = Math.max($($(".smile", $adcAnswers)[0]).height(),$($(".smile", $adcAnswers)[1]).height());
			}
			var smileyMinWidth = options.smileyminwidth;
			smileyMinWidth = getValue(smileyMinWidth);
			var imgPercentWidth = 100/($(".smile", $adcAnswers).length*2);
			var resizeCoef = parseFloat(options.smileybigcoef);
			var imgBigSize = Math.round(Math.max( imgPercentWidth*resizeCoef * $(".smileysSection", $adcAnswers).width() /100, smileyMinWidth));
			$("img", $(".smileysSection")).css({top:-((answerHeight/2) + borderSize + (imgSize/2))+'px'});
			$(".bigsmile", $(".smileysSection")).css({top:-((answerHeight/2) + borderSize + (imgBigSize/2))+'px'});
		}

		function setImgWidth($adcAnswers){
			var imgPercentWidth = 100/($(".smile", $adcAnswers).length*2);
			$("img", $(".smileysSection")).css({width:imgPercentWidth*parseFloat(options.smileycoef)+'%'});
		}

		function resizeToScreen(){
			sizeCoef = 1349/$( window ).width();
			// resize the screen
			//$(".adc-default").css({"max-width":$( window ).width()+'px'}); 
			//$(".framecontainer").css({"max-width":$( window ).width()+'px'}); 
			//$("#navcontainer").css({"max-width":$( window ).width()+'px'}); 
			//$("#navcontent").css({"max-width":$( window ).width()+'px'}); 
			resizeAnswerBar();
		}



		function resizeAnswerBar(){
			var index, boundary, $smileysSections = $('.answerContent');
			for (index = 0, boundary = $smileysSections.length; index < boundary; index++) {
				var $smile = $($(".smile",$($smileysSections[index]))[0]);
				if ( $smile.attr("class").indexOf("bigsmile") != -1 ) {
					$smile = $($(".smile",$($smileysSections[index]))[1]);
				}
				$(".answers",$($smileysSections[index])).css({height:backgroundHeightCoef*$smile.height()+'px'});
				$(".smileysSection",$($smileysSections[index])).css({height:backgroundHeightCoef*$smile.height()+'px'});
			}
		}



		function resizer($adcAnswers){
			var resizeCounter = 1;
			var isInLoop = false;
			if ( $(".smileyratingquestion").length > 0 ) {
				isInLoop = true;
			}
			var resizeTimer = $.timer(function() {
				resizeToScreen();
				setImgTop($adcAnswers);
				setDKposition($adcAnswers,isInLoop);
				resizeTimer.stop();
			});
			resizeTimer.set({time : 10, autostart : false });
			window.onresize = function(){
				resizeCounter++;
				resizeTimer.play(true);
				if (resizeCounter >=10 ) {
					resizeTimer.stop();
					resizeCounter=1;
					resizeToScreen();
					setImgTop($adcAnswers);
					setDKposition($adcAnswers,isInLoop);
				}
			};
		}



		function tooltipListener(){
			$(".smile").mouseenter(function(){
				$(".classic"+$(this).attr("class").split("answer")[1].split("answer")[0],$(this).parent()).addClass("tooltiphover");
				if ( options.showTooltips == "yes") {
					var smileyBigHeight = computeSmileyBigHeight($(this).parent());
					var backgroundHeight = ('.gradientSection',$(this).parent()).height();
					var tooltipPadding = getValue($('.tooltiphover',$(this).parent()).css("padding-left"));
					var tooltipPaddingTop = getValue($('.tooltiphover',$(this).parent()).css("padding-top"));
					var borderThickness = parseInt(options.backgroundBorderSize);
					var tooltipBorderThickness = parseInt(options.tooltipBorderThickness);
					var tooltipfontsize = options.tooltipFontSize;
					if ( tooltipfontsize.indexOf("px") != -1 ) {
						tooltipfontsize = parseInt(tooltipfontsize);
					}
					else if ( tooltipfontsize.indexOf("em") != -1 ) {
						tooltipfontsize = parseInt(tooltipfontsize)*14;
					}
					else if ( tooltipfontsize.indexOf("%") != -1 ) {
						tooltipfontsize = parseInt(tooltipfontsize)*14/100;
					}
					$('.tooltip').css({"top":-((smileyBigHeight+backgroundHeight)/2+2*borderThickness+$('.tooltip').height()+2*tooltipPaddingTop+2*tooltipBorderThickness)+'px',"font-size":tooltipfontsize+'px'});
					$(".classic"+$(this).attr("class").split("answer")[1].split("answer")[0],$(this).parent()).css({"margin-left":0});
					$('.tooltiphover',$(this).parent()).css({"left":($(this).position().left+$(this).width()/2-($('.tooltiphover',$(this).parent()).width()/2 + tooltipPadding))+'px'});
				}
			});
			$(".smile").mouseout(function(){
				$(".classic"+$(this).attr("class").split("answer")[1].split("answer")[0],$(this).parent()).removeClass("tooltiphover");
				$(".classic"+$(this).attr("class").split("answer")[1].split("answer")[0],$(this).parent()).css({"margin-left":'-999em'});
			});
		}



		function start($adcAnswers){
			resizeToScreen();
			setImgWidth($adcAnswers);
			setImgTop($adcAnswers);
			fixImgId($adcAnswers,1);
			fixImgPosition($adcAnswers);
			setDKposition($adcAnswers,false);
			clickEvent($adcAnswers);

			noLoopOperations($adcAnswers);
		}



		function startLoop(indexLoop,numberOfItems){
			while (indexLoop <= numberOfItems) {
				var $adcAnswers = $("#smileys"+indexLoop);

				resizeToScreen();
				setImgWidth($adcAnswers);
				setImgTop($adcAnswers);
				fixImgId($adcAnswers,indexLoop);
				fixImgPosition($adcAnswers);
				setDKposition($adcAnswers,true);
				clickEvent($adcAnswers);

				loopOperations($adcAnswers);

				indexLoop++;
			}
		}



		function controlPxToPercent(){
			var controlWidth = options.controlwidth;
			if ( controlWidth.indexOf("%") == -1 ) {
				$(".answerContent").css({width:getValue(controlWidth)/$(".answerContent").width()*100+"%"});
			}
			else {
				$(".answerContent").css({width:getValue(controlWidth)+"%"});
			}
		}



		function removeExtraLoopElements(){
			var nbADC = $(".adc-default").length;
			if ( nbADC > 1 ) {
				var indexADC = 0;
				while ( $(".answerContent").length > nbADC ) {
					var indexSmiley, boundary, $smileys = $(".answerContent",$($(".adc-default")[indexADC]));	
					for ( indexSmiley = 0, boundary = $smileys.length; indexSmiley < boundary; indexSmiley++ ) {
						if ( indexSmiley != indexADC ) {
							$($smileys[indexSmiley]).remove();
						}
					}
					indexADC++;
				}
			}
		}



		function computeBackgroundMinHeight(){
			sizeCoef = 1349/$( window ).width();
			var $smileySections = $(".answerContent");
			if ( $(".smile",$($smileySections[0])).length > 0 ) {
				var $smileys = $(".smile",$($smileySections[0]));
				var $smiley = $($smileys[0]);
				if ( $smiley.attr("class").indexOf('bigsmile') != -1) {
					$smiley = $($smileys[1]);
				}
				var controlmaxwidth =options.controlmaxwidth;
				var smileysSectionBigWidth;
				if ( controlmaxwidth.indexOf("px") != -1 ) {
					smileysSectionBigWidth = Math.min(1349*90/100,parseInt(controlmaxwidth))*95/100;
				}
				else if ( controlmaxwidth.indexOf("%") != -1 ) {
					smileysSectionBigWidth = Math.min(1349*90/100*100/100,1349*90/100*parseInt(controlmaxwidth)/100)*95/100;
				}
				else {
					smileysSectionBigWidth = Math.min(1349*90/100,1349*90/100*parseInt(controlmaxwidth))*95/100;
				}
				var smilePercentWidth = 100/($(".smile", $($smileySections[0])).length*2);
				var smileBigWidth = smilePercentWidth*smileysSectionBigWidth/100;
				backgroundHeightCoef = parseInt(options.controlheight)/(smileBigWidth);
			}
		}

		
		$('.adc-default').removeClass('hidden');
		var nbAnswers = options.availableResponsesCount;
		removeExtraLoopElements();
		var turnOnDK = options.turnOnDK;
		// 1349 is the width() of the screen i have tested the adc on
		controlPxToPercent();
		computeBackgroundMinHeight();
		if ( parseInt(nbAnswers) <= 6 && parseInt(nbAnswers) >= 2) {
			if ( !( (parseInt(nbAnswers) == 6 && turnOnDK == "dkoff") || (parseInt(nbAnswers) == 2 && turnOnDK == "dkon") )) {
				var numberOfItems = $('.answerContent').length;
				if ( numberOfItems ) {
					var indexLoop = 1;
					var $adcAnswers = $("#smileys1");
					resizer($adcAnswers);
					tooltipListener();
					if (numberOfItems == 1) {
						// No loop, so there is no indexLoop
						start($adcAnswers);
					}
					else {
						//We are in a loop
						startLoop(indexLoop,numberOfItems);
					}
					$('.adc-default').css({'visibility':'visible'});
				}
			}
		}
		
	};

}(window, jQuery));
