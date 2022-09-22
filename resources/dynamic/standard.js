/* standard.js */
$(window).on("load",function() {
		$('#adc_{%= CurrentADC.InstanceId %}').adcSmileyrating({
      InstanceId : {%= CurrentADC.InstanceId %},
			backgroundBorderSize : '{%:=CurrentADC.PropValue("backgroundBorderSize")%}',
			smileyminwidth : '{%:=CurrentADC.PropValue("smileyminwidth")%}',
			smileybigcoef : '{%:=CurrentADC.PropValue("smileybigcoef")%}',
			smileycoef : '{%:=CurrentADC.PropValue("smileycoef")%}',
			animate : '{%:=CurrentADC.PropValue("animate")%}',
			animateSpeed: '{%:=CurrentADC.PropValue("animateSpeed")%}',
			turnOnDK : '{%:=CurrentADC.PropValue("turnOnDK")%}',
			controlAlignment: '{%:=CurrentADC.PropValue("controlAlignment")%}',
			dkfontSize : '{%:=CurrentADC.PropValue("dkfontSize")%}',
			controlheight : '{%:=CurrentADC.PropValue("controlheight")%}',
			dkAlignment : '{%:=CurrentADC.PropValue("dkAlignment")%}',
			dkborderSize : '{%:=CurrentADC.PropValue("dkborderSize")%}',
			tooltipBorderThickness: '{%:=CurrentADC.PropValue("tooltipBorderThickness")%}',
			showTooltips: '{%:=CurrentADC.PropValue("showTooltips")%}',
			tooltipFontSize: '{%:=CurrentADC.PropValue("tooltipFontSize")%}',
			controlwidth: '{%:=CurrentADC.PropValue("controlwidth")%}',
			controlmaxwidth: '{%:=CurrentADC.PropValue("controlmaxwidth")%}',
			controlheight : '{%:=CurrentADC.PropValue("controlheight")%}',
			availableResponsesCount : "{%:=CurrentQuestion.AvailableResponses.Count%}",
			autoForward: '{%:=CurrentADC.PropValue("autoForward")%}',
          	currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
		});
});
