class MySocket{
    private ws:WebSocket;
    constructor (url:string){
        this.ws=new WebSocket(url)
        this.init()
    }
    /**
     * init
     */
    private init() {
        this.ws.onopen = function(event){
            //开始通信时的处理
            console.log('开始通信')
        }
        this.ws.onmessage=function(event:{data:any}) {
            console.log('接收到从服务器发来的消息'+event.data)
        }
        this.ws.onclose=function(event){
            console.log('结束通信')
        }
    }

    public send(data:string){
        this.ws.send(data)
    }

    public listen(listenr:(event:{data:any})=>void){
        this.ws.onmessage=listenr
    }
}

export default MySocket