This is a multiplayer web based game built on html canvas
<pre><h4>Why i made this :-</h4>I am new to coding and i love game developing and backend related projects .In this projects i learned a lot of things like <br>websockets ,backend processing,frontend ,one of the most important how to code efficiently . I guess this will be a great start for<br> my coding skills. I made many games in pygame but it is little different .
</pre>
<pre>
  <h4>How to initialize it on own computer:-</h4>
       git clone -b sds https://github.com/rajeevk47/domainapp.git
       cd domainapp/
       npm install nodejs //(if not)
       npm i 
       nodemon app.js
</pre>
<pre>This will run app on localhost on port 3000 so you can visit it on http://localhost:3000/</pre>
<pre>
  Tech stack :-
    socket.io -> For establishing connection between two frontend 
    expressjs -> As backend server
    Nodejs -> Environment for javascript runtime
    Agora -> For voice chatting functionality
    Tiles -> For map designing
</pre>
<pre>
  This is a multiplayer shooting game which player can play on both mobile and pc as it runs on web and it involves<br> touch detection.This game is not fully made yet it will take some more time but currently basic functionality has been <br>added.<br>Current Functionalities : Player can have many weapons like guns and fireballs for shooting and a healthbar for showing player's <br>health .Player can also travel through one room to another room through door .Player can change their weapon from hotbar<br> either by scrolling or clicking on the weapon. Player havs its username which is asked when game starts.Player can mute or unmute and also can see that who is  muted or unmuted .
</pre>
<pre>
  A little overview of game built:-
  For map desiging tiled is used and map is exported as image format. For collision detection we can't use image so from tiled it is
  exported as 1D array of tiles which further converted into 2d array and made tiles from it and used for collision detection . For 
  player animation spritesheet is used .After player and projectiles were created and their properties are syncned with backend.
  Eventlisteners are addded for keyboard , touch and click like events . In future many weopens and functionalities will be added
</pre>
