import { Component } from "@angular/core";

@Component({    //configuraltion with meta data to tell what to do with this class
 selector: "app-server",    //selector used to render this component
 templateUrl: './server.component.html',  //Html page to render when selector is used in root component(app.component is root as we have bootStrap it in app.module)
 styleUrls: ['./server.component.css']
})

export class ServerComponent{
    serverId:number = 10;
    serverName:string = "Singapore server";
    serverStatus:boolean;
    // serverDetail:string;

    constructor(){   //for each component this constructor execute
        this.serverStatus = (Math.random() <= 0.5) ? false:true;
    }

    getServerStatus(){
        return this.serverStatus;
    }

    getColor(){
        return this.serverStatus? "green" : "red";
    }

    getServerDetail(){
        const serverStatusString = this.serverStatus? "online": "offline";
        return `${this.serverId} : ${this.serverName} is ${serverStatusString}`;
    }

    serverDetail(){
        return `${this.serverId} : ${this.serverName} is ${this.serverStatus}`;
    }
}