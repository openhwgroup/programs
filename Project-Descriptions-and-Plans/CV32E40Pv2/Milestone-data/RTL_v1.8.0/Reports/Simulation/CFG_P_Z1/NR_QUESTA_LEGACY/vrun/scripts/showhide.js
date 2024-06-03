
/*
 * JavaScript functions for show/hide functionality
 *
 *   showAll makes all marked elements visible
 *   showCov makes "covered" elements visible
 *   showMis makes "missing" elements visible
 *
 * Note: Unmarked elements are always visible. Elements marked
 *       as "neutral" are only visible if all elements are set
 *       visible ("tr" elements only).
 */

function showAll()
{
	var x = document.getElementsByTagName('div');
	for (var i = 0; i < x.length; i++)
	{
		if (x[i].className == 'passed') x[i].style.display = 'block';
		if (x[i].className == 'nostat') x[i].style.display = 'block';
		if (x[i].className == 'failed') x[i].style.display = 'block';
	}
	var y = document.getElementsByTagName('tr');
	for (var i = 0; i < y.length; i++)
	{
		if (y[i].className == 'passed') y[i].style.display = '';
		if (y[i].className == 'nostat') y[i].style.display = '';
		if (y[i].className == 'failed') y[i].style.display = '';
	}
	document.getElementById('showAll').className  = 'button_on';
	document.getElementById('showPass').className = 'button_off';
	document.getElementById('showFail').className = 'button_off';

	document.cookie = "showhide=showAll";
}

function showPass()
{
	var x = document.getElementsByTagName('div');
	for (var i = 0; i < x.length; i++)
	{
		if (x[i].className == 'passed') x[i].style.display = 'block';
		if (x[i].className == 'nostat') x[i].style.display = 'none';
		if (x[i].className == 'failed') x[i].style.display = 'none';
	}
	var y = document.getElementsByTagName('tr');
	for (var i = 0; i < y.length; i++)
	{
		if (y[i].className == 'passed') y[i].style.display = '';
		if (y[i].className == 'nostat') y[i].style.display = 'none';
		if (y[i].className == 'failed') y[i].style.display = 'none';
	}
	document.getElementById('showAll').className  = 'button_off';
	document.getElementById('showPass').className = 'button_on';
	document.getElementById('showFail').className = 'button_off';

	document.cookie = "showhide=showPass";
}

function showFail()
{
	var x = document.getElementsByTagName('div');
	for (var i = 0; i < x.length; i++)
	{
		if (x[i].className == 'passed') x[i].style.display = 'none';
		if (x[i].className == 'nostat') x[i].style.display = 'none';
		if (x[i].className == 'failed') x[i].style.display = 'block';
	}
	var y = document.getElementsByTagName('tr');
	for (var i = 0; i < y.length; i++)
	{
		if (y[i].className == 'passed') y[i].style.display = 'none';
		if (y[i].className == 'nostat') y[i].style.display = 'none';
		if (y[i].className == 'failed') y[i].style.display = '';
	}
	document.getElementById('showAll').className  = 'button_off';
	document.getElementById('showPass').className = 'button_off';
	document.getElementById('showFail').className = 'button_on';

	document.cookie = "showhide=showFail";
}

function getCookie(key)
{
	var start = document.cookie.indexOf(key + "=");
	if (start < 0) return(null); /* no such cookie */

	var value = start + key.length + 1;
	return(document.cookie.substring(value, document.cookie.indexOf(";", value)));
}

function showLast()
{
	switch (getCookie("showhide")) {
		case "showPass": showPass(); break;
		case "showFail": showFail(); break;
		default:         showAll();  break;
	}
}

