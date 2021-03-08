document.addEventListener("DOMContentLoaded", function() {
    var elts = document.querySelectorAll('[class^="qu"]');
    for (let i = 0; i < elts.length; i++) {
        observer.observe(elts[i]);
    }
});

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true){
        var eltClass = entries[0]['target']['classList'];
        if(eltClass.contains('quTyping')){
            typingAnimation(entries[0]['target']);}
        else if(eltClass.contains('quCrypted'))
            cryptedAnimation(entries[0]['target']);
        else if(eltClass.contains('quReverse'))
            reverseAnimation(entries[0]['target']);
    }
}, { threshold: [1] });

function typingAnimation(elt){
    var speed = 100
    var text = elt.textContent;
    for (let i = 0; i <= text.length; i++){
        setTimeout(displayText, i*speed, elt, text, i);
    }

    function displayText(elt, text, i){
        text = text.toString();
        elt.textContent = text.substring(0, i);
    }
}

function cryptedAnimation(elt){
    var speed = 1;
    var text = elt.textContent;
    var cryptedLength = text.length;
    var uncrypted = "";
    var i = 0;
    var iMax = speed;

    while(cryptedLength >= 0){
        var currentLength;
        for (i; i < iMax; i++) {
            currentLength = cryptedLength;
            setTimeout(displayText, i*100, elt, cryptedLength, uncrypted);
        }
        cryptedLength--;
        iMax += speed;
        uncrypted = text.substr(0, text.length - cryptedLength);
    }

    function displayText(elt, cryptedLength, uncrypted){
        elt.textContent = uncrypted + cryptedText(cryptedLength);
    }

    function randomChar(){
        var chars = '01123456789azertyuiopqsdfghjklmwxcvbn';
        let random = Math.floor(Math.random()*36);
        return chars[random];
    }

    function cryptedText(length){
        var cryptedText = "";
        for (let y = 0; y < length; y++) {
            cryptedText += randomChar();
        }
        return cryptedText;
    }
}

function reverseAnimation(elt){
    var speed = 100;
    var text = elt.textContent.split("");
    var reverse = [];
    var t = 0;
    for (let i = text.length-1; i >= 0; i--) {
        reverse.push(text[i]);
    }
    elt.textContent = reverse.join("");
    for (i = 0; i < Math.floor(text.length/2); i++) {
        reverse[i] = text[i];
        reverse[text.length-1-i] = text[text.length-1-i];
        t++;
        setTimeout(displayText, t*speed, elt, reverse.join(""));
    }

    function displayText(elt, reverse){
        elt.textContent = reverse;
    }

}