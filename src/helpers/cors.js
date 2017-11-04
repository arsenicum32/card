// getUserMedia only works over https in Chrome 47+, so we redirect to https. Also notify user if running from file.
if (window.location.protocol == "file:") {
	alert("You seem to be running this example directly from a file. Note that these examples only work when served from a server or localhost due to canvas cross-domain restrictions.");
} else if (window.location.hostname !== "localhost" && window.location.protocol !== "https:"){
	window.location.protocol = "https";
}
