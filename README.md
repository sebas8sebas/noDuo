This project consists on a Google Chrome extension that automates the multifactor 
authentication process provided by <a href='https://duo.com/'>Duo Security</a>.
Duo Security is great and makes your account much more secure. However, if you are part of an organization that forces you to use this service when you don’t really feel like you need that extra layer of security, this extension will make your life easier. 
<br>
Duo Security requires you to either do a “push” with their mobile app, answer a phone call or write a code sent to you via text message. This extension uses the third option, by using  <a href='https://voice.google.com/'>Google voice</a>,  as it allows you to receive text messages in your email. 
Whenever you require Duo Multifactor Authentication, you’ll see an additional button saying “I don’t think this is necessary”, when you click on it the extension will send a request to a Python Flask server (which must be running locally on the background) which will look for the required codes in your email associated with your Google Voice account.
<br>

If you are interested in using this tool, read the following:
<h3> How to set up </h3>

- Go <a href='chrome://extensions/'>here </a>, turn on developer mode, click on “load unpacked” and select the directory called “chromeExtension”. 
-	Create a Google Voice account and make sure you set it up to receive your text messages in your email. Make sure you add this number to Duo Security.
-	Modify the app.py file to contain the Gmail credentials associated with your Google Voice number. You’ll need to turn on <a href='https://www.google.com/settings/security/lesssecureapps'> access to less secure apps </a>, so it’s not recommended to use your main email for this.
-	For convenience, make sure you are running the Python Server on the background. 

