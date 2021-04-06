let ap = 50;
        let speed = 0.1;
        let gap = -180;
        let app;
        let player;
        let keys = {};
        let keysDiv;
        let rect;
        let wall2;
        let wall;
        let arrRectsLower = [];
        let arrRectsUpper = [];
        var street = 1200;
        let gameover = false;

        window.onload = function () {
            app = new PIXI.Application(
                {
                    width: 2000,
                    height: 600,
                    backgroundColor: 0xBBCCBB

                }
            );

            document.querySelector("#gameDiv").appendChild(app.view);

            app.stage.interactive = true;

            player = new PIXI.Sprite.from("images/superhero.png");

            player.anchor.set(0.5);
            player.width = 50;
            player.height = 50;
            player.x = 700;
            player.y = app.view.height / 2;

            app.stage.addChild(player);
            let a = 20;

            app.stage.interactive = true;

            window.addEventListener("keydown", keysdown);
            window.addEventListener("keyup", keysup);
            app.ticker.add(gameLoop);

            keysDiv = document.querySelector("#keys");
            var v = 9;

            for (let i = 0; i < ap; i++) {
                wall = new PIXI.Sprite.from("images/mansory.png");
                wall2 = new PIXI.Sprite.from("images/mansory.png");
                let min2 = 0;
                let max2 = 50;


                let min = 50;
                let max = 200;
                let rand = Math.floor(Math.random() * (max - min + 1)) + min;

                wall.anchor.set(0.1);
                wall2.anchor.set(0.1);
                wall.x = app.view.width / 2 + i * 200 + rand;
                wall2.x = app.view.width / 2 + i * 200 + rand;

                wall.y = app.view.height / 2 - rand / 2 + 200;

                wall2.y = app.view.height / 2 - rand + gap;

                wall.width = 20;
                wall.height = 200 + rand / 8;

                wall2.width = 20;
                wall2.height = 200 + rand / 8;
                let v2 = wall2.x;
                v = wall.x;
                arrRectsLower[i] = wall;
                arrRectsUpper[i] = wall2;

                if (keys["68"]) {
                    wall.x -= 5;
                    wall2.x -= 5;;
                }
                if (keys["65"]) {
                    wall2.x += 5;
                    wall.x += 5;
                }

                app.stage.addChild(arrRectsLower[i]);
                app.stage.addChild(arrRectsUpper[i]);
            }


        }

        function GoingR(e) {
            for (let i = 0; i < ap; i++) {
                arrRectsLower[i].x -= speed;
                arrRectsUpper[i].x -= speed;

            }
        }
        function GoingL(e) {
            for (let i = 0; i < ap; i++) {
                arrRectsLower[i].x += speed;
                arrRectsUpper[i].x += speed;
            }
        }

        function isHit(obj1, obj2) {
            if (obj1.x + obj1.width >= obj2.x
                && obj1.x <= obj2.x + obj2.width
                && obj1.y + obj1.height >= obj2.y
                && obj1.y <= obj2.y + obj2.height) {
                return true;
                }
            }

        function GoingR(e){
            for(let i = 0;i < ap;i++){
                arrRectsLower[i].x -= speed;
                arrRectsUpper[i].x -= speed;
                
            }
        }
        function GoingL(e){
            for(let i = 0;i < ap; i++){
                arrRectsLower[i].x += speed;
                arrRectsUpper[i].x += speed;

            }

        }

        function isHit(obj1, obj2) {
            if (   obj1.x + obj1.width >= obj2.x 
                && obj1.x <= obj2.x + obj2.width 
                && obj1.y + obj1.height >= obj2.y
                && obj1.y <= obj2.y + obj2.height) 
                {
                    return true;
                }
            
        }
        

        function loopR(e) {
            for (let i = 0; i < ap; i++) {
                if (isHit(player, arrRectsLower[i])) {
                    gameover = true;

                }
                if (isHit(player, arrRectsUpper[i])) {
                    gameover = true;


                    console.log("Lower");
                    console.log(gameover);
                }
                if (isHit(player, arrRectsUpper[i])) {
                    gameover = true;
                    console.log("Upper");
                    console.log(gameover);

                }
                else {
                    GoingR();
                }
            }

        }
        function loopL(e) {

            for (let i = 0; i < ap; i++) {

                for (let i = 0; i < ap; i++) {  
                    GoingL();
                }
            }

        }

        function gameLoop() {

            
            if (!gameover) {
                

                if (player) {
                    player.y += 5;
                    if (player.y >= 585) {
                        player.y = 585;
                    }
                }
                if (keys["32"] || keys["38"]) {
                    player.y -= 15;
                    if (player.y <= 15) {
                        player.y = 15;
                    }
                }
                if (keys["87"]) {
                    player.y -= 10;

                }
                if (keys["83"]) {
                    player.y += 5;
                }
                if (keys["68"]) {
                    loopR();

                    if (wall.x <= player.x - 100) {
                        alert("Finish!!! You are winner!");
                        document.body.style.backgroundColor = 0xCCDDAA;

                    }
                }


                
                if (keys["83"]) {
                    player.y += 5;
                }
                if (keys["68"]) {
                    loopR();

                    if (wall.x <= player.x - 100) {
                        alert("Finish!!! You are winner!");
                        document.body.style.backgroundColor = 0xCCDDAA;
                        
                    }
                }


                if (keys["65"]) {
                    loopL();
                }

            }
            else {
                alert("Game Over");
            }

        }
        function keysdown(e) {
            keys[e.keyCode] = true;
        }
        function keysup(e) {
            keys[e.keyCode] = false;
        }
        