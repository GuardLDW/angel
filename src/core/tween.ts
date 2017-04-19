namespace angel {

        export class Tween {

        private moveData : MovieClipData;

        private idleData :MovieClipData;

        private object : MovieClip;

        constructor(object : MovieClip, moveData : MovieClipData, idleData : MovieClipData){

            this.object = object;
            this.moveData = moveData;
            this.idleData = idleData;

        }

        moveTo(targetX : number, targetY : number){

            var object = this.object;
            var idleData = this.idleData;
            var moveData = this.moveData;
       
            object.isMove = true;
            object.setMovieClipData(moveData);
            //开启移动线程
            var moveTimer = setInterval(function(){

            
                if(Math.abs(object.x - targetX) <= object.moveSpeed && Math.abs(object.y - targetY) <= object.moveSpeed){

                    console.log("OK")
                    object.x = targetX;
                    object.y = targetY;
                    object.setMovieClipData(idleData);
                    object.isMove = false;
                    clearInterval(moveTimer);

                }
                

                if(object.x > targetX){
                    
                    object.x = object.x - object.moveSpeed;
                
                }else if(object.x < targetX){
                    
                    object.x = object.x + object.moveSpeed;
                }
                
                if(object.y > targetY){
                    
                    object.y = object.y - object.moveSpeed;
                
                }else if(object.y < targetY){
                    
                    object.y = object.y + object.moveSpeed;
                
                }
            
            }, 40);

 
        }
        

        moveToStepByStep(point : Point[]){

            var object = this.object;
            
            var i = 1;
  
            var stepMoveInterval = setInterval(()=>{

                if(!object.isMove){

                    this.moveTo(point[i].x, point[i].y);
                }

                if(object.x == point[point.length - 1].x && object.y == point[point.length - 1].y){

                      clearInterval(stepMoveInterval);
                }

                //console.log("playerX: " + object.x);
                //console.log("playerY: " + object.y);
                //console.log("targetX: " + point[i].x);
                //console.log("targetY: " + point[i].y);
                //console.log("destinationX: " + point[point.length - 1].x);
                //console.log("destinantionY: " + point[point.length - 1].y);

                if(i < point.length - 1 && object.x == point[i].x && object.y == point[i].y){

                      i++;
                }
                
                console.log("i:" + i);
                   

            }, 80);

        }


        removeTween(){
            
            var object = this.object;
            object.isMove = false;
            moveTo(object.x, object.y);
        }
    }
}

